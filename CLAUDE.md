# Wedding Website for Valentina Osorio & Pedro Juan Zuleta

## Project Overview

This is a wedding website for Valentina Osorio and Pedro Juan Zuleta's wedding on **September 23, 2026** at **Hacienda la Soledad, Sevilla, España**.

**CRITICAL:** This project was converted from a Greenland Village family park website. Many Greenland design elements, styles, and components still remain and MUST be removed/redesigned according to the wedding design guidelines below.

## Essential Context Files

You MUST read and reference these files before making any design changes:

1. **`Wedding Brand Bible.pdf`** - Complete design system with:
   - Andalusian Romance theme
   - Color palette (Antique Cream, Sevilla Bronze, Watercolor Sage, etc.)
   - Typography (Pinyon Script, Playfair Display, Lato)
   - Visual style guidelines
   - Illustration style (watercolor with drop shadows)

2. **`Boda Valen y Pedrito.pdf`** - Wedding details and content requirements:
   - Timeline of events
   - Venue information
   - Guest information needs
   - Children policy
   - Dress code
   - FAQ content
   - Registry information

3. **`client/public/images/watercolor/`** - All visual assets:
   - Seville skyline
   - Orange and olive branches
   - Azulejo tile patterns
   - Travel/accommodation icons
   - Paper texture
   - All images should have watercolor aesthetic with drop shadows

## What We've Accomplished So Far

### ✅ Completed
- [x] Removed backend complexity (MySQL, Drizzle, tRPC)
- [x] Configured Netlify Forms for RSVP
- [x] Updated all SEO metadata to Spanish wedding content
- [x] Created 9 wedding-specific section components
- [x] Configured Sveltia CMS with Spanish labels
- [x] Updated global content files (settings, contact, header, footer, seo)
- [x] Created homepage with Spanish content matching PDF requirements
- [x] Fixed all Greenland references in config files
- [x] Changed favicon to heart emoji
- [x] Moved all watercolor assets to correct locations
- [x] Set up git repository and pushed to GitHub

### ⚠️ CRITICAL ISSUES - MUST FIX

**Many Greenland design elements remain throughout the codebase. These MUST be removed:**

#### 1. **Color Palette Issues**
Current problem: Many components still use Greenland's green color scheme.

**Files with Greenland colors that MUST be updated:**
- `client/src/components/sections/ContentImage.tsx` - Lines 11-14, 47-48, 52, 62, 68, 86, 90-91, 104
  - Uses `#1B5E20` (Greenland green) - REMOVE
  - Uses `#FFC107` (Greenland yellow) - REMOVE
  - Uses `#4CAF50` (Greenland bright green) - REMOVE
  - Uses `#E8F5E9`, `#C8E6C9` (Greenland light greens) - REMOVE

**REPLACE WITH Wedding Brand Bible colors:**
```css
--antique-cream: #F9F7F2;
--warm-beige: #F0EBE0;
--soft-charcoal: #2C2C2C;
--stone-grey: #595959;
--sevilla-bronze: #9C7C58;
--watercolor-sage: #7A8B6E;
--rooftop-clay: #D6966C;
```

#### 2. **Typography Issues**
Current problem: Greenland font styles and sizes still in use.

**MUST use Wedding Brand Bible typography:**
- **Script (decorative)**: Pinyon Script - For couple names, elegant headings
- **Serif (headings)**: Playfair Display - UPPERCASE with letter-spacing: 0.1em
- **Sans-serif (body)**: Lato, weight 300 - For all body text

**Files to check:**
- All section components in `client/src/components/sections/`
- Look for `font-heading` classes that don't use the wedding fonts
- Remove any references to Baloo 2, Nunito, or other Greenland fonts

#### 3. **Visual Style Issues**
Current problem: Greenland's playful, bright, kid-friendly aesthetic conflicts with wedding elegance.

**REMOVE these design elements:**
- Bright green/yellow backgrounds
- Playful rounded corners and bubbly styles
- Comic-style illustrations
- Family park iconography
- Goat/animal themed decorations

**REPLACE with Wedding Brand Bible style:**
- Subtle, elegant backgrounds (cream, beige, white)
- Sharp corners (border-radius: 0)
- Watercolor illustrations with drop shadows
- Andalusian/Spanish cultural elements
- Romantic, classic, warm aesthetic

#### 4. **Component-Specific Issues**

**`ContentImage.tsx` (HIGH PRIORITY - completely wrong aesthetic):**
- Line 47: Green rounded badge - REMOVE, use elegant Playfair Display heading
- Lines 59-67: Bright green feature boxes with emojis - completely wrong style
- Lines 85-93: Leaf and sun decorative elements - replace with watercolor branches
- Entire component feels like a kids' park attraction - REDESIGN for wedding elegance

