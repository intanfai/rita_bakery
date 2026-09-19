import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(product.price)

  return (
    <Link
      to={`/product/${product.id}`}
      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
    >
      <img
        src={product.image_url}
        alt={product.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <p className="text-xs text-brand-600 mb-1">{product.category.name}</p>
        <h3 className="font-semibold text-gray-900">{product.name}</h3>
        <p className="text-gray-700 mt-1">{formattedPrice}</p>
        {!product.is_available && (
          <p className="text-xs text-red-600 mt-1">Stok habis</p>
        )}
      </div>
    </Link>
  )
}