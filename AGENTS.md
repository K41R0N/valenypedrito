# AGENTS.md - GreenLand Village Landing Page

> **Context file for AI agents working on this codebase**
> Last updated: December 2024

---

## Project Overview

**GreenLand Village** is a family-oriented interactive park coming to Parkland, Florida in 2025. This repository contains the landing page and supporting backend infrastructure for email list signups, user authentication, and future feature expansion.

### Business Purpose
- **Primary Goal**: Capture email signups for launch announcements
- **Secondary Goals**: Build brand awareness, communicate park vision, attract school/corporate partnerships
- **Target Audience**: Families with children, educators, event planners in South Florida

### Current Status
- Landing page: **Complete** (7 sections with full responsiveness)
- Email capture: **Frontend complete**, backend integration TODO
- Authentication: **Infrastructure ready**, not currently used on landing page
- Database: **Schema defined**, ready for email storage

---

## Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.1 | UI library |
| TypeScript | 5.9.3 | Type safety |
| Vite | 7.1.7 | Build tool & dev server |
| Tailwind CSS | 4.1.14 | Utility-first styling |
| shadcn/ui | - | 60+ accessible UI components |
| Radix UI | Various | Headless UI primitives |
| Wouter | 3.3.5 | Lightweight routing |
| React Hook Form | 7.64.0 | Form state management |
| React Query | 5.90.2 | Server state (via tRPC) |
| Framer Motion | 12.23.22 | Animations |
| Lucide React | 0.453.0 | Icons |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | LTS | Runtime |
| Express | 4.21.2 | HTTP server |
| tRPC | 11.6.0 | Type-safe RPC |
| Drizzle ORM | 0.44.5 | Database ORM |
| MySQL | 3.15.0 | Database driver |
| Jose | 6.1.0 | JWT handling |
| esbuild | 0.25.0 | Server bundler |

### Development
| Tool | Purpose |
|------|---------|
| pnpm | Package manager (v10.4.1) |
| Vitest | Unit testing |
| Prettier | Code formatting |
| tsx | TypeScript execution |

---

## Directory Structure

```
greenland-village-landing/
├── client/                          # React frontend
│   ├── public/                      # Static assets
│   │   ├── admin/                   # Decap CMS admin interface
│   │   │   ├── config.yml           # CMS content schema
│   │   │   └── index.html           # CMS entry point
│   │   ├── hero-illustration.png    # Desktop hero background
│   │   ├── hero-illustration-mobile.png  # Mobile hero background
│   │   ├── robots.txt               # SEO
│   │   └── sitemap.xml              # SEO
│   └── src/
│       ├── App.tsx                  # Router + providers
│       ├── main.tsx                 # Entry point + tRPC setup
│       ├── index.css                # Tailwind + brand tokens + animations
│       ├── _core/hooks/             # Auth hook
│       ├── components/
│       │   ├── ui/                  # 60+ shadcn/ui components
│       │   ├── Header.tsx           # Sticky navigation header
│       │   ├── PartnershipModal.tsx # Partnership inquiry modal
│       │   ├── illustrations/       # Custom SVG components
│       │   ├── StructuredData.tsx   # Schema.org SEO markup
│       │   └── ErrorBoundary.tsx    # Error fallback
│       ├── content/                 # CMS-editable JSON content files
│       │   ├── hero.json            # Hero section content
│       │   ├── about.json           # About section content
│       │   ├── experiences.json     # Experiences section content
│       │   ├── nursery.json         # Nursery section content
│       │   ├── why-choose-us.json   # Why Choose Us section content
│       │   ├── partnerships.json    # Partnerships section content
│       │   ├── email-signup.json    # Email signup section content
│       │   ├── settings.json        # Site-wide settings
│       │   ├── footer.json          # Footer content
│       │   └── seo.json             # SEO meta tags
│       ├── contexts/                # Theme context
│       ├── lib/                     # Utilities (cn, trpc)
│       └── pages/
│           └── Home.tsx             # Main landing page
│
├── server/                          # Express + tRPC backend
│   ├── _core/
│   │   ├── index.ts                 # Server entry point
│   │   ├── trpc.ts                  # tRPC setup + procedures
│   │   ├── context.ts               # Request context factory
│   │   ├── oauth.ts                 # OAuth callback handler
│   │   ├── cookies.ts               # Session cookie management
│   │   ├── sdk.ts                   # OAuth service + JWT
│   │   ├── env.ts                   # Environment variables
│   │   └── systemRouter.ts          # Health check + notifications
│   ├── routers.ts                   # App router definition
│   ├── db.ts                        # Database operations
│   └── storage.ts                   # Cloud storage helpers
│
├── shared/                          # Shared code
│   ├── types.ts                     # Unified type exports
│   ├── const.ts                     # Shared constants
│   └── _core/errors.ts              # HttpError classes
│
├── drizzle/                         # Database
│   ├── schema.ts                    # Users table
│   ├── relations.ts                 # Table relationships
│   └── migrations/                  # SQL migrations
│
├── Documentation
│   ├── AGENTS.md                    # This file
│   ├── todo.md                      # Development checklist
│   ├── logo_analysis.md             # Brand guidelines
│   └── homepage_review.md           # Design review notes
│
└── Config Files
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    ├── vitest.config.ts
    ├── drizzle.config.ts
    ├── components.json              # shadcn/ui config
    └── .prettierrc
```

