import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { totalItems } = useCart()

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-amber-800">
          Rita Bakery
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/catalog" className="text-gray-700 hover:text-amber-800">
            Katalog
          </Link>
          <Link to="/cart" className="relative text-gray-700 hover:text-amber-800">
            Keranjang
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-amber-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}