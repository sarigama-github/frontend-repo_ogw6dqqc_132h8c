import { useMemo, useState } from 'react'

const QUESTIONS = [
  'I found it hard to wind down today.',
  'I felt down or hopeless.',
  'I felt anxious or on edge.',
  'I had trouble sleeping or staying asleep.',
  'I felt tired or had low energy.',
  'I had little interest or pleasure in doing things.',
]

const OPTIONS = [
  { label: 'Not at all', value: 0 },
  { label: 'Several days', value: 1 },
  { label: 'More than half the days', value: 2 },
  { label: 'Nearly every day', value: 3 },
]

export default function Quiz() {
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null))
  const [result, setResult] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const canSubmit = useMemo(() => answers.every(a => a !== null), [answers])

  const select = (qi, val) => {
    const next = [...answers]
    next[qi] = val
    setAnswers(next)
  }

  const submit = async () => {
    setSubmitting(true)
    try {
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${base}/api/quiz`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      })
      if (!res.ok) throw new Error('Failed to score quiz')
      const json = await res.json()
      setResult(json)
    } catch (e) {
      setResult({ error: 'Unable to score your check‑in right now.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h2 className="text-2xl font-bold text-gray-900">1‑minute check‑in</h2>
      <p className="text-gray-600 mt-2">Select what best describes your day.</p>

      <div className="mt-8 space-y-6">
        {QUESTIONS.map((q, qi) => (
          <div key={qi} className="rounded-xl bg-white p-5 shadow ring-1 ring-slate-200">
            <p className="font-medium text-slate-900">{q}</p>
            <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {OPTIONS.map((o) => (
                <button
                  key={o.value}
                  className={`px-3 py-2 rounded-lg border text-sm transition ${answers[qi] === o.value ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-700 border-slate-300 hover:border-indigo-400'}`}
                  onClick={() => select(qi, o.value)}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button
          disabled={!canSubmit || submitting}
          onClick={submit}
          className={`px-5 py-3 rounded-lg font-medium shadow transition ${canSubmit ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-slate-200 text-slate-500 cursor-not-allowed'}`}
        >
          {submitting ? 'Scoring…' : 'See my check‑in'}
        </button>
        {result && !result.error && (
          <p className="text-slate-700">Score: <span className="font-semibold">{result.score}</span> • Level: <span className="font-semibold">{result.level}</span> — {result.suggestion}</p>
        )}
        {result && result.error && (
          <p className="text-red-600">{result.error}</p>
        )}
      </div>
    </section>
  )
}
