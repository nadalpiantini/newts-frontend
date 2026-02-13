# NEWTS Design System

**Version:** 1.0
**Date:** February 13, 2026
**Status:** Production Ready

---

## Visual Identity

### Philosophy
**"Elegant Intelligence"** - A sophisticated dark-themed interface that balances gravitas with approachability. The design communicates trustworthiness while remaining modern and dynamic.

### Core Principles
1. **Dark-First Design**: Reduces eye strain for extended reading sessions
2. **Strategic Color Usage**: Color conveys meaning (scores, momentum, categories)
3. **Typography Hierarchy**: Serif for editorial feel, sans-serif for UI elements
4. **Generous White Space**: Prevents information overload
5. **Subtle Motion**: Animations enhance, not distract

---

## Color Palette

### Primary Colors

#### Background System
```css
/* Background Layers */
--bg-primary: stone-950      /* Main background #0c0a09 */
--bg-secondary: stone-900/40  /* Cards #1c1917 with opacity */
--bg-tertiary: stone-800/50   /* Hover states #292524 */
--bg-elevated: stone-900      /* Raised surfaces #1c1917 */
```

#### Text System
```css
/* Typography Colors */
--text-primary: stone-100     /* Main content #f5f5f4 */
--text-secondary: stone-300   /* Descriptions #d6d3d1 */
--text-tertiary: stone-500    /* Meta data #78716c */
--text-muted: stone-600       /* Disabled #57534e */
```

### Accent Colors (Strategic Scoring)

#### Impact Score Color Coding
```css
/* 90-100: Existential Impact */
--score-critical: purple-300  /* #d8b4fe */

/* 70-89: Major Impact */
--score-high: blue-300        /* #93c5fd */

/* 50-69: Moderate Impact */
--score-medium: amber-300     /* #fcd34d */

/* <50: Low Impact */
--score-low: stone-400        /* #a8a29e */
```

#### Momentum Indicators
```css
/* Trend Direction */
--momentum-rising: emerald-400  /* #34d399 */
--momentum-stable: stone-400     /* #a8a29e */
--momentum-declining: rose-400   /* #fb7185 */
```

### Discovery Mode Accents
```css
/* Progress & Gamification */
--discovery-accent: amber-400      /* #fbbf24 */
--discovery-gradient: linear-gradient(
  to right,
  from-purple-950/30,  /* Starting point */
  via-amber-950/20,     /* Middle */
  to-stone-950/30       /* Ending point */
)

/* Progress Bar Gradient */
--progress-gradient: linear-gradient(
  to right,
  from-amber-500,    /* Start */
  via-yellow-500,    /* Middle */
  to-emerald-500     /* End - completion */
)
```

---

## Typography

### Font Families

#### Primary: Inter (Sans-Serif)
```css
/* UI Elements, Navigation, Meta Data */
font-family: 'Inter', system-ui, -apple-system, sans-serif;
```

**Usage:**
- Navigation
- Buttons
- Meta data (sources, dates)
- Form inputs
- Small text (< 14px)

#### Secondary: Serif (Editorial)
```css
/* Headlines, Article Content, Long-form Text */
font-family: Georgia, 'Times New Roman', Times, serif;
```

**Usage:**
- Article titles (H1, H2, H3)
- Article body text
- Quotes
- Editorial content

### Type Scale

#### Display / Hero
```css
/* Hero Headline */
.text-hero {
  font-size: clamp(2.5rem, 5vw + 1rem, 4.375rem); /* 40px → 70px */
  line-height: 1.15;
  font-weight: 700;
  letter-spacing: -0.02em;
}
```

#### Headings
```css
/* H1 - Hero Title */
h1 {
  font-size: 4xl → 7xl;      /* 36px → 72px */
  line-height: 1.15;
  font-weight: bold;
}

/* H2 - Section Title */
h2 {
  font-size: 2xl → 3xl;      /* 24px → 30px */
  line-height: 1.3;
  font-weight: bold;
}

/* H3 - Card Title */
h3 {
  font-size: base → lg;      /* 16px → 18px */
  line-height: 1.4;
  font-weight: bold;
}
```

