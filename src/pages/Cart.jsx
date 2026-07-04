import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiTrash2, FiMinus, FiPlus, FiTag, FiArrowRight } from 'react-icons/fi'
import { useCart } from '../context/CartContext.jsx'
import { useToast } from '../context/ToastContext.jsx'

const SHIPPING = 5.99
const TAX_RATE = 0.08
const VALID_COUPONS = { THREAD15: 0.15, FIRST10: 0.10 }

export default function Cart() {
  const { items, removeFromCart, updateQuantity, subtotal, clearCart } = useCart()
  const { showToast } = useToast()
  const [coupon, setCoupon] = useState('')
  const [discount, setDiscount] = useState(0)
  const [appliedCoupon, setAppliedCoupon] = useState('')

  const applyCoupon = () => {
    const rate = VALID_COUPONS[coupon.toUpperCase()]
    if (rate) {
      setDiscount(rate)
      setAppliedCoupon(coupon.toUpperCase())
      showToast(`Coupon applied — ${rate * 100}% off!`)
    } else {
      showToast('Invalid coupon code', 'info')
    }
  }

  const discountAmt = subtotal * discount
  const shipping = subtotal === 0 ? 0 : subtotal >= 50 ? 0 : SHIPPING
  const tax = (subtotal - discountAmt) * TAX_RATE
  const total = subtotal - discountAmt + tax + shipping

  if (items.length === 0) {
    return (
      <div className="section-pad mx-auto max-w-7xl py-32 flex flex-col items-center text-center gap-4">
        <div className="h-24 w-24 rounded-full bg-ink-100 dark:bg-ink-800 flex items-center justify-center text-4xl">🛍️</div>
        <h2 className="font-display text-2xl font-semibold">Your cart is empty</h2>
        <p className="text-ink-500">Add something custom — or browse our catalog.</p>
        <div className="flex gap-3 mt-2">
          <Link to="/design-studio" className="btn-primary">Design a Tee</Link>
          <Link to="/shop" className="btn-secondary">Browse Shop</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="section-pad mx-auto max-w-7xl py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-semibold text-ink-900 dark:text-white">Shopping Cart <span className="text-ink-400 text-xl">({items.length})</span></h1>
        <button onClick={() => { clearCart(); showToast('Cart cleared') }} className="text-xs text-ink-400 hover:text-red-500 transition">Clear all</button>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-4">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div key={item.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                className="glass flex gap-4 rounded-2xl p-4">
                <img src={item.image} alt={item.name} className="h-24 w-24 rounded-xl object-cover shrink-0" />
                <div className="flex flex-1 flex-col gap-1 min-w-0">
                  <p className="font-semibold text-ink-900 dark:text-white truncate">{item.name}</p>
                  <p className="text-xs text-ink-400">{item.color} · {item.size} {item.customDesign && '· Custom Print'}</p>
                  <p className="font-mono font-semibold text-clay-600 dark:text-clay-400">${item.price.toFixed(2)}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 rounded-lg border border-ink-200 dark:border-ink-700 p-0.5">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="btn-ghost !p-1.5 !rounded-md"><FiMinus size={12} /></button>
                      <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="btn-ghost !p-1.5 !rounded-md"><FiPlus size={12} /></button>
                    </div>
                    <button onClick={() => { removeFromCart(item.id); showToast('Item removed') }} className="btn-ghost !p-2 text-red-400 hover:text-red-600">
                      <FiTrash2 size={15} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="flex flex-col gap-4">
          <div className="glass rounded-2xl p-6 flex flex-col gap-4">
            <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-white">Order Summary</h2>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between"><span className="text-ink-500">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              {discount > 0 && <div className="flex justify-between text-moss-600"><span>Discount ({appliedCoupon})</span><span>−${discountAmt.toFixed(2)}</span></div>}
              <div className="flex justify-between"><span className="text-ink-500">Shipping</span><span>{shipping === 0 ? '🎉 Free' : `$${shipping.toFixed(2)}`}</span></div>
              <div className="flex justify-between"><span className="text-ink-500">Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
              <div className="h-px bg-ink-200 dark:bg-ink-700 my-1" />
              <div className="flex justify-between font-semibold text-base"><span>Total</span><span className="text-clay-600 dark:text-clay-400">${total.toFixed(2)}</span></div>
            </div>

            {/* Coupon */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" size={14} />
                <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Coupon code" className="input-field pl-9 !py-2.5 text-sm" />
              </div>
              <button onClick={applyCoupon} className="btn-secondary !px-4 !py-2.5 text-sm shrink-0">Apply</button>
            </div>
            <p className="text-xs text-ink-400">Try THREAD15 or FIRST10</p>

            <Link to="/checkout" className="btn-primary w-full py-3.5 text-center">
              Checkout <FiArrowRight />
            </Link>
            {subtotal < 50 && <p className="text-center text-xs text-ink-400">Add ${(50 - subtotal).toFixed(2)} more for free shipping</p>}
          </div>
          <Link to="/shop" className="btn-ghost text-center text-sm">← Continue Shopping</Link>
        </div>
      </div>
    </div>
  )
}
