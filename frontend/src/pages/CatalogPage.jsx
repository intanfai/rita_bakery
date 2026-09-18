import { useEffect, useState } from 'react'
import api from '../services/api'
import ProductCard from '../components/ProductCard'

export default function CatalogPage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [meta, setMeta] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/categories').then((res) => setCategories(res.data))
  }, [])

  useEffect(() => {
    setLoading(true)
    api
      .get('/products', {
        params: {
          page,
          category_id: selectedCategory || undefined,
          search: search || undefined,
        },
      })
      .then((res) => {
        setProducts(res.data.data)
        setMeta(res.data.meta)
      })
      .finally(() => setLoading(false))
  }, [page, selectedCategory, search])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Katalog Produk</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Cari kue..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
          className="border rounded-lg px-4 py-2 flex-1"
        />
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value)
            setPage(1)
          }}
          className="border rounded-lg px-4 py-2"
        >
          <option value="">Semua Kategori</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-gray-500">Memuat produk...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">Produk tidak ditemukan.</p>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {meta && meta.last_page > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => setPage((p) => p - 1)}
                disabled={page === 1}
                className="px-4 py-2 border rounded-lg disabled:opacity-40"
              >
                Sebelumnya
              </button>
              <span className="text-sm text-gray-600">
                Halaman {meta.current_page} dari {meta.last_page}
              </span>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page === meta.last_page}
                className="px-4 py-2 border rounded-lg disabled:opacity-40"
              >
                Selanjutnya
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}