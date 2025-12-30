import { useEffect, useState } from "react";

/**
 * AdminApp - Loads Sveltia CMS with Netlify Identity login gate
 *
 * Authentication flow:
 * 1. User logs in via Netlify Identity (email/password)
 * 2. Once authenticated, Sveltia CMS loads
 * 3. Sveltia uses GitHub PAT (from auth.ts) for content operations
 *
 * This gives us:
 * - Simple email/password login (no GitHub account needed for client)
 * - Sveltia's modern UI
 * - GitHub PAT handles all repo operations behind the scenes
 *
 * Setup in Netlify Dashboard:
 * 1. Enable Identity (Site Settings → Identity)
 * 2. Set registration to "Invite only"
 * 3. Invite users via Identity → Invite users
 * 4. Set GITHUB_TOKEN env var (PAT with repo scope)
 */

declare global {
  interface Window {
    netlifyIdentity: {
      on: (event: string, callback: (user?: unknown) => void) => void;
      open: () => void;
      currentUser: () => unknown | null;
      logout: () => void;
    };
  }
}

export default function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load Netlify Identity Widget
    const identityScript = document.createElement("script");
    identityScript.src = "https://identity.netlify.com/v1/netlify-identity-widget.js";
    identityScript.onload = () => {
      // Check if already logged in
      const user = window.netlifyIdentity?.currentUser();
      if (user) {
        setIsAuthenticated(true);
      }
      setIsLoading(false);

      // Listen for login/logout events
      window.netlifyIdentity?.on("login", () => {
        setIsAuthenticated(true);
      });
      window.netlifyIdentity?.on("logout", () => {
        setIsAuthenticated(false);
      });
    };
    document.head.appendChild(identityScript);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    // Load Sveltia CMS only after authentication
    const cmsSrc = "https://unpkg.com/@sveltia/cms@0.125.0/dist/sveltia-cms.js";
    const configHref = "/admin/config.yml";

    if (!document.querySelector(`script[src="${cmsSrc}"]`)) {
      const cmsScript = document.createElement("script");
      cmsScript.src = cmsSrc;
      cmsScript.integrity = "sha384-hTeYkuMKP/HzXIz1LTS3uJxWMS5VVKqLmDqFQzY4i4ac5vcAFbJlCEppkDCpwrD9";
      cmsScript.crossOrigin = "anonymous";
      document.body.appendChild(cmsScript);
    }

    if (!document.querySelector(`link[href="${configHref}"]`)) {
      const configLink = document.createElement("link");
      configLink.href = configHref;
      configLink.type = "application/yaml";
      configLink.rel = "cms-config-url";
      document.head.appendChild(configLink);
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F7]">
        <p className="text-[#6B5E54]">Cargando...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF9F7] font-sans">
        <div className="bg-white p-12 border border-[#E8E4DF] text-center max-w-[400px] w-[90%] shadow-sm">
          <h1 className="text-2xl text-[#2C2C2C] mb-2 tracking-wide font-light">
            Panel de Administración
          </h1>
          <p className="text-[#6B5E54] mb-8 text-sm">
            Boda Valentina &amp; Pedro Juan
          </p>
          <div className="w-[60px] h-px bg-[#C9A87C]/40 mx-auto mb-8" />
          <button
            onClick={() => window.netlifyIdentity?.open()}
            className="bg-[#C9A87C] text-white border-none py-3.5 px-8 text-sm cursor-pointer tracking-wide w-full hover:bg-[#B8997A] transition-colors"
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    );
  }

  // Once authenticated, Sveltia CMS renders itself
  return (
    <div className="fixed top-3 right-3 z-[9999]">
      <button
        onClick={() => window.netlifyIdentity?.logout()}
        className="bg-white/90 text-[#6B5E54] border border-[#E8E4DF] py-2 px-4 text-xs cursor-pointer hover:bg-white transition-colors rounded"
      >
        Cerrar Sesión
      </button>
    </div>
  );
}
