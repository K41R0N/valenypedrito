/**
 * Section Registry for Wedding Website Page Builder
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

// =============================================================================
// LUXURY WEDDING SECTIONS (V2 Design System)
// =============================================================================
export { LuxuryHero } from "./LuxuryHero";
export { OurStory } from "./OurStory";
export { WeddingTimeline } from "./WeddingTimeline";
export { VenueSection } from "./VenueSection";
export { LuxuryFAQ } from "./LuxuryFAQ";
export { DetailsCards } from "./DetailsCards";
export { LuxuryCountdown } from "./LuxuryCountdown";
export { GiftSection } from "./GiftSection";
export { PhotoSharing } from "./PhotoSharing";
export { LuxuryRSVP } from "./LuxuryRSVP";
export { LuxuryFooter } from "./LuxuryFooter";

// =============================================================================
// LEGACY SECTIONS (For backwards compatibility)
// =============================================================================
export { HeroLeft } from "./HeroLeft";
export { HeroCentered } from "./HeroCentered";
export { ContentImage } from "./ContentImage";
export { CardGrid } from "./CardGrid";
export { ValueCards } from "./ValueCards";
export { CTASection } from "./CTASection";
export { EmailSignup } from "./EmailSignup";
export { EventDetails } from "./EventDetails";
export { RichText } from "./RichText";
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

// =============================================================================
// Import components for registry
// =============================================================================

// Luxury Wedding Sections (V2)
import { LuxuryHero } from "./LuxuryHero";
import { OurStory } from "./OurStory";
import { WeddingTimeline } from "./WeddingTimeline";
import { VenueSection } from "./VenueSection";
import { LuxuryFAQ } from "./LuxuryFAQ";
import { DetailsCards } from "./DetailsCards";
import { LuxuryCountdown } from "./LuxuryCountdown";
import { GiftSection } from "./GiftSection";
import { PhotoSharing } from "./PhotoSharing";
import { LuxuryRSVP } from "./LuxuryRSVP";
import { LuxuryFooter } from "./LuxuryFooter";

// Legacy Sections
import { HeroLeft } from "./HeroLeft";
import { HeroCentered } from "./HeroCentered";
import { ContentImage } from "./ContentImage";
import { CardGrid } from "./CardGrid";
import { ValueCards } from "./ValueCards";
import { CTASection } from "./CTASection";
import { EmailSignup } from "./EmailSignup";
import { EventDetails } from "./EventDetails";
import { RichText } from "./RichText";
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

// =============================================================================
// Section Registry
// =============================================================================

/**
 * Maps section type names to their React components.
 * Used by the page renderer to dynamically render sections.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sectionComponents: Record<string, ComponentType<any>> = {
  // Luxury Wedding Sections (V2 - Recommended)
  "luxury-hero": LuxuryHero,
  "our-story": OurStory,
  "wedding-timeline": WeddingTimeline,
  "venue-section": VenueSection,
  "luxury-faq": LuxuryFAQ,
  "details-cards": DetailsCards,
  "luxury-countdown": LuxuryCountdown,
  "gift-section": GiftSection,
  "photo-sharing": PhotoSharing,
  "luxury-rsvp": LuxuryRSVP,
  "luxury-footer": LuxuryFooter,

  // Legacy Sections (Backwards compatibility)
  "hero-left": HeroLeft,
  "hero-centered": HeroCentered,
  "content-image": ContentImage,
  "card-grid": CardGrid,
  "value-cards": ValueCards,
  "cta-section": CTASection,
  "email-signup": EmailSignup,
  "event-details": EventDetails,
  "rich-text": RichText,
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
  // Luxury Wedding Sections (V2)
  "luxury-hero": "Hero Principal",
  "our-story": "Nuestra Historia",
  "wedding-timeline": "Cronograma del Día",
  "venue-section": "El Lugar",
  "luxury-faq": "Preguntas Frecuentes",
  "details-cards": "Detalles Importantes",
  "luxury-countdown": "Cuenta Regresiva",
  "gift-section": "Lista de Regalos",
  "photo-sharing": "Comparte Tus Fotos",
  "luxury-rsvp": "Confirma Tu Asistencia",
  "luxury-footer": "Pie de Página",

  // Legacy Sections
  "hero-left": "Hero (Izquierda) - Legacy",
  "hero-centered": "Hero (Centrado) - Legacy",
  "content-image": "Texto con Imagen - Legacy",
  "card-grid": "Cuadrícula de Tarjetas - Legacy",
  "value-cards": "Tarjetas de Valor - Legacy",
  "cta-section": "Llamada a la Acción - Legacy",
  "email-signup": "Formulario de Email - Legacy",
  "event-details": "Detalles del Evento - Legacy",
  "rich-text": "Texto Enriquecido",
  "wedding-hero": "Hero de Boda - Legacy",
  "countdown": "Contador - Legacy",
  "rsvp-form": "Formulario RSVP - Legacy",
  "faq": "FAQ - Legacy",
  "info-box": "Caja de Información",
  "registry": "Registro de Regalos - Legacy",
  "guest-resources": "Recursos para Invitados",
  "event-details-wedding": "Detalles del Evento (Boda) - Legacy",
  "events-calendar": "Calendario de Eventos",
};

/**
 * Section descriptions for CMS hints
 */
export const sectionDescriptions: Record<string, string> = {
  // Luxury Wedding Sections (V2)
  "luxury-hero": "Sección hero elegante con nombres de pareja, fecha y animación de scroll",
  "our-story": "Sección con foto de pareja y texto de vuestra historia de amor",
  "wedding-timeline": "Cronograma visual del día de la boda con iconos y animaciones",
  "venue-section": "Información del lugar con foto, mapa y detalles de transporte",
  "luxury-faq": "Acordeón elegante de preguntas frecuentes",
  "details-cards": "Tarjetas para código de vestimenta, niños y otros detalles",
  "luxury-countdown": "Cuenta regresiva elegante hasta el día de la boda",
  "gift-section": "Información sobre regalos y lista de bodas",
  "photo-sharing": "Sección para compartir fotos con hashtag de la boda",
  "luxury-rsvp": "Formulario elegante de confirmación de asistencia",
  "luxury-footer": "Pie de página con contacto, enlaces y redes sociales",

  // Legacy Sections
  "hero-left": "Banner hero con texto alineado a la izquierda",
  "hero-centered": "Banner hero con texto centrado",
  "content-image": "Contenido de texto con imagen lateral",
  "card-grid": "Cuadrícula de tarjetas con emoji y descripción",
  "value-cards": "Tarjetas de propuesta de valor",
  "cta-section": "Sección de llamada a la acción",
  "email-signup": "Formulario de suscripción por email",
  "event-details": "Tarjeta de información del evento",
  "rich-text": "Área de contenido markdown flexible",
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
  onCtaClick,
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

  // Add callback props for interactive sections
  const callbackProps: Record<string, unknown> = {};

  if ((type === "cta-section" || type === "hero-centered") && onCtaClick) {
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
