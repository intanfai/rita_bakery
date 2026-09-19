import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-hairline mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-display text-lg font-semibold text-[#2B1810]">Rita Bakery</p>
          <p className="text-sm text-gray-500 mt-1">Kue rumahan, dipesan online.</p>
        </div>

        <div className="flex gap-6 text-sm text-gray-600">
          <Link to="/catalog" className="hover:text-brand-600">Katalog</Link>
          <Link to="/cart" className="hover:text-brand-600">Keranjang</Link>
        </div>
      </div>
    </footer>
  )
}