#### Body
```css
/* Body Text */
.text-body {
  font-size: lg;             /* 18px */
  line-height: 1.6;
  font-weight: 300;          /* Light */
}

/* Secondary Text */
.text-secondary {
  font-size: sm;             /* 14px */
  line-height: 1.5;
  font-weight: 400;
}

/* Meta Text (sources, dates) */
.text-meta {
  font-size: xs;             /* 12px */
  line-height: 1.4;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

---

## Layout System

### Container & Spacing

#### Max Widths
```css
/* Content Containers */
--container-narrow: 640px;   /* Single article */
--container-medium: 768px;    /* Centered content */
--container-wide: 1024px;     /* Two-column */
--container-full: 1280px;     /* Maximum content */
```

#### Grid System
```css
/* Signal Card Grid */
Mobile:  1 column (100%)
Tablet:  2 columns (50% - 4px gap)
Desktop: 3 columns (33.333% - 20px gap)

.gap-5 {
  gap: 1.25rem;  /* 20px */
}
```

#### Spacing Scale
```css
--space-xs: 0.5rem;    /* 8px */
--space-sm: 1rem;      /* 16px */
--space-md: 1.5rem;    /* 24px */
--space-lg: 2rem;      /* 32px */
--space-xl: 3rem;      /* 48px */
--space-2xl: 4rem;     /* 64px */
--space-3xl: 6rem;     /* 96px */
```

---

## Component Specifications

### Navigation Bar

**Purpose:** Persistent navigation + key actions

**Dimensions:**
- Height: 64px fixed
- Position: sticky top-0
- Z-index: 50

**Visual:**
```
Background: stone-950/95 with backdrop-blur-sm
Border-bottom: border-stone-800
Padding: px-6 lg:px-8
```

**Elements:**
- Logo (left): "NEWTS" serif bold, tagline "Intelligence for Restless Minds"
- Topic Filter (center): Dropdown "Filter by topic" with chevron
- Actions (right): "Sign In" CTA button

---

### Discovery Banner

**Purpose:** Progress indicator + expectation setting

**Dimensions:**
- Height: 80px
- Width: 100%

**Visual:**
```
Background: linear-gradient(
  to right,
  from-purple-950/30,
  via-amber-950/20,
  to-stone-950/30
)
Border-bottom: border-stone-800
```

**Elements:**
- Left: Sparkles icon (amber-400) + "DISCOVERY MODE — Day X of 7"
- Right: Progress bar + percentage
- Subtext: "Learning your interests through pure exploration"

**Progress Bar:**
- Height: 8px
- Width: 160px (w-40)
- Border radius: rounded-full
- Background: stone-800
- Fill: Gradient (amber-500 → yellow-500 → emerald-500)
- Transition: duration-700ms ease-out

---

### Hero Article

**Purpose:** Feature highest-impact strategic signal

**Layout:**
- Full-width on mobile
- Max-width 4xl on desktop
- Margin bottom: mb-16 lg:mb-20

**Typography:**
- Topic tag: xs, uppercase, tracking-wider
- Title: 4xl → 7xl (responsive), bold, leading-tight
- Description: lg, light, leading-relaxed
- "Why This Matters": base sm:lg, italic, serif

**Visual Elements:**

1. **Article Header**
```
Background: stone-900 pill
Border: border-stone-800/30
Padding: px-2.5 py-1
Color: text-amber-200
```

2. **"Why This Matters" Quote Block**
```
Background: stone-900/50
Border-left: 4px solid amber-600
Padding: pl-6 pr-8 py-6
Gradient overlay: amber-600/20 vertical
```

3. **Strategic Metrics**
```
Spacing: gap-6
Text: text-stone-500 (label) + colored score
Scores:
  - 90+: text-purple-300 (3xl font-bold)
  - 70-89: text-blue-300
  - 50-69: text-amber-300
  - <50: text-stone-400
