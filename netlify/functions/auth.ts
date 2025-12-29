import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

/**
 * This function handles the OAuth callback for Sveltia CMS.
 * It provides a GitHub token from environment variables instead of going through OAuth flow.
 *
 * Required Netlify Environment Variables:
 * - GITHUB_TOKEN: A GitHub Personal Access Token with 'repo' scope
 */

const handler: Handler = async (event: HandlerEvent, _context: HandlerContext) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return {
      statusCode: 500,
      headers: { ...headers, "Content-Type": "text/html" },
      body: `
        <!DOCTYPE html>
        <html>
          <head><title>Error</title></head>
          <body>
            <h1>Configuration Error</h1>
            <p>GITHUB_TOKEN environment variable is not set in Netlify.</p>
            <p>Please set it in Netlify Dashboard → Site Settings → Environment Variables.</p>
          </body>
        </html>
      `,
    };
  }

  // Return the token in the format Sveltia CMS expects
  // This mimics the OAuth callback response
  return {
    statusCode: 200,
    headers: { ...headers, "Content-Type": "text/html" },
    body: `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Authorization Complete</title>
          <script>
            (function() {
              const token = "${token}";
              const provider = "github";

              // Send message to parent window (Sveltia CMS)
              if (window.opener) {
                window.opener.postMessage(
                  JSON.stringify({ token, provider }),
                  window.location.origin
                );
                window.close();
              } else {
                // If no opener, redirect back to admin
                window.location.href = "/admin/";
              }
            })();
          </script>
        </head>
        <body>
          <p>Authenticating...</p>
        </body>
      </html>
    `,
  };
};

export { handler };
