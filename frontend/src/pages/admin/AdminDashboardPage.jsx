import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import api from '../../services/api'
import OrderStatusBadge from '../../components/OrderStatusBadge'

const STATUS_OPTIONS = ['pending', 'diproses', 'selesai', 'dibatalkan']

export default function AdminDashboardPage() {
  const { admin, logout } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('')

  const loadOrders = () => {
    setLoading(true)
    api
      .get('/admin/orders', { params: { status: filterStatus || undefined } })
      .then((res) => setOrders(res.data.data))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadOrders()
  }, [filterStatus])

  const handleStatusChange = async (orderId, newStatus) => {
    // Update tampilan dulu (optimistic update), biar terasa instan
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    )

    try {
      await api.patch(`/admin/orders/${orderId}`, { status: newStatus })
    } catch {
      alert('Gagal update status, coba lagi.')
      loadOrders() // kalau gagal, tarik ulang data asli dari server
    }
  }

  const formatRupiah = (value) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value)

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Pesanan</h1>
          <p className="text-sm text-gray-500">Halo, {admin.name}</p>
        </div>
        <button onClick={logout} className="text-sm text-red-600 hover:underline">
          Logout
        </button>
      </div>

      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        className="border rounded-lg px-4 py-2 mb-4"
      >
        <option value="">Semua Status</option>
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      {loading ? (
        <p className="text-gray-500">Memuat pesanan...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">Belum ada pesanan.</p>
      ) : (
        <div className="bg-white rounded-lg shadow-sm divide-y">
          {orders.map((order) => (
            <div key={order.id} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium text-gray-900">
                    #{order.id} — {order.customer_name}
                  </p>
                  <p className="text-sm text-gray-500">{order.phone}</p>
                </div>
                <OrderStatusBadge status={order.status} />
              </div>

              <div className="text-sm text-gray-600 mb-2">
                {order.items.map((item) => (
                  <p key={item.id}>
                    {item.product.name} × {item.quantity}
                  </p>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <p className="font-semibold text-gray-900">
                  {formatRupiah(order.total_price)}
                </p>

                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className="border rounded-lg px-3 py-1.5 text-sm"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}