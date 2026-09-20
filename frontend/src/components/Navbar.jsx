import { NavLink, Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { totalItems } = useCart()

  const linkClass = ({ isActive }) =>
    `text-sm ${isActive ? 'text-brand-600 font-medium' : 'text-gray-700 hover:text-brand-600'}`

  return (
    <nav className="bg-mallow border-b border-hairline sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="font-display text-xl font-semibold text-[#2B1810]">
          Rita Bakery
        </Link>

        <div className="flex items-center gap-6 ">
          <NavLink to="/catalog" className={linkClass}>
            Katalog
          </NavLink>

          <NavLink to="/cart" className={linkClass}>
            {({ isActive }) => (
              <span className="relative flex items-center gap-1.5">
                <ShoppingBag size={18} strokeWidth={isActive ? 2.5 : 2} />
                <span className="hidden sm:inline">Keranjang</span>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-brand-600 text-white text-[10px] rounded-full w-4.5 h-4.5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </span>
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  )
}