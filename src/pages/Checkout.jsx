import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCreditCard, FiPackage, FiCheck, FiLock } from 'react-icons/fi'
import { useCart } from '../context/CartContext.jsx'

const PAYMENT_METHODS = [
  { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
  { id: 'upi', label: 'UPI / Net Banking', icon: '🏦' },
  { id: 'cod', label: 'Cash on Delivery', icon: '💵' }
]

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart()
  const [step, setStep] = useState(1) // 1 = address, 2 = payment, 3 = confirmed
  const [payMethod, setPayMethod] = useState('card')
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', pincode: '', state: '' })

  const shipping = subtotal >= 50 ? 0 : 5.99
  const tax = subtotal * 0.08
  const total = subtotal + tax + shipping

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const handleConfirm = () => {
    setStep(3)
    clearCart()
  }

  if (step === 3) {
    return (
      <div className="section-pad mx-auto max-w-lg py-32 flex flex-col items-center text-center gap-5">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
          className="h-20 w-20 rounded-full bg-moss-500 flex items-center justify-center">
          <FiCheck size={36} className="text-white" />
        </motion.div>
        <h1 className="font-display text-3xl font-semibold text-ink-900 dark:text-white">Order Confirmed!</h1>
        <p className="text-ink-500">We've received your order and printing starts within 24 hours.</p>
        <div className="stitch-border w-full p-5 text-sm text-left space-y-1.5">
          <p className="font-semibold">Order #TC-{Math.floor(10000 + Math.random() * 90000)}</p>
          <p className="text-ink-400">Estimated delivery: 3–5 business days</p>
        </div>
        <div className="flex gap-3">
          <Link to="/track-order" className="btn-primary">Track Order</Link>
          <Link to="/shop" className="btn-secondary">Continue Shopping</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="section-pad mx-auto max-w-6xl py-10">
      <h1 className="font-display text-3xl font-semibold text-ink-900 dark:text-white mb-8">Checkout</h1>

      {/* Steps */}
      <div className="flex items-center gap-3 mb-10">
        {['Shipping', 'Payment'].map((s, i) => (
          <div key={s} className="flex items-center gap-3">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition ${step === i + 1 ? 'bg-clay-500 text-white' : step > i + 1 ? 'bg-moss-500 text-white' : 'bg-ink-200 dark:bg-ink-700 text-ink-500'}`}>
              {step > i + 1 ? <FiCheck size={14} /> : i + 1}
            </div>
            <span className={`text-sm font-medium ${step === i + 1 ? 'text-ink-900 dark:text-white' : 'text-ink-400'}`}>{s}</span>
            {i < 1 && <div className="h-px w-12 bg-ink-200 dark:bg-ink-700" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="addr" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                <h2 className="font-display text-xl font-semibold mb-5">Shipping Address</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {[['name','Full Name'],['email','Email'],['phone','Phone'],['address','Street Address'],['city','City'],['state','State'],['pincode','PIN / ZIP']].map(([k, label]) => (
                    <div key={k} className={k === 'address' ? 'sm:col-span-2' : ''}>
                      <label className="label-tag mb-1.5 block">{label}</label>
                      <input value={form[k]} onChange={(e) => set(k, e.target.value)} className="input-field" placeholder={label} />
                    </div>
                  ))}
                </div>
                <button onClick={() => setStep(2)} className="btn-primary mt-6 px-8">Continue to Payment</button>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="pay" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                <h2 className="font-display text-xl font-semibold mb-5">Payment Method</h2>
                <div className="flex flex-col gap-3">
                  {PAYMENT_METHODS.map((m) => (
                    <button key={m.id} onClick={() => setPayMethod(m.id)}
                      className={`flex items-center gap-4 rounded-xl border-2 p-4 text-left transition ${payMethod === m.id ? 'border-clay-500 bg-clay-500/5' : 'border-ink-200 dark:border-ink-700 hover:border-clay-300'}`}>
                      <span className="text-2xl">{m.icon}</span>
                      <span className="font-semibold">{m.label}</span>
                      <div className={`ml-auto h-5 w-5 rounded-full border-2 flex items-center justify-center ${payMethod === m.id ? 'border-clay-500 bg-clay-500' : 'border-ink-300'}`}>
                        {payMethod === m.id && <div className="h-2 w-2 rounded-full bg-white" />}
                      </div>
                    </button>
                  ))}
                </div>
                {payMethod === 'card' && (
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="label-tag mb-1.5 block">Card Number</label>
                      <input placeholder="•••• •••• •••• ••••" className="input-field" />
                    </div>
                    <div><label className="label-tag mb-1.5 block">Expiry</label><input placeholder="MM / YY" className="input-field" /></div>
                    <div><label className="label-tag mb-1.5 block">CVV</label><input placeholder="•••" className="input-field" /></div>
                  </div>
                )}
                <div className="mt-6 flex gap-3">
                  <button onClick={() => setStep(1)} className="btn-secondary">← Back</button>
                  <button onClick={handleConfirm} className="btn-primary flex-1 flex items-center justify-center gap-2">
                    <FiLock size={14} /> Place Order — ${total.toFixed(2)}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Order summary sidebar */}
        <div className="glass rounded-2xl p-6 h-fit flex flex-col gap-4">
          <h3 className="font-display font-semibold">Order Summary</h3>
          <div className="flex flex-col gap-3 max-h-48 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3 items-center">
                <img src={item.image} alt={item.name} className="h-12 w-12 rounded-lg object-cover shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <p className="text-xs text-ink-400">{item.color} · {item.size} × {item.quantity}</p>
                </div>
                <span className="ml-auto font-mono text-sm shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="h-px bg-ink-200 dark:bg-ink-700" />
          <div className="flex flex-col gap-1.5 text-sm">
            <div className="flex justify-between"><span className="text-ink-500">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-ink-500">Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
            <div className="flex justify-between"><span className="text-ink-500">Tax</span><span>${tax.toFixed(2)}</span></div>
            <div className="flex justify-between font-semibold mt-1 text-base"><span>Total</span><span className="text-clay-600">${total.toFixed(2)}</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
