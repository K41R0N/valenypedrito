/**
 * PageRenderer - Dynamic page rendering from CMS content
 *
 * Renders pages built with the landing page builder by:
 * 1. Loading page data from JSON content files
 * 2. Rendering each section using the section registry
 * 3. Wrapping with global components (Header, Footer, SEO)
 */

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";
import { renderSections } from "@/components/sections";
import type { PageData } from "@/components/sections/types";

// Global settings
import settingsContent from "@/content/settings.json";

interface PageRendererProps {
  pageData: PageData;
}

export function PageRenderer({ pageData }: PageRendererProps) {
  const scrollToRSVP = () => {
    // Scroll to RSVP section
    const rsvpSection = document.getElementById("rsvp");
    if (rsvpSection) {
      rsvpSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCtaClick = () => {
    scrollToRSVP();
  };

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-[#9C7C58] focus:text-white focus:px-4 focus:py-2 focus:outline-none"
      >
        Ir al contenido principal
      </a>

      <SEO
        title={pageData.seo.metaTitle}
        description={pageData.seo.metaDescription}
        keywords={pageData.seo.keywords}
        image={pageData.seo.shareImage}
        url={`https://valenypedrito.com/${pageData.slug === "home" ? "" : pageData.slug}`}
      />

      <StructuredData
        siteName={settingsContent.siteName}
        description={pageData.seo.metaDescription}
        email={settingsContent.contactEmail}
        location={settingsContent.location}
        image={pageData.seo.shareImage}
        keywords={pageData.seo.keywords}
      />

      <Header onJoinClick={scrollToRSVP} />

      <div id="main-content" className="min-h-screen overflow-x-hidden">
        {renderSections(pageData.sections, {
          onCtaClick: handleCtaClick,
        })}

        <Footer onNewsletterClick={scrollToRSVP} />
      </div>
    </>
  );
}
