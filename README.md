# NEWTS - Intelligence for Restless Minds

A sophisticated news intelligence platform powered by DeepSeek AI, built with Next.js 15, React 19, and Supabase.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Configure environment
cp .env.local.example .env.local
# Edit .env.local with your API keys

# Run development server
npm run dev

# Open http://localhost:3000
```

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 15 (App Router) + React 19
- **Styling**: Tailwind CSS + shadcn/ui components
- **Database**: Supabase (PostgreSQL)
- **AI**: DeepSeek API for news analysis
- **Testing**: Vitest (unit) + Playwright (E2E)

### Project Structure
```
newts/frontend/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── articles/      # Article endpoints
│   │   ├── topics/        # Topic endpoints
│   │   └── users/         # User endpoints
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── lib/                   # Core libraries
│   ├── deepseek/          # DeepSeek AI integration
│   │   ├── client.ts      # API client
│   │   └── agents.ts      # AI analysis agents
│   ├── db/                # Database layer
│   │   ├── supabase.ts    # Supabase client
│   │   └── types.ts       # TypeScript types
│   ├── cache/             # Caching layer
│   └── monitoring/        # Logging & monitoring
│       └── logger.ts      # Structured logging
├── tests/                 # Test suite
│   ├── unit/              # Vitest unit tests
│   ├── e2e/               # Playwright E2E tests
│   └── helpers/           # Test utilities
└── public/                # Static assets
```

## 🤖 DeepSeek AI Integration

### Agents
The platform uses specialized AI agents for news analysis:

1. **Strategic Analyst**: Evaluates strategic importance (0-100 score)
2. **Topic Classifier**: Assigns precise topic categories
3. **Summarizer**: Creates concise, factual summaries

### Usage Example
```typescript
import { analyzeArticle } from '@/lib/deepseek/agents'

const analysis = await analyzeArticle({
  title: "AI Breakthrough in Quantum Computing",
  description: "Researchers achieve..."
})

// Returns:
// {
//   strategic_impact: 89,
//   novelty_score: 92,
//   momentum: "rising",
//   sector: "Artificial Intelligence",
//   why_it_matters: "...",
//   topic: "Artificial Intelligence"
// }
```

## 🗄️ Database Schema

### Tables
- `newts_topics`: Topic categories (AI, Climate, Finance, etc.)
- `newts_articles`: News articles with AI analysis
- `newts_boards`: User-created boards for saving articles

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests with UI
npm run test:ui

# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui
```

## 📊 Monitoring

Structured logging is implemented across the application:

```typescript
import { logger } from '@/lib/monitoring/logger'

logger.info('Article analyzed', { articleId: '123' })
logger.error('Analysis failed', { error: 'API timeout' })
```

## 🔒 Environment Variables

Required environment variables (see `.env.local.example`):

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
- `DEEPSEEK_API_KEY`: Your DeepSeek API key

## 🚀 Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📚 Blueprint Standards

This project follows the **Professional SaaS with AI Blueprint**:

- ✅ Type-safe database layer
- ✅ Structured error handling
- ✅ Comprehensive testing
- ✅ Monitoring & logging
- ✅ AI agent architecture
- ✅ Clean code principles

## 📝 License

MIT
