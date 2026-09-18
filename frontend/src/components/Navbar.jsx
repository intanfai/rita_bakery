import { Link } from 'react-router-dom'

export default function Navbar() {
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
          <Link to="/cart" className="text-gray-700 hover:text-amber-800">
            Keranjang
          </Link>
        </div>
      </div>
    </nav>
  )
}