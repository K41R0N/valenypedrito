import { useEffect } from "react";

/**
 * AdminApp - Loads Sveltia CMS for content management
 *
 * Authentication is handled via GitHub PAT:
 * - Set GITHUB_TOKEN in Netlify environment variables
 * - Set GITHUB_REPO to "owner/repo" format
 *
 * The CMS uses the auth.ts and github-proxy.ts Netlify functions
 * to authenticate with GitHub and perform content operations.
 */
export default function AdminApp() {
  useEffect(() => {
    const scriptSrc =
      "https://unpkg.com/@sveltia/cms@0.125.0/dist/sveltia-cms.js";
    const configHref = "/admin/config.yml";

    // Check if script already exists
    if (document.querySelector(`script[src="${scriptSrc}"]`)) {
      return;
    }

    // Load Sveltia CMS
    const script = document.createElement("script");
    script.src = scriptSrc;
    script.integrity =
      "sha384-hTeYkuMKP/HzXIz1LTS3uJxWMS5VVKqLmDqFQzY4i4ac5vcAFbJlCEppkDCpwrD9";
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);

    // Add config link if not present
    let configLink = document.querySelector(
      `link[href="${configHref}"]`
    ) as HTMLLinkElement | null;
    if (!configLink) {
      configLink = document.createElement("link");
      configLink.href = configHref;
      configLink.type = "application/yaml";
      configLink.rel = "cms-config-url";
      document.head.appendChild(configLink);
    }

    // Cleanup on unmount
    return () => {
      script.remove();
      configLink?.remove();
    };
  }, []);

  return null;
}
