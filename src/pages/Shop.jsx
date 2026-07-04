import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FiSearch, FiFilter, FiX } from 'react-icons/fi'
import ProductCard from '../components/common/ProductCard.jsx'
import { ProductGridSkeleton } from '../components/common/Skeletons.jsx'
import { products, categories } from '../data/products.js'

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' }
]

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const query = searchParams.get('q') || ''
  const category = searchParams.get('category') || 'All'
  const sort = searchParams.get('sort') || 'featured'
  const maxPrice = Number(searchParams.get('maxPrice') || 60)

  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [query, category, sort, maxPrice])

  const update = (key, value) => {
    const next = new URLSearchParams(searchParams)
    if (!value || value === 'All') next.delete(key)
    else next.set(key, value)
    setSearchParams(next)
  }

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.price <= maxPrice)
    if (category !== 'All') list = list.filter((p) => p.category === category)
    if (query) {
      const q = query.toLowerCase()
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
    }
    switch (sort) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price)
        break
      case 'rating':
        list = [...list].sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }
    return list
  }, [query, category, sort, maxPrice])

  const FiltersPanel = () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="label-tag mb-3">Category</p>
        <div className="flex flex-col gap-1">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => update('category', c)}
              className={`rounded-lg px-3 py-2 text-left text-sm transition ${
                category === c
                  ? 'bg-clay-500/10 font-semibold text-clay-600 dark:text-clay-400'
                  : 'text-ink-600 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="label-tag mb-3">Max Price — ${maxPrice}</p>
        <input
          type="range"
          min="15"
          max="60"
          value={maxPrice}
          onChange={(e) => update('maxPrice', e.target.value)}
          className="w-full accent-clay-500"
        />
        <div className="mt-1 flex justify-between text-xs text-ink-400">
          <span>$15</span>
          <span>$60</span>
        </div>
      </div>
    </div>
  )

  return (
    <div className="section-pad mx-auto max-w-7xl py-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="label-tag mb-2 text-clay-500">Catalog</p>
          <h1 className="font-display text-3xl font-semibold text-ink-900 dark:text-white sm:text-4xl">Shop all products</h1>
        </div>
        <p className="text-sm text-ink-400">{filtered.length} products</p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" size={16} />
          <input
            value={query}
            onChange={(e) => update('q', e.target.value)}
            placeholder="Search products…"
            className="input-field pl-10"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => update('sort', e.target.value)}
          className="input-field sm:w-56"
        >
          {sortOptions.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
        <button onClick={() => setFiltersOpen(true)} className="btn-secondary lg:hidden">
          <FiFilter size={15} /> Filters
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">
          <FiltersPanel />
        </aside>

        <div>
          {loading ? (
            <ProductGridSkeleton />
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-300 dark:border-ink-700 py-24 text-center">
              <p className="font-display text-xl text-ink-700 dark:text-ink-200">No products found</p>
              <p className="mt-1 text-sm text-ink-400">Try adjusting your filters or search term.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filters drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div onClick={() => setFiltersOpen(false)} className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm" />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] overflow-y-auto bg-white dark:bg-ink-900 p-6">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-display text-xl font-semibold">Filters</span>
              <button onClick={() => setFiltersOpen(false)} className="btn-ghost !p-2"><FiX size={18} /></button>
            </div>
            <FiltersPanel />
            <button onClick={() => setFiltersOpen(false)} className="btn-primary mt-8 w-full">Show {filtered.length} results</button>
          </div>
        </div>
      )}
    </div>
  )
}
