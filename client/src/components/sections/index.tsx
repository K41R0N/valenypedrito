/**
 * Section Registry for Wedding Website Page Builder
 *
 * This file exports all section components and provides utilities
 * for rendering sections dynamically based on type.
 *
 * V2 LUXURY WEDDING DESIGN SYSTEM
 * All sections follow the new luxury design with:
 * - Dusty Rose, Sage Green, Warm Gold color palette
 * - Cormorant Garamond, Inter, Great Vibes typography
 * - Elegant animations and transitions
 */

import React, { ComponentType } from "react";

// =============================================================================
// LUXURY WEDDING SECTIONS (V2 Design System)
// =============================================================================

// Hero & Headers
export { LuxuryHero } from "./LuxuryHero";
export { LuxuryPageHeader } from "./LuxuryPageHeader";

// Story & Content
export { OurStory } from "./OurStory";
export { DestinationGuide } from "./DestinationGuide";

// Timeline & Events
export { WeddingTimeline } from "./WeddingTimeline";

// Venue & Location
export { VenueSection } from "./VenueSection";

// Information
export { LuxuryFAQ } from "./LuxuryFAQ";
export { DetailsCards } from "./DetailsCards";
export { LuxuryInfoCard } from "./LuxuryInfoCard";
export { TravelGuide } from "./TravelGuide";

// Countdown
export { LuxuryCountdown } from "./LuxuryCountdown";

// Gifts & Registry
export { GiftSection } from "./GiftSection";

// Social
export { PhotoSharing } from "./PhotoSharing";

// Forms
export { LuxuryRSVP } from "./LuxuryRSVP";

// Footer
export { LuxuryFooter } from "./LuxuryFooter";

// Types
export * from "./types";

// =============================================================================
// Import components for registry
// =============================================================================

import { LuxuryHero } from "./LuxuryHero";
import { LuxuryPageHeader } from "./LuxuryPageHeader";
import { OurStory } from "./OurStory";
import { DestinationGuide } from "./DestinationGuide";
import { WeddingTimeline } from "./WeddingTimeline";
import { VenueSection } from "./VenueSection";
import { LuxuryFAQ } from "./LuxuryFAQ";
import { DetailsCards } from "./DetailsCards";
import { LuxuryInfoCard } from "./LuxuryInfoCard";
import { TravelGuide } from "./TravelGuide";
import { LuxuryCountdown } from "./LuxuryCountdown";
import { GiftSection } from "./GiftSection";
import { PhotoSharing } from "./PhotoSharing";
import { LuxuryRSVP } from "./LuxuryRSVP";
import { LuxuryFooter } from "./LuxuryFooter";

import type { SectionType } from "./types";

// =============================================================================
// Section Registry
// =============================================================================

/**
 * Maps section type names to their React components.
 * Used by the page renderer to dynamically render sections.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sectionComponents: Record<string, ComponentType<any>> = {
  // Hero & Headers
  "luxury-hero": LuxuryHero,
  "luxury-page-header": LuxuryPageHeader,

  // Story & Content
  "our-story": OurStory,
  "destination-guide": DestinationGuide,

  // Timeline & Events
  "wedding-timeline": WeddingTimeline,

  // Venue & Location
  "venue-section": VenueSection,

  // Information
  "luxury-faq": LuxuryFAQ,
  "details-cards": DetailsCards,
  "luxury-info-card": LuxuryInfoCard,
  "travel-guide": TravelGuide,

  // Countdown
  "luxury-countdown": LuxuryCountdown,

  // Gifts & Registry
  "gift-section": GiftSection,

  // Social
  "photo-sharing": PhotoSharing,

  // Forms
  "luxury-rsvp": LuxuryRSVP,

  // Footer
  "luxury-footer": LuxuryFooter,
};

/**
 * Friendly names for sections (used in CMS)
 */
export const sectionLabels: Record<string, string> = {
  "luxury-hero": "Hero Principal",
  "luxury-page-header": "Encabezado de Página",
  "our-story": "Nuestra Historia",
  "destination-guide": "Guía del Destino",
  "wedding-timeline": "Cronograma del Día",
  "venue-section": "El Lugar",
  "luxury-faq": "Preguntas Frecuentes",
  "details-cards": "Detalles Importantes",
  "luxury-info-card": "Tarjeta de Información",
  "travel-guide": "Guía de Viaje",
  "luxury-countdown": "Cuenta Regresiva",
  "gift-section": "Lista de Regalos",
  "photo-sharing": "Comparte Tus Fotos",
  "luxury-rsvp": "Confirma Tu Asistencia",
  "luxury-footer": "Pie de Página",
};

/**
 * Section descriptions for CMS hints
 */
export const sectionDescriptions: Record<string, string> = {
  "luxury-hero": "Sección hero elegante con nombres de pareja, fecha y animación de scroll",
  "luxury-page-header": "Encabezado elegante para páginas interiores con icono y subtítulo",
  "our-story": "Sección con foto de pareja y texto de vuestra historia de amor",
  "destination-guide": "Guía del destino con imagen, descripción y puntos destacados",
  "wedding-timeline": "Cronograma visual del día de la boda con iconos y animaciones",
  "venue-section": "Información del lugar con foto, mapa y detalles de transporte",
  "luxury-faq": "Acordeón elegante de preguntas frecuentes",
  "details-cards": "Tarjetas para código de vestimenta, niños y otros detalles",
  "luxury-info-card": "Tarjeta de información destacada con icono y markdown",
  "travel-guide": "Guía de viaje con secciones expandibles para vuelos, hoteles, transporte",
  "luxury-countdown": "Cuenta regresiva elegante hasta el día de la boda",
  "gift-section": "Información sobre regalos y lista de bodas",
  "photo-sharing": "Sección para compartir fotos con hashtag de la boda",
  "luxury-rsvp": "Formulario elegante de confirmación de asistencia",
  "luxury-footer": "Pie de página con contacto, enlaces y redes sociales",
};

// =============================================================================
// Section Renderer Utility
// =============================================================================

interface RenderSectionOptions {
  section: SectionType;
  index: number;
  onCtaClick?: () => void;
}

/**
 * Renders a section based on its type.
 * Returns null if the section type is not found.
 */
export function renderSection({
  section,
  index,
}: RenderSectionOptions): React.ReactNode {
  const Component = sectionComponents[section.type];

  if (!Component) {
    console.warn(`Unknown section type: ${section.type}`);
    return null;
  }

  // Extract content from flat section structure (all fields except 'type' and 'sectionId')
  const { type, sectionId, ...content } = section;

  // Build props based on section type (key handled separately for React)
  // Use custom sectionId if provided, otherwise fall back to index-based ID
  const baseProps = {
    content,
    id: sectionId || `section-${index}`,
  };

  return <Component key={`section-${index}`} {...baseProps} />;
}

/**
 * Renders all sections from a page's sections array.
 */
export function renderSections(
  sections: SectionType[],
  options?: {
    onCtaClick?: () => void;
  }
): React.ReactNode[] {
  return sections.map((section, index) =>
    renderSection({
      section,
      index,
      onCtaClick: options?.onCtaClick,
    })
  );
}
