import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHeart } from 'react-icons/fi'
import StarRating from './StarRating.jsx'
import { useWishlist } from '../../context/WishlistContext.jsx'
import { colors } from '../../data/products.js'

export default function ProductCard({ product, index = 0 }) {
  const { isWishlisted, toggleWishlist } = useWishlist()
  const wishlisted = isWishlisted(product.id)

  const swatch = (name) => colors.find((c) => c.name === name)?.hex || '#ccc'

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.05 }}
      className="group relative"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-2xl bg-ink-100 dark:bg-ink-800 aspect-[4/5]">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
          {product.trending && (
            <span className="absolute left-3 top-3 stitch-border bg-white/80 dark:bg-ink-900/80 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-clay-600 dark:text-clay-400">
              Trending
            </span>
          )}
          <button
            onClick={(e) => {
              e.preventDefault()
              toggleWishlist(product)
            }}
            aria-label="Toggle wishlist"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 dark:bg-ink-900/80 backdrop-blur transition hover:scale-110"
          >
            <FiHeart size={15} className={wishlisted ? 'fill-clay-500 text-clay-500' : 'text-ink-600 dark:text-ink-300'} />
          </button>
        </div>
        <div className="mt-3 flex items-start justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold text-ink-900 dark:text-white">{product.name}</h3>
            <p className="mt-1 text-xs text-ink-400">{product.category}</p>
          </div>
          <span className="font-mono text-sm font-semibold text-clay-600 dark:text-clay-400">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <StarRating rating={product.rating} reviews={product.reviews} />
          <div className="flex -space-x-1.5">
            {product.colors.slice(0, 4).map((c) => (
              <span
                key={c}
                className="h-3.5 w-3.5 rounded-full border-2 border-white dark:border-ink-900"
                style={{ backgroundColor: swatch(c) }}
              />
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
