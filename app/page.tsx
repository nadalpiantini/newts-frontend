'use client'

import { useState, useEffect } from 'react'
import { BookOpen, TrendingUp, Brain, Sparkles, Zap } from 'lucide-react'

interface Article {
  id: string
  title: string
  url: string
  description: string
  topic: string
  source: string
  strategic_impact: number
  novelty_score: number
  momentum: 'rising' | 'stable' | 'declining'
  sector: string
  why_it_matters: string
}

interface FeedResponse {
  mode: 'discovery' | 'personalized'
  day_of_journey: number
  calibration_progress: number
  articles: Article[]
  diversity_metrics: {
    topics_seen: number
    variety_score: number
    affinity_active: boolean
  }
}

// ============================================================================
// DATOS MOCK INTEGRADOS (Standalone - Sin backend)
// ============================================================================

const MOCK_USER_ID = 'local_standalone_user'

const MOCK_FEED: FeedResponse = {
  mode: 'discovery',
  day_of_journey: 3,
  calibration_progress: 42.85,
  articles: [
    {
      id: '1',
      title: 'The Race for Vertical AI Agents Has Begun',
      url: 'https://stratech.com/vertical-ai-agents',
      description: 'Startups are abandoning generalist LLMs for domain-specific models. What this means for enterprise procurement.',
      topic: 'ai',
      source: 'Tech Strategy Review',
      strategic_impact: 89,
      novelty_score: 92,
      momentum: 'rising',
      sector: 'Artificial Intelligence',
      why_it_matters: 'Vertical agents will determine which companies survive AI winter.'
    },
    {
      id: '2',
      title: 'Semiconductor Supply Chains Realigning to Southeast Asia',
      url: 'https://hardware-insights.com/chips-supabase',
      description: 'Taiwan dependency drops 40% as Vietnam and Malaysia capture fabrication capacity.',
      topic: 'tech',
      source: 'Hardware Insights',
      strategic_impact: 76,
      novelty_score: 68,
      momentum: 'stable',
      sector: 'Hardware',
      why_it_matters: 'Geopolitical tech dependence is hidden variable in every AI strategy.'
    },
    {
      id: '3',
      title: 'Why 2026 Is Inflection Point for Fusion Energy',
      url: 'https://energy-policy.com/fusion-inflection',
      description: 'Three private companies achieved net energy gain. Regulatory frameworks are forming.',
      topic: 'energy',
      source: 'Energy Policy Review',
      strategic_impact: 81,
      novelty_score: 88,
      momentum: 'rising',
      sector: 'Energy',
      why_it_matters: 'First-mover advantage in fusion IP determines next century\'s energy hegemony.'
    },
    {
      id: '4',
      title: 'Central Banks Are Preparing for Digital Currency War',
      url: 'https://monetary-observer.com/cbdc-digital-currency',
      description: 'Fed and ECB pilots accelerate as BRICS announces alternative settlement system.',
      topic: 'markets',
      source: 'Monetary Observer',
      strategic_impact: 84,
      novelty_score: 71,
      momentum: 'rising',
      sector: 'Finance',
      why_it_matters: 'Currency competition will fragment global payment rails within 18 months.'
    },
    {
      id: '5',
      title: 'CRISPR 2.0: Gene Editing Moves From Cure to Enhancement',
      url: 'https://bio-frontiers.com/crispr-enhancement',
      description: 'New delivery vectors enable precise germline editing. Ethical frameworks absent.',
      topic: 'science',
      source: 'Bio Frontiers',
      strategic_impact: 77,
      novelty_score: 94,
      momentum: 'rising',
      sector: 'Biotechnology',
      why_it_matters: 'The line between therapy and enhancement is about to blur permanently.'
    },
    {
      id: '6',
      title: 'Latam Startup Ecosystem Hits $50B Valuation Mark',
      url: 'https://emerging-markets.com/latam-unicorns',
      description: 'Brazil and Colombia lead regional unicorn growth. Fintech and climate tech dominate.',
      topic: 'business',
      source: 'Emerging Markets',
      strategic_impact: 65,
      novelty_score: 59,
      momentum: 'rising',
      sector: 'Venture Capital',
      why_it_matters: 'The next decade\'s billion-dollar companies are being built in Spanish now.'
    },
    {
      id: '7',
      title: 'US-China Tech Decoupling Enters Phase 3: Scientific Collateral Damage',
      url: 'https://geopolitics-monitor.com/us-china-decoupling',
      description: 'Joint research projects decline 80%. Academic papers drop across physics, materials science.',
      topic: 'geopolitics',
      source: 'Geopolitics Monitor',
      strategic_impact: 91,
      novelty_score: 73,
      momentum: 'stable',
      sector: 'International Relations',
      why_it_matters: 'Science is no longer neutral. Every collaboration is now a strategic choice.'
    },
    {
      id: '8',
      title: 'Why Your Company Needs a Chief AI Officer This Year',
      url: 'https://hbr.org/caio-role',
      description: 'AI adoption is no longer technical problem. It\'s organizational design problem.',
      topic: 'ai',
      source: 'Harvard Business Review',
      strategic_impact: 72,
      novelty_score: 55,
      momentum: 'stable',
      sector: 'Management',
      why_it_matters: 'Companies without AI governance will face existential liability questions by 2027.'
    }
  ],
  diversity_metrics: {
    topics_seen: 8,
    variety_score: 9.2,
    affinity_active: false
  }
}

