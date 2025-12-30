import { useEffect } from "react";

/**
 * AdminApp - Loads Sveltia CMS with GitHub PAT authentication
 *
 * Authentication flow:
 * 1. Sveltia CMS loads and shows "Login with GitHub" button
 * 2. User clicks login → redirected to auth.ts
 * 3. auth.ts returns the GITHUB_TOKEN from env vars
 * 4. Sveltia uses that token for all GitHub operations
 *
 * Setup in Netlify Dashboard:
 * - Set GITHUB_TOKEN env var (PAT with repo scope)
 *
 * The client clicks "Login with GitHub" but behind the scenes
 * they're just getting the PAT - no actual GitHub account needed.
 */
export default function AdminApp() {
  useEffect(() => {
    const cmsSrc = "https://unpkg.com/@sveltia/cms@0.125.0/dist/sveltia-cms.js";
    const configHref = "/admin/config.yml";

    // Load Sveltia CMS
    if (!document.querySelector(`script[src="${cmsSrc}"]`)) {
      const cmsScript = document.createElement("script");
      cmsScript.src = cmsSrc;
      cmsScript.integrity = "sha384-hTeYkuMKP/HzXIz1LTS3uJxWMS5VVKqLmDqFQzY4i4ac5vcAFbJlCEppkDCpwrD9";
      cmsScript.crossOrigin = "anonymous";
      document.body.appendChild(cmsScript);
    }

    // Add config link
    if (!document.querySelector(`link[href="${configHref}"]`)) {
      const configLink = document.createElement("link");
      configLink.href = configHref;
      configLink.type = "application/yaml";
      configLink.rel = "cms-config-url";
      document.head.appendChild(configLink);
    }
  }, []);

  return null;
}
