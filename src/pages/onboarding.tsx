import Link from 'next/link'

export default function OnboardingPage() {
  const topics = [
    { id: '1', slug: 'technology', name: 'Tecnología', icon: '💻', color: '#3b82f6' },
    { id: '2', slug: 'science', name: 'Ciencia', icon: '🔬', color: '#10b981' },
    { id: '3', slug: 'business', name: 'Negocios', icon: '💼', color: '#f59e0b' },
    { id: '4', slug: 'ai', name: 'Inteligencia Artificial', icon: '🤖', color: '#8b5cf6' },
    { id: '5', slug: 'sports', name: 'Deportes', icon: '⚽', color: '#ef4444' },
    { id: '6', slug: 'politics', name: 'Política', icon: '🏛️', color: '#dc2626' },
    { id: '7', slug: 'entertainment', name: 'Entretenimiento', icon: '🎬', color: '#8b5cf6' },
    { id: '8', slug: 'health', name: 'Salud', icon: '🏥', color: '#10b981' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">📰</span>
              <span className="text-xl font-bold text-white">NEWTS</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/topics" className="text-slate-300 hover:text-white transition-colors">
                Topics
              </Link>
              <Link href="/boards" className="text-slate-300 hover:text-white transition-colors">
                Boards
              </Link>
            </nav>

            {/* CTA */}
            <div className="flex items-center gap-4">
              <Link
                href="/api/auth/signup"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Sign Up
              </Link>
              <Link
                href="/api/auth/login"
                className="text-slate-300 hover:text-white px-4 py-2 font-medium transition-colors"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Selecciona tus <span className="text-transparent bg-clip-text text-gradient-to-r from-purple-400 to-pink-600 bg-gradient-to-r bg-gradient-to-r from-purple-400 to-pink-600">intereses</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Elegí al menos 3 categorías para personalizar tu feed de noticias
          </p>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-12">
          {topics.map((topic) => (
            <button
              key={topic.id}
              className="group relative bg-slate-800/50 backdrop-blur rounded-2xl p-8 border-2 border-slate-700/50 hover:border-purple-500/50 transition-all hover:scale-105"
              style={{ '--topic-color': topic.color }}
            >
              <div className="text-5xl mb-4">{topic.icon}</div>
              <h3 className="text-xl font-semibold text-white capitalize mb-2 group-hover:text-purple-400">
                {topic.name}
              </h3>
              <p className="text-sm text-slate-400 capitalize">
                {topic.slug}
              </p>

              {/* Selection indicator */}
              <div className="absolute top-4 right-4 w-6 h-6 rounded-full border-2 border-slate-600 bg-slate-900/50 hidden group-[&[data-selected='true']]:block">
                <svg className="w-full h-full text-purple-400" fill="none" viewBox="0 0 24 24" strokeWidth="3">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none"/>
                  <path d="M9 12l2 2 4-2a1 1 0 011-2 2 0 0112 0 0112 0s2-4.293 2 0-2.586-3-071a1 1 0 011.573 0-012.002 0z" stroke="currentColor" strokeWidth="3" fill="none"/>
                </svg>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Counter */}
        <div id="selected-count" className="text-center mb-8">
          <p className="text-slate-400 mb-2">Seleccionados: <span id="count" className="text-purple-400 font-semibold">0</span>/3</p>
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <button
            id="continue-btn"
            disabled
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all"
            onClick={() => {
              // Simular selección y navegación
              window.location.href = '/boards'
            }}
          >
            Continuar →
          </button>
          <p className="text-slate-500 text-sm mt-4">
            Necesitas seleccionar al menos 3 topics para continuar
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900/50 border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© 2026 NEWTS. Noticias personalizadas con IA.</p>
        </div>
      </footer>

      {/* Interactive Script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          const selectedTopics = new Set();
          const minSelection = 3;
          const topics = document.querySelectorAll('button[class*="group"]');
          const countEl = document.getElementById('count');
          const continueBtn = document.getElementById('continue-btn');
          const selectedCountEl = document.getElementById('selected-count');

          topics.forEach(topic => {
            topic.addEventListener('click', () => {
              const topicId = topic.getAttribute('data-topic-id') || topic.querySelector('h3').textContent.toLowerCase();

              if (selectedTopics.has(topicId) && !topic.classList.contains('ring-2'))) {
                selectedTopics.add(topicId);
                topic.classList.add('ring-2', 'border-purple-500');
                topic.setAttribute('data-selected', 'true');
              } else if (!selectedTopics.has(topicId)) {
                selectedTopics.delete(topicId);
                topic.classList.remove('ring-2', 'border-purple-500');
                topic.setAttribute('data-selected', 'false');
              }

              updateUI();
            });
          });

          function updateUI() {
            const count = selectedTopics.size;
            countEl.textContent = count;

            if (count >= minSelection) {
              continueBtn.disabled = false;
              selectedCountEl.classList.remove('hidden');
              selectedCountEl.innerHTML = 'Seleccionados: <span class="text-purple-400 font-semibold">' + count + '</span>/3';
            } else {
              continueBtn.disabled = true;
              selectedCountEl.innerHTML = 'Seleccionados: <span class="text-purple-400 font-semibold">' + count + '</span>/3';
            }
          }
        `
      }} />
    </div>
  )
}
