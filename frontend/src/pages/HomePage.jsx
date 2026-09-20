import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import ProductCard from '../components/ProductCard'

const CATEGORY_COLORS = ['bg-cookie', 'bg-mist', 'bg-brand-50']

export default function HomePage() {
  const [featured, setFeatured] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([api.get('/products'), api.get('/categories')]).then(
      ([productsRes, categoriesRes]) => {
        setFeatured(productsRes.data.data.slice(0, 8))
        setCategories(categoriesRes.data)
        setLoading(false)
      }
    )
  }, [])

  return (
    <div>
      {/* Hero — full pink, blob photo + blob dekorasi */}
      <section className="bg-brand-600 relative overflow-hidden">
        <div className="absolute w-40 h-40 bg-cookie blob-sm opacity-70 -top-8 left-10" />
        <div className="absolute w-24 h-24 bg-mist blob-sm opacity-60 bottom-10 left-1/3" />

        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center relative">
          <div>
            <span className="text-3xl">🧁</span>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-white leading-tight mt-3">
              Kue rumahan, dipesan online, diambil hangat dari oven.
            </h1>
            <p className="text-white/85 mt-4 text-lg max-w-md">
              Rita Bakery bikin setiap kue setelah pesanan masuk — bukan stok massal.
              Pilih varian, tulis pesan khususmu, lalu ambil atau minta diantar.
            </p>

            <div className="mt-8 flex items-center gap-6">
              <Link
                to="/catalog"
                className="bg-white text-brand-600 px-6 py-3 rounded-full font-medium hover:bg-brand-50 transition-colors"
              >
                Lihat Katalog
              </Link>
              <a href="#kenapa-kami" className="text-white underline underline-offset-4 text-sm">
                Kenapa pilih kami?
              </a>
            </div>
          </div>

          <div className="blob-frame aspect-square max-w-sm mx-auto md:mx-0 relative">
            <img
              src="https://picsum.photos/seed/ritabakery/700/700"
              alt="Kue buatan Rita Bakery"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Kategori Pilihan */}
      {!loading && categories.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-14">
          <h2 className="font-display text-2xl font-semibold text-ink mb-6">
            Kategori Pilihan
          </h2>
          <div className="flex flex-wrap gap-4">
            {categories.map((cat, i) => (
              <Link
                key={cat.id}
                to="/catalog"
                className={`${CATEGORY_COLORS[i % CATEGORY_COLORS.length]} rounded-full px-6 py-4 text-ink font-medium hover:opacity-80 transition-opacity`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Produk Favorit — Carousel */}
      <section className="max-w-6xl mx-auto px-4 pb-14">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">Produk Favorit</h2>
            <p className="text-gray-600 text-sm mt-1">Beberapa favorit pelanggan kami minggu ini.</p>
          </div>
          <Link to="/catalog" className="text-brand-600 text-sm font-medium hover:underline hidden sm:block">
            Lihat semua produk
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-500">Memuat produk favorit...</p>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4">
            {featured.map((product) => (
              <div key={product.id} className="min-w-[220px] snap-start">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Kenapa Kami — kartu putih melayang di atas pink */}
      <section id="kenapa-kami" className="bg-brand-600 relative overflow-hidden">
        <div className="absolute w-32 h-32 bg-cookie blob-sm opacity-50 top-10 right-10" />

        <div className="max-w-4xl mx-auto px-4 py-16 relative">
          <h2 className="font-display text-2xl font-semibold text-white mb-8">
            Kenapa pesan di Rita Bakery
          </h2>

          <div className="grid sm:grid-cols-3 gap-5">
            <div className="bg-white rounded-3xl p-6">
              <div className="w-12 h-12 rounded-full bg-cookie flex items-center justify-center text-xl mb-3">
                🔥
              </div>
              <h3 className="font-medium text-ink">Dibuat saat dipesan</h3>
              <p className="text-gray-600 mt-1 text-sm">
                Resep rumahan, dipanggang begitu pesananmu masuk.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-6">
              <div className="w-12 h-12 rounded-full bg-mist flex items-center justify-center text-xl mb-3">
                🎨
              </div>
              <h3 className="font-medium text-ink">Bisa disesuaikan</h3>
              <p className="text-gray-600 mt-1 text-sm">
                Pilih varian ukuran dan tulis pesan khusus di atas kue.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-6">
              <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center text-xl mb-3">
                🚚
              </div>
              <h3 className="font-medium text-ink">Ambil atau diantar</h3>
              <p className="text-gray-600 mt-1 text-sm">
                Pilih cara pengambilan paling gampang saat checkout.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Penutup */}
      <section className="bg-mallow">
        <div className="max-w-4xl mx-auto px-4 py-14 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink">
            Siap pesan kue buat momen spesialmu?
          </h2>
          <Link
            to="/catalog"
            className="inline-block mt-6 bg-brand-600 text-white px-6 py-3 rounded-full font-medium hover:bg-brand-700 transition-colors"
          >
            Mulai Pesan
          </Link>
        </div>
      </section>
    </div>
  )
}