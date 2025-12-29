import { useEffect } from "react";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY environment variable");
}

function CMSLoader() {
  useEffect(() => {
    const scriptSrc =
      "https://unpkg.com/@sveltia/cms@0.125.0/dist/sveltia-cms.js";
    const configHref = "/admin/config.yml";

    // Check if script already exists
    if (document.querySelector(`script[src="${scriptSrc}"]`)) {
      return;
    }

    // Dynamically load Sveltia CMS after authentication
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

function AdminGate() {
  return (
    <>
      <SignedOut>
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F7F2] font-body">
          <div className="bg-white p-12 border border-[#9C7C58]/20 text-center max-w-[400px] w-[90%]">
            <h1 className="font-serif text-2xl text-[#2C2C2C] mb-2 uppercase tracking-widest">
              Panel de Administración
            </h1>
            <p className="text-[#595959] mb-8 text-sm">
              Boda Valentina &amp; Pedro Juan
            </p>
            <div className="w-[60px] h-px bg-[#9C7C58]/40 mx-auto mb-8" />
            <SignInButton mode="modal">
              <button className="bg-[#9C7C58] text-white border-none py-3.5 px-8 text-sm font-body cursor-pointer uppercase tracking-widest w-full hover:bg-[#7A8B6E] transition-colors">
                Iniciar Sesión con Google
              </button>
            </SignInButton>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        {/* User button for sign out */}
        <div className="fixed top-2.5 right-2.5 z-[9999]">
          <UserButton afterSignOutUrl="/admin" />
        </div>
        {/* Load Sveltia CMS */}
        <CMSLoader />
      </SignedIn>
    </>
  );
}

export default function AdminApp() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/admin">
      <AdminGate />
    </ClerkProvider>
  );
}
