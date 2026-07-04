import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiUploadCloud } from 'react-icons/fi'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-950 text-white">
      <div className="grain absolute inset-0" style={{ '--grain-image': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")" }} />
      <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-clay-500/20 blur-3xl animate-float" />
      <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-moss-500/10 blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="section-pad relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="stitch-border inline-flex items-center gap-2 px-3 py-1.5 text-clay-300 font-mono text-[11px] uppercase tracking-[0.18em]">
            Print-on-demand, made personal
          </span>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Your art.
            <br />
            <span className="text-clay-400">Their fabric.</span>
          </h1>
          <p className="mt-6 max-w-md text-ink-300 text-lg">
            Upload artwork, drop in text, and watch it land on a real shirt in real time — then have it on your
            doorstep in days.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link to="/design-studio" className="btn-primary">
              <FiUploadCloud /> Start Designing
            </Link>
            <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-clay-300 transition-colors">
              Browse Catalog <FiArrowRight />
            </Link>
          </div>
          <div className="mt-12 flex items-center gap-8 text-sm text-ink-400">
            <div>
              <p className="font-display text-2xl font-semibold text-white">40k+</p>
              <p>Designs printed</p>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <p className="font-display text-2xl font-semibold text-white">4.8/5</p>
              <p>Average rating</p>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <p className="font-display text-2xl font-semibold text-white">3–5d</p>
              <p>Ship time</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="glass relative rounded-[2rem] p-6">
            <img
              src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=700&q=80"
              alt="Custom printed oversized tee"
              className="w-full rounded-2xl object-cover aspect-[4/5]"
            />
            <div className="absolute -bottom-6 -left-6 stitch-border bg-ink-950/90 px-4 py-3 text-white backdrop-blur">
              <p className="font-mono text-[10px] uppercase tracking-wider text-clay-300">Live Preview</p>
              <p className="font-display text-lg">Heavyweight Oversized Tee</p>
            </div>
          </div>
          <div className="absolute -right-4 top-10 hidden rotate-3 stitch-border bg-clay-500/90 px-3 py-2 text-xs font-semibold text-white sm:block">
            ✓ Front + Back printing
          </div>
        </motion.div>
      </div>
    </section>
  )
}