**`RichText.tsx` (needs redesign):**
- Lines 11-14: Greenland color scheme
- Line 52: Green badge style
- Line 62: Greenland prose styling

**Other sections to review:**
- `CardGrid.tsx` - Check for Greenland styling
- `ValueCards.tsx` - Likely has Greenland branding
- `EmailSignup.tsx` - May have Greenland colors/style
- `CTASection.tsx` - Review colors and typography

#### 5. **Illustration System**
Current problem: Mix of Greenland SVG illustrations and wedding watercolors.

**In `client/src/components/illustrations/index.tsx`:**
- Greenland SVG components (SunIcon, LeafDecoration, VineDecoration) - REMOVE or REDESIGN
- Replace with references to watercolor PNG assets
- All decorative elements should be from `/images/watercolor/` directory

## Design System Reference

### Color Usage Guidelines

**Primary backgrounds:**
- Antique Cream (`#F9F7F2`) - Main background, hero sections
- Warm Beige (`#F0EBE0`) - Alternating sections
- White - Clean sections, cards

**Text:**
- Soft Charcoal (`#2C2C2C`) - Headings
- Stone Grey (`#595959`) - Body text

**Accents:**
- Sevilla Bronze (`#9C7C58`) - Primary accent, links, CTAs
- Watercolor Sage (`#7A8B6E`) - Secondary accent, decorative elements
- Rooftop Clay (`#D6966C`) - Warm accents, highlights

### Typography Guidelines

```css
/* Script - For couple names and elegant decorative text */
.font-script {
  font-family: 'Pinyon Script', cursive;
  /* Use large sizes: 4rem - 9rem for hero names */
}

/* Serif - For section headings */
.font-serif {
  font-family: 'Playfair Display', serif;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  /* Sizes: 1.5rem - 3rem */
}

/* Body - For all content */
.font-body {
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  /* Size: 1rem - 1.125rem */
}
```

### Visual Asset Guidelines

**All decorative images MUST:**
- Be watercolor style (hand-painted aesthetic)
- Have subtle drop shadows: `filter: drop-shadow(0px 4px 6px rgba(156, 124, 88, 0.15))`
- Use `.watercolor-asset` class for consistent styling
- Source from `/images/watercolor/` directory

**Available watercolor assets:**
- `seville-skyline.png` - Hero footer element
- `orange-branch.png` - Section decorations
- `olive-branch.png` - Section decorations
- `azulejo-tile.png` - Seville tile patterns
- `icon-airplane.png`, `icon-hotel-key.png`, `icon-champagne.svg` - Functional icons
- `paper-texture.png` - Background texture (subtle)

### Border and Spacing

- **Border radius:** ALWAYS 0 (sharp corners for classic look)
- **Spacing:** Generous whitespace, elegant and breathable
- **Borders:** 1-2px solid in bronze/sage tones when needed

## Content Guidelines

### Language
- **All content MUST be in Spanish**
- Formal but warm tone
- Reference `Boda Valen y Pedrito.pdf` for accurate event details

### Key Information to Include
- Full names: Valentina Osorio & Pedro Juan Zuleta
- Date: Miércoles, 23 de Septiembre de 2026
- Venue: Hacienda la Soledad, Sevilla, España
- Timeline: 18:00 Ceremonia → 19:30 Cóctel → 21:00 Cena → 23:00 Fiesta
- Hashtag: #ValenYPedrito2026

## What Does NOT Belong on This Site

❌ **REMOVE/AVOID:**
- Anything related to family parks, playgrounds, activities
- Bright primary colors (greens, yellows, blues from Greenland)
- Playful, bouncy, kid-friendly aesthetics
- Comic-style or flat design illustrations
- Heavy rounded corners and bubbly shapes
- Animal mascots or child-focused imagery
- English language content (except in code)
- Database/backend features (use Netlify Forms)

✅ **KEEP/ADD:**
- Elegant, romantic, classic design
- Watercolor illustrations
- Spanish cultural elements (azulejo tiles, Seville references)
- Warm earth tones
- Sharp, clean lines
- Sophisticated typography hierarchy
- Spanish language throughout
- Static site simplicity

## Technical Stack

- **Frontend:** React 19.2.1, TypeScript 5.9.3, Vite 7.1.7
- **Styling:** Tailwind CSS 4.1.14 with custom wedding theme
- **CMS:** Sveltia CMS 0.125.0 (all content editable)
- **Forms:** Netlify Forms (no backend needed)
- **Routing:** Wouter 3.3.5
- **Deployment:** Netlify
- **Repository:** https://github.com/K41R0N/valenypedrito

