import { Link } from 'react-router-dom'
import { FiInstagram, FiTwitter, FiYoutube, FiMail } from 'react-icons/fi'

const columns = [
  {
    title: 'Shop',
    links: [
      { label: 'Oversized Tees', to: '/shop?category=Oversized' },
      { label: 'Hoodies', to: '/shop?category=Hoodies' },
      { label: 'New Arrivals', to: '/shop' },
      { label: 'Design Studio', to: '/design-studio' }
    ]
  },
  {
    title: 'Support',
    links: [
      { label: 'Track Order', to: '/track-order' },
      { label: 'Size Guide', to: '/shop' },
      { label: 'Returns', to: '/' },
      { label: 'Contact Us', to: '/' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About ThreadCraft', to: '/' },
      { label: 'Sustainability', to: '/' },
      { label: 'Careers', to: '/' },
      { label: 'Press', to: '/' }
    ]
  }
]

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-ink-200 dark:border-ink-800 bg-ink-50 dark:bg-ink-950">
      <div className="section-pad mx-auto max-w-7xl py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <span className="font-display text-2xl font-semibold text-ink-900 dark:text-white">
              Thread<span className="text-clay-500">Craft</span>
            </span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-500 dark:text-ink-400">
              Premium blank apparel and a real-time design studio — print what you imagine, shipped in days.
            </p>
            <div className="mt-5 flex gap-3">
              {[FiInstagram, FiTwitter, FiYoutube, FiMail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-300 dark:border-ink-700 text-ink-500 dark:text-ink-400 transition hover:border-clay-400 hover:text-clay-500"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="label-tag mb-4">{col.title}</p>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-ink-600 dark:text-ink-300 hover:text-clay-500 transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ink-200 dark:border-ink-800 pt-6 text-xs text-ink-400 sm:flex-row">
          <p>© {new Date().getFullYear()} ThreadCraft Studio. All rights reserved.</p>
          <p className="font-mono">Made for makers, worn by everyone.</p>
        </div>
      </div>
    </footer>
  )
}
