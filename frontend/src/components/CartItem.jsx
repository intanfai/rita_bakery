import { useCart } from '../context/CartContext'

export default function CartItem({ item }) {
  const { removeItem, updateQuantity, getItemPrice } = useCart()

  const formatRupiah = (value) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value)

  return (
    <div className="flex gap-4 border-b py-4">
      <img
        src={item.product.image_url}
        alt={item.product.name}
        className="w-20 h-20 object-cover rounded-lg"
      />

      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{item.product.name}</h3>
        {item.variant && (
          <p className="text-sm text-gray-500">Varian: {item.variant.variant_name}</p>
        )}
        {item.customNote && (
          <p className="text-sm text-gray-500 italic">Catatan: "{item.customNote}"</p>
        )}
        <p className="text-sm text-gray-700 mt-1">{formatRupiah(getItemPrice(item))}</p>

        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
            className="w-7 h-7 border rounded text-gray-700 text-sm"
          >
            −
          </button>
          <span className="w-6 text-center text-sm">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
            className="w-7 h-7 border rounded text-gray-700 text-sm"
          >
            +
          </button>

          <button
            onClick={() => removeItem(item.cartItemId)}
            className="text-sm text-red-600 hover:underline ml-4"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  )
}