/**
 * Section Types for Landing Page Builder
 *
 * Each section type defines:
 * - The content fields editable in the CMS
 * - Props passed to the React component
 *
 * HOW TO ADD A NEW SECTION:
 * 1. Define the content type interface below
 * 2. Add to SectionType union
 * 3. Create the component in this folder
 * 4. Register in index.ts
 * 5. Add to CMS config.yml under pages collection types
 */

// ============================================================================
// Hero Sections
// ============================================================================

export interface HeroLeftContent {
  headline: string;
  headlineSecondary: string;
  subheadline: string;
  description: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
  badgeText: string;
  backgroundDesktop?: string;
  backgroundMobile?: string;
  successTitle: string;
  successMessage: string;
  showEmailForm?: boolean;
  showSocialProof?: boolean;
}

export interface HeroCenteredContent {
  headline: string;
  headlineSecondary?: string;
  subheadline: string;
  description?: string;
  ctaButtonText: string;
  ctaButtonLink?: string;
  backgroundDesktop?: string;
  backgroundMobile?: string;
  badgeText?: string;
}

// ============================================================================
// Content Sections
// ============================================================================

export interface ContentImageContent {
  title: string;
  titleEmoji?: string;
  description?: string;
  content?: string;
  image: string;
  imageAlt: string;
  imagePosition: "left" | "right";
  features?: Array<{
    emoji: string;
    text: string;
  }>;
  backgroundColor?: "cream" | "green" | "yellow" | "white";
}

export interface CardGridContent {
  title: string;
  titleEmoji?: string;
  subtitle?: string;
  cards: Array<{
    emoji: string;
    title: string;
    description: string;
    badgeText?: string;
  }>;
  backgroundColor?: "green" | "cream" | "yellow" | "dark-green";
  columns?: 2 | 3 | 4;
}

export interface ValueCardsContent {
  title: string;
  titleEmoji?: string;
  cards: Array<{
    emoji: string;
    title: string;
    description: string;
  }>;
  backgroundColor?: "yellow" | "green" | "cream";
  columns?: 2 | 3 | 4;
}

export interface CTASectionContent {
  title: string;
  titleEmoji?: string;
  description: string;
  ctaButtonText: string;
  ctaButtonAction?: "modal" | "link" | "scroll";
  ctaButtonLink?: string;
  useCases?: Array<{
    emoji: string;
    label: string;
  }>;
  backgroundColor?: "dark-green" | "green" | "yellow" | "cream" | "beige" | "bronze" | "sage";
}

export interface EmailSignupContent {
  title: string;
  titleEmoji?: string;
  description: string;
  buttonText: string;
  successTitle: string;
  successMessage: string;
  showSegmentation?: boolean;
  showSocialProof?: boolean;
  backgroundColor?: "green-gradient" | "cream" | "white";
}

// ============================================================================
// Event-Specific Sections (New)
// ============================================================================

export interface EventDetailsContent {
  title: string;
  titleEmoji?: string;
  eventDate: string;
  eventTime?: string;
  location: string;
  mapLink?: string;
  price?: string;
  registrationDeadline?: string;
  description?: string;
  backgroundColor?: "cream" | "white" | "green";
}

export interface RichTextContent {
  title?: string;
  titleEmoji?: string;
  body: string; // Markdown/HTML content
  backgroundColor?: "cream" | "white" | "green";
}

// ============================================================================
// Wedding-Specific Sections
// ============================================================================

export interface WeddingHeroContent {
  brideName: string;
  groomName: string;
  announcement: string;
  date: string;
  venue: string;
  location: string;
  backgroundImage?: string;
  skylinePosition: "bottom" | "footer";
  showCountdown?: boolean;
}

export interface CountdownContent {
  title: string;
  weddingDate: string;
  backgroundColor?: "cream" | "beige" | "white";
  decorativeElement?: "none" | "orange-branch" | "olive-branch" | "azulejo";
}

export interface EventDetailsWeddingContent {
  title: string;
  subtitle?: string;
  timeline: Array<{
    time: string;
    event: string;
    description?: string;
    icon: "church" | "champagne" | "dinner" | "music" | "custom";
  }>;
  venueAddress: string;
  showMap?: boolean;
  mapLatitude?: string;
  mapLongitude?: string;
  parkingInfo?: string;
  transportInfo?: string;
  backgroundColor?: "cream" | "beige" | "white";
}

