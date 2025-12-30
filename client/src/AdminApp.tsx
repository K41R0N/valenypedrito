import { useEffect } from "react";

/**
 * AdminApp - Loads Sveltia CMS for content management
 *
 * Authentication is handled via Netlify Identity + Git Gateway:
 * - Users log in with email/password through Netlify Identity
 * - Git Gateway handles GitHub operations behind the scenes
 * - No GitHub account required for editors
 *
 * Setup in Netlify Dashboard:
 * 1. Enable Identity (Site Settings → Identity)
 * 2. Enable Git Gateway (Identity → Services → Git Gateway)
 * 3. Invite users via Identity → Invite users
 */
export default function AdminApp() {
  useEffect(() => {
    const identitySrc = "https://identity.netlify.com/v1/netlify-identity-widget.js";
    const cmsSrc = "https://unpkg.com/@sveltia/cms@0.125.0/dist/sveltia-cms.js";
    const configHref = "/admin/config.yml";

    // Load Netlify Identity Widget (required for Git Gateway auth)
    if (!document.querySelector(`script[src="${identitySrc}"]`)) {
      const identityScript = document.createElement("script");
      identityScript.src = identitySrc;
      document.head.appendChild(identityScript);
    }

    // Load Sveltia CMS
    if (!document.querySelector(`script[src="${cmsSrc}"]`)) {
      const cmsScript = document.createElement("script");
      cmsScript.src = cmsSrc;
      cmsScript.integrity = "sha384-hTeYkuMKP/HzXIz1LTS3uJxWMS5VVKqLmDqFQzY4i4ac5vcAFbJlCEppkDCpwrD9";
      cmsScript.crossOrigin = "anonymous";
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
