import { useState } from 'react'
import api from '../services/api'

export default function ProductForm({ categories, initialData, onSaved, onCancel }) {
  const isEditing = !!initialData

  const [form, setForm] = useState({
    category_id: initialData?.category?.id ?? '',
    name: initialData?.name ?? '',
    description: initialData?.description ?? '',
    price: initialData?.price ?? '',
    image_url: initialData?.image_url ?? '',
    stock: initialData?.stock ?? '',
    is_available: initialData?.is_available ?? true,
  })
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  const handleChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    setSaving(true)

    try {
      if (isEditing) {
        await api.patch(`/admin/products/${initialData.id}`, form)
      } else {
        await api.post('/admin/products', form)
      }
      onSaved()
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors || {})
      } else {
        alert('Gagal menyimpan produk.')
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-4 mb-4">
      <h2 className="font-semibold">{isEditing ? 'Edit Produk' : 'Tambah Produk Baru'}</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Produk</label>
        <input
          type="text"
          value={form.name}
          onChange={handleChange('name')}
          className="w-full border rounded-lg px-4 py-2"
        />
        {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name[0]}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
        <select
          value={form.category_id}
          onChange={handleChange('category_id')}
          className="w-full border rounded-lg px-4 py-2"
        >
          <option value="">Pilih kategori</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.category_id && (
          <p className="text-sm text-red-600 mt-1">{errors.category_id[0]}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
        <textarea
          value={form.description}
          onChange={handleChange('description')}
          rows={2}
          className="w-full border rounded-lg px-4 py-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Harga (Rp)</label>
          <input
            type="number"
            value={form.price}
            onChange={handleChange('price')}
            className="w-full border rounded-lg px-4 py-2"
          />
          {errors.price && <p className="text-sm text-red-600 mt-1">{errors.price[0]}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Stok</label>
          <input
            type="number"
            value={form.stock}
            onChange={handleChange('stock')}
            className="w-full border rounded-lg px-4 py-2"
          />
          {errors.stock && <p className="text-sm text-red-600 mt-1">{errors.stock[0]}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">URL Gambar</label>
        <input
          type="text"
          value={form.image_url}
          onChange={handleChange('image_url')}
          className="w-full border rounded-lg px-4 py-2"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={form.is_available}
          onChange={handleChange('is_available')}
        />
        Produk tersedia
      </label>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-brand-600 text-white px-4 py-2  rounded-lg text-sm font-medium disabled:opacity-50"
        >
          {saving ? 'Menyimpan...' : 'Simpan'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg text-sm font-medium border"
        >
          Batal
        </button>
      </div>
    </form>
  )
}