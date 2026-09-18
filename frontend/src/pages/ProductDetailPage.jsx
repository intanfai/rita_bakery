import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [customNote, setCustomNote] = useState("");

  useEffect(() => {
    setLoading(true);
    api.get(`/products/${id}`).then((res) => {
      setProduct(res.data.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <p className="max-w-4xl mx-auto px-4 py-8 text-gray-500">Memuat produk...</p>;
  }

  if (!product) {
    return <p className="max-w-4xl mx-auto px-4 py-8 text-gray-500">Produk tidak ditemukan.</p>;
  }

  const basePrice = Number(product.price);
  const extraPrice = selectedVariant ? Number(selectedVariant.extra_price) : 0;
  const totalPrice = (basePrice + extraPrice) * quantity;

  const formatRupiah = (value) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);

  const handleAddToCart = () => {
    addItem({
      product,
      variant: selectedVariant,
      quantity,
      customNote: customNote.trim() || null,
    });
    alert("Berhasil ditambahkan ke keranjang!");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/catalog" className="text-sm text-amber-700 hover:underline">
        ← Kembali ke katalog
      </Link>

      <div className="grid md:grid-cols-2 gap-8 mt-4">
        <img src={product.image_url} alt={product.name} className="w-full h-80 object-cover rounded-lg" />

        <div>
          <p className="text-sm text-amber-700 mb-1">{product.category.name}</p>
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>

          <p className="text-xl font-semibold text-gray-900 mt-4">{formatRupiah(basePrice)}</p>

          {!product.is_available && <p className="text-red-600 text-sm mt-1">Maaf, produk ini sedang tidak tersedia.</p>}

          {product.variants && product.variants.length > 0 && (
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Pilih varian</label>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setSelectedVariant(null)} className={`px-4 py-2 rounded-lg border text-sm ${!selectedVariant ? "border-amber-700 bg-amber-50 text-amber-800" : "border-gray-300 text-gray-700"}`}>
                  Standar
                </button>
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-2 rounded-lg border text-sm ${selectedVariant?.id === variant.id ? "border-amber-700 bg-amber-50 text-amber-800" : "border-gray-300 text-gray-700"}`}
                  >
                    {variant.variant_name}
                    {Number(variant.extra_price) > 0 && ` (+${formatRupiah(variant.extra_price)})`}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah</label>
            <div className="flex items-center gap-3">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="w-9 h-9 border rounded-lg text-gray-700">
                −
              </button>
              <span className="w-8 text-center">{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)} className="w-9 h-9 border rounded-lg text-gray-700">
                +
              </button>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Catatan (opsional)</label>
            <textarea value={customNote} onChange={(e) => setCustomNote(e.target.value)} placeholder="Misal: tulis 'Happy Birthday Sarah' di atas kue" className="w-full border rounded-lg px-4 py-2 text-sm" rows={2} />
          </div>

          <button onClick={handleAddToCart} disabled={!product.is_available} className="w-full mt-6 bg-amber-800 text-white py-3 rounded-lg font-medium disabled:opacity-40 disabled:cursor-not-allowed">
            Tambah ke Keranjang — {formatRupiah(totalPrice)}
          </button>
        </div>
      </div>
    </div>
  );
}