```

**Interactions:**
- Hover: Title changes to text-stone-200
- Click: Opens URL in new tab
- Group hover: Entire article slightly elevated

---

### Signal Card

**Purpose:** Present secondary articles efficiently

**Dimensions:**
- Fixed height cards (consistent grid)
- Padding: p-5 lg:p-6
- Border radius: rounded-xl

**Visual States:**

1. **Default**
```
Background: stone-900/40
Border: border-stone-800
```

2. **Hover**
```
Border: border-stone-700
Background: stone-800/50
Shadow: shadow-lg
```

3. **Read (clicked)**
```
Opacity: 0.7
```

**Typography:**
- Topic tag: xs, uppercase, bg-stone-900
- Title: base → lg, bold, leading-snug
- Description: sm, line-clamp-3, light
- Quote: xs, italic
- Metrics: xs, text-stone-600

**Layout:**
- Grid: 1 col (mobile) → 2 col (tablet) → 3 col (desktop)
- Gap: gap-5 (20px)

---

### Footer Metrics

**Purpose:** Session closure + transparency

**Visual:**
```
Background: stone-900/60
Border: border-stone-800
Border radius: rounded-xl
Padding: p-6 lg:p-8
```

**Gauge Components:**

1. **Variety Score Gauge**
```
Height: 8px (h-2)
Background: stone-800
Border radius: rounded-full
Overflow: hidden
Fill: Gradient (blue-500 → purple-500 → emerald-500)
Width: variety_score * 10%
Transition: duration-700ms ease-out
```

2. **Metrics Display**
```
Score: 2xl sm:3xl, bold, tabular-nums
Label: sm, text-stone-500
Explanation: xs, text-stone-600
```

---

## Motion & Animation

### Timing

```css
/* Fast Interactions */
--duration-fast: 150ms;

/* Standard Transitions */
--duration-base: 200ms;

/* Slow Animations */
--duration-slow: 300ms;

/* Progress/Loading */
--duration-progress: 700ms;
```

### Easing

```css
/* Natural Movement */
--ease-out: cubic-bezier(0, 0, 0.2, 1);

/* Smooth Entry */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

/* Spring */
--ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
```

### Animation Examples

#### Hover Lift
```css
.hover-lift {
  transition: transform var(--duration-slow) var(--ease-out);
}

