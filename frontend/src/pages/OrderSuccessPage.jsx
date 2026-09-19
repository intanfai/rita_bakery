import { useLocation, Link, Navigate } from 'react-router-dom'

export default function OrderSuccessPage() {
  const location = useLocation()
  const order = location.state?.order

  // Kalau halaman ini diakses langsung tanpa lewat checkout (nggak ada data order), lempar balik
  if (!order) {
    return <Navigate to="/catalog" replace />
  }

  const formatRupiah = (value) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value)

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="text-5xl mb-4">🎉</div>
<h1 className="font-display text-2xl font-semibold text-[#2B1810] mb-2">Pesanan Berhasil Dibuat!</h1>      <p className="text-gray-600 mb-8">
        Terima kasih, {order.customer_name}. Pesanan kamu sedang kami proses.
      </p>

      <div className="bg-white rounded-lg shadow-sm p-6 text-left">
        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <span>Nomor Pesanan</span>
          <span className="font-medium text-gray-900">#{order.id}</span>
        </div>

        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm py-2 border-t">
            <span>
              {item.product.name} × {item.quantity}
            </span>
            <span>{formatRupiah(item.price_at_order * item.quantity)}</span>
          </div>
        ))}

        <div className="flex justify-between font-semibold text-gray-900 border-t pt-3 mt-3">
          <span>Total</span>
          <span>{formatRupiah(order.total_price)}</span>
        </div>
      </div>

      <Link
        to="/catalog"
        className="inline-block mt-8 text-brand-600 font-medium hover:underline"
      >
        ← Kembali belanja
      </Link>
    </div>
  )
}