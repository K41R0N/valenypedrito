import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const GITHUB_API_BASE = "https://api.github.com";

// Environment variables (set in Netlify dashboard)
// GITHUB_REPO: "owner/repo" format (e.g., "K41R0N/valenypedrito")
// GITHUB_TOKEN: Personal Access Token with repo scope

const handler: Handler = async (event: HandlerEvent, _context: HandlerContext) => {
  const { httpMethod, body, queryStringParameters } = event;

  // CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Content-Type": "application/json",
  };

  // Handle preflight
  if (httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;

  if (!token || !repo) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "GitHub configuration missing. Set GITHUB_TOKEN and GITHUB_REPO in Netlify." }),
    };
  }

  // Get the action from query params
  const action = queryStringParameters?.action || "";

  try {
    let githubUrl: string;
    let githubMethod = httpMethod;
    let githubBody = body;

    switch (action) {
      case "auth":
        // Return a fake auth response - Clerk handles real auth
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            provider: "github",
            token: "proxy-authenticated",
            email: "admin@wedding.com",
            name: "Admin"
          }),
        };

      case "user":
        // Return user info for the token
        githubUrl = `${GITHUB_API_BASE}/user`;
        break;

      case "repo":
        // Get repo info
        githubUrl = `${GITHUB_API_BASE}/repos/${repo}`;
        break;

      case "branch":
        // Get branch info
        const branch = queryStringParameters?.branch || "main";
        githubUrl = `${GITHUB_API_BASE}/repos/${repo}/branches/${branch}`;
        break;

      case "tree":
        // Get tree
        const sha = queryStringParameters?.sha || "main";
        const recursive = queryStringParameters?.recursive === "true";
        githubUrl = `${GITHUB_API_BASE}/repos/${repo}/git/trees/${sha}${recursive ? "?recursive=1" : ""}`;
        break;

      case "blob":
        // Get or create blob
        const blobSha = queryStringParameters?.sha;
        if (httpMethod === "GET" && blobSha) {
          githubUrl = `${GITHUB_API_BASE}/repos/${repo}/git/blobs/${blobSha}`;
        } else if (httpMethod === "POST") {
          githubUrl = `${GITHUB_API_BASE}/repos/${repo}/git/blobs`;
        } else {
          return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid blob request" }) };
        }
        break;

      case "contents":
        // Get or update file contents
        const path = queryStringParameters?.path || "";
        const ref = queryStringParameters?.ref || "main";
        githubUrl = `${GITHUB_API_BASE}/repos/${repo}/contents/${path}?ref=${ref}`;
        break;

      case "commit":
        // Create a commit
        githubUrl = `${GITHUB_API_BASE}/repos/${repo}/git/commits`;
        break;

      case "ref":
        // Update a ref (branch pointer)
        const refName = queryStringParameters?.ref || "heads/main";
        if (httpMethod === "GET") {
          githubUrl = `${GITHUB_API_BASE}/repos/${repo}/git/ref/${refName}`;
        } else {
          githubUrl = `${GITHUB_API_BASE}/repos/${repo}/git/refs/${refName}`;
        }
        break;

      case "createTree":
        // Create a new tree
        githubUrl = `${GITHUB_API_BASE}/repos/${repo}/git/trees`;
        break;

      default:
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: `Unknown action: ${action}` }),
        };
    }

    // Make request to GitHub API
    const response = await fetch(githubUrl, {
      method: githubMethod,
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json",
        "User-Agent": "Sveltia-CMS-Proxy",
      },
      body: githubMethod !== "GET" && githubMethod !== "HEAD" ? githubBody : undefined,
    });

    const responseBody = await response.text();

    return {
      statusCode: response.status,
      headers,
      body: responseBody,
    };
  } catch (error) {
    console.error("GitHub proxy error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Proxy error", message: String(error) }),
    };
  }
};

export { handler };
