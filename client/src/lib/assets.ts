/**
 * Wedding Website Asset Paths
 *
 * Centralized management of all watercolor illustrations and visual assets.
 * Replace placeholder paths with actual transparent PNGs when ready.
 */

export const WATERCOLOR_ASSETS = {
  // Hero/Footer Elements
  skyline: '/images/watercolor/seville-skyline.png',

  // Decorative Elements
  orangeBranch: '/images/watercolor/orange-branch.png',
  oliveBranch: '/images/watercolor/olive-branch.png',
  azulejoTile: '/images/watercolor/azulejo-tile.png',

  // Functional Icons (watercolor style)
  iconAirplane: '/images/watercolor/olive-branch.png', // Using olive branch as travel/flight indicator
  iconHotelKey: '/images/watercolor/icon-hotel-key.png',
  iconChampagne: '/images/watercolor/icon-champagne.png',

  // Background Texture
  paperTexture: '/images/watercolor/paper-texture.png',
} as const;

/**
 * Placeholder data URLs for development
 * These will be replaced when actual transparent PNGs are added
 */
export const ASSET_PLACEHOLDERS = {
  skyline: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="900" height="300" viewBox="0 0 900 300"%3E%3Crect fill="%23F9F7F2" width="900" height="300"/%3E%3Ctext x="50%25" y="50%25" font-family="Playfair Display" font-size="20" fill="%239C7C58" text-anchor="middle" dy=".3em"%3ESeville Skyline Placeholder%3C/text%3E%3C/svg%3E',

  orangeBranch: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"%3E%3Crect fill="%23F9F7F2" width="200" height="200"/%3E%3Ccircle cx="100" cy="100" r="80" fill="%23D6966C" opacity="0.3"/%3E%3Ctext x="50%25" y="50%25" font-family="Lato" font-size="14" fill="%237A8B6E" text-anchor="middle" dy=".3em"%3EOrange Branch%3C/text%3E%3C/svg%3E',

  oliveBranch: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"%3E%3Crect fill="%23F9F7F2" width="300" height="200"/%3E%3Ctext x="50%25" y="50%25" font-family="Lato" font-size="14" fill="%237A8B6E" text-anchor="middle" dy=".3em"%3EOlive Branch%3C/text%3E%3C/svg%3E',

  azulejoTile: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"%3E%3Crect fill="%23F9F7F2" width="200" height="200"/%3E%3Cpattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"%3E%3Cpath d="M 20 0 L 0 0 0 20" fill="none" stroke="%239C7C58" stroke-width="0.5"/%3E%3C/pattern%3E%3Crect width="200" height="200" fill="url(%23grid)"/%3E%3Ctext x="50%25" y="50%25" font-family="Lato" font-size="14" fill="%239C7C58" text-anchor="middle" dy=".3em"%3EAzulejo Tile%3C/text%3E%3C/svg%3E',

  iconAirplane: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect fill="%23F9F7F2" width="100" height="100"/%3E%3Cpath d="M50 30 L70 50 L50 45 L30 50 Z" fill="%239C7C58"/%3E%3Ctext x="50%25" y="75" font-family="Lato" font-size="10" fill="%239C7C58" text-anchor="middle"%3EFlight%3C/text%3E%3C/svg%3E',

  iconHotelKey: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect fill="%23F9F7F2" width="100" height="100"/%3E%3Ccircle cx="35" cy="50" r="10" fill="none" stroke="%239C7C58" stroke-width="2"/%3E%3Cline x1="45" y1="50" x2="70" y2="50" stroke="%239C7C58" stroke-width="2"/%3E%3Ctext x="50%25" y="75" font-family="Lato" font-size="10" fill="%239C7C58" text-anchor="middle"%3EHotel%3C/text%3E%3C/svg%3E',

  iconChampagne: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect fill="%23F9F7F2" width="100" height="100"/%3E%3Cpath d="M40 30 L40 50 L35 60 L35 70 M60 30 L60 50 L65 60 L65 70" stroke="%23D6966C" stroke-width="2" fill="none"/%3E%3Ctext x="50%25" y="80" font-family="Lato" font-size="10" fill="%239C7C58" text-anchor="middle"%3ERSVP%3C/text%3E%3C/svg%3E',

  paperTexture: '',
} as const;

/**
 * Helper function to get asset path with fallback to placeholder
 * @param assetKey - Key from WATERCOLOR_ASSETS
 * @returns Asset path or placeholder if asset doesn't exist
 */
export function getAsset(assetKey: keyof typeof WATERCOLOR_ASSETS): string {
  // Use actual asset paths now that images are in place
  return WATERCOLOR_ASSETS[assetKey];
}

/**
 * Helper component props for watercolor assets
 */
export interface WatercolorAssetProps {
  src: string;
  alt: string;
  className?: string;
}
