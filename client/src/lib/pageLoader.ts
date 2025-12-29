/**
 * Page Loader - Load page data from CMS content files
 *
 * Uses Vite's import.meta.glob to dynamically load page JSON files.
 * This allows the landing page builder to work with any number of pages.
 */

import type { PageData } from "@/components/sections/types";

// Import all page JSON files using Vite's glob import
const pageModules = import.meta.glob<{ default: PageData }>(
  "/src/content/pages/*.json",
  { eager: true }
);

// Build a map of slug -> page data
const pages: Record<string, PageData> = {};

for (const path in pageModules) {
  const module = pageModules[path];
  if (module?.default) {
    const pageData = module.default;
    pages[pageData.slug] = pageData;
  }
}

/**
 * Get page data by slug
 * @param slug - The page slug (e.g., "home", "easter-egg-hunt")
 * @returns PageData if found, undefined otherwise
 */
export function getPageBySlug(slug: string): PageData | undefined {
  return pages[slug];
}

/**
 * Get all available page slugs
 * @returns Array of page slugs
 */
export function getAllPageSlugs(): string[] {
  return Object.keys(pages);
}

/**
 * Check if a page exists
 * @param slug - The page slug to check
 * @returns true if the page exists
 */
export function pageExists(slug: string): boolean {
  return slug in pages;
}
