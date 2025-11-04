import { ShoppingCart } from "lucide-react";

export default function Header({ cartCount, onCartClick }) {
  return (
    <header className="sticky top-0 z-20 bg-white/70 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🍽️</span>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Restaurant Shop</h1>
        </div>
        <button
          className="relative inline-flex items-center gap-2 rounded-full border px-4 py-2 hover:bg-gray-50 transition"
          onClick={onCartClick}
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="hidden sm:inline">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
