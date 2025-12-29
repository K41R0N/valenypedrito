import { useEffect, useRef } from "react";
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
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    // Dynamically load Sveltia CMS after authentication
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@sveltia/cms@0.125.0/dist/sveltia-cms.js";
    script.integrity = "sha384-hTeYkuMKP/HzXIz1LTS3uJxWMS5VVKqLmDqFQzY4i4ac5vcAFbJlCEppkDCpwrD9";
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);

    // Add config link
    const configLink = document.createElement("link");
    configLink.href = "/admin/config.yml";
    configLink.type = "application/yaml";
    configLink.rel = "cms-config-url";
    document.head.appendChild(configLink);
  }, []);

  return null;
}

function AdminGate() {
  return (
    <>
      <SignedOut>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#F9F7F2",
            fontFamily: "'Lato', sans-serif",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "3rem",
              borderRadius: "0",
              border: "1px solid rgba(156, 124, 88, 0.2)",
              textAlign: "center",
              maxWidth: "400px",
              width: "90%",
            }}
          >
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.5rem",
                color: "#2C2C2C",
                marginBottom: "0.5rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Panel de Administración
            </h1>
            <p
              style={{
                color: "#595959",
                marginBottom: "2rem",
                fontSize: "0.9rem",
              }}
            >
              Boda Valentina & Pedro Juan
            </p>
            <div
              style={{
                width: "60px",
                height: "1px",
                backgroundColor: "rgba(156, 124, 88, 0.4)",
                margin: "0 auto 2rem",
              }}
            />
            <SignInButton mode="modal">
              <button
                style={{
                  backgroundColor: "#9C7C58",
                  color: "white",
                  border: "none",
                  padding: "0.875rem 2rem",
                  fontSize: "0.875rem",
                  fontFamily: "'Lato', sans-serif",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  width: "100%",
                }}
              >
                Iniciar Sesión con Google
              </button>
            </SignInButton>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        {/* User button for sign out */}
        <div
          style={{
            position: "fixed",
            top: "10px",
            right: "10px",
            zIndex: 9999,
          }}
        >
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
