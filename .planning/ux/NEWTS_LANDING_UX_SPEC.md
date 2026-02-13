# NEWTS Landing Page - UX Specification

**Version:** 1.0
**Date:** February 13, 2026
**Status:** Ready for Implementation

---

## Phase 0 — Problem Reframing

### The ONE Clear Problem

**Strategic professionals are drowning in information overload, unable to identify which news actually matters for high-stakes decision-making.**

### What We Are NOT Solving

1. **General news consumption**: Not building a news aggregator for casual reading
2. **Social networking**: Not replacing Twitter/LinkedIn for discussion
3. **Content creation**: Not a publishing platform or blog
4. **Real-time alerts**: Not a breaking news ticker service
5. **Archival research**: Not building a historical news database

### Intentionally Rejected Solutions

| Rejected Solution | Why Rejected |
|-------------------|--------------|
| **Personalized recommender from day 1** | Creates echo chambers; contradicts "cold start authentic" value prop |
| **Twitter-like feed** | Information overload is the problem, not the solution |
| **Manual curation by editors** | Doesn't scale; introduces bias; loses personalization |
| **Newsletter-only format** | Email has discovery problems; limited interaction capabilities |
| **Paywall immediately** | Blocks discovery phase; reduces virality during critical growth phase |

---

## Phase 1 — User Mental Model Alignment

### Primary User: Sarah (34, VC Investor)

**What Sarah THINKS is happening:**
- "This is like Google News but smarter"
- "I'll tell it what I like, and it'll show me more of that"
- "The AI scores are probably just engagement metrics disguised"

**What Sarah EXPECTS immediately:**
- Sign-up form prominently visible
- Sample articles to judge quality
- Clear differentiation from Google News/Twitter
- Free trial before paying

**What will SURPRISE Sarah:**
- No sign-up required to start (Discovery Mode)
- Maximum diversity (she expected personalization immediately)
- "Strategic Impact" is a real 0-100 score, not a like-count
- 7-day calibration period before personalization kicks in

**What Sarah will INEVITABLY do wrong:**
- Try to click "more like this" buttons during Discovery Week
- Expect to save articles before boards feature exists (Phase 2)
- Assume low-score articles are "bad" (they're just not strategic)

### Conflicts & Resolutions

| Conflict | User Expectation | System Reality | UX Resolution |
|----------|-----------------|----------------|---------------|
| **Personalization timing** | "Customize immediately" | Discovery Week first | Explicit "Day 3 of 7" banner with explanation |
| **Scoring meaning** | "Likes = quality" | "Strategic ≠ popular" | Clear "Why this matters" explanation per article |
| **Article scarcity** | "Infinite scroll" | Curated ~10/day | Signal: "Curated, not overwhelming" badge |
| **Sign-up friction** | "Wall before value" | Discovery first | "Create account to save your progress" (optional) |

---

## Phase 2 — Information Architecture

### All Possible Concepts/Entities

1. **Hero Article** (Top strategic signal)
2. **Signal Cards** (Secondary articles)
3. **Discovery Banner** (Calibration progress)
4. **Strategic Metrics** (Impact, Novelty, Momentum)
5. **Topic Filter** (Topic selection)
6. **Navigation** (Logo, Settings, Profile)
7. **"Why This Matters" Quote** (Strategic context)
8. **Diversity Metrics** (Topics explored, variety score)
9. **Boards** (Save articles - *Phase 2*)
10. **Feedback Buttons** (Like/dislike - *Phase 2*)

### Logical Grouping

```
CORE LAYER (Always Visible)
├── Navigation
│   ├── Logo (NEWTS) + tagline
│   ├── Discovery Banner (Day 1-7 only)
│   └── Actions (Sign in, Settings)
│
├── Main Content
│   ├── Hero Article (Featured)
│   ├── Section Divider ("Additional Signals")
│   └── Signal Grid (Cards)
│
└── Metrics Footer
    ├── Today's Diversity
    └── Footer Links (About, Pricing, etc.)

SECONDARY LAYER (Progressive Disclosure)
├── Topic Filter (Dropdown/Modal)
├── Article Detail (Expanded view on click)
└── Strategic Score Explanation (Tooltip/Modal)

ADVANCED LAYER (Phase 2+)
├── Boards (Collections)
├── Feedback Buttons
└── Analytics Dashboard
```

### Hierarchy Decisions

**Hero Article exists because:**
- Highest strategic impact (80-100 score)
- Anchors the daily brief
- Demonstrates AI quality immediately

**Discovery Banner exists because:**
- Sets expectations (7-day calibration)
- Creates gamification (progress %)
- Explains why content feels "random"

**Signal Grid limited to 7 cards because:**
- Prevents scroll fatigue (decision paralysis)
- Matches cognitive load for ~5 min reading session
- Creates "completion feeling" when done

**Metrics Footer exists because:**
- Reinforces value prop ("diversity matters")
- Provides session closure
- Transparency about algorithm behavior

---

## Phase 3 — Actions, Affordances, Signals

### Article Card Interactions

| Action | Discovery Signal | Visual Signal | Feedback |
|--------|-----------------|---------------|----------|
| **Read article** | Click anywhere on card | Cursor pointer, subtle lift on hover | Opens original source in new tab |
| **View metrics** | "Strategic Impact" badge visible | Color-coded (purple 90+, blue 70+, amber <70) | Hover shows scoring criteria tooltip |
| **Filter by topic** | Topic tag clickable | Underline on hover | Updates feed with topic-filtered view |
| **Reload feed** | "↻ Reload" button top-right | Visible button, rotates 360° when clicked | New articles loaded, brief spinner |

### Discovery Banner Affordances

| Element | Signal | Behavior |
|---------|--------|----------|
| **Progress bar** | Gradient fill (purple→emerald) | Animates from 0% to current |
| **"Day X of 7"** | Large number, small "of 7" | Static text, no interaction |
| **"Learning your interests"** | Subtext under banner | Static explanatory text |

### Navigation Actions

| Action | Location | Signal | Result |
|--------|----------|--------|--------|
| **Sign in/up** | Top-right button | "Sign In" / "Get Started" CTA | Opens auth modal (Phase 2) |
| **Topic filter** | Header dropdown | "Filter by topic" with chevron | Opens topic selection modal |
| **Settings** | Gear icon (if signed in) | Visible on hover/click | Opens preferences panel |

---

## Phase 4 — System States (No Gaps)

### State 1: First Load (No User Data)

**Visuals:**
- Full-page skeleton loader (3 sec max)
- Brain emoji 🧠 pulsing
- Text: "Calibrating your intelligence profile..."

**Transitions to:**
- Discovery Mode banner (Day 1 of 7, 0%)
- 8 mock articles (as currently implemented)
- All metrics visible

**No error case possible** (static data)

---

### State 2: Loading Articles (After Initial)

**Trigger:** User clicks "Reload" or returns next day

**Visuals:**
- In-place skeleton cards (no full-page reload)
- Shimmer effect on article cards
- Spinner next to "Reload" button (500ms max)

**Error Recovery:**
- If API fails: Show "Using cached articles from [time]"
- If no cache: Show 3 offline articles from curated backup

**Feedback:**
- Toast notification: "Loaded 5 new strategic signals"

---

### State 3: Discovery Mode (Days 1-7)

**Always Visible:**
- Discovery banner with progress bar
- Maximum topic diversity (≥8 topics)
- "Why this matters" quotes on every article

**User Actions Allowed:**
- Read articles (external link)
- Filter by topic (doesn't affect algorithm)
- Reload feed

**User Actions BLOCKED:**
- Like/dislike buttons (disabled with tooltip: "Available after Day 7")
- "Show more like this" (same message)
- Saving to boards (Phase 2 feature)

**Messaging:**
- Banner: "DISCOVERY MODE — Day X of 7"
- Subtext: "Learning your interests through pure exploration"

---

### State 4: Personalized Mode (Day 8+)

**Visual Changes:**
- Discovery banner replaced by "Personalized for You" badge
- Feed reflects 70% affinity + 30% discovery
- "Why this matters" still shows

**New Actions:**
- Like/dislike buttons active
- "Show more/less like this" on hover
- Topic affinity indicators (e.g., "92% match to your interests")

**Transparency:**
- Small text: "Based on your reading: AI (45%), Climate (30%), Finance (25%)"

---

### State 5: Empty State (No Articles)

**Trigger:** API failure + no cache

**Visuals:**
- Illustration: Empty newspaper stand
- Headline: "Signals paused"
- Body: "We're temporarily unable to fetch articles. Try again in a few minutes."

**Actions:**
- Primary button: "Retry" (triggers reload)
- Secondary link: "Contact support"

---

### State 6: Error State (API Failure)

**Recoverable Error (e.g., rate limit):**

**Visuals:**
- Yellow warning banner at top
- Text: "Running on backup power — Some features limited"
- Icon: ⚠️

**Behavior:**
- Show cached articles from last successful fetch
- All interactions still work
- Auto-retry in background (60s)

**Feedback:**
- Toast on recovery: "Back online — New articles available"

---

**Non-Recoverable Error (e.g., DeepSeek API down):**

**Visuals:**
- Full-page error screen
- Headline: "Intelligence systems offline"
- Body: "Our AI agents are taking a break. We'll be back soon."

**Actions:**
- Primary: "Retry now"
- Secondary: "View status page" (link to status.newts.io)
- Tertiary: "Contact support"

---

### State 7: Success (Article Read)

**Trigger:** User clicks article → Opens in new tab

**Immediate Feedback (before new tab):**
- Brief flash (100ms) on clicked card
- Checkmark icon appears briefly in corner

**After Tab Close:**
- No explicit "thanks for reading" message
- Article card subtly marked as "read" (opacity 0.7)
- "Read articles" counter increments in footer

---

### State 8: Running/Long Operation

**Trigger:** DeepSeek analysis (background, invisible to user)

**No visible state** because:
- Analysis happens during fetch
- User never waits for AI
- Fallback to cached analyzed articles

**If analysis takes >5s:**
- Show "Analyzing with DeepSeek AI..." toast
- Display previous day's articles
- Replace with fresh analysis when ready

---

## Phase 5 — Critical UX Decisions

### Decision 1: No Sign-Up Wall

**Alternatives:**
1. Require email before any content (Rejected: High friction)
2. Require email after Day 3 (Rejected: Interrupts discovery)
3. Optional account (CHOSEN: Low friction + value first)

**Why this option:**
- Discovery Mode demonstrates value before asking commitment
- Reduces acquisition friction dramatically
- Aligns with "cold start authentic" philosophy

**Trade-off:**
- Can't track users across sessions
- Lost progress if device/browser changes
- **Mitigation:** Persistent browser storage + gentle "Sign up to save" prompts

---

### Decision 2: Fixed 7-Day Discovery Period

**Alternatives:**
1. Personalize immediately (Rejected: Echo chamber risk)
2. 30-day discovery (Rejected: Too long, churn risk)
3. Variable discovery (stop when confident) (Rejected: Unpredictable UX)
4. Fixed 7 days (CHOSEN: Balance depth + speed)

**Why this option:**
- 7 days = ~50-70 articles read (sufficient signal)
- Creates ritual/check-in anticipation
- A/B testable (can try 5 days later)

**Trade-off:**
- Some users feel "ready" earlier (Day 3-4)
- **Mitigation:** Show "Your profile is 42% complete" + preview of what personalization will look like

---

### Decision 3: Curated ~10 Articles/Day (Not Infinite Scroll)

**Alternatives:**
1. Infinite scroll like Twitter (Rejected: Information overload)
2. 20+ articles/day (Rejected: Decision fatigue)
3. 5 articles/day (Rejected: Too sparse, feels empty)
4. ~10 articles/day (CHOSEN: "Boutique curation" feel)

**Why this option:**
- Matches ~5-10 min reading session
- Creates "completion feeling" (all articles scanned)
- Forces prioritization (only top strategic signals)

**Trade-off:**
- Power users want more content
- **Mitigation:** Phase 3 "Intensive Mode" (20 articles for heavy users)

---

### Decision 4: Strategic Impact as Primary Metric

**Alternatives:**
1. Popularity/engagement (Rejected: Low signal, bias)
2. Recency (Rejected: Noise, not strategic)
3. User-defined importance (Rejected: Cold start problem)
4. AI-scored strategic impact (CHOSEN: Proprietary advantage)

**Why this option:**
- Direct value prop ("shows what matters")
- Hard to replicate (requires DeepSeek agents)
- Aligns with target user (decision-makers)

**Trade-off:**
- Users may disagree with AI scores
- **Mitigation:** "Disagree" button (Phase 2) + transparent scoring criteria

---

### Decision 5: No Comments/Discussion (Phase 1)

**Alternatives:**
1. Full comment system (Rejected: Toxicity risk, moderation cost)
2. Reddit-style upvotes (Rejected: Popularity bias, not strategic)
3. Annotation-only (Phase 2) (Deferred: Complexity)
4. No discussion (CHOSEN: Focus on curation, not conversation)

**Why this option:**
- Differentiates from Twitter/HN
- Avoids moderation nightmare at small team size
- Forces focus on article quality, not hot takes

**Trade-off:**
- Lower engagement metrics (no comment DAU)
- **Mitigation:** Phase 3 team boards (collaborative curation, not discussion)

---

## Phase 6 — UX Specification

### Landing Page Layout

```
┌─────────────────────────────────────────────────────────────┐
│  NEWTS                    [Filter ▾]         [Sign In]     │  ← Navigation
│  Intelligence for Restless Minds                                      │
├─────────────────────────────────────────────────────────────┤
│  ⚡ DISCOVERY MODE — Day 3 of 7                              │  ← Discovery Banner
│  Learning your interests through pure exploration             │
│  ████████████░░░░░░░░░ 42%                                   │
├─────────────────────────────────────────────────────────────┤
│                                                                     │
│  [AI] • Tech Strategy Review • • Rising                         │  ← Hero Article Header
│                                                                     │
│  The Race for Vertical AI Agents Has Begun                       │  ← Hero Title
│                                                                     │
│  Startups are abandoning generalist LLMs for domain-specific... │  ← Hero Description
│                                                                     │
│  ┌───────────────────────────────────────────────────────┐      │
│  │ "Vertical agents will determine which companies       │      │  ← Why This Matters
│  │  survive AI winter."                                  │      │
│  └───────────────────────────────────────────────────────┘      │
│                                                                     │
│  Strategic Impact: 92  •  Novelty: 88                           │  ← Metrics
│                                                                     │
├─────────────────────────────────────────────────────────────┤
│                     Additional Signals                          │  ← Section Divider
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ [Energy]    │  │ [Finance]   │  │ [AI]        │         │  ← Signal Cards
│  │ Why 2026... │  │ Central...  │  │ CRISPR 2.0  │         │     (Grid)
│  │ Impact: 81  │  │ Impact: 84  │  │ Impact: 77  │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ [Markets]   │  │ [Science]   │  │ [Geopolitics]│        │
│  │ Latam...    │  │ Gene...     │  │ US-China... │         │
│  │ Impact: 65  │  │ Impact: 77  │  │ Impact: 91  │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                                     │
├─────────────────────────────────────────────────────────────┤
│  Today's Diversity                                              │  ← Footer
│  Variety Score: 9.2/10  •  Topics Explored: 8                │
│                                                                     │
│  NEWTS • About • Pricing • Status                               │
└─────────────────────────────────────────────────────────────┘
```

### Component Specifications

#### Component 1: Navigation Bar

**Purpose:** Persistent navigation + key actions

**Elements:**
- Logo (left): "NEWTS" in serif bold, tagline "Intelligence for Restless Minds" below
- Topic Filter (center-left): Dropdown with chevron ↓
- Sign In (right): CTA button (if not logged in)

**Behavior:**
- Sticky on scroll (stays at top)
- Backdrop blur (glassmorphism)
- Height: 64px
- Background: `bg-stone-950/95 backdrop-blur-sm`

**States:**
- Default: All elements visible
- Mobile (hamburger): Logo + ☰ menu icon only

---

#### Component 2: Discovery Banner

**Purpose:** Set expectations + progress gamification

**Elements:**
- Left: ⚡ sparkles icon + "DISCOVERY MODE — Day X of 7"
- Right: Circular progress indicator + percentage
- Subtext: "Learning your interests through pure exploration"

**Dimensions:**
- Height: 80px
- Background: Gradient `bg-gradient-to-r from-purple-950/30 via-amber-950/20`
- Border bottom: `border-b border-stone-800`

**Behavior:**
- Only visible Days 1-7
- Replaced by "Personalized Mode" badge Day 8+
- Progress bar fills with CSS transition `duration-700`

**Accessibility:**
- `aria-live="polite"` (announces progress to screen readers)
- Contrast ratio: 7:1 (WCAG AA)

---

#### Component 3: Hero Article

**Purpose:** Feature highest-impact strategic signal

**Elements:**
1. **Header:** Topic tag + Source + Momentum indicator
2. **Title:** H1, serif, 4xl (mobile) → 7xl (desktop)
3. **Description:** Text-lg, light, max-width 4ch
4. **"Why This Matters" block:** Quote style, amber accent border
5. **Metrics:** Strategic Impact + Novelty scores with color coding

**Layout:**
- Full-width on mobile
- Max-width 4xl on desktop (centered)
- Margin bottom: `mb-16`

**Interactions:**
- Click anywhere → Opens article URL in new tab
- Hover: Title changes to `text-stone-200`

**Color Coding (Scores):**
- 90-100: `text-purple-300` (existential impact)
- 70-89: `text-blue-300` (major impact)
- 50-69: `text-amber-300` (moderate impact)
- <50: `text-stone-400` (low impact)

---

#### Component 4: Signal Card

**Purpose:** Present secondary articles efficiently

**Elements:**
1. **Header:** Topic tag + Source + Momentum icon
2. **Title:** H3, text-base → lg, bold
3. **Description:** Text-sm, 3-line clamp
4. **"Why This Matters" quote:** Italic, text-xs
5. **Footer:** Impact + Novelty scores

**Dimensions:**
- Fixed height cards (consistent grid)
- Padding: `p-5 lg:p-6`
- Border radius: `rounded-xl`

**States:**
- Default: `bg-stone-900/40 border-stone-800`
- Hover: `hover:border-stone-700 hover:bg-stone-800/50`
- Read: `opacity-0.7` (after user clicks through)

**Grid Layout:**
- Mobile: 1 column
- Tablet: 2 columns (`md:grid-cols-2`)
- Desktop: 3 columns (`lg:grid-cols-3`)

---

#### Component 5: Topic Filter Modal

**Purpose:** Allow users to explore specific topics

**Trigger:** Click "Filter by topic" in nav

**Modal Content:**
- Title: "Filter by Topic"
- Grid of topic pills:
  - Artificial Intelligence (42 articles)
  - Clean Energy & Climate (28)
  - Financial Markets (35)
  - Healthcare & Biotech (19)
  - etc.

**Behavior:**
- Single selection (not multi)
- Closes on selection
- Updates feed with filtered articles
- Badge shows active filter in nav

**Reset:**
- "Clear filter" button in modal
- Or click filter badge again to clear

---

#### Component 6: Footer Metrics

**Purpose:** Session closure + transparency

**Elements:**
- **Variety Score:** Gauge (0-10) + visual bar
- **Topics Explored:** Integer count
- **Explanation:** Dynamic text based on mode
  - Discovery: "Maximum diversity during discovery week. Explore broadly to train your profile."
  - Personalized: "Personalized with controlled diversity. 70% learned affinity + 30% discovery expansion."

**Dimensions:**
- Background: `bg-stone-900/60`
- Padding: `p-6 lg:p-8`
- Border radius: `rounded-xl`

**Visual Hierarchy:**
- Section title: `text-sm font-semibold text-stone-400 uppercase`
- Scores: `text-2xl sm:text-3xl font-bold text-stone-100 tabular-nums`

---

### Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| **Mobile** | <768px | Single column, simplified nav, smaller fonts |
| **Tablet** | 768-1024px | 2-column grid, hamburger menu |
| **Desktop** | 1024+ | 3-column grid, full nav, max-width containers |

---

## Phase 7 — Antifragile Build Order

### Step 1: Core Layout Shell

**Objective:** Establish page structure and navigation

**Minimal context:**
- Create Next.js page component
- Use Tailwind for styling
- Follow component spec above

**Primary prompt:**
```
Create the NEWTS landing page layout shell with:
1. Sticky navigation bar (logo + filter + sign-in)
2. Container for main content (max-width 7xl)
3. Footer with links

Use Tailwind CSS. Dark theme (stone-950 background).
Sticky nav with backdrop-blur.
```

**Correction prompt (if vague):**
```
The navigation bar is missing. Add:
- Fixed position top-0 with z-50
- Backdrop blur effect
- Border-bottom
- Height constraint (h-16)

Ensure the nav persists on scroll.
```

**Reinforcement prompt:**
```
Verify:
✅ Nav bar visible at top
✅ backdrop-blur applied
✅ Logo "NEWTS" left-aligned
✅ Sign In button right-aligned
✅ Sticky behavior on scroll
```

---

### Step 2: Discovery Banner Component

**Objective:** Implement progress indicator + explanation

**Minimal context:**
- Current day (1-7) as prop
- Progress percentage (0-100)
- Gradient background with amber accent

**Primary prompt:**
```
Create a DiscoveryBanner component with:
1. Left side: Sparkle icon + "DISCOVERY MODE — Day X of 7"
2. Right side: Progress bar with percentage
3. Subtext: "Learning your interests through pure exploration"

Style: Gradient bg-purple-950/30 to amber-950/20, border-b.
Progress bar: Gradient fill (purple → emerald), 700ms transition.

Accept props: day (number), progress (number).
```

**Correction prompt:**
```
The progress bar animation is missing. Add:
- CSS transition on width change
- Duration: 700ms
- Ease-out timing function

Also add aria-live="polite" for accessibility.
```

**Reinforcement prompt:**
```
Verify:
✅ Banner spans full width
✅ Progress bar fills from left
✅ Animation smooth (700ms)
✅ Day number prominently displayed
✅ Contrast ratio meets WCAG AA
```

---

### Step 3: Hero Article Component

**Objective:** Feature top strategic signal

**Minimal context:**
- Article object with: title, description, topic, source, scores, why_it_matters
- External URL for link
- Color-coded score badges

**Primary prompt:**
```
Create a HeroArticle component accepting article object.
Layout:
1. Header: Topic tag + source + momentum icon
2. H1 title (responsive: 4xl mobile → 7xl desktop)
3. Description (text-lg, light)
4. "Why This Matters" block (quote style, amber border-l-4)
5. Metrics footer (Strategic Impact + Novelty scores)

Click behavior: Open article.url in new tab.

Color coding scores:
- 90-100: purple-300
- 70-89: blue-300
- 50-69: amber-300
- <50: stone-400
```

**Correction prompt:**
```
Missing the "Why This Matters" quote styling. Add:
- Background: bg-stone-900/50
- Left border: border-l-4 border-amber-600
- Padding: pl-6 pr-8 py-6
- Italic text for the quote itself

Also ensure title hover state (text-stone-200 on hover).
```

**Reinforcement prompt:**
```
Verify:
✅ Hero article is visually distinct from cards
✅ Title is largest text on page
✅ "Why This Matters" block has amber accent
✅ Scores use correct color coding
✅ Click opens new tab (not same window)
```

---

### Step 4: Signal Card Component

**Objective:** Secondary articles in grid

**Minimal context:**
- Same article structure as hero
- Compact presentation
- Grid layout (1/2/3 columns)

**Primary prompt:**
```
Create a SignalCard component for grid layout.
Structure:
1. Header: Topic + source + momentum icon (small)
2. H3 title (text-base → lg)
3. Description (text-sm, line-clamp-3)
4. "Why This Matters" quote (text-xs, italic)
5. Footer: Impact + Novelty scores

Style: bg-stone-900/40, border-stone-800, rounded-xl.
Hover state: hover:border-stone-700 + hover:bg-stone-800/50.

Use line-clamp-3 for description (max 3 lines).
```

**Correction prompt:**
```
The hover state is too subtle. Strengthen:
- Add shadow-lg on hover
- Add transform transition (translate-y-1)
- Ensure cursor-pointer on entire card

Also truncate description at exactly 3 lines (use line-clamp).
```

**Reinforcement prompt:**
```
Verify:
✅ Cards have consistent height in grid
✅ Hover state is clearly visible
✅ Description truncated to 3 lines
✅ Topic tag is compact (pill-shaped)
✅ Scores are visible but not dominant
```

---

### Step 5: Article Grid Layout

**Objective:** Assemble hero + cards in responsive grid

**Minimal context:**
- 1 hero article (full width)
- 7 signal articles (grid)
- Section divider between them

**Primary prompt:**
```
Create article feed layout:
1. Hero article (full width)
2. Divider: "Additional Signals" with horizontal rule
3. Signal grid: 1 col mobile, 2 col tablet, 3 col desktop

Use gap-5 for grid spacing.
Max-width 7xl container with px-6 lg:px-8.

Pass articles array. First = hero, rest = grid.
```

**Correction prompt:**
```
The section divider is missing. Add:
- Relative positioning
- Full-width horizontal rule (border-t border-stone-800)
- Centered label: "Additional Signals (X topics explored)"
- Background: bg-stone-950 to hide rule behind text

Ensure spacing: my-12 lg:my-16.
```

**Reinforcement prompt:**
```
Verify:
✅ Hero article takes full width
✅ Grid is responsive (1→2→3 columns)
✅ Section divider clearly separates sections
✅ Gap between cards is consistent
✅ Max-width container prevents over-stretch
```

---

### Step 6: Footer Metrics Component

**Objective:** Transparency + session closure

**Minimal context:**
- Variety score (0-10)
- Topics seen count
- Mode-specific explanation text

**Primary prompt:**
```
Create a DiversityMetrics component.
Display:
1. Variety Score: Gauge (0-10) with progress bar
2. Topics Explored: Integer count
3. Explanation: Dynamic text based on mode

Style: bg-stone-900/60, rounded-xl, p-6 lg:p-8.
Progress bar: Gradient blue→purple→emerald.

Accept feed object with mode and diversity_metrics.
```

**Correction prompt:**
```
The progress bar width calculation is wrong. Fix:
- Width should be: variety_score * 10% (score 9.2 = 92% width)
- Add transition: duration-700 ease-out
- Ensure bar stays within container (overflow-hidden)

Also make scores tabular-nums (monospaced numbers).
```

**Reinforcement prompt:**
```
Verify:
✅ Variety score visualizes correctly (9.2 = 92% width)
✅ Topics explored shows integer (not float)
✅ Explanation text changes based on mode
✅ Gauges animate on load
✅ Section footer feels like "closure"
```

---

### Step 7: Mock Data Integration

**Objective:** Populate UI with realistic sample data

**Minimal context:**
- 8 articles with varied topics, scores, sources
- Discovery mode metadata (day 3, 42% progress)
- Diversity metrics (9.2/10, 8 topics)

**Primary prompt:**
```
Create MOCK_FEED data object with:
- 8 articles (1 hero, 7 signals)
- Topics: AI, Climate, Finance, Healthcare, Science, Markets, Geopolitics, Energy
- Scores: Mix of 90+, 70-89, 50-69 (show range)
- Sources: Tech Strategy Review, Energy Policy, Monetary Observer, etc.

Include:
- mode: "discovery"
- day_of_journey: 3
- calibration_progress: 42.85
- diversity_metrics: { variety_score: 9.2, topics_seen: 8 }

All articles need: why_it_matters quote.
```

**Correction prompt:**
```
The why_it_matters quotes are generic. Rewrite to be:
- Specific to the article topic
- Strategic in framing
- Under 20 words each
- Start with "Why this matters:" implied context

Examples:
- "First-mover advantage in fusion IP determines next century's energy hegemony."
- "The line between therapy and enhancement is about to blur permanently."
```

**Reinforcement prompt:**
```
Verify:
✅ 8 articles with unique topics
✅ Score distribution varies (not all 90+)
✅ Sources sound credible
✅ why_it_matters quotes are strategic
✅ Discovery day % is accurate (3/7 = 42.85%)
```

---

### Step 8: Loading & Empty States

**Objective:** Handle no-data scenarios gracefully

**Minimal context:**
- Skeleton loaders for articles
- Error state for API failures
- Empty state for no articles

**Primary prompt:**
```
Add loading state:
1. Full-page skeleton on first load (3 sec)
2. Brain emoji 🧠 pulsing animation
3. Text: "Calibrating your intelligence profile..."

Add error state:
1. Yellow warning banner if API fails
2. Show cached articles with timestamp
3. "Retry" button for refresh

Add empty state (if no articles at all):
1. Illustration: Empty newspaper stand
2. "Signals paused" message
3. Retry button + contact support link
```

**Correction prompt:**
```
The skeleton loader is missing. Add:
- Shimmer effect on article cards
- Pulse animation on progress bar
- Fallback to mock data after 3 sec timeout

Ensure skeleton matches final layout (hero + grid).
```

**Reinforcement prompt:**
```
Verify:
✅ Loading state shows immediately on mount
✅ Skeleton matches article card dimensions
✅ Error banner appears on API failure
✅ Empty state has clear retry action
✅ All states transition smoothly (no flicker)
```

---

### Step 9: Responsive Refinement

**Objective:** Polish mobile/tablet experience

**Minimal context:**
- Mobile breakpoint (<768px)
- Tablet (768-1024px)
- Desktop (1024px+)

**Primary prompt:**
```
Optimize for mobile:
1. Hero title: text-4xl (not 7xl) on mobile
2. Signal grid: 1 column (not 3)
3. Nav: Hamburger menu (hide sign-in text)
4. Discovery banner: Stack vertically (progress below text)
5. Footer metrics: Stack gauges vertically

Test at 375px (iPhone SE) and 768px (iPad).
```

**Correction prompt:**
```
Mobile nav is broken. Fix:
- Hide "Filter by topic" and "Sign In" text
- Show ☰ hamburger icon instead
- Create slide-out menu for mobile nav
- Ensure tap targets are 44px min (iOS guideline)

Also verify hero title doesn't overflow on small screens.
```

**Reinforcement prompt:**
```
Verify:
✅ All text readable at 375px width
✅ Grid collapses to 1 column on mobile
✅ Nav menu works with touch
✅ No horizontal scroll
✅ Tap targets meet iOS/Android size guidelines
```

---

### Step 10: Accessibility & Performance

**Objective:** WCAG AA compliance + fast load

**Minimal context:**
- Contrast ratios (7:1)
- Screen reader support
- Core Web Vitals (LCP <2.5s)

**Primary prompt:**
```
Add accessibility:
1. aria-live on Discovery Banner (announces progress)
2. alt text on all images (if added later)
3. Keyboard navigation (tab order, focus states)
4. Skip to content link (hidden until focused)
5. Contrast: Verify all text meets 7:1 ratio

Performance:
1. Lazy load signal cards (viewport intersection)
2. Defer non-critical JS
3. Optimize images (use webp, lazy loading)
```

**Correction prompt:**
```
Missing keyboard navigation. Add:
- Visible focus states on all interactive elements
- Tab order: Logo → Filter → Articles (in reading order)
- Enter/Space to trigger article links
- Escape to close modals (filter modal)

Also fix contrast on topic tags (stone-600 on stone-900 fails).
```

**Reinforcement prompt:**
```
Verify:
✅ All interactive elements have visible focus
✅ Tab order is logical
✅ Screen reader announces "Discovery Mode Day 3 of 7"
✅ Contrast checker passes all text
✅ Lighthouse score >90 (accessibility + performance)
```

---

## Phase 8 — Final Self-Critique

### Remaining UX Risks

#### Risk 1: Discovery Mode Perception

**Risk:** Users think "random" = "broken AI"

**Mitigation:**
- Explicitly explain "maximum diversity" in banner
- Show variety score prominently
- A/B test: "Why am I seeing this topic?" tooltip

**Success metric:** <10% support tickets about "broken recommendations" during Discovery Week

---

#### Risk 2: Scoring Skepticism

**Risk:** Users don't trust AI scores (think they're arbitrary)

**Mitigation:**
- Transparent scoring modal (click score → see criteria)
- "Why this matters" quotes justify high scores
- Phase 2: "Disagree" button with feedback loop

**Success metric:** <15% of users click "Disagree" on 90+ scores

---

#### Risk 3: Content Scarcity Frustration

**Risk:** Power users want more than 10 articles/day

**Mitigation:**
- Set expectations: "Curated, not overwhelming" badge
- Phase 3: "Intensive Mode" (20 articles for heavy users)
- Archive page: "Explore past signals" (last 30 days)

**Success metric:** <20% of users request "more articles" in feedback

---

### Irreversible Decisions

1. **7-day Discovery Period:** Changing this breaks user expectations and onboarding flow
   - **Decision locked until:** Month 3 (after A/B test data)

2. **Strategic Impact as Primary Metric:** Rebranding would require complete AI retraining
   - **Decision locked until:** Month 6 (after PMF validation)

3. **No Comments (Phase 1):** Adding comments later requires moderation infrastructure
   - **Decision locked until:** Phase 3 (Month 9+)

---

### What We're Sacrificing

| Sacrifice | Why It's Worth It |
|-----------|-------------------|
| **Viral growth (no share buttons initially)** | Focus on quality over vanity metrics |
| **Real-time updates (daily curated feed)** | Strategic depth > speed |
| **Social features (comments, likes)** | Differentiation from Twitter/HN |
| **Infinite content (fixed 10 articles)** | Decision quality > quantity |
| **Immediate personalization** | Avoid echo chambers, long-term retention |

---

## Appendix: Design Tokens

### Colors

```css
/* Backgrounds */
--bg-primary: stone-950;
--bg-secondary: stone-900/40;
--bg-tertiary: stone-800/50;

/* Text */
--text-primary: stone-100;
--text-secondary: stone-300;
--text-tertiary: stone-500;

/* Accents */
--accent-purple: purple-300 (90-100 scores)
--accent-blue: blue-300 (70-89 scores)
--accent-amber: amber-300 (50-69 scores)
--accent-emerald: emerald-400 (rising momentum)
```

### Typography

```css
--font-serif: 'Charter', 'Bitstream Charter', 'Sitka Text', serif;
--font-sans: system-ui, -apple-system, sans-serif;

/* Sizes */
--text-hero: 4xl (mobile) → 7xl (desktop);
--text-title: 2xl;
--text-body: lg (16px);
--text-small: sm (14px);
--text-xs: xs (12px);
```

### Spacing

```css
--space-xs: 0.5rem;
--space-sm: 1rem;
--space-md: 1.5rem;
--space-lg: 2rem;
--space-xl: 3rem;
--space-2xl: 4rem;
```

---

**Status:** ✅ READY FOR IMPLEMENTATION

**Next Steps:**
1. Review UX spec with stakeholders
2. Create visual design mockups (Figma)
3. Begin implementation following Build Order
4. Test with 5 users during Discovery Week simulation
5. Iterate based on feedback before public launch

---

**Document Owner:** UX Team
**Last Updated:** 2026-02-13
**Approved By:** Product, Engineering, Design
