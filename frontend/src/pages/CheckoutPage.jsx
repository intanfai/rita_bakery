import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import api from '../services/api'

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    customer_name: '',
    phone: '',
    pickup_method: 'ambil_di_toko',
    address: '',
    notes: '',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const formatRupiah = (value) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value)

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    setSubmitting(true)

    try {
      const payload = {
        ...form,
        items: items.map((item) => ({
          product_id: item.product.id,
          variant_id: item.variant?.id ?? null,
          quantity: item.quantity,
          custom_note: item.customNote,
        })),
      }

      const res = await api.post('/orders', payload)

      clearCart()
      navigate('/order-success', { state: { order: res.data.order } })
    } catch (err) {
      if (err.response?.status === 422) {
        // Laravel validation error — bentuknya { message, errors: { field: [pesan] } }
        setErrors(err.response.data.errors || {})
      } else {
        alert('Terjadi kesalahan, coba lagi ya.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 mb-4">Keranjang kamu kosong, nggak ada yang bisa di-checkout.</p>
        <Link to="/catalog" className="text-amber-800 font-medium hover:underline">
          Kembali ke katalog →
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
<h1 className="font-display text-2xl font-semibold text-[#2B1810] mb-6">Checkout</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
          <input
            type="text"
            value={form.customer_name}
            onChange={handleChange('customer_name')}
            className="w-full border rounded-lg px-4 py-2"
          />
          {errors.customer_name && (
            <p className="text-sm text-red-600 mt-1">{errors.customer_name[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nomor HP</label>
          <input
            type="tel"
            value={form.phone}
            onChange={handleChange('phone')}
            placeholder="08xxxxxxxxxx"
            className="w-full border rounded-lg px-4 py-2"
          />
          {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone[0]}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Metode Pengambilan</label>
          <select
            value={form.pickup_method}
            onChange={handleChange('pickup_method')}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="ambil_di_toko">Ambil di Toko</option>
            <option value="kirim">Dikirim</option>
            <option value="cod">COD (Bayar di Tempat)</option>
          </select>
          {errors.pickup_method && (
            <p className="text-sm text-red-600 mt-1">{errors.pickup_method[0]}</p>
          )}
        </div>

        {form.pickup_method === 'kirim' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Pengiriman</label>
            <textarea
              value={form.address}
              onChange={handleChange('address')}
              rows={2}
              className="w-full border rounded-lg px-4 py-2"
            />
            {errors.address && <p className="text-sm text-red-600 mt-1">{errors.address[0]}</p>}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Catatan Tambahan (opsional)</label>
          <textarea
            value={form.notes}
            onChange={handleChange('notes')}
            rows={2}
            placeholder="Misal: tolong dibungkus rapi buat hadiah"
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div className="border-t pt-4 flex justify-between font-semibold text-gray-900">
          <span>Total Bayar</span>
          <span>{formatRupiah(totalPrice)}</span>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-brand-600 text-white py-3 rounded-lg font-medium disabled:opacity-50"
        >
          {submitting ? 'Memproses...' : 'Buat Pesanan'}
        </button>
      </form>
    </div>
  )
}