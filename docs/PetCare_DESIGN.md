# PetCare.ai Design Specification

> **Version**: 1.0
> **Date**: January 2026
> **Vibe**: Playful
> **Status**: Ready for Implementation

---

## Target Audience Analysis

Based on the PRD, the primary users are:
- **Young urban professionals** (25-35) who are first-time pet parents
- **Tier-2/3 city residents** (40-50) who prefer vernacular languages
- **Tech-savvy but not developers** - use WhatsApp daily, comfortable with UPI
- **Values**: Trust, instant access, affordability, emotional connection with pets

> These users respond to: friendly, approachable design with clear trust signals. They're anxious about pet health, so the UI must feel reassuring yet energetic.

---

## Design Inspiration

| Site | Why This Audience Loves It | What to Borrow |
|------|---------------------------|----------------|
| **Headspace** | Calming + playful wellness vibes | Rounded shapes, soft illustrations, gentle animations |
| **Practo** | Trusted healthcare in India | Trust badges, doctor cards, clean booking flow |
| **Dunzo** | Friendly Indian consumer app | Playful illustrations, vernacular feel, WhatsApp-like simplicity |
| **Chewy.com** | Pet-first, emotional connection | Pet imagery, warm colors, benefit-focused copy |
| **Zepto** | Modern Indian app, fast UX | Bold CTAs, minimal friction, mobile-first |

---

## Color Palette

```
┌─────────────────────────────────────────────────────────────────┐
│                    PETCARE.AI COLOR SYSTEM                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   PRIMARY         SECONDARY       ACCENT          SUCCESS       │
│   ┌────────┐      ┌────────┐      ┌────────┐      ┌────────┐   │
│   │        │      │        │      │        │      │        │   │
│   │ #6C5CE7│      │ #00B894│      │ #FDCB6E│      │ #00B894│   │
│   │        │      │        │      │        │      │        │   │
│   │ Purple │      │  Teal  │      │ Yellow │      │  Green │   │
│   └────────┘      └────────┘      └────────┘      └────────┘   │
│                                                                 │
│   ERROR           BACKGROUND      SURFACE         BORDER        │
│   ┌────────┐      ┌────────┐      ┌────────┐      ┌────────┐   │
│   │        │      │        │      │        │      │        │   │
│   │ #E74C3C│      │ #FEFFFE│      │ #FFFFFF│      │ #E8E8E8│   │
│   │        │      │        │      │        │      │        │   │
│   │  Red   │      │  Cream │      │  White │      │  Gray  │   │
│   └────────┘      └────────┘      └────────┘      └────────┘   │
│                                                                 │
│   TEXT PRIMARY: #2D3436 (Dark charcoal - friendly, not harsh)  │
│   TEXT SECONDARY: #636E72 (Muted gray for body text)           │
│   TEXT ON PRIMARY: #FFFFFF (White on purple buttons)           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Color Tokens

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#6C5CE7` | Buttons, links, active states |
| `primary-hover` | `#5B4BD5` | Button hover state |
| `primary-active` | `#4A3AC3` | Button active/pressed state |
| `primary-light` | `#F8F7FF` | Light purple backgrounds |
| `secondary` | `#00B894` | Success, vet-related, health |
| `secondary-hover` | `#00A383` | Secondary button hover |
| `accent` | `#FDCB6E` | Highlights, badges, warmth |
| `background` | `#FEFFFE` | Page background (soft cream) |
| `surface` | `#FFFFFF` | Cards, modals |
| `border` | `#E8E8E8` | Dividers, input borders |
| `text-primary` | `#2D3436` | Headings, important text |
| `text-secondary` | `#636E72` | Body text, descriptions |
| `success` | `#00B894` | Success states |
| `error` | `#E74C3C` | Error states |
| `whatsapp` | `#25D366` | WhatsApp CTA button |

### Color Rationale

