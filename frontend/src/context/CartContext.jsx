import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext(null)

const STORAGE_KEY = 'rita_bakery_cart'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = ({ product, variant, quantity, customNote }) => {
    setItems((prev) => {
      // Cek apakah kombinasi produk+varian+catatan yang SAMA udah ada di cart
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.variant?.id === variant?.id &&
          item.customNote === customNote
      )

      if (existingIndex !== -1) {
        // Kalau sudah ada, tinggal tambah quantity-nya
        const updated = [...prev]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        }
        return updated
      }

      // Kalau belum ada, tambahin sebagai item baru
      return [
        ...prev,
        {
          cartItemId: `${product.id}-${variant?.id ?? 'std'}-${Date.now()}`,
          product,
          variant,
          quantity,
          customNote,
        },
      ]
    })
  }

  const removeItem = (cartItemId) => {
    setItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId))
  }

  const updateQuantity = (cartItemId, quantity) => {
    if (quantity < 1) return
    setItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => setItems([])

  const getItemPrice = (item) => {
    const base = Number(item.product.price)
    const extra = item.variant ? Number(item.variant.extra_price) : 0
    return (base + extra) * item.quantity
  }

  const totalPrice = items.reduce((sum, item) => sum + getItemPrice(item), 0)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getItemPrice,
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart harus dipakai di dalam <CartProvider>')
  }
  return context
}