// ============================================================================
// COMPONENTES UI (Extracted para reutilización)
// ============================================================================

const DiscoveryBanner = ({ feed, userName }: { feed: FeedResponse; userName: string }) => (
  <div className="bg-gradient-to-r from-purple-950/30 via-amber-950/20 to-stone-950/30 border-b border-stone-800">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-amber-400" />
          <div>
            <p className="text-sm font-semibold text-stone-200 tracking-wide">
              DISCOVERY MODE — Day {feed.day_of_journey} of 7
            </p>
            <p className="text-xs text-stone-500 font-light mt-0.5">
              Learning your interests through pure exploration
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-stone-100 tabular-nums">
            {Math.round(feed.calibration_progress)}%
          </div>
          <div className="w-40 h-2 bg-stone-800 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-yellow-500 to-emerald-500 transition-all duration-700 ease-out"
              style={{ width: `${feed.calibration_progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
)

const HeroArticle = ({ article }: { article: Article }) => {
  const getMomentumColor = (momentum: string) => {
    switch (momentum) {
      case 'rising': return 'text-emerald-400'
      case 'stable': return 'text-stone-400'
      case 'declining': return 'text-rose-400'
      default: return 'text-stone-500'
    }
  }

  const getImpactColor = (score: number) => {
    if (score >= 85) return 'text-purple-300'
    if (score >= 70) return 'text-blue-300'
    if (score >= 50) return 'text-amber-300'
    return 'text-stone-400'
  }

  return (
    <article className="mb-16 lg:mb-20 group cursor-pointer">
      {/* Article Header */}
      <div className="flex items-center gap-2 mb-4 text-xs text-stone-500 uppercase tracking-wider font-medium">
        <span className="bg-stone-900 px-2.5 py-1 rounded-full text-amber-200 border border-stone-800/30">
          {article.topic}
        </span>
        <span>•</span>
        <span>{article.source}</span>
        <span>•</span>
        <span className="flex items-center gap-1">
          {article.momentum === 'rising' && <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />}
          <span className="capitalize font-medium">{article.momentum}</span>
        </span>
      </div>

      {/* Headline */}
      <a
        href={article.url}
        target="_blank"
        className="block group-hover:no-underline"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-stone-100 leading-[1.15] mb-6 tracking-tight group-hover:text-stone-200 transition-colors">
          {article.title}
        </h1>
      </a>

      {/* Description */}
      <p className="text-lg sm:text-xl text-stone-300 leading-relaxed mb-8 max-w-4xl font-light">
        {article.description}
      </p>

      {/* Why This Matters Block */}
      <div className="bg-stone-900/50 border-l-4 border-amber-600 pl-6 pr-8 py-6 mb-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-600 to-transparent opacity-20" />

        <p className="text-sm text-stone-500 uppercase tracking-wider font-semibold mb-3 font-medium relative z-10">
          Why this matters
        </p>
        <p className="text-base sm:text-lg text-stone-200 italic leading-relaxed font-light">
          &ldquo;{article.why_it_matters}&rdquo;
        </p>
      </div>

      {/* Strategic Metrics */}
      <div className="flex items-start gap-6 text-sm font-medium text-stone-500">
        <div className="flex items-center gap-2">
          <span>Strategic Impact:</span>
          <span className={`text-xl font-bold tabular-nums ${getImpactColor(article.strategic_impact)}`}>
            {article.strategic_impact}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span>Novelty:</span>
          <span className={`text-xl font-bold tabular-nums ${getImpactColor(article.novelty_score)}`}>
            {article.novelty_score}
          </span>
        </div>
      </div>
    </article>
  )
}

const SignalCard = ({ article }: { article: Article }) => {
  const getMomentumColor = (momentum: string) => {
    switch (momentum) {
      case 'rising': return 'text-emerald-400'
      case 'stable': return 'text-stone-400'
      case 'declining': return 'text-rose-400'
      default: return 'text-stone-500'
    }
  }

  return (
    <article className="bg-stone-900/40 border border-stone-800 p-5 lg:p-6 rounded-xl hover:shadow-lg hover:border-stone-700 hover:bg-stone-800/50 transition-all duration-300 group">
      {/* Article Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 text-xs text-stone-500 uppercase tracking-wider font-medium">
          <span className="bg-stone-900 px-2 py-0.5 rounded text-neutral-400">
            {article.topic}
          </span>
          <span>•</span>
          <span className="text-stone-600">{article.source}</span>
          <span>•</span>
          {article.momentum === 'rising' && (
            <TrendingUp className="w-3 h-3 text-emerald-400" />
          )}
        </div>
        <Zap className="w-4 h-4 text-stone-600 group-hover:text-stone-500" />
      </div>

      {/* Title */}
      <a
        href={article.url}
        target="_blank"
        className="block"
      >
        <h3 className="text-base sm:text-lg font-bold text-stone-200 mb-3 leading-snug group-hover:text-stone-100 transition-colors">
          {article.title}
        </h3>
      </a>

      {/* Description */}
      <p className="text-sm text-stone-400 leading-relaxed mb-4 line-clamp-3 font-light">
        {article.description}
      </p>

      {/* Why It Matters Quote */}
      <div className="pt-4 border-t border-stone-800/50">
        <p className="text-xs text-stone-500 italic font-light leading-relaxed">
          &ldquo;{article.why_it_matters}&rdquo;
        </p>
      </div>

      {/* Footer Metrics */}
      <div className="mt-4 flex items-center justify-between text-xs font-medium text-stone-600">
        <div className="flex items-center gap-3">
          <span>Impact: <strong className="text-stone-400">{article.strategic_impact}</strong></span>
          <span>Novelty: <strong className="text-stone-400">{article.novelty_score}</strong></span>
        </div>
        <span className="text-stone-700 font-light">{article.source}</span>
      </div>
    </article>
  )
}

const DiversityMetrics = ({ feed }: { feed: FeedResponse }) => (
  <div className="bg-stone-900/60 border border-stone-800 rounded-xl p-6 lg:p-8">
    <h3 className="text-sm font-semibold text-stone-400 mb-4 font-sans uppercase tracking-wider">
      Today&rsquo;s Diversity
    </h3>
    <div className="flex items-center gap-8">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-stone-500">Variety Score</span>
          <span className="text-2xl sm:text-3xl font-bold text-stone-100 tabular-nums">
            {feed.diversity_metrics.variety_score.toFixed(1)}/10
          </span>
        </div>
        <div className="h-2 bg-stone-800 rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 transition-all duration-700 ease-out"
            style={{ width: `${feed.diversity_metrics.variety_score * 10}%` }}
          ></div>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-stone-500">Topics Explored</span>
          <span className="text-2xl sm:text-3xl font-bold text-stone-100 tabular-nums">
            {feed.diversity_metrics.topics_seen}
          </span>
        </div>
        <p className="text-xs text-stone-600 font-light leading-relaxed mt-2">
          {feed.mode === 'discovery'
            ? 'Maximum diversity during discovery week. Explore broadly to train your profile.'
            : 'Personalized with controlled diversity. 70% learned affinity + 30% discovery expansion.'
          }
        </p>
      </div>
    </div>
  </div>
)

// ============================================================================
// PÁGINA PRINCIPAL
// ============================================================================

export default function HomePage() {
  const [feed, setFeed] = useState<FeedResponse | null>(null)
  const [loading, setLoading] = useState(false)

  // Simular fetch con data mock
  useEffect(() => {
    async function loadMockData() {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 500))

      // Generar día aleatorio para variedad
      const randomDay = Math.floor(Math.random() * 7) + 1
      const progress = (randomDay / 7) * 100

      setFeed({
        ...MOCK_FEED,
        day_of_journey: randomDay,
        calibration_progress: progress
      })
      setLoading(false)
    }

    loadMockData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-pulse text-6xl mb-4">🧠</div>
          <p className="text-stone-400 text-lg font-light">Calibrating your intelligence profile...</p>
        </div>
      </div>
    )
  }

  if (!feed) return null

  const heroArticle = feed.articles[0]
  const signalArticles = feed.articles.slice(1)

  return (
    <div className="min-h-screen bg-stone-950 font-serif">
      {/* Header */}
      <header className="border-b border-stone-800 bg-stone-950/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Brain className="w-7 h-7 text-stone-400" />
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-stone-100">
                  NEWTS
                </h1>
                <p className="text-xs text-stone-500 font-light tracking-wide">
                  Intelligence for Restless
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-stone-500">
                <span>📊 STANDALONE MODE</span>
                <span className="text-xs text-stone-600">No backend required</span>
              </div>
              <button
                onClick={() => {
                  setFeed(null)
                  setLoading(true)
                  setTimeout(() => loadMockData(), 100)
                }}
                className="text-xs font-medium text-stone-400 hover:text-stone-300 transition-colors"
              >
                ↻ Reload
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Discovery Mode Banner */}
      <DiscoveryBanner feed={feed} userName={MOCK_USER_ID} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        {/* Hero Article */}
        {heroArticle && (
          <HeroArticle article={heroArticle} />
        )}

        {/* Divider */}
        <div className="relative my-12 lg:my-16">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-stone-800"></div>
            <div className="bg-stone-950 px-4">
              <span className="text-sm font-semibold text-stone-500 uppercase tracking-wider bg-stone-950">
                Additional Signals
              </span>
            </div>
          </div>
        </div>

        {/* Signals Grid */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-300 mb-8 flex items-center gap-3">
            Additional Signals
            <span className="text-sm font-normal text-stone-600">
              ({feed.diversity_metrics.topics_seen} topics explored today)
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {signalArticles.map((article) => (
              <SignalCard key={article.id} article={article} />
            ))}
          </div>
        </div>

        {/* Diversity Metrics */}
        <DiversityMetrics feed={feed} />
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-800 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="text-center space-y-3">
              <p className="text-sm font-medium text-stone-500">
                Intelligence for Restless
              </p>
              <p className="text-xs text-stone-600 font-light">
                Cold Start Authentic — No Manipulation
              </p>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <p className="text-xs text-stone-600 font-light">
                  Mode: <span className="font-semibold text-stone-500">{feed.mode}</span>
                </p>
                <p className="text-xs text-stone-600 font-light">
                  Journey: Day <span className="font-semibold text-stone-400">{feed.day_of_journey}</span> of 7
                </p>
              </div>
              <div className="text-stone-700">
                Refresh ↻
              </div>
            </div>
          </div>
          <p className="text-xs text-stone-700 mt-4 font-sans">
            Built with Next.js 16 + React 19 + Tailwind CSS
          </p>
          <p className="text-xs text-stone-600 font-light">
            {feed.mode === 'discovery'
              ? `Discovery mode ends in ${7 - feed.day_of_journey} days`
              : 'Personalization active'
            }
          </p>
        </div>
      </footer>
    </div>
  )
}

// ============================================================================
// FUNCIONES HELPER (eliminadas para simplificar)
// ============================================================================

function getMomentumColor(momentum: string): string {
  switch (momentum) {
    case 'rising': return 'text-emerald-400'
    case 'stable': return 'text-stone-400'
    case 'declining': return 'text-rose-400'
    default: return 'text-stone-500'
  }
}

function getImpactColor(score: number): string {
  if (score >= 85) return 'text-purple-300'
  if (score >= 70) return 'text-blue-300'
  if (score >= 50) return 'text-amber-300'
  return 'text-stone-400'
}
