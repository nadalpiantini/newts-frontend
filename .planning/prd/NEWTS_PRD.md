# NEWTS - Product Requirements Document

**Version:** 1.0
**Date:** February 13, 2026
**Status:** Draft

---

## 1. Executive Summary

NEWTS is an AI-powered news intelligence platform designed for "restless minds" - professionals, investors, and decision-makers who need strategic insights without the noise. Unlike traditional news aggregators, NEWTS uses DeepSeek AI agents to analyze articles for strategic impact, novelty, and momentum, delivering only what matters.

### Vision
To become the definitive intelligence platform for strategic decision-makers, transforming information overload into actionable insight through AI-driven curation.

### Mission
Deliver personalized, high-signal news feeds that adapt to user interests through a 7-day discovery period, then continuously refine through AI analysis and user interaction.

---

## 2. Problem Statement

### Current Market Pain Points

1. **Information Overload**: Professionals face 100+ articles daily, impossible to process manually
2. **Low Signal-to-Noise Ratio**: 90% of news content has no strategic value
3. **Manual Curation Inefficiency**: Building curated feeds takes hours of manual effort
4. **Echo Chambers**: Existing recommender systems reinforce biases, limiting discovery
5. **Lack of Strategic Context**: News sources report what happened, not what matters

### Target Audience

**Primary:** Business leaders, investors, entrepreneurs, and strategists (age 28-55)
- Tech-savvy but time-constrained
- Make high-stakes decisions requiring current awareness
- Willing to pay for time-saving insights
- Value diverse perspectives over reinforcement

**Secondary:** Analysts, researchers, and curious intellectuals
- Need comprehensive topic coverage
- Value novelty and emerging trends
- Require depth over breadth

---

## 3. Solution Overview

### Core Value Proposition

**"Strategic intelligence, not more noise."**

NEWTS combines AI analysis with human values:
- **DeepSeek AI Agents** evaluate strategic importance (0-100 scores)
- **Discovery-First Philosophy** prevents echo chambers from day 1
- **Personalized Rankings** based on demonstrated interests
- **Multi-Dimensional Scoring**: Strategic Impact, Novelty, Momentum

### Key Differentiators

| Feature | NEWTS | Twitter/LinkedIn | Google News | Newsletter Curators |
|---------|-------|------------------|-------------|-------------------|
| AI Strategic Analysis | ✅ DeepSeek | ❌ | ❌ | ⚠️ Manual |
| Cold Start Authentic | ✅ No manipulation | ❌ Algorithm bias | ❌ Popular bias | ✅ Human curation |
| Discovery Period | ✅ 7-day pure exploration | ❌ | ❌ | ⚠️ Editor choice |
| Strategic Scoring | ✅ Multi-metric | ❌ | ❌ | ❌ |
| Personalization | ✅ Affinity-based | ❌ Engagement-based | ❌ Click-based | ❌ Static |

---

## 4. Product Features

### Phase 1: Foundation (MVP) ✅ COMPLETED

#### 4.1 Core Intelligence Engine
- **AI Analysis Agents** (3 specialized agents)
  - Strategic Analyst: Impact scoring (0-100)
  - Topic Classifier: Precise categorization
  - Summarizer: Concise summaries

- **Discovery Mode** (Days 1-7)
  - Pure exploration feed
  - Maximum topic diversity
  - No preference influence
  - Progress tracking (calibration bar)

- **Personalized Mode** (Day 8+)
  - 70% learned affinity + 30% discovery
  - Continuous refinement
  - Momentum tracking (rising/stable/declining)

#### 4.2 User Interface
- **Home Page**: Hero article + signal cards
- **Discovery Banner**: Progress indicator
- **Strategic Metrics**: Impact, Novelty, Momentum badges
- **Topic Filtering**: Browse by sector/topic
- **Responsive Design**: Mobile-first

#### 4.3 Data Layer
- **Supabase Integration**: PostgreSQL database
- **Schema**:
  - `newts_topics`: Topic categories
  - `newts_articles`: Articles with AI analysis
  - `newts_boards`: User saved collections

### Phase 2: Engagement Features (Next Sprint)

#### 4.4 Boards & Collections
- Save articles to custom boards
- Create themed collections (e.g., "AI Safety", "Climate Tech")
- Board sharing and collaboration
- Export to PDF/Notion

#### 4.5 Affinity System
- Implicit feedback: Read time, scroll depth, bookmarks
- Explicit feedback: Like/dislike, "show more/less like this"
- Topic affinity scores (0-100 per topic)
- Daily affinity recalculation

#### 4.6 Notifications
- Daily digest emails (top 5 strategic signals)
- Breaking alerts for 90+ impact scores
- Weekly trend reports (emerging topics)

### Phase 3: Advanced Features (Future)

#### 4.7 Advanced Filters
- Time range (last 24h, week, month)
- Impact threshold slider
- Momentum filter (rising only)
- Source whitelist/blacklist

#### 4.8 Analytics Dashboard
- Topics explored over time
- Reading patterns heatmap
- Affinity evolution visualization
- Impact distribution charts

#### 4.9 Collaborative Features
- Team boards (shared collections)
- Annotate articles (notes, highlights)
- Discussion threads per article
- Expert commentary overlays

---

## 5. Technical Architecture

### Stack
- **Frontend**: Next.js 15 (App Router) + React 19
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **AI**: DeepSeek API
- **Testing**: Vitest + Playwright
- **Deployment**: Vercel (frontend)

