import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'threadcraft_cart_v1'

const initialState = {
  items: [] // { id, productId, name, image, price, color, size, quantity, customDesign }
}

function loadInitialState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : initialState
  } catch {
    return initialState
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.id === action.payload.id)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.payload.id ? { ...i, quantity: i.quantity + action.payload.quantity } : i
          )
        }
      }
      return { items: [...state.items, action.payload] }
    }
    case 'REMOVE_ITEM':
      return { items: state.items.filter((i) => i.id !== action.payload) }
    case 'UPDATE_QUANTITY':
      return {
        items: state.items.map((i) =>
          i.id === action.payload.id ? { ...i, quantity: Math.max(1, action.payload.quantity) } : i
        )
      }
    case 'CLEAR_CART':
      return { items: [] }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadInitialState)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const addToCart = (item) => dispatch({ type: 'ADD_ITEM', payload: item })
  const removeFromCart = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id })
  const updateQuantity = (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  const subtotal = useMemo(
    () => state.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [state.items]
  )
  const itemCount = useMemo(() => state.items.reduce((sum, i) => sum + i.quantity, 0), [state.items])

  const value = { items: state.items, addToCart, removeFromCart, updateQuantity, clearCart, subtotal, itemCount }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
