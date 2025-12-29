/**
 * PageRenderer - Dynamic page rendering from CMS content
 *
 * Renders pages built with the landing page builder by:
 * 1. Loading page data from JSON content files
 * 2. Rendering each section using the section registry
 * 3. Wrapping with global components (Header, Footer, SEO)
 */

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";
import { PartnershipModal } from "@/components/PartnershipModal";
import { renderSections } from "@/components/sections";
import type { PageData } from "@/components/sections/types";

// Global settings
import settingsContent from "@/content/settings.json";

interface PageRendererProps {
  pageData: PageData;
}

export function PageRenderer({ pageData }: PageRendererProps) {
  const [partnershipModalOpen, setPartnershipModalOpen] = useState(false);

  const scrollToEmailForm = () => {
    // Find the first email-signup section
    const emailSection = document.querySelector('[id^="section-"]');
    const sections = pageData.sections;
    const emailIndex = sections.findIndex(s => s.type === "email-signup");
    if (emailIndex >= 0) {
      document.getElementById(`section-${emailIndex}`)?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Fallback to any email-form id
      document.getElementById("email-form")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCtaClick = () => {
    scrollToEmailForm();
  };

  const handlePartnershipClick = () => {
    setPartnershipModalOpen(true);
  };

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-[#1B5E20] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC107]"
      >
        Skip to main content
      </a>

      <SEO
        title={pageData.seo.metaTitle}
        description={pageData.seo.metaDescription}
        keywords={pageData.seo.keywords}
        image={pageData.seo.shareImage}
        url={`https://greenlandvillage.netlify.app/${pageData.slug === "home" ? "" : pageData.slug}`}
      />

      <StructuredData
        siteName={settingsContent.siteName}
        description={pageData.seo.metaDescription}
        email={settingsContent.contactEmail}
        location={settingsContent.location}
        image={pageData.seo.shareImage}
        keywords={pageData.seo.keywords}
      />

      <Header
        onJoinClick={scrollToEmailForm}
        onPartnershipClick={handlePartnershipClick}
      />

      <PartnershipModal
        open={partnershipModalOpen}
        onOpenChange={setPartnershipModalOpen}
      />

      <div id="main-content" className="min-h-screen overflow-x-hidden">
        {renderSections(pageData.sections, {
          onCtaClick: handleCtaClick,
          onPartnershipClick: handlePartnershipClick,
        })}

        <Footer
          onNewsletterClick={scrollToEmailForm}
          onPartnershipClick={handlePartnershipClick}
        />
      </div>
    </>
  );
}