---

## Design System

### Brand Identity
The design is based on the GreenLand Village logo featuring a friendly goat, sun, tree, and flowing green vines. The aesthetic is **playful, family-friendly, and organic** - intentionally NOT corporate.

### Color Palette (oklch color space)
```css
--brand-sunny-yellow: oklch(0.88 0.18 90);   /* #FFC107 - Primary accent, CTAs */
--brand-forest-green: oklch(0.35 0.12 145);  /* #1B5E20 - Dark text, headers */
--brand-vibrant-green: oklch(0.58 0.16 145); /* #2E7D32 - Primary green */
--brand-leaf-green: oklch(0.65 0.15 140);    /* #4CAF50 - Backgrounds */
--brand-light-green: oklch(0.72 0.12 140);   /* #81C784 - Highlights */
--brand-warm-brown: oklch(0.48 0.08 55);     /* #795548 - Accents */
--brand-cream: oklch(0.98 0.02 95);          /* #FFFEF5 - Warm white bg */
```

### Typography
- **Headings**: `Baloo 2` (cursive, playful, rounded)
- **Body**: `Nunito` (clean, friendly, readable)
- Fonts are loaded via Google Fonts

### Design Principles
1. **Organic shapes** - Rounded corners (`--radius: 1rem`), wavy dividers
2. **Playful animations** - Bounce, scale, slide effects on hover/scroll
3. **Emoji icons** - Used for quick visual recognition (decision documented in todo.md)
4. **Custom SVG illustrations** - GoatMascot, WavyDivider, LeafDecoration, VineDecoration, SunIcon
5. **Mobile-first** - Touch-friendly (44x44px minimum targets)

### Custom Animations
Defined in `client/src/index.css`:
- `slideInLeft` / `slideInRight` - Horizontal entrance
- `fadeInUp` - Vertical fade entrance
- `scaleIn` - Scale entrance
- `float` - Subtle floating effect

---

## Page Sections & Intentions

### Home.tsx Structure (815 lines)

#### 1. Hero Section (Lines 138-276)
**Purpose**: First impression, immediate email capture
**Key Features**:
- Separate background images for desktop/mobile
- Gradient overlays for text readability
- Inline email capture form (not just a CTA button)
- "Coming Soon 2025" badge for urgency

**Design Decision**: Form is embedded in hero for maximum conversion. Users can immediately sign up without scrolling.

#### 2. What is GreenLand Village (Lines 278-341)
**Purpose**: Explain the park concept
**Layout**: 50/50 split (text left, image right)
**Key Features**:
- 4 benefit items with emoji icons
- Scroll-triggered animations via Intersection Observer
- Stock photo with decorative green border

**Design Decision**: Uses emojis for icons rather than custom illustrations - tested both and emojis felt more authentic to the playful brand.

#### 3. Planned Experiences (Lines 348-423)
**Purpose**: Showcase what visitors can expect
**Layout**: 4-card responsive grid
**Cards**:
- Play & Adventure (🎢)
- Creative Studios (🎨)
- Animal Encounters (🐐)
- Family Fun (🎉)

**Key Features**:
- "Coming Soon" ribbon badges on each card
- Hover effects: lift, shadow, icon bounce
- Staggered entrance animations

**Design Decision**: Cards intentionally don't have real imagery yet since experiences are still being developed. Emojis serve as placeholders.

