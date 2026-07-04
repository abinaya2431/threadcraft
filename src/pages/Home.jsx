import Hero from '../components/layout/Hero.jsx'
import FeaturedProducts from '../components/layout/FeaturedProducts.jsx'
import TrendingDesigns from '../components/layout/TrendingDesigns.jsx'
import CustomerReviews from '../components/layout/CustomerReviews.jsx'
import Newsletter from '../components/layout/Newsletter.jsx'
import { FiUploadCloud, FiEdit3, FiTruck } from 'react-icons/fi'

const steps = [
  { icon: FiUploadCloud, title: 'Upload your art', text: 'PNG or JPG, drag it straight onto the shirt canvas.' },
  { icon: FiEdit3, title: 'Position & personalize', text: 'Resize, rotate, add custom text in any font and color.' },
  { icon: FiTruck, title: 'We print & ship', text: 'Production starts within 24 hours, delivered in 3–5 days.' }
]

export default function Home() {
  return (
    <div>
      <Hero />

      <section className="section-pad mx-auto max-w-7xl py-20">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {steps.map((s, i) => (
            <div key={i} className="stitch-border p-6 text-ink-700 dark:text-ink-200">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-clay-500/10 text-clay-600 dark:text-clay-400">
                <s.icon size={18} />
              </div>
              <p className="mt-4 font-display text-lg font-semibold text-ink-900 dark:text-white">{s.title}</p>
              <p className="mt-1.5 text-sm text-ink-500 dark:text-ink-400">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <FeaturedProducts />
      <TrendingDesigns />
      <CustomerReviews />
      <Newsletter />
    </div>
  )
}
