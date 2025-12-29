/**
 * TypeScript interfaces for CMS content files
 * These types match the JSON structure in client/src/content/
 */

// Feature item with emoji and text (used in about, nursery)
export interface FeatureItem {
  emoji: string;
  text: string;
}

// Hero section content
export interface HeroContent {
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
}

// About section content
export interface AboutContent {
  title: string;
  description: string;
  image?: string;
  imageAlt: string;
  features: FeatureItem[];
}

// Experience card
export interface ExperienceCard {
  title: string;
  description: string;
  emoji: string;
  badgeText: string;
}

// Experiences section content
export interface ExperiencesContent {
  title: string;
  titleEmoji?: string;
  subtitle: string;
  cards: ExperienceCard[];
}

// Nursery section content
export interface NurseryContent {
  title: string;
  titleEmoji?: string;
  description: string;
  image?: string;
  imageAlt: string;
  features: FeatureItem[];
}

// Value proposition card
export interface ValueCard {
  title: string;
  description: string;
  emoji: string;
}

// Why Choose Us section content
export interface WhyChooseUsContent {
  title: string;
  titleEmoji?: string;
  cards: ValueCard[];
}

// Use case item
export interface UseCase {
  emoji: string;
  label: string;
}

// Partnerships section content
export interface PartnershipsContent {
  title: string;
  titleEmoji?: string;
  description: string;
  ctaButtonText: string;
  useCases: UseCase[];
}

// Email signup section content
export interface EmailSignupContent {
  title: string;
  titleEmoji?: string;
  description: string;
  buttonText: string;
  successTitle: string;
  successMessage: string;
}

// Audience segment for signup form
export interface AudienceSegment {
  value: string;
  emoji: string;
  label: string;
}

// Audience segments content
export interface AudienceSegmentsContent {
  segments: AudienceSegment[];
}

// Quick link item
export interface QuickLink {
  label: string;
  href: string;
}

// Footer content
export interface FooterContent {
  copyright: string;
  newsletterTitle: string;
  newsletterDescription: string;
  newsletterButtonText: string;
  quickLinks: QuickLink[];
}

// Site settings
export interface SiteSettings {
  siteName: string;
  siteTagline: string;
  contactEmail: string;
  location: string;
  openingYear: string;
  socialProofCount?: string;
}

// SEO settings
export interface SEOContent {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  shareImage?: string;
}
