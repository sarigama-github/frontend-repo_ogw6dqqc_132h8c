import { useEffect, useState } from 'react'

export default function Resources() {
  const [data, setData] = useState({ resources: [], tips: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${base}/api/resources`)
        if (!res.ok) throw new Error('Failed to load resources')
        const json = await res.json()
        setData(json)
      } catch (e) {
        setError('Unable to load resources right now.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <section id="resources" className="px-6 py-12"><p>Loading resources…</p></section>
  if (error) return <section id="resources" className="px-6 py-12"><p className="text-red-600">{error}</p></section>

  return (
    <section id="resources" className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="text-2xl font-bold text-gray-900">Helpful resources</h2>
      <p className="text-gray-600 mt-2">Credible articles, guides, and tools.</p>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.resources.map((r) => (
          <a key={r.title} href={r.url} target="_blank" rel="noreferrer" className="block rounded-xl bg-white p-5 shadow ring-1 ring-slate-200 hover:ring-indigo-300 transition">
            <p className="text-sm text-indigo-700 font-medium">{r.category}</p>
            <p className="mt-1 font-semibold text-slate-900">{r.title}</p>
            <p className="mt-2 text-slate-600 text-sm">{r.description}</p>
          </a>
        ))}
      </div>

      <div className="mt-12">
        <h3 className="font-semibold text-gray-900">Quick tips</h3>
        <ul className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {data.tips.map((t, i) => (
            <li key={i} className="rounded-lg bg-gradient-to-br from-white to-slate-50 p-4 ring-1 ring-slate-200 text-slate-700">{t}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