export interface RSVPFormContent {
  title: string;
  subtitle?: string;
  formIntro: string;
  rsvpDeadline: string;
  mealOptions: Array<{
    value: string;
    label: string;
    description?: string;
  }>;
  askDietaryRestrictions?: boolean;
  askPlusOne?: boolean;
  decorativeIcon?: "champagne" | "none";
  backgroundColor?: "cream" | "beige" | "white";
}

export interface GuestResourcesContent {
  title: string;
  subtitle?: string;
  sections: Array<{
    sectionTitle: string;
    icon: "hotel" | "airplane" | "car" | "info";
    content: string; // Markdown
    recommendations?: Array<{
      name: string;
      description: string;
      link?: string;
      phone?: string;
    }>;
  }>;
  backgroundColor?: "cream" | "beige" | "white";
}

export interface FAQContent {
  title: string;
  subtitle?: string;
  questions: Array<{
    question: string;
    answer: string;
  }>;
  backgroundColor?: "cream" | "beige" | "white";
}

export interface EventsCalendarContent {
  title: string;
  subtitle?: string;
  events: Array<{
    eventName: string;
    date: string;
    location: string;
    description: string;
    addToCalendar?: boolean;
    requiresRSVP?: boolean;
  }>;
  backgroundColor?: "cream" | "beige" | "white";
}

export interface InfoBoxContent {
  title: string;
  content: string; // Markdown
  icon?: "info" | "heart" | "star" | "custom";
  style?: "highlight" | "normal";
  backgroundColor?: "cream" | "beige" | "white";
}

export interface RegistryContent {
  title: string;
  message?: string;
  registryLinks: Array<{
    storeName: string;
    storeUrl: string;
    storeImage?: string;
  }>;
  showCashOption?: boolean;
  cashMessage?: string;
  backgroundColor?: "cream" | "beige" | "white";
}

// ============================================================================
// Section Wrapper Types
// ============================================================================

// Base section properties shared by all sections
interface SectionBase {
  sectionId?: string; // Optional custom anchor ID for the section
}

// Flat section types - fields are at the same level as `type`
// This matches Decap CMS variable types output format
export type SectionType =
  | ({ type: "hero-left" } & HeroLeftContent & SectionBase)
  | ({ type: "hero-centered" } & HeroCenteredContent & SectionBase)
  | ({ type: "content-image" } & ContentImageContent & SectionBase)
  | ({ type: "card-grid" } & CardGridContent & SectionBase)
  | ({ type: "value-cards" } & ValueCardsContent & SectionBase)
  | ({ type: "cta-section" } & CTASectionContent & SectionBase)
  | ({ type: "email-signup" } & EmailSignupContent & SectionBase)
  | ({ type: "event-details" } & EventDetailsContent & SectionBase)
  | ({ type: "rich-text" } & RichTextContent & SectionBase)
  // Wedding sections
  | ({ type: "wedding-hero" } & WeddingHeroContent & SectionBase)
  | ({ type: "countdown" } & CountdownContent & SectionBase)
  | ({ type: "event-details-wedding" } & EventDetailsWeddingContent & SectionBase)
  | ({ type: "rsvp-form" } & RSVPFormContent & SectionBase)
  | ({ type: "guest-resources" } & GuestResourcesContent & SectionBase)
  | ({ type: "faq" } & FAQContent & SectionBase)
  | ({ type: "events-calendar" } & EventsCalendarContent & SectionBase)
  | ({ type: "info-box" } & InfoBoxContent & SectionBase)
  | ({ type: "registry" } & RegistryContent & SectionBase);

// ============================================================================
// Page Structure
// ============================================================================

export interface PageData {
  title: string;
  slug: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords?: string;
    shareImage?: string;
  };
  sections: SectionType[];
}

// ============================================================================
// Global Components (not part of page sections array)
// ============================================================================

/**
 * HOW TO CREATE A GLOBAL SECTION:
 *
 * Global sections are components that appear on ALL pages (like header/footer).
 * They are NOT part of the page's sections[] array.
 *
 * To create a new global section:
 * 1. Create content file in client/src/content/global/
 * 2. Add to CMS config.yml under "settings" collection (file-based)
 * 3. Import directly in page layout/renderer, not via section registry
 * 4. Example: header.json and footer.json are global sections
 */

export interface HeaderContent {
  navItems: Array<{
    label: string;
    href: string;
    isModal?: boolean;
  }>;
  ctaButtonText: string;
}

export interface FooterContent {
  copyright: string;
  newsletterTitle: string;
  newsletterDescription: string;
  newsletterButtonText: string;
  quickLinks: Array<{
    label: string;
    href: string;
  }>;
}