#### 4. Greenland Nursery (Lines 428-485)
**Purpose**: Highlight the on-site plant nursery as additional revenue stream
**Layout**: Reversed 50/50 (image left, text right) for visual variety

**Design Decision**: Mirrors Section 2 structure but flipped. Creates visual rhythm.

#### 5. Why GreenLand Village (Lines 487-556)
**Purpose**: Value propositions / differentiators
**Layout**: 4-card grid on bright yellow background
**Cards**:
- More Than Entertainment
- Designed for Families
- Community Focused
- A Unique Destination

**Design Decision**: Bright yellow background creates strong visual break and highlights importance.

#### 6. Schools, Events & Partnerships (Lines 558-608)
**Purpose**: B2B outreach for group bookings
**Key Features**:
- Use case icons with hover effects (Field Trips, Birthday Parties, Corporate Events, Community Gatherings)
- Partnership CTA button
- Goat mascot decoration

**Design Decision**: Separate section for B2B to avoid diluting consumer messaging.

#### 7. Stay Connected / Email Capture (Lines 610-737)
**Purpose**: Second email capture opportunity for users who scrolled
**Key Features**:
- Full form with optional "I am a:" dropdown for segmentation
- Social proof ("Join 200+ families")
- Success state with confirmation message

**Design Decision**: Duplicates hero form functionality. Users who scroll past hero without signing up get another chance. Form state is shared between both forms.

#### 8. Footer (Lines 739-811)
**Purpose**: Contact info, navigation, social links
**Layout**: 4-column grid
**Key Features**:
- Quick links to page sections
- Social media icons (currently emoji placeholders)
- "Join Mailing List" CTA scrolls to email form

---

## Design Patterns

### API Layer - tRPC
```typescript
// Type-safe RPC with automatic TypeScript inference
// Server: server/_core/trpc.ts
publicProcedure    // No auth required
protectedProcedure // Requires authenticated user
adminProcedure     // Requires admin role

// Client: client/src/lib/trpc.ts
// Uses httpBatchLink with SuperJSON transformer
```

### Authentication Flow
```
1. User clicks login → OAuth portal
2. OAuth redirects to /api/oauth/callback with code
3. Server exchanges code for token
4. Server upserts user to database
5. Server creates JWT, sets HttpOnly cookie
6. User redirected to homepage
```

### State Management
- **Server state**: React Query (via tRPC integration)
- **Form state**: React Hook Form + useState
- **Theme state**: React Context (ThemeContext)
- **Scroll animations**: Intersection Observer + useState

### Component Architecture
- **UI primitives**: shadcn/ui components in `components/ui/`
- **Page components**: `pages/` directory
- **Feature components**: Root of `components/` directory
- **Styling**: Tailwind utilities + cn() for conditional classes

### Database Pattern
```typescript
// Lazy connection pattern
export const getDb = () => {
  if (!db) db = drizzle(connection);
  return db;
};

// Upsert pattern for OAuth
export const upsertUser = async (data) => {
  // Check if exists, update or insert
};
```

---

## Content Management System (Decap CMS)

### Overview
The site uses **Decap CMS** (formerly Netlify CMS) for content management. This allows non-technical users to edit page content through a web-based admin interface at `/admin`.

### Architecture
- **Git-based**: Content is stored as JSON files in `client/src/content/`
- **No database needed**: Changes are committed directly to the Git repository
- **Authentication**: Uses Netlify Identity for user management

### Content Files
| File | Section | Editable Fields |
|------|---------|-----------------|
| `hero.json` | Hero | headline, subheadline, description, CTA text, social proof |
| `about.json` | About | title, description, feature list with emojis |
| `experiences.json` | Experiences | title, subtitle, experience cards |
| `nursery.json` | Nursery | title, description, image, features |
| `why-choose-us.json` | Why Choose Us | title, value cards |
| `partnerships.json` | Partnerships | title, description, use cases, CTA button |
| `email-signup.json` | Email Signup | title, description, social proof, success messages |
| `settings.json` | Site Settings | site name, contact email, location, opening year |
| `footer.json` | Footer | copyright, newsletter text, quick links |
| `seo.json` | SEO | meta title, description, keywords, share image |

### How Content is Loaded
```typescript
// Content is imported directly as JSON modules
import heroContent from "@/content/hero.json";
import aboutContent from "@/content/about.json";

// Used directly in JSX
<h1>{heroContent.headline}</h1>
<p>{aboutContent.description}</p>
```

