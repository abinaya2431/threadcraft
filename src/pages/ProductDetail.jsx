import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHeart, FiShoppingBag, FiChevronLeft, FiMinus, FiPlus, FiEdit3 } from 'react-icons/fi'
import { products, colors, sizes } from '../data/products.js'
import StarRating from '../components/common/StarRating.jsx'
import ProductCard from '../components/common/ProductCard.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'
import { useToast } from '../context/ToastContext.jsx'

export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find((p) => p.id === id)
  const { addToCart } = useCart()
  const { toggleWishlist, isWishlisted } = useWishlist()
  const { showToast } = useToast()

  const [activeImage, setActiveImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '')
  const [selectedSize, setSelectedSize] = useState('')
  const [qty, setQty] = useState(1)

  if (!product) {
    return (
      <div className="section-pad mx-auto max-w-7xl py-32 text-center">
        <p className="font-display text-2xl text-ink-500">Product not found.</p>
        <Link to="/shop" className="btn-primary mt-6 inline-flex">Back to Shop</Link>
      </div>
    )
  }

  const swatch = (name) => colors.find((c) => c.name === name)?.hex || '#ccc'

  const handleAddToCart = () => {
    if (!selectedSize) { showToast('Please select a size', 'info'); return }
    addToCart({
      id: `${product.id}-${selectedColor}-${selectedSize}`,
      productId: product.id,
      name: product.name,
      image: product.images[0],
      price: product.price,
      color: selectedColor,
      size: selectedSize,
      quantity: qty
    })
    showToast(`${product.name} added to cart`)
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="section-pad mx-auto max-w-7xl py-10">
      <Link to="/shop" className="inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-clay-500 transition-colors mb-8">
        <FiChevronLeft size={15} /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Images */}
        <div className="flex flex-col gap-3">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="overflow-hidden rounded-2xl bg-ink-100 dark:bg-ink-800 aspect-square"
          >
            <img src={product.images[activeImage]} alt={product.name} className="h-full w-full object-cover" />
          </motion.div>
          <div className="flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`h-20 w-20 overflow-hidden rounded-xl border-2 transition ${
                  activeImage === i ? 'border-clay-500' : 'border-transparent'
                }`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-5">
          <div>
            <p className="label-tag mb-2 text-clay-500">{product.category}</p>
            <h1 className="font-display text-3xl font-semibold text-ink-900 dark:text-white sm:text-4xl">{product.name}</h1>
            <div className="mt-3 flex items-center gap-4">
              <StarRating rating={product.rating} reviews={product.reviews} size={15} />
              <span className="font-display text-2xl font-semibold text-clay-600 dark:text-clay-400">
                ${product.price.toFixed(2)}
              </span>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-ink-600 dark:text-ink-300">{product.description}</p>

          {/* Color */}
          <div>
            <p className="label-tag mb-3">Color — <span className="text-ink-600 dark:text-ink-300 normal-case tracking-normal">{selectedColor}</span></p>
            <div className="flex gap-2 flex-wrap">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  title={c}
                  className={`h-8 w-8 rounded-full border-2 transition hover:scale-110 ${
                    selectedColor === c ? 'border-clay-500 ring-2 ring-clay-500/40' : 'border-white dark:border-ink-700'
                  }`}
                  style={{ backgroundColor: swatch(c) }}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div>
            <p className="label-tag mb-3">Size</p>
            <div className="flex flex-wrap gap-2">
              {sizes.filter((s) => product.sizes.includes(s)).map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`h-10 min-w-[42px] rounded-lg border px-3 text-sm font-semibold transition ${
                    selectedSize === s
                      ? 'border-clay-500 bg-clay-500 text-white'
                      : 'border-ink-300 dark:border-ink-600 text-ink-700 dark:text-ink-200 hover:border-clay-400'
                  } ${!product.sizes.includes(s) ? 'opacity-30 cursor-not-allowed' : ''}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <p className="label-tag mb-3">Quantity</p>
            <div className="inline-flex items-center gap-3 rounded-xl border border-ink-200 dark:border-ink-700 p-1">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="btn-ghost !p-2 !rounded-lg"><FiMinus size={14} /></button>
              <span className="w-8 text-center font-semibold">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="btn-ghost !p-2 !rounded-lg"><FiPlus size={14} /></button>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button onClick={handleAddToCart} className="btn-primary flex-1 py-3.5">
              <FiShoppingBag /> Add to Cart — ${(product.price * qty).toFixed(2)}
            </button>
            <button onClick={() => { toggleWishlist(product); showToast(isWishlisted(product.id) ? 'Removed from wishlist' : 'Added to wishlist') }} className="btn-secondary !px-4">
              <FiHeart className={isWishlisted(product.id) ? 'fill-clay-500 text-clay-500' : ''} />
            </button>
            <Link to={`/design-studio?base=${product.id}`} className="btn-secondary !px-4">
              <FiEdit3 size={16} />
            </Link>
          </div>

          <div className="stitch-border p-4 text-sm text-ink-600 dark:text-ink-300 space-y-1.5">
            <p>✓ Free shipping on orders over $50</p>
            <p>✓ Printed & shipped within 24 hours</p>
            <p>✓ 30-day no-fuss returns</p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="font-display text-2xl font-semibold text-ink-900 dark:text-white mb-8">You might also like</h2>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      )}
    </div>
  )
}
