import { useEffect } from "react";

/**
 * AdminApp - Loads Decap CMS for content management
 *
 * Authentication is handled via Netlify Identity + Git Gateway:
 * - Users log in with email/password through Netlify Identity
 * - Git Gateway handles GitHub operations behind the scenes
 * - No GitHub account required for editors
 *
 * Note: We use Decap CMS (not Sveltia) because Sveltia doesn't support git-gateway.
 * Decap CMS is the official successor to Netlify CMS with full git-gateway support.
 *
 * Setup in Netlify Dashboard:
 * 1. Enable Identity (Site Settings → Identity)
 * 2. Enable Git Gateway (Identity → Services → Git Gateway)
 * 3. Invite users via Identity → Invite users
 */
export default function AdminApp() {
  useEffect(() => {
    const identitySrc = "https://identity.netlify.com/v1/netlify-identity-widget.js";
    const cmsSrc = "https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js";
    const configHref = "/admin/config.yml";

    // Load Netlify Identity Widget (required for Git Gateway auth)
    if (!document.querySelector(`script[src="${identitySrc}"]`)) {
      const identityScript = document.createElement("script");
      identityScript.src = identitySrc;
      document.head.appendChild(identityScript);
    }

    // Load Decap CMS (supports git-gateway, unlike Sveltia)
    if (!document.querySelector(`script[src="${cmsSrc}"]`)) {
      const cmsScript = document.createElement("script");
      cmsScript.src = cmsSrc;
      document.body.appendChild(cmsScript);
    }

    // Add config link if not present
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