### CMS Admin Setup
1. Deploy to Netlify
2. Enable Netlify Identity in site settings
3. Enable Git Gateway in Identity settings
4. Invite editors via Netlify Identity
5. Editors access `/admin` to log in and edit content

### Editorial Workflow
1. Editor logs in at `/admin`
2. Edits content in the visual interface
3. Saves changes (commits to Git)
4. Site rebuilds automatically with new content

### Configuration
- CMS config: `client/public/admin/config.yml`
- Netlify config: `netlify.toml`
- Identity widget: Included in `client/index.html`

---

## Development Setup

### Prerequisites
- Node.js LTS
- pnpm 10.4.1+
- MySQL 5.7+ (optional - app works without DB)

### Environment Variables
```env
# Database (optional)
DATABASE_URL=mysql://user:pass@host:3306/database

# OAuth (optional - for authentication)
VITE_OAUTH_PORTAL_URL=https://oauth.example.com
VITE_APP_ID=your-app-id
OAUTH_SERVER_URL=https://oauth-server.example.com
JWT_SECRET=your-secret-key
OWNER_OPEN_ID=admin-user-id

# Node
NODE_ENV=development|production
PORT=3000
```

### Commands
```bash
# Install dependencies
pnpm install

# Development (with hot reload)
pnpm dev

# Type checking
pnpm check

# Format code
pnpm format

# Run tests
pnpm test

# Production build
pnpm build

# Start production server
pnpm start

# Database migrations
pnpm db:push
```

### Path Aliases
```typescript
@/*       → ./client/src/*
@shared/* → ./shared/*
@assets/* → ./attached_assets/*
```

---

## Key Files Reference

| File | Purpose | When to Modify |
|------|---------|----------------|
| `client/src/pages/Home.tsx` | Main landing page | Layout, new sections |
| `client/src/content/*.json` | CMS content files | Edit via CMS at /admin |
| `client/public/admin/config.yml` | CMS content schema | Adding new editable fields |
| `client/src/index.css` | Styles, animations, tokens | Brand colors, new animations |
| `server/_core/index.ts` | Server entry | Routes, middleware |
| `server/routers.ts` | API routes | New tRPC procedures |
| `server/newsletterRouter.ts` | Email subscription API | Mailchimp integration |
| `server/db.ts` | Database operations | New queries |
| `drizzle/schema.ts` | Database schema | New tables |
| `client/src/components/ui/` | UI components | Rarely - use as-is |
| `netlify.toml` | Netlify build/deploy config | Build settings, redirects |

---

## TODOs & Extension Points

### Immediate TODOs
- [ ] Connect email forms to Mailchimp API (newsletterRouter.ts has stub)
- [ ] Set up Mailchimp API key and list ID environment variables
- [ ] Deploy to Netlify and enable Identity + Git Gateway
- [ ] Add skip-to-content link for accessibility

### Completed Recently
- [x] Decap CMS setup with all content sections editable
- [x] Sticky navigation header with mobile menu
- [x] Partnership inquiry modal
- [x] Separated hero vs bottom email form states
- [x] Newsletter tRPC router with validation

### Future Features (Infrastructure Ready)
- Email list storage (add `emails` table to schema)
- User dashboard (DashboardLayout component exists)
- AI chat integration (AIChatBox component exists)
- Map integration (Map component exists)
- LLM/Image generation (server stubs exist)

### Code Locations for Common Tasks

**Add new email list table:**
```typescript
// drizzle/schema.ts
export const emailSubscribers = mysqlTable("email_subscribers", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  firstName: varchar("firstName", { length: 100 }),
  category: varchar("category", { length: 50 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
```

**Add email submission endpoint:**
```typescript
// server/routers.ts
emailRouter: {
  subscribe: publicProcedure
    .input(z.object({
      email: z.string().email(),
      firstName: z.string().min(1),
      category: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      // Insert to database
    }),
}
```

---

## Code Style Guidelines

### TypeScript
- Strict mode enabled
- Use explicit types for function parameters
- Prefer interfaces for object shapes

### React
- Functional components with hooks
- Use shadcn/ui components when possible
- Keep pages in `pages/`, reusable components in `components/`

### Styling
- Tailwind utilities preferred
- Custom CSS in `index.css` only when necessary
- Use `cn()` utility for conditional classes
- Mobile-first breakpoints (base → md → lg)

