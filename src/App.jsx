import { useRef, useState } from 'react'
import Hero from './components/Hero'
import Resources from './components/Resources'
import Quiz from './components/Quiz'
import Footer from './components/Footer'

function App() {
  const [showQuiz, setShowQuiz] = useState(false)
  const resourcesRef = useRef(null)

  const startQuiz = () => {
    setShowQuiz(true)
    setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 0)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <div className="font-extrabold tracking-tight text-indigo-700">Mindful</div>
          <nav className="hidden sm:flex gap-6 text-sm">
            <a href="#resources" className="hover:text-indigo-700">Resources</a>
            <a href="#quiz" className="hover:text-indigo-700">Check‑in</a>
            <a href="#help" className="hover:text-indigo-700">Helplines</a>
          </nav>
        </div>
      </header>

      <main>
        <Hero onStart={startQuiz} />
        <Resources ref={resourcesRef} />
        <section id="help" className="mx-auto max-w-6xl px-6 py-16">
          <Helplines />
        </section>
        <section id="quiz" className="bg-gradient-to-b from-white to-indigo-50">
          {showQuiz && <Quiz />}
        </section>
      </main>

      <Footer />
    </div>
  )
}

function Helplines() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  const load = async () => {
    try {
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${base}/api/helplines`)
      if (!res.ok) throw new Error('Failed')
      const json = await res.json()
      setItems(json.helplines || [])
    } catch (e) {
      setError('Unable to load helplines right now.')
    }
  }

  useState(() => { load() }, [])

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900">If you need urgent support</h2>
      <p className="text-gray-600 mt-2">You are not alone. Free, confidential help is available.</p>
      {error && <p className="text-red-600 mt-3">{error}</p>}
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((h) => (
          <a key={h.name} href={h.url} target="_blank" rel="noreferrer" className="block rounded-xl bg-white p-5 shadow ring-1 ring-slate-200 hover:ring-indigo-300 transition">
            <p className="text-sm text-indigo-700 font-medium">{h.region}</p>
            <p className="mt-1 font-semibold text-slate-900">{h.name}</p>
            <p className="mt-2 text-slate-600 text-sm">{h.contact}</p>
          </a>
        ))}
      </div>
    </div>
  )
}

export default App
