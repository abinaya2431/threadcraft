import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiUser, FiShoppingBag, FiHeart, FiEdit3, FiSave } from 'react-icons/fi'
import { useWishlist } from '../context/WishlistContext.jsx'
import StarRating from '../components/common/StarRating.jsx'
import { sampleOrders } from '../data/products.js'

const STATUS_COLOR = {
  Processing: 'bg-clay-500/10 text-clay-600',
  Packed: 'bg-clay-500/10 text-clay-600',
  Shipped: 'bg-moss-500/10 text-moss-600',
  'Out for Delivery': 'bg-moss-500/10 text-moss-600',
  Delivered: 'bg-moss-600/10 text-moss-700 dark:text-moss-400'
}

const TABS = [
  { id: 'profile', label: 'Profile', icon: FiUser },
  { id: 'orders', label: 'Orders', icon: FiShoppingBag },
  { id: 'wishlist', label: 'Wishlist', icon: FiHeart },
  { id: 'designs', label: 'Saved Designs', icon: FiEdit3 }
]

export default function Profile() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get('tab') || 'profile'
  const { wishlist, toggleWishlist } = useWishlist()
  const [editing, setEditing] = useState(false)
  const [profile, setProfile] = useState({ name: 'Alex Rivera', email: 'alex@example.com', phone: '+1 555 0192', city: 'San Francisco, CA' })

  const setTab = (t) => setSearchParams({ tab: t })

  return (
    <div className="section-pad mx-auto max-w-6xl py-10">
      <div className="flex flex-wrap items-center gap-5 mb-10">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-clay-500 text-3xl font-display font-semibold text-white select-none">
          {profile.name.charAt(0)}
        </div>
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-white">{profile.name}</h1>
          <p className="text-sm text-ink-400">{profile.email}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto pb-1 border-b border-ink-200 dark:border-ink-800 mb-8">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 whitespace-nowrap rounded-t-lg px-4 py-2.5 text-sm font-medium transition ${
              activeTab === t.id
                ? 'border-b-2 border-clay-500 text-clay-600 dark:text-clay-400'
                : 'text-ink-500 hover:text-ink-800 dark:hover:text-ink-200'
            }`}
          >
            <t.icon size={14} /> {t.label}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-xl">
          <div className="glass rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">Personal Info</h2>
              <button onClick={() => setEditing((e) => !e)} className="btn-ghost text-sm gap-1.5">
                {editing ? <FiSave size={14} /> : <FiEdit3 size={14} />}
                {editing ? 'Save' : 'Edit'}
              </button>
            </div>
            {Object.entries(profile).map(([k, v]) => (
              <div key={k}>
                <p className="label-tag mb-1 capitalize">{k}</p>
                {editing
                  ? <input value={v} onChange={(e) => setProfile((p) => ({ ...p, [k]: e.target.value }))} className="input-field" />
                  : <p className="font-medium text-ink-800 dark:text-ink-100">{v}</p>
                }
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4">
          {sampleOrders.map((order) => (
            <div key={order.id} className="glass rounded-2xl p-5 flex flex-wrap gap-5 items-start justify-between">
              <div className="flex gap-4">
                <img src={order.items[0].image} alt="" className="h-16 w-16 rounded-xl object-cover" />
                <div>
                  <p className="font-mono font-semibold text-ink-900 dark:text-white">{order.id}</p>
                  <p className="text-xs text-ink-400 mt-0.5">{new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                  <p className="text-sm mt-1 text-ink-500">{order.items.length} item{order.items.length > 1 ? 's' : ''}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_COLOR[order.status] || 'bg-ink-100 text-ink-500'}`}>{order.status}</span>
                <p className="font-mono font-semibold text-clay-600 dark:text-clay-400">${order.total.toFixed(2)}</p>
                <Link to="/track-order" className="text-xs text-clay-500 hover:underline">Track</Link>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Wishlist Tab */}
      {activeTab === 'wishlist' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {wishlist.length === 0 ? (
            <div className="flex flex-col items-center py-24 gap-3 text-center">
              <span className="text-5xl">🤍</span>
              <p className="font-display text-xl text-ink-500">No saved items yet</p>
              <Link to="/shop" className="btn-primary mt-2">Browse Products</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {wishlist.map((p) => (
                <div key={p.id} className="group relative">
                  <Link to={`/product/${p.id}`}>
                    <div className="relative overflow-hidden rounded-2xl bg-ink-100 dark:bg-ink-800 aspect-[4/5]">
                      <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-semibold">{p.name}</p>
                      <StarRating rating={p.rating} />
                      <p className="font-mono text-sm text-clay-600 dark:text-clay-400">${p.price.toFixed(2)}</p>
                    </div>
                  </Link>
                  <button
                    onClick={() => toggleWishlist(p)}
                    className="mt-2 text-xs text-red-400 hover:text-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Saved Designs Tab */}
      {activeTab === 'designs' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center py-24 gap-3 text-center">
          <span className="text-5xl">🎨</span>
          <p className="font-display text-xl text-ink-500">No saved designs yet</p>
          <p className="text-sm text-ink-400">Designs you save in the studio will appear here.</p>
          <Link to="/design-studio" className="btn-primary mt-2">Open Design Studio</Link>
        </motion.div>
      )}
    </div>
  )
}
