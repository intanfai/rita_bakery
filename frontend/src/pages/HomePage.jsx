import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import ProductCard from '../components/ProductCard'

export default function HomePage() {
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get('/products')
      .then((res) => setFeatured(res.data.data.slice(0, 4)))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-ink leading-tight">
            Kue rumahan, dipesan online, diambil hangat dari oven.
          </h1>
          <p className="text-gray-600 mt-4 text-lg max-w-md">
            Rita Bakery bikin setiap kue setelah pesanan masuk — bukan stok massal.
            Pilih varian, tulis pesan khususmu, lalu ambil atau minta diantar.
          </p>

          <div className="mt-8 flex items-center gap-6">
            <Link
              to="/catalog"
              className="bg-brand-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-700 transition-colors"
            >
              Lihat Katalog
            </Link>
            <a href="#kenapa-kami" className="text-gray-700 hover:text-amber-800 text-sm">
              Kenapa pilih kami?
            </a>
          </div>
        </div>

        <div className="arch-frame aspect-[4/5] max-w-sm mx-auto md:mx-0">
          <img
            src="https://placehold.co/700x900/C7DAD8/3B2A33?text=Rita+Bakery"
            alt="Kue buatan Rita Bakery"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Kenapa Kami */}
      <section id="kenapa-kami" className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="font-display text-2xl font-semibold text-ink mb-8">
          Kenapa pesan di Rita Bakery
        </h2>

        <div className="divide-y">
          <div className="py-5">
            <h3 className="font-medium text-gray-900">Dibuat saat dipesan</h3>
            <p className="text-gray-600 mt-1 text-sm max-w-lg">
              Resep rumahan, bukan hasil produksi massal — dipanggang begitu pesananmu masuk.
            </p>
          </div>
          <div className="py-5">
            <h3 className="font-medium text-gray-900">Rasa dan ukuran bisa disesuaikan</h3>
            <p className="text-gray-600 mt-1 text-sm max-w-lg">
              Pilih varian ukuran dan tulis pesan khusus buat ditulis di atas kue.
            </p>
          </div>
          <div className="py-5">
            <h3 className="font-medium text-gray-900">Ambil di toko atau kami antar</h3>
            <p className="text-gray-600 mt-1 text-sm max-w-lg">
              Pilih cara pengambilan yang paling gampang buat kamu saat checkout.
            </p>
          </div>
        </div>
      </section>

      {/* Produk Favorit */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">
              Produk Favorit
            </h2>
            <p className="text-gray-600 text-sm mt-1">Beberapa favorit pelanggan kami minggu ini.</p>
          </div>
          <Link to="/catalog" className="text-amber-800 text-sm font-medium hover:underline hidden sm:block">
            Lihat semua produk
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-500">Memuat produk favorit...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* CTA Penutup */}
      <section className="bg-brand-600">
        <div className="max-w-4xl mx-auto px-4 py-14 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-white">
            Siap pesan kue buat momen spesialmu?
          </h2>
          <Link
            to="/catalog"
            className="inline-block mt-6 bg-white text-brand-600 px-6 py-3 rounded-lg font-medium hover:bg-brand-50 transition-colors"
          >
            Mulai Pesan
          </Link>
        </div>
      </section>
    </div>
  )
}