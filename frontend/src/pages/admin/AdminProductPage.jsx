import { useEffect, useState } from 'react'
import api from '../../services/api'
import ProductForm from '../../components/ProductForm'

export default function AdminProductPage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const loadProducts = () => {
    api.get('/products', { params: { per_page: 100 } }).then((res) => setProducts(res.data.data))
  }

  useEffect(() => {
    loadProducts()
    api.get('/categories').then((res) => setCategories(res.data))
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('Yakin mau hapus produk ini?')) return
    await api.delete(`/admin/products/${id}`)
    loadProducts()
  }

  const handleSaved = () => {
    setShowForm(false)
    setEditingProduct(null)
    loadProducts()
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
<h1 className="font-display text-2xl font-semibold text-[#2B1810]">Kelola Produk</h1>        <button
          onClick={() => {
            setEditingProduct(null)
            setShowForm(true)
          }}
          className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          + Tambah Produk
        </button>
      </div>

      {showForm && (
        <ProductForm
          categories={categories}
          initialData={editingProduct}
          onSaved={handleSaved}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="bg-white rounded-lg shadow-sm divide-y mt-4">
        {products.map((product) => (
          <div key={product.id} className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-12 h-12 object-cover rounded"
              />
              <div>
                <p className="font-medium text-gray-900">{product.name}</p>
                <p className="text-sm text-gray-500">
                  {formatRupiah(product.price)} · Stok: {product.stock}
                </p>
              </div>
            </div>

            <div className="flex gap-3 text-sm">
              <button
                onClick={() => {
                  setEditingProduct(product)
                  setShowForm(true)
                }}
                className="text-brand-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="text-red-600 hover:underline"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}