### Formatting
- Prettier with 80 char width
- 2-space indentation
- Semicolons enabled
- Double quotes for strings

---

## Troubleshooting

### Common Issues

**Port already in use:**
The server automatically finds an available port starting from 3000.

**Database connection fails:**
The app works without a database. Auth features will be disabled but the landing page functions normally.

**Images not loading:**
Check that `hero-illustration.png` and `hero-illustration-mobile.png` exist in `client/public/`.

**Build fails:**
Run `pnpm check` to identify TypeScript errors.

---

## Related Documentation

- `todo.md` - Development checklist with completion status
- `logo_analysis.md` - Brand guidelines extracted from logo
- `homepage_review.md` - Detailed section-by-section review

---

## Session Change Log (December 27, 2024)

The following changes were made during this session and may require updates to the Decap CMS configuration (`client/public/admin/config.yml`) to reflect:

### Hero Section Redesign

1. **Background Images Updated**
   - `hero.json` now uses `backgroundDesktop` and `backgroundMobile` fields with local paths:
     - `/images/hero-desktop-v2.png`
     - `/images/hero-mobile-v2.png`
   - **CMS Update Needed**: Add fields for `backgroundDesktop` and `backgroundMobile` in the hero collection

2. **Green Gradient Overlay Removed**
   - The semitransphant green gradient overlays in `Home.tsx` were deleted
   - Hero images are now fully visible without overlay

3. **"True Sticker" Text Effect**
   - New CSS class `.text-sticker` in `index.css` using `paint-order` and `text-stroke`
   - Applied to hero headlines and body text for die-cut sticker look
   - White 8px stroke behind text with drop shadow

4. **Sticker Character Composition (Desktop Only)**
   - Added 4 sticker characters in new `client/public/images/stickers/` directory:
     - `sticker-sun.png` - Top right, slow spin animation
     - `sticker-goat.png` - Right side, float animation
     - `sticker-flower-1.png` and `sticker-flower-2.png` - Bottom right, float animations
   - Hidden on mobile (`hidden md:block`)

### Header/Navigation Updates

1. **Logo Replacement**
   - Text "GREENLAND VILLAGE" replaced with `logo.svg` image
   - `client/public/logo.svg` - custom logo asset
   - Significantly larger: `h-20 md:h-32`

2. **Navigation Visibility**
   - Nav link text color changed to Forest Green (`#1B5E20`) always
   - Added pill-shaped hover effects (`bg-white/50 rounded-full`)
   - Mobile menu icon updated to Forest Green and larger (`w-8 h-8`)

3. **Hero Breathing Room**
   - Increased hero top padding: `pt-32 md:pt-24`

### Section Image Updates

1. **"What is GreenLand Village?" Section**
   - `about.json` image path updated to `/about-image.png`
   - Frame styling (green background, rounded corners) removed from `Home.tsx`

2. **"Greenland Nursery" Section**
   - `nursery.json` image path updated to `/nursery-image.png`
   - Frame styling removed from `Home.tsx`
   - **CMS Update Needed**: Ensure nursery image field allows local paths

### New Assets Added to `client/public/`

| Asset | Description |
|-------|-------------|
| `logo.svg` | Primary site logo |
| `about-image.png` | What is GreenLand Village section image |
| `nursery-image.png` | Greenland Nursery section image |
| `favicon.png` | Custom favicon |
| `images/hero-desktop-v2.png` | Desktop hero background |
| `images/hero-mobile-v2.png` | Mobile hero background |
| `images/stickers/sticker-sun.png` | Sun character sticker |
| `images/stickers/sticker-goat.png` | Goat mascot sticker |
| `images/stickers/sticker-flower-1.png` | Flower character #1 |
| `images/stickers/sticker-flower-2.png` | Flower character #2 |

### Decap CMS Configuration Checklist

The following fields in `client/public/admin/config.yml` may need updates:

- [ ] **hero collection**: Add `backgroundDesktop` and `backgroundMobile` image fields
- [ ] **about collection**: Ensure `image` field supports local file paths
- [ ] **nursery collection**: Ensure `image` field supports local file paths
- [ ] Consider adding media_folder configuration for sticker assets if editors need to manage them

### Favicon

- Added `<link rel="icon" type="image/png" href="/favicon.png" />` to `client/index.html`
- Custom PNG favicon at `client/public/favicon.png`

---

*This file should be updated when significant architectural changes are made or new patterns are introduced.*