### Architecture Patterns
- **Agentic AI**: Specialized agents per analysis task
- **Type Safety**: Full TypeScript coverage
- **Error Boundaries**: Graceful degradation
- **Structured Logging**: Pino-based logging
- **Health Checks**: `/api/health` endpoint

---

## 6. User Journeys

### Journey 1: Cold Start → Discovery

**User**: Sarah, 34, VC investor

1. **Day 1**: Lands on home page, sees "Discovery Mode — Day 1 of 7"
2. **Interaction**: Reads 3 articles on AI, 2 on climate, 1 on finance
3. **Day 3**: Returns, sees progress bar at 42%
4. **Day 7**: Completes discovery, calibration complete
5. **Day 8**: Personalized feed active, AI learns her preference for AI/climate

### Journey 2: Daily Reading Habit

**User**: Mark, 42, Tech CEO

1. **Morning**: Opens NEWTS, scans hero article
2. **Filtering**: Clicks "Artificial Intelligence" topic
3. **Saving**: Saves breakthrough article to "AI Strategy" board
4. **Sharing**: Exports board to PDF for team meeting
5. **Evening**: Receives email digest of top 5 signals

---

## 7. Success Metrics

### North Star Metric
**"Weekly Active Readers with ≥5 Articles"**
- Target: 1,000 by Month 3
- Target: 10,000 by Month 6

### Product Metrics
| Metric | Target (M3) | Target (M6) |
|--------|-------------|-------------|
| DAU/MAU ratio | 20% | 30% |
| Avg articles read/session | 5 | 8 |
| Discovery completion rate | 60% | 75% |
| Board creation rate | 15% | 25% |
| Email open rate | 40% | 50% |

### Quality Metrics
- Strategic accuracy: User ratings match AI scores ≥80%
- Topic diversity: Users see ≥8 topics/week
- Discovery value: Post-discovery retention ↑40%

---

## 8. Go-to-Market Strategy

### Phase 1: Private Beta (Month 1-2)
- **Target**: 100 selected users (VCs, founders, executives)
- **Acquisition**: Direct outreach, LinkedIn, product hunt
- **Goal**: Validate product-market fit, gather feedback

### Phase 2: Public Launch (Month 3)
- **Channels**: Product Hunt, Hacker News, Twitter (AI Twitter)
- **Pricing**: Freemium
  - Free: 10 articles/day, discovery mode
  - Pro: Unlimited, boards, notifications ($9/mo)
  - Team: Collaborative features ($29/mo)

### Phase 3: Growth (Month 4-6)
- **Content marketing**: "State of AI" weekly reports
- **Partnerships**: Newsletter integrations
- **SEO**: "AI news tracker", "strategic intelligence tool"

---

## 9. Risks & Mitigation

### Risk 1: AI Accuracy
**Risk**: Low-quality analysis, wrong strategic scores
**Mitigation**:
- Human-in-the-loop validation (first 1,000 articles)
- User feedback integration (disagree button)
- Continuous prompt engineering

### Risk 2: Discovery Mode Drop-off
**Risk**: Users churn before day 7
**Mitigation**:
- Reduce discovery to 5 days (A/B test)
- Show "personalization preview" at day 3
- Allow manual "skip discovery" (with disclaimer)

### Risk 3: Content Supply
**Risk**: Not enough high-quality articles
**Mitigation**:
- Start with 10 trusted sources (TechCrunch, Wired, etc.)
- RSS feed integration
- User-suggested sources (with moderation)

---

## 10. Dependencies & Constraints

### Technical Dependencies
- DeepSeek API uptime and rate limits
- Supabase free tier limits (upgrade at 1K users)
- Vercel deployment quotas

### Resource Constraints
- **Team**: 1 full-time developer + AI consultant
- **Budget**: $500/mo (AI + infrastructure)
- **Timeline**: MVP in 6 weeks, full launch in 12 weeks

---

## 11. Future Vision

### 12-Month Roadmap

**Q2 2026**: Foundation
- ✅ MVP (Discovery + Personalization)
- ✅ AI analysis pipeline
- ✅ Basic UI/UX

**Q3 2026**: Engagement
- Boards & Collections
- Email notifications
- Mobile apps (iOS/Android)

**Q4 2026**: Intelligence
- Analytics dashboard
- Trend prediction
- API for developers

**Q1 2027**: Ecosystem
- Team collaboration
- Enterprise features
- White-label solution

### Exit Strategy
- **Acquisition targets**: Bloomberg, Reuters, Perplexity AI
- **Revenue target**: $1M ARR by Month 18
- **User target**: 50K paying users

---

## 12. Appendix

### Competitive Analysis Matrix
| Competitor | Strength | Weakness | NEWTS Advantage |
|------------|----------|----------|-----------------|
| Google News | Breadth | No analysis | Strategic scoring |
| Morning Brew | Curation quality | Static content | AI personalization |
| Perplexity | AI search | Not news-focused | News-optimized agents |
| Feedly | Customization | Manual setup | Cold-start ready |

### AI Agent Prompts
See: `/lib/deepseek/agents.ts` for full prompt specifications

### Database Schema
See: `/lib/db/types.ts` for complete schema definition

---

**Document Owner**: Product Team
**Last Updated**: 2026-02-13
**Next Review**: 2026-02-20
