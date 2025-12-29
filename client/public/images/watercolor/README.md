# Watercolor Assets

This directory contains transparent PNG watercolor illustrations for the wedding website.

## Required Assets

### 1. Hero/Footer Elements
- **`seville-skyline.png`** - Panoramic Seville skyline (3:1 aspect ratio)
  - Features: Giralda tower, Cathedral, Torre del Oro, Triana Bridge
  - Usage: Fixed at bottom of viewport in Hero or Footer
  - Style: Watercolor, fades into cream background

### 2. Decorative Elements
- **`orange-branch.png`** - Seville orange tree branch (1:1 aspect ratio)
  - Features: Sage green leaves, white blossoms, terracotta orange
  - Usage: Section decoration, breaks up text areas

- **`olive-branch.png`** - Spanish olive branch (3:2 aspect ratio)
  - Features: Silver-green leaves, small olives
  - Usage: Subtle separator between sections

- **`azulejo-tile.png`** - Spanish ceramic tile pattern (1:1 aspect ratio)
  - Features: Traditional Moorish geometric pattern
  - Colors: Antique blue, bronze, burnt orange
  - Usage: Corner decorations or repeating patterns

### 3. Functional Icons
- **`icon-airplane.png`** - Vintage airplane silhouette (1:1 aspect ratio)
  - Colors: Antique bronze and charcoal
  - Usage: Travel/flights section indicator

- **`icon-hotel-key.png`** - Antique skeleton key (1:1 aspect ratio)
  - Color: Antique bronze
  - Usage: Hotels/accommodation section indicator

- **`icon-champagne.png`** - Champagne flutes clinking (1:1 aspect ratio)
  - Colors: Soft gold and warm grey
  - Usage: RSVP/toast section indicator

### 4. Background
- **`paper-texture.png`** - Antique cream paper texture (16:9 aspect ratio)
  - Usage: Subtle background overlay (optional)
  - Style: Mimics expensive wedding stationery

## Technical Requirements

All images should be:
- **Format**: PNG with transparency
- **Background**: Transparent (white removed)
- **Quality**: High resolution (at least 2x for retina displays)
- **Optimization**: Compressed for web (use TinyPNG or similar)

## CSS Implementation

All watercolor assets automatically receive the bronze drop shadow via the `.watercolor-asset` class:

```css
.watercolor-asset {
  filter: drop-shadow(0px 4px 6px rgba(156, 124, 88, 0.15));
}
```

## Placeholder Status

All assets are currently using placeholder paths. Replace with final transparent PNGs when ready.
