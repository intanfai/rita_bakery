import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";

export default function CartPage() {
  const { items } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 mb-4">Keranjang kamu masih kosong.</p>
        <Link to="/catalog" className="text-amber-800 font-medium hover:underline">
          Mulai belanja →
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-display text-2xl font-semibold text-[#2B1810] mb-6">Keranjang Belanja</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white rounded-lg shadow-sm p-6">
          {items.map((item) => (
            <CartItem key={item.cartItemId} item={item} />
          ))}
        </div>

        <div>
          <CartSummary onCheckout={() => navigate("/checkout")} />
        </div>
      </div>
    </div>
  );
}
