import { useCart } from '../context/CartContext'

export default function CartSummary({ onCheckout }) {
  const { totalPrice, totalItems } = useCart()

  const formatRupiah = (value) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value)

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
      <h2 className="font-semibold text-gray-900 mb-4">Ringkasan Pesanan</h2>

      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>Total item</span>
        <span>{totalItems}</span>
      </div>

      <div className="flex justify-between font-semibold text-gray-900 border-t pt-3 mt-3">
        <span>Total Harga</span>
        <span>{formatRupiah(totalPrice)}</span>
      </div>

      <button
        onClick={onCheckout}
        disabled={totalItems === 0}
        className="w-full mt-6 bg-brand-600 text-white py-3 rounded-lg font-medium disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Lanjut ke Checkout
      </button>
    </div>
  )
}