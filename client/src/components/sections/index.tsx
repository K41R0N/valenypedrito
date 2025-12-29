/**
 * Section Registry for Landing Page Builder
 *
 * This file exports all section components and provides utilities
 * for rendering sections dynamically based on type.
 *
 * HOW TO ADD A NEW SECTION:
 * 1. Create the component file (e.g., MySection.tsx)
 * 2. Define the content type in types.ts
 * 3. Import and add to sectionComponents below
 * 4. Add to CMS config.yml under pages collection types
 */

import React, { ComponentType } from "react";

// Section Components
export { HeroLeft } from "./HeroLeft";
export { HeroCentered } from "./HeroCentered";
export { ContentImage } from "./ContentImage";
export { CardGrid } from "./CardGrid";
export { ValueCards } from "./ValueCards";
export { CTASection } from "./CTASection";
export { EmailSignup } from "./EmailSignup";
export { EventDetails } from "./EventDetails";
export { RichText } from "./RichText";

// Wedding Section Components
export { WeddingHero } from "./WeddingHero";
export { Countdown } from "./Countdown";
export { RSVPForm } from "./RSVPForm";
export { FAQ } from "./FAQ";
export { InfoBox } from "./InfoBox";
export { Registry } from "./Registry";
export { GuestResources } from "./GuestResources";
export { EventDetailsWedding } from "./EventDetailsWedding";
export { EventsCalendar } from "./EventsCalendar";

// Types
export * from "./types";

// Import components for registry
import { HeroLeft } from "./HeroLeft";
import { HeroCentered } from "./HeroCentered";
import { ContentImage } from "./ContentImage";
import { CardGrid } from "./CardGrid";
import { ValueCards } from "./ValueCards";
import { CTASection } from "./CTASection";
import { EmailSignup } from "./EmailSignup";
import { EventDetails } from "./EventDetails";
import { RichText } from "./RichText";

// Wedding components
import { WeddingHero } from "./WeddingHero";
import { Countdown } from "./Countdown";
import { RSVPForm } from "./RSVPForm";
import { FAQ } from "./FAQ";
import { InfoBox } from "./InfoBox";
import { Registry } from "./Registry";
import { GuestResources } from "./GuestResources";
import { EventDetailsWedding } from "./EventDetailsWedding";
import { EventsCalendar } from "./EventsCalendar";

import type { SectionType } from "./types";

// ============================================================================
// Section Registry
// ============================================================================

/**
 * Maps section type names to their React components.
 * Used by the page renderer to dynamically render sections.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sectionComponents: Record<string, ComponentType<any>> = {
  "hero-left": HeroLeft,
  "hero-centered": HeroCentered,
  "content-image": ContentImage,
  "card-grid": CardGrid,
  "value-cards": ValueCards,
  "cta-section": CTASection,
  "email-signup": EmailSignup,
  "event-details": EventDetails,
  "rich-text": RichText,
  // Wedding sections
  "wedding-hero": WeddingHero,
  "countdown": Countdown,
  "rsvp-form": RSVPForm,
  "faq": FAQ,
  "info-box": InfoBox,
  "registry": Registry,
  "guest-resources": GuestResources,
  "event-details-wedding": EventDetailsWedding,
  "events-calendar": EventsCalendar,
};

/**
 * Friendly names for sections (used in CMS)
 */
export const sectionLabels: Record<string, string> = {
  "hero-left": "Hero (Left Aligned)",
  "hero-centered": "Hero (Centered)",
  "content-image": "Text Block with Image",
  "card-grid": "Card Grid",
  "value-cards": "Value Cards",
  "cta-section": "Call to Action",
  "email-signup": "Email Signup Form",
  "event-details": "Event Details",
  "rich-text": "Rich Text Block",
  // Wedding sections
  "wedding-hero": "Wedding Hero - Couple Names",
  "countdown": "Countdown Timer",
  "rsvp-form": "RSVP Form",
  "faq": "FAQ Section",
  "info-box": "Information Box",
  "registry": "Gift Registry",
  "guest-resources": "Guest Resources",
  "event-details-wedding": "Event Details (Wedding)",
  "events-calendar": "Events Calendar",
};

/**
 * Section descriptions for CMS hints
 */
export const sectionDescriptions: Record<string, string> = {
  "hero-left": "Large hero banner with left-aligned text and optional email signup form",
  "hero-centered": "Large hero banner with centered text and CTA button - great for event pages",
  "content-image": "Text content with bullet points and an image on either side",
  "card-grid": "Grid of cards with emoji, title, description, and optional badge",
  "value-cards": "Grid of value proposition cards with emoji icons",
  "cta-section": "Call-to-action section with description and button",
  "email-signup": "Full email signup form with name, email, and optional segmentation",
  "event-details": "Event info card showing date, time, location, price, and registration deadline",
  "rich-text": "Flexible rich text content area for custom HTML/markdown content",
};

// ============================================================================
// Section Renderer Utility
// ============================================================================

interface RenderSectionOptions {
  section: SectionType;
  index: number;
  onCtaClick?: () => void;
  onPartnershipClick?: () => void;
}

/**
 * Renders a section based on its type.
 * Returns null if the section type is not found.
 */
export function renderSection({
  section,
  index,
  onCtaClick,
  onPartnershipClick,
}: RenderSectionOptions): React.ReactNode {
  const Component = sectionComponents[section.type];

  if (!Component) {
    console.warn(`Unknown section type: ${section.type}`);
    return null;
  }

  // Extract content from flat section structure (all fields except 'type')
  const { type, ...content } = section;

  // Build props based on section type (key handled separately for React)
  const baseProps = {
    content,
    id: `section-${index}`,
  };

  // Add callback props for interactive sections
  const callbackProps: Record<string, unknown> = {};

  if (type === "cta-section" && onPartnershipClick) {
    callbackProps.onCtaClick = onPartnershipClick;
  }

  if (type === "hero-centered" && onCtaClick) {
    callbackProps.onCtaClick = onCtaClick;
  }

  return <Component key={`section-${index}`} {...baseProps} {...callbackProps} />;
}

/**
 * Renders all sections from a page's sections array.
 */
export function renderSections(
  sections: SectionType[],
  options?: {
    onCtaClick?: () => void;
    onPartnershipClick?: () => void;
  }
): React.ReactNode[] {
  return sections.map((section, index) =>
    renderSection({
      section,
      index,
      onCtaClick: options?.onCtaClick,
      onPartnershipClick: options?.onPartnershipClick,
    })
  );
}
