import SectionHeading from '../common/SectionHeading.jsx'
import { products } from '../../data/products.js'
import { Link } from 'react-router-dom'

export default function TrendingDesigns() {
  const trending = products.filter((p) => p.trending)
  const loop = [...trending, ...trending]

  return (
    <section className="bg-ink-100 dark:bg-ink-900 py-20 overflow-hidden">
      <div className="section-pad mx-auto max-w-7xl">
        <SectionHeading eyebrow="What's Hot" title="Trending designs this week" align="center" />
      </div>
      <div className="relative mt-12">
        <div className="flex w-max animate-marquee gap-5">
          {loop.map((p, i) => (
            <Link
              to={`/product/${p.id}`}
              key={`${p.id}-${i}`}
              className="group relative w-64 shrink-0 overflow-hidden rounded-2xl"
            >
              <img src={p.images[0]} alt={p.name} className="h-80 w-64 object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="font-display text-lg">{p.name}</p>
                <p className="font-mono text-xs text-clay-300">${p.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
