import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSearch, FiPackage, FiTruck, FiMapPin, FiCheckCircle, FiClock } from 'react-icons/fi'
import { sampleOrders } from '../data/products.js'

const STATUSES = ['Processing', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered']
const STATUS_ICONS = [FiClock, FiPackage, FiTruck, FiMapPin, FiCheckCircle]

function getStatusIndex(status) {
  return STATUSES.findIndex((s) => s === status)
}

export default function TrackOrder() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState(null)
  const [notFound, setNotFound] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    const found = sampleOrders.find((o) => o.id.toLowerCase() === query.trim().toLowerCase())
    if (found) { setResult(found); setNotFound(false) }
    else { setResult(null); setNotFound(true) }
  }

  const statusIdx = result ? getStatusIndex(result.status) : -1

  return (
    <div className="section-pad mx-auto max-w-3xl py-16">
      <p className="label-tag mb-2 text-clay-500">Order Tracking</p>
      <h1 className="font-display text-3xl font-semibold text-ink-900 dark:text-white mb-8 sm:text-4xl">
        Where's my order?
      </h1>

      <form onSubmit={handleSearch} className="flex gap-3">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" size={16} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter order ID (e.g. TC-10293)"
            className="input-field pl-11"
          />
        </div>
        <button type="submit" className="btn-primary px-6">Track</button>
      </form>

      <p className="mt-2 text-xs text-ink-400">Try: TC-10293, TC-10101, or TC-09988</p>

      {notFound && (
        <div className="mt-8 rounded-2xl border border-dashed border-ink-300 dark:border-ink-700 py-12 text-center">
          <p className="font-display text-xl text-ink-500">No order found for "{query}"</p>
          <p className="mt-1 text-sm text-ink-400">Double-check your order ID and try again.</p>
        </div>
      )}

      {result && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-10 flex flex-col gap-6">
          {/* Order meta */}
          <div className="glass rounded-2xl p-6 flex flex-wrap gap-6 justify-between">
            <div>
              <p className="label-tag mb-1">Order ID</p>
              <p className="font-mono font-semibold text-ink-900 dark:text-white text-lg">{result.id}</p>
            </div>
            <div>
              <p className="label-tag mb-1">Placed</p>
              <p className="font-semibold">{new Date(result.date).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' })}</p>
            </div>
            <div>
              <p className="label-tag mb-1">Total</p>
              <p className="font-mono font-semibold text-clay-600 dark:text-clay-400">${result.total.toFixed(2)}</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="glass rounded-2xl p-6">
            <h2 className="font-display text-lg font-semibold mb-7 text-ink-900 dark:text-white">Shipment Status</h2>
            <div className="relative flex flex-col gap-0">
              {STATUSES.map((s, i) => {
                const Icon = STATUS_ICONS[i]
                const done = i <= statusIdx
                const active = i === statusIdx
                return (
                  <div key={s} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <motion.div
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: i * 0.08 }}
                        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                          active
                            ? 'border-clay-500 bg-clay-500 text-white shadow-lg shadow-clay-500/30'
                            : done
                            ? 'border-moss-500 bg-moss-500 text-white'
                            : 'border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 text-ink-400'
                        }`}
                      >
                        <Icon size={16} />
                      </motion.div>
                      {i < STATUSES.length - 1 && (
                        <div className={`w-0.5 h-10 my-1 transition-colors ${done ? 'bg-moss-400' : 'bg-ink-200 dark:bg-ink-700'}`} />
                      )}
                    </div>
                    <div className="pb-2 pt-2">
                      <p className={`font-semibold text-sm ${active ? 'text-clay-600 dark:text-clay-400' : done ? 'text-ink-700 dark:text-ink-200' : 'text-ink-400'}`}>{s}</p>
                      {active && <p className="text-xs text-ink-400 mt-0.5">Current status</p>}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Items */}
          <div className="glass rounded-2xl p-6">
            <h2 className="font-display text-lg font-semibold mb-4 text-ink-900 dark:text-white">Items</h2>
            <div className="flex flex-col gap-3">
              {result.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="h-14 w-14 rounded-xl object-cover" />
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-ink-400">Qty: {item.qty}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