## File Structure

```
client/
├── public/
│   ├── images/watercolor/        # All watercolor assets
│   ├── admin/                     # Sveltia CMS
│   └── favicon.svg               # Heart emoji
├── src/
│   ├── components/
│   │   ├── sections/             # Page section components
│   │   │   ├── WeddingHero.tsx   # Couple names + skyline
│   │   │   ├── Countdown.tsx     # Wedding countdown
│   │   │   ├── RSVPForm.tsx      # Netlify Forms RSVP
│   │   │   ├── FAQ.tsx           # Questions answered
│   │   │   ├── InfoBox.tsx       # Flexible info display
│   │   │   ├── Registry.tsx      # Gift registry
│   │   │   └── EventDetailsWedding.tsx  # Timeline + map
│   │   └── ui/                   # shadcn/ui components
│   ├── content/                  # JSON content files
│   │   ├── pages/home.json       # Homepage content
│   │   ├── settings.json         # Global wedding info
│   │   ├── seo.json             # SEO metadata
│   │   └── ...
│   ├── lib/
│   │   └── assets.ts            # Watercolor asset paths
│   └── index.css                # Wedding design system
```

## Next Steps for Design Completion

### Priority 1: Remove Greenland Colors and Styles
1. Search entire codebase for hex colors:
   - `#1B5E20`, `#4CAF50`, `#E8F5E9`, `#C8E6C9` (greens)
   - `#FFC107` (yellow)
2. Replace with wedding colors from design system
3. Update all component backgrounds to cream/beige/white

### Priority 2: Fix Typography
1. Audit all text elements for proper font usage
2. Ensure headings use Playfair Display with uppercase + letter-spacing
3. Ensure body text uses Lato weight 300
4. Fix any remaining Greenland font references

### Priority 3: Redesign Greenland Components
1. **ContentImage.tsx** - Complete redesign needed
   - Remove green badges and rounded boxes
   - Use elegant layout with watercolor decorations
   - Wedding-appropriate content display
2. **RichText.tsx** - Update color scheme
3. **CardGrid.tsx** - Wedding-appropriate card styling
4. Any other components that feel "park-like"

### Priority 4: Visual Consistency
1. Replace all SVG illustrations with watercolor PNG references
2. Ensure all images use `.watercolor-asset` class
3. Add paper texture backgrounds where appropriate
4. Border-radius: 0 everywhere

### Priority 5: Content Enhancement
1. Add more sections from PDF if needed
2. Ensure all Spanish content is accurate
3. Add Google Maps API key for venue map
4. Test RSVP form on Netlify deployment

## Commands Reference

```bash
# Development
npm run dev              # Start dev server (port 5174)

# Build
npm run build           # Production build

# Deploy
git add .
git commit -m "message"
git push origin main

# CMS
# Access at: http://localhost:5174/admin
# Production: https://yourdomain.netlify.app/admin
```

## Important Notes

- **CMS is fully configured** - All content is editable including images
- **Netlify Forms** - Form submissions go to Netlify dashboard after deployment
- **No database needed** - Pure static site with CMS
- **All content in Spanish** - Maintained throughout
- **Design system in** `client/src/index.css` - Global wedding theme variables

## Questions to Ask When Making Changes

Before modifying any component, ask:
1. Does this use Greenland colors? → Replace with wedding palette
2. Does this feel playful/kid-friendly? → Redesign for elegance
3. Is the typography correct? → Script/Serif/Lato only
4. Are decorations watercolor style? → Use assets from /images/watercolor/
5. Is content in Spanish? → All user-facing text must be Spanish
6. Does this match the Wedding Brand Bible? → Reference the PDF

## Success Criteria

The wedding website is complete when:
- [ ] Zero Greenland visual references remain
- [ ] All colors match Wedding Brand Bible exactly
- [ ] All typography uses correct wedding fonts
- [ ] All decorative elements are watercolor style
- [ ] Site feels elegant, romantic, and Spanish-inspired
- [ ] All content is in Spanish and accurate to PDF
- [ ] RSVP form works on Netlify
- [ ] CMS allows editing all content
- [ ] Mobile responsive and beautiful
- [ ] Loading performance is excellent

---

**Remember:** This is a sophisticated wedding website for a celebration in Sevilla, Spain. Every design decision should reflect elegance, romance, and Spanish cultural beauty - NOT a family park in Florida. When in doubt, reference the Wedding Brand Bible PDF.
