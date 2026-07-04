import { Link } from 'react-router-dom'
import SectionHeading from '../common/SectionHeading.jsx'
import ProductCard from '../common/ProductCard.jsx'
import { products } from '../../data/products.js'

export default function FeaturedProducts() {
  const featured = products.slice(0, 4)
  return (
    <section className="section-pad mx-auto max-w-7xl py-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow="Best Sellers" title="Featured products" subtitle="Premium blanks our community reaches for again and again." />
        <Link to="/shop" className="btn-secondary">View all</Link>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {featured.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  )
}
