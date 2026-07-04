import { useState } from 'react'
import { FiArrowRight, FiCheck } from 'react-icons/fi'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <section className="section-pad mx-auto max-w-5xl pb-24">
      <div className="relative overflow-hidden rounded-[2rem] bg-clay-500 px-8 py-14 text-center text-white sm:px-16">
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
        <div className="absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-white/10" />
        <h2 className="relative font-display text-3xl font-semibold sm:text-4xl">Get 15% off your first design</h2>
        <p className="relative mt-3 text-clay-50/90">Drop your email for studio tips, drops, and exclusive offers.</p>
        {submitted ? (
          <div className="relative mx-auto mt-7 flex max-w-md items-center justify-center gap-2 rounded-full bg-white/15 py-3.5 font-medium">
            <FiCheck /> You're on the list — check your inbox.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="relative mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-full border-0 bg-white/95 px-5 py-3.5 text-sm text-ink-900 outline-none placeholder:text-ink-400 focus:ring-2 focus:ring-white"
            />
            <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-ink-950 px-6 py-3.5 font-semibold text-white transition hover:bg-ink-800 active:scale-95">
              Subscribe <FiArrowRight />
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