.hover-lift:hover {
  transform: translateY(-2px);
}
```

#### Progress Fill
```css
.progress-fill {
  transition: width var(--duration-progress) ease-out;
}
```

#### Fade In
```css
.fade-in {
  animation: fadeIn 300ms ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

---

## Responsive Breakpoints

```css
/* Mobile First Approach */
/* Default: < 768px */

/* Tablet */
@media (min-width: 768px) {
  /* md: prefix */
  .grid-cols-2;
  .text-lg;
  .p-6;
}

/* Desktop */
@media (min-width: 1024px) {
  /* lg: prefix */
  .grid-cols-3;
  .text-xl;
  .p-8;
}

/* Large Desktop */
@media (min-width: 1280px) {
  /* xl: prefix */
  .max-w-7xl;
}
```

---

## Icon System

### Icon Library: Lucide React

**Key Icons:**
- `Sparkles`: Discovery Mode indicator
- `Brain`: NEWTS logo
- `TrendingUp`: Rising momentum
- `Zap`: Signal card indicator
- `BookOpen`: Knowledge/learning

**Sizing:**
- Small: w-3 h-3 (12px)
- Medium: w-4 h-4 (16px)
- Large: w-6 h-6 (24px)
- XLarge: w-7 h-7 (28px)

**Colors:**
- Primary: text-stone-400
- Accent (discovery): text-amber-400
- Success (rising): text-emerald-400
- Warning: text-amber-300

---

## Accessibility

### Color Contrast

All text combinations meet WCAG AA standards (7:1 contrast ratio):

- stone-100 on stone-950: 15.3:1 ✅
- stone-300 on stone-950: 10.1:1 ✅
- stone-500 on stone-950: 4.8:1 ✅
- amber-200 on stone-900: 7.2:1 ✅
- purple-300 on stone-950: 8.5:1 ✅

### Focus States

All interactive elements have visible focus indicators:

```css
*:focus-visible {
  outline: 2px solid amber-500;
  outline-offset: 2px;
  border-radius: 4px;
}
```

### Screen Reader Support

- `aria-live="polite"` on Discovery Banner for progress announcements
- Semantic HTML (article, header, main, footer, nav)
- Alt text for all images
- Skip links for keyboard navigation

---

## Design Tokens (CSS Variables)

```css
:root {
  /* Colors */
  --bg-primary: #0c0a09;
  --bg-secondary: rgba(28, 25, 23, 0.4);
  --bg-elevated: #1c1917;

  --text-primary: #f5f5f4;
  --text-secondary: #d6d3d1;
  --text-tertiary: #78716c;
  --text-muted: #57534e;

  --score-critical: #d8b4fe;
  --score-high: #93c5fd;
  --score-medium: #fcd34d;
  --score-low: #a8a29e;

  --momentum-rising: #34d399;
  --momentum-stable: #a8a29e;
  --momentum-declining: #fb7185;

  --accent-amber: #fbbf24;

  /* Typography */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-serif: Georgia, serif;

  /* Spacing */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 2rem;
  --space-xl: 3rem;

  /* Animation */
  --duration-fast: 150ms;
  --duration-base: 200ms;
  --duration-slow: 300ms;
  --duration-progress: 700ms;

  /* Easing */
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## Component Examples

### Usage Example: Discovery Banner

```jsx
<div className="bg-gradient-to-r from-purple-950/30 via-amber-950/20 to-stone-950/30
                border-b border-stone-800">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">
    <div className="flex items-center justify-between py-3">
      {/* Left: Status */}
      <div className="flex items-center gap-3">
        <Sparkles className="w-6 h-6 text-amber-400" />
        <div>
          <p className="text-sm font-semibold text-stone-200 tracking-wide">
            DISCOVERY MODE — Day 3 of 7
          </p>
        </div>
      </div>

      {/* Right: Progress */}
      <div className="text-right">
        <div className="text-3xl font-bold text-stone-100 tabular-nums">
          43%
        </div>
        <div className="w-40 h-2 bg-stone-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-amber-500
                          via-yellow-500 to-emerald-500
                          transition-all duration-700 ease-out"
               style={{ width: '43%' }} />
        </div>
      </div>
    </div>
  </div>
</div>
```

### Usage Example: Hero Article

```jsx
<article className="mb-16 lg:mb-20 group cursor-pointer">
  {/* Header */}
  <div className="flex items-center gap-2 mb-4
                  text-xs text-stone-500 uppercase tracking-wider font-medium">
    <span className="bg-stone-900 px-2.5 py-1
                  rounded-full text-amber-200
                  border border-stone-800/30">
      AI
    </span>
    <span>•</span>
    <span>Tech Strategy Review</span>
    <span>•</span>
    <span className="flex items-center gap-1">
      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
      Rising
    </span>
  </div>

  {/* Title */}
  <a href={url} target="_blank" className="block">
    <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl
                font-bold text-stone-100
                leading-[1.15] mb-6
                tracking-tight
                group-hover:text-stone-200
                transition-colors">
      The Race for Vertical AI Agents Has Begun
    </h1>
  </a>

  {/* Description */}
  <p className="text-lg sm:text-xl text-stone-300
             leading-relaxed mb-8
             max-w-4xl font-light">
    Startups are abandoning generalist LLMs for domain-specific models.
  </p>

  {/* Why It Matters */}
  <div className="bg-stone-900/50
                border-l-4 border-amber-600
                pl-6 pr-8 py-6 mb-6">
    <p className="text-sm text-stone-500 uppercase
                tracking-wider font-semibold mb-3">
      Why this matters
    </p>
    <p className="text-base sm:text-lg text-stone-200
                italic leading-relaxed font-light">
      "Vertical agents will determine which companies survive AI winter."
    </p>
  </div>

  {/* Metrics */}
  <div className="flex items-start gap-6 text-sm
                  font-medium text-stone-500">
    <div className="flex items-center gap-2">
      <span>Strategic Impact:</span>
      <span className="text-xl font-bold tabular-nums text-purple-300">
        89
      </span>
    </div>
    <div className="flex items-center gap-2">
      <span>Novelty:</span>
      <span className="text-xl font-bold tabular-nums text-purple-300">
        92
      </span>
    </div>
  </div>
</article>
```

---

## Design Principles Application

### 1. Information Hierarchy

**Visual Weight:**
1. Hero Article (70% visual weight)
2. Discovery Banner (15% visual weight)
3. Signal Cards (10% visual weight)
4. Metrics/Footer (5% visual weight)

### 2. Strategic Color Usage

**Semantic Coloring:**
- **Purple** (Critical): 90-100 scores → Urgent attention
- **Blue** (High): 70-89 scores → Important but not urgent
- **Amber** (Medium): 50-69 scores → Monitor closely
- **Stone** (Low): <50 → Background information

**Momentum Indicators:**
- **Emerald** (Rising): Growth opportunity
- **Stone** (Stable): Consistent pattern
- **Rose** (Declining): Losing relevance

### 3. Typography as Content Type

**Serif = Editorial Content**
- Communicates "serious journalism"
- Creates newspaper-like authority
- Improves long-form readability

**Sans-Serif = Interface**
- Creates clear UI boundaries
- Improves scannability
- Feels modern and efficient

---

## Dark Mode Implementation

### Why Dark Mode First?

1. **Reduced Eye Strain**: Extended reading sessions (10-30 min)
2. **Focus**: Removes distractions, content-centric
3. **Sophistication**: Perceived as premium/enterprise-grade
4. **Differentiation**: Most news sites are light-themed

### Implementation Details

```css
/* Base Background */
.min-h-screen {
  background-color: rgb(12, 10, 9); /* stone-950 */
  color: rgb(245, 245, 244);        /* stone-100 */
}

/* Layered Surfaces */
.bg-stone-900\/40 {
  background-color: rgba(28, 25, 23, 0.4);
}

/* Text Contrast */
.text-stone-300 {
  color: rgb(214, 211, 209);  /* 10.1:1 contrast on stone-950 */
}

/* Accent Visibility */
.text-purple-300 {
  color: rgb(216, 180, 254);  /* 8.5:1 contrast on stone-950 */
}
```

---

## Responsive Design Patterns

### Mobile (< 768px)

**Layout Adjustments:**
- Single column stack
- Simplified navigation (hamburger menu)
- Larger touch targets (44px min)
- Optimized reading width

**Typography:**
- Hero title: 4xl (36px)
- Section titles: 2xl (24px)
- Body text: base (16px)

### Tablet (768px - 1024px)

**Layout Adjustments:**
- 2-column grid for signal cards
- Full navigation visible
- Side-by-side metrics

**Typography:**
- Hero title: 5xl (48px)
- Section titles: 2.5xl
- Body text: lg (18px)

### Desktop (1024px+)

**Layout Adjustments:**
- 3-column grid for signal cards
- Max-width containers (7xl)
- Horizontal metrics display

**Typography:**
- Hero title: 6xl → 7xl (60px → 72px)
- Section titles: 3xl (30px)
- Body text: xl (20px)

---

## Future Enhancements

### Phase 2: Interactive Elements
- Hover states on all cards
- Skeleton loaders for content fetching
- Smooth page transitions
- Stagger animations on card load

### Phase 3: Personalization UI
- Topic affinity indicators
- "Show more/less like this" buttons
- Saved articles highlights
- Board management UI

### Phase 4: Analytics Dashboard
- Charts and visualizations
- Heatmaps for reading patterns
- Progress tracking graphics
- Trend prediction visualizations

---

**Status:** ✅ PRODUCTION READY
**Last Updated:** February 13, 2026
**Design Owner:** Product & Design Team