- **Purple (#6C5CE7)**: Unique in Indian pet/health space (not the typical blue), conveys trust + innovation
- **Teal (#00B894)**: Healthcare association, success states, vet-related elements
- **Yellow (#FDCB6E)**: Playful accent for highlights, badges, friendly warmth
- **Cream background (#FEFFFE)**: Softer than pure white, easier on eyes, approachable

---

## Typography

### Font Families

| Family | Usage | Google Fonts |
|--------|-------|--------------|
| **Nunito** | Display, headings | `fonts.google.com/specimen/Nunito` |
| **Inter** | Body text, UI | `fonts.google.com/specimen/Inter` |

**Why Nunito?** Rounded terminals create a friendly, playful feel perfect for a pet brand.

### Type Scale (1.25 ratio)

| Name | Size | Line Height | Weight | Usage |
|------|------|-------------|--------|-------|
| `hero` | 48px | 56px | 800 | Hero headlines |
| `h1` | 40px | 48px | 700 | Section titles |
| `h2` | 32px | 40px | 700 | Feature headings |
| `h3` | 24px | 32px | 600 | Card titles |
| `body-lg` | 18px | 28px | 400 | Hero subtext, intros |
| `body` | 16px | 24px | 400 | Default paragraph |
| `small` | 14px | 20px | 400 | Captions, helper text |
| `label` | 12px | 16px | 600 | Tags, badges (uppercase) |

### Mobile Adjustments

| Name | Desktop | Mobile |
|------|---------|--------|
| `hero` | 48px | 32px |
| `h1` | 40px | 28px |
| `h2` | 32px | 24px |
| `h3` | 24px | 20px |

---

## Spacing System (8pt Grid)

| Token | Value | Usage |
|-------|-------|-------|
| `xs` | 4px | Tight gaps (icon + text) |
| `sm` | 8px | Internal component padding |
| `md` | 16px | Between related elements |
| `lg` | 24px | Component groups |
| `xl` | 32px | Section padding (mobile) |
| `2xl` | 48px | Section padding (desktop) |
| `3xl` | 64px | Major section gaps |
| `4xl` | 96px | Hero section padding |

### Layout Grid

| Breakpoint | Container | Columns | Gutter |
|------------|-----------|---------|--------|
| Mobile (<640px) | 100% - 32px | 4 | 16px |
| Tablet (640-1024px) | 100% - 48px | 8 | 24px |
| Desktop (>1024px) | 1200px max | 12 | 24px |

---

## Component Specifications

### Buttons

#### Primary Button

```
┌─────────────────────────────────────┐
│     Chat on WhatsApp                │
└─────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Height | 48px |
| Padding | 16px 32px |
| Border Radius | 24px (fully rounded) |
| Font | 16px / 600 weight |
| Background | `#6C5CE7` |
| Text Color | `#FFFFFF` |
| Shadow | `0 4px 14px rgba(108, 92, 231, 0.39)` |

**States:**
| State | Change |
|-------|--------|
| Hover | Background `#5B4BD5`, translateY(-2px) |
| Active | Background `#4A3AC3` |
| Focus | 2px outline `#A29BFE`, 2px offset |
| Disabled | Opacity 40%, cursor not-allowed |
| Loading | Spinner icon, text "Connecting..." |

#### Secondary Button

| Property | Value |
|----------|-------|
| Height | 48px |
| Border | 2px solid `#6C5CE7` |
| Background | transparent |
| Text Color | `#6C5CE7` |

**States:**
| State | Change |
|-------|--------|
| Hover | Background `#F8F7FF` |
| Active | Background `#EDE9FF` |

#### WhatsApp CTA (Special)

| Property | Value |
|----------|-------|
| Height | 56px |
| Background | `#25D366` |
| Border Radius | 28px |
| Icon | WhatsApp logo (left) |

### Cards

#### Feature Card

```
┌───────────────────────────────────────┐
│  [Icon]                               │
│                                       │
│  Feature Title                        │
│                                       │
│  Description text goes here           │
│  explaining the benefit.              │
└───────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Padding | 32px |
| Border Radius | 16px |
| Background | `#FFFFFF` |
| Shadow | `0 4px 6px -1px rgba(0,0,0,0.05)` |
| Icon Size | 48px |

**Hover:** `translateY(-4px)`, shadow increases

#### Vet Card

```
┌───────────────────────────────────────┐
│  [Avatar]  Dr. Name                   │
│            ⭐ 4.9 (234 consults)      │
│            City • Languages           │
│                                       │
│  🟢 Available      [Book ₹149]       │
└───────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Avatar | 64x64px, circular |
| Verified Badge | Teal checkmark |
| Status Dot | 8px, `#00B894` |
| Book Button | Secondary style |

#### Testimonial Card

| Property | Value |
|----------|-------|
| Padding | 32px |
| Border Radius | 16px |
| Background | `#FFFFFF` |
| Quote Mark | 48px, `#6C5CE7` opacity 20% |
| Avatar | 48px circular |
| Stars | `#FDCB6E` |

### Input Fields

#### Text Input

```
Phone Number
┌─────────────────────────────────┐
│ +91 │ 98765 43210               │
└─────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Height | 48px |
| Border | 1px solid `#E8E8E8` |
| Border Radius | 12px |
| Padding | 12px 16px |
| Font | 16px |
| Label | 14px / 600 weight, above |

**States:**
| State | Change |
|-------|--------|
| Focus | Border `#6C5CE7`, ring 2px `#F8F7FF` |
| Error | Border `#E74C3C`, red helper text |
| Success | Border `#00B894`, checkmark icon |
| Disabled | Background `#F5F5F5`, opacity 60% |

### Navigation

#### Desktop Navbar

| Property | Value |
|----------|-------|
| Height | 72px |
| Background | `#FFFFFF` |
| Shadow (on scroll) | `0 2px 4px rgba(0,0,0,0.05)` |
| Logo | 32px height |
| Nav Links | 16px, `#2D3436`, hover `#6C5CE7` |
| CTA Button | Small primary button |

#### Mobile Navbar

| Property | Value |
|----------|-------|
| Height | 64px |
| Hamburger | 24px, right side |
| Menu | Full-screen overlay, slide from right |

---

## Landing Page Sections

### 1. Hero Section

**Layout:** Two columns (60/40) on desktop, stacked on mobile

**Content:**
- **Headline:** "Your pet's health, one message away"
- **Subheadline:** "AI-powered vet triage via WhatsApp. Get answers in seconds, connect to vets in 2 minutes."
- **CTA:** WhatsApp button (green)
- **Trust Signal:** "10,000+ pet parents trust us" + 5 stars
- **Visual:** Illustration of happy dog with phone/chat bubbles

**Styling:**
- Background: Cream (`#FEFFFE`) with subtle paw pattern
- Padding: 96px top, 64px bottom (desktop)
- Animation: Illustration floats gently

### 2. Social Proof Bar

**Content:**
- Headline: "Trusted by pet parents across India"
- City badges: Bangalore, Mumbai, Delhi, Chennai, Hyderabad with user counts

**Styling:**
- Background: White
- Padding: 32px vertical

### 3. How It Works

**Layout:** 3-step horizontal flow (vertical on mobile)

**Steps:**
1. **Send Photo** - "via WhatsApp with symptoms"
2. **AI Triage** - "Get instant assessment"
3. **Vet Connect** - "Video call in 2 minutes"

**Styling:**
- Background: Light purple (`#F8F7FF`)
- Cards: White with icons
- Connectors: Arrows between steps

### 4. Features Grid

**Layout:** 2x2 grid (stacked on mobile)

**Features:**
1. **AI Health Scanner** - "Send a photo, get instant triage"
2. **24/7 Vet Access** - "Connect with verified vets anytime"
3. **Health Passport** - "All records in one place"
4. **Your Language** - "Hindi, Tamil, Telugu, Kannada"

**Styling:**
- Background: White
- Cards: Light colored backgrounds, colorful icons

### 5. Testimonials

**Layout:** Carousel with 3 testimonials

**Content:** Real quotes with:
- Quote text
- Name, city, pet breed
- Avatar photo
- 5-star rating

**Styling:**
- Background: Cream
- Auto-scroll with pause on hover

### 6. Pricing

**Layout:** 2-column cards

**Plans:**
1. **Pay Per Consult** - ₹149/session
2. **Pet Parent Plus** - ₹499/month (highlighted)

**Styling:**
- Background: Light purple
- Popular card: Purple border + "Most Popular" badge

### 7. Final CTA

**Content:**
- Headline: "Your pet deserves instant care"
- Subtext: "Try PetCare.ai free — first triage on us."
- CTA: WhatsApp button
- Trust: "No app download • No signup • Just message us"

**Styling:**
- Background: Gradient (purple to teal)
- Text: White

### 8. Footer

**Columns:**
- Product: Features, Pricing, For Vets
- Company: About, Careers, Blog
- Legal: Privacy, Terms, Refunds
- Connect: WhatsApp, Instagram, Twitter

**Bottom:**
- Copyright
- "Made with ❤️ in Bangalore"
- User count

---

## Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6C5CE7',
          hover: '#5B4BD5',
          active: '#4A3AC3',
          light: '#F8F7FF',
        },
        secondary: {
          DEFAULT: '#00B894',
          hover: '#00A383',
        },
        accent: '#FDCB6E',
        background: '#FEFFFE',
        surface: '#FFFFFF',
        border: '#E8E8E8',
        text: {
          primary: '#2D3436',
          secondary: '#636E72',
        },
        success: '#00B894',
        error: '#E74C3C',
        whatsapp: '#25D366',
      },
      fontFamily: {
        display: ['Nunito', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['48px', { lineHeight: '56px', fontWeight: '800' }],
        'h1': ['40px', { lineHeight: '48px', fontWeight: '700' }],
        'h2': ['32px', { lineHeight: '40px', fontWeight: '700' }],
        'h3': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'body': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'small': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'label': ['12px', { lineHeight: '16px', fontWeight: '600' }],
      },
      borderRadius: {
        'button': '24px',
        'button-sm': '12px',
        'card': '16px',
        'input': '12px',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
        'button': '0 4px 14px 0 rgba(108, 92, 231, 0.39)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
```

---

## CSS Variables (Alternative)

```css
:root {
  /* Colors */
  --color-primary: #6C5CE7;
  --color-primary-hover: #5B4BD5;
  --color-primary-active: #4A3AC3;
  --color-primary-light: #F8F7FF;
  --color-secondary: #00B894;
  --color-secondary-hover: #00A383;
  --color-accent: #FDCB6E;
  --color-background: #FEFFFE;
  --color-surface: #FFFFFF;
  --color-border: #E8E8E8;
  --color-text-primary: #2D3436;
  --color-text-secondary: #636E72;
  --color-success: #00B894;
  --color-error: #E74C3C;
  --color-whatsapp: #25D366;

  /* Typography */
  --font-display: 'Nunito', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;

  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  --space-4xl: 96px;

  /* Border Radius */
  --radius-button: 24px;
  --radius-card: 16px;
  --radius-input: 12px;

  /* Shadows */
  --shadow-card: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  --shadow-card-hover: 0 10px 15px -3px rgba(0, 0, 0, 0.08);
  --shadow-button: 0 4px 14px 0 rgba(108, 92, 231, 0.39);
}
```

---

## Responsive Breakpoints

| Name | Min Width | Usage |
|------|-----------|-------|
| `sm` | 640px | Large phones, small tablets |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large screens |

---

## Accessibility Checklist

- [ ] Color contrast ratio ≥ 4.5:1 for text
- [ ] Focus states visible on all interactive elements
- [ ] Alt text for all images
- [ ] Semantic HTML (nav, main, section, article)
- [ ] Skip to content link
- [ ] Form labels associated with inputs
- [ ] Error messages announced to screen readers
- [ ] Touch targets ≥ 44x44px on mobile

---

## Animation Guidelines

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Button hover | Scale + shadow | 150ms | ease-out |
| Card hover | translateY + shadow | 200ms | ease-out |
| Hero illustration | Float | 3s | ease-in-out |
| Page transitions | Fade | 300ms | ease |
| Loading spinner | Rotate | 1s | linear |

**Principles:**
- Keep animations subtle and purposeful
- Respect `prefers-reduced-motion`
- Use hardware-accelerated properties (transform, opacity)

---

## Icon System

**Recommended:** Phosphor Icons (playful, rounded style)
- Website: `phosphoricons.com`
- Style: Regular weight
- Size: 24px default, 20px small, 32px large

**Key Icons:**
| Icon | Usage |
|------|-------|
| `PawPrint` | Logo, pet-related |
| `ChatCircle` | WhatsApp, messaging |
| `FirstAid` | Health, emergency |
| `Video` | Video call |
| `Calendar` | Appointments |
| `Star` | Ratings |
| `Check` | Success, verified |
| `Warning` | Alerts |

---

## Design Summary

| Aspect | Specification |
|--------|---------------|
| **Target Audience** | Indian pet parents (25-50), tier-1 and tier-2 cities |
| **Vibe** | Playful - friendly, approachable, trustworthy |
| **Primary Color** | Purple (#6C5CE7) |
| **Font** | Nunito (display) + Inter (body) |
| **Inspiration** | Headspace + Practo + Dunzo |
| **Key Pattern** | Rounded corners, soft shadows, playful illustrations |

---

## Files to Create

1. `src/lib/styles/tokens.css` - CSS variables
2. `tailwind.config.js` - Tailwind configuration
3. `src/lib/components/Button.svelte` - Button component
4. `src/lib/components/Card.svelte` - Card component
5. `src/lib/components/Input.svelte` - Input component
6. `src/routes/+page.svelte` - Landing page

---

*Generated with IdeaRalph + Claude Code*
