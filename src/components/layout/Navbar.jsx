import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiShoppingBag, FiHeart, FiUser, FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi'
import { useCart } from '../../context/CartContext.jsx'
import { useWishlist } from '../../context/WishlistContext.jsx'
import { useTheme } from '../../context/ThemeContext.jsx'

const links = [
  { to: '/shop', label: 'Shop' },
  { to: '/design-studio', label: 'Design Studio' },
  { to: '/track-order', label: 'Track Order' }
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const { itemCount } = useCart()
  const { wishlist } = useWishlist()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/shop?q=${encodeURIComponent(query)}`)
    setOpen(false)
  }

  return (
    <header className="sticky top-0 z-50">
      <div className="glass border-b border-white/20 dark:border-white/5">
        <nav className="section-pad mx-auto flex h-16 max-w-7xl items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="font-display text-2xl font-semibold tracking-tight text-ink-900 dark:text-white">
              Thread<span className="text-clay-500">Craft</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-clay-500/10 text-clay-600 dark:text-clay-400'
                      : 'text-ink-600 hover:text-clay-600 dark:text-ink-300 dark:hover:text-clay-400'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xs items-center">
            <div className="relative w-full">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" size={16} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search designs, tees…"
                className="input-field !py-2 pl-9 text-sm"
              />
            </div>
          </form>

          <div className="flex items-center gap-1">
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="btn-ghost !p-2.5"
            >
              {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
            <Link to="/profile?tab=wishlist" className="btn-ghost relative !p-2.5">
              <FiHeart size={18} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-clay-500 text-[10px] font-bold text-white">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="btn-ghost relative !p-2.5">
              <FiShoppingBag size={18} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-clay-500 text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </Link>
            <Link to="/profile" className="btn-ghost hidden sm:inline-flex !p-2.5">
              <FiUser size={18} />
            </Link>
            <button onClick={() => setOpen(true)} className="btn-ghost !p-2.5 lg:hidden" aria-label="Open menu">
              <FiMenu size={18} />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-ink-950/50 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed right-0 top-0 z-50 h-full w-72 bg-white dark:bg-ink-900 p-6 shadow-glass-dark lg:hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-display text-xl font-semibold">Menu</span>
                <button onClick={() => setOpen(false)} className="btn-ghost !p-2"><FiX size={20} /></button>
              </div>
              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" size={16} />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search…"
                    className="input-field pl-9 text-sm"
                  />
                </div>
              </form>
              <div className="flex flex-col gap-1">
                {links.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `rounded-lg px-3 py-3 text-sm font-medium ${
                        isActive ? 'bg-clay-500/10 text-clay-600' : 'text-ink-700 dark:text-ink-200'
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}
                <NavLink to="/profile" onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-ink-700 dark:text-ink-200">
                  Profile
                </NavLink>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
