import { motion } from 'framer-motion'
import SectionHeading from '../common/SectionHeading.jsx'
import StarRating from '../common/StarRating.jsx'
import { reviews } from '../../data/products.js'

export default function CustomerReviews() {
  return (
    <section className="section-pad mx-auto max-w-7xl py-20">
      <SectionHeading eyebrow="Loved By Makers" title="What customers are saying" align="center" />
      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {reviews.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="glass flex flex-col gap-4 rounded-2xl p-6"
          >
            <StarRating rating={r.rating} />
            <p className="text-sm leading-relaxed text-ink-600 dark:text-ink-300">“{r.text}”</p>
            <div className="mt-auto flex items-center gap-3 pt-2">
              <img src={r.avatar} alt={r.name} className="h-9 w-9 rounded-full object-cover" />
              <div>
                <p className="text-sm font-semibold text-ink-900 dark:text-white">{r.name}</p>
                <p className="text-xs text-ink-400">{r.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
