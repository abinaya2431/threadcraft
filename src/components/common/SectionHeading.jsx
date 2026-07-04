import { motion } from 'framer-motion'

export default function SectionHeading({ eyebrow, title, subtitle, align = 'left' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className={align === 'center' ? 'text-center mx-auto max-w-xl' : ''}
    >
      {eyebrow && <p className="label-tag mb-3 text-clay-500">{eyebrow}</p>}
      <h2 className="font-display text-3xl font-semibold tracking-tight text-ink-900 dark:text-white sm:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-ink-500 dark:text-ink-400">{subtitle}</p>}
    </motion.div>
  )
}
