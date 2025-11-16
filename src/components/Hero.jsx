import { motion } from 'framer-motion'

export default function Hero({ onStart }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-sky-100 to-indigo-100" />
      <div className="relative mx-auto max-w-6xl px-6 py-20 flex flex-col lg:flex-row items-center gap-10">
        <div className="flex-1">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900"
          >
            Your Mind Matters
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
            className="mt-4 text-lg text-gray-700 max-w-2xl"
          >
            Learn, reflect, and find support. This space offers gentle guidance, credible resources, and quick tools to help you care for your mental well‑being.
          </motion.p>
          <div className="mt-8 flex gap-4">
            <button onClick={onStart} className="px-5 py-3 rounded-lg bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 transition">
              Take a 1‑minute check‑in
            </button>
            <a href="#resources" className="px-5 py-3 rounded-lg bg-white text-indigo-700 font-medium shadow ring-1 ring-indigo-200 hover:ring-indigo-300 transition">
              Explore resources
            </a>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <div className="relative rounded-2xl bg-white/70 backdrop-blur p-6 shadow-xl ring-1 ring-black/5">
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
              {['Breathe', 'Move', 'Connect', 'Nourish', 'Rest', 'Reflect'].map((k) => (
                <div key={k} className="rounded-lg bg-gradient-to-br from-white to-slate-50 p-4 ring-1 ring-slate-200">
                  <p className="font-semibold text-slate-800">{k}</p>
                  <p className="text-slate-600 mt-1">Small steps add up.</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
