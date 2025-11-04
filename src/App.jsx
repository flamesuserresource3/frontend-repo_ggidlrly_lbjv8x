import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

function applyCoupon(code, subtotal) {
  if (!code) return { percent: 0, amount: 0 };
  const codes = {
    SAVE10: 10,
    SAVE20: 20,
    WELCOME50: 50,
  };
  const percent = codes[code.toUpperCase()] || 0;
  const amount = Math.floor((subtotal * percent) / 100);
  return { percent, amount };
}

export default function App() {
  const [cart, setCart] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("customerProfile") || "null");
    if (savedProfile) {
      setName(savedProfile.name || "");
      setPhone(savedProfile.phone || "");
      setAddress(savedProfile.address || "");
    }
  }, []);

  useEffect(() => {
    const profile = { name, phone, address };
    localStorage.setItem("customerProfile", JSON.stringify(profile));
  }, [name, phone, address]);

  const subtotal = useMemo(() => {
    return cart.reduce((sum, it) => sum + it.price * it.qty, 0);
  }, [cart]);

  const { amount: discountAmount } = useMemo(() => applyCoupon(couponCode, subtotal), [couponCode, subtotal]);
  const total = Math.max(0, subtotal - discountAmount);

  const handleAdd = (item) => {
    setCart((prev) => {
      const found = prev.find((p) => p.id === item.id);
      if (found) {
        return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p));
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setShowCart(true);
  };

  const inc = (id) => setCart((prev) => prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p)));
  const dec = (id) =>
    setCart((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, qty: Math.max(0, p.qty - 1) } : p))
        .filter((p) => p.qty > 0)
    );
  const removeItem = (id) => setCart((prev) => prev.filter((p) => p.id !== id));

  const placeOrder = () => {
    if (!name || !phone) {
      alert("Please enter your name and contact number.");
      return;
    }
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    const order = {
      id: `ORD-${Date.now()}`,
      items: cart,
      subtotal,
      discount: discountAmount,
      total,
      couponCode: couponCode || null,
      customer: { name, phone, address },
      paymentMethod,
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("orders") || "[]");
    existing.unshift(order);
    localStorage.setItem("orders", JSON.stringify(existing));

    alert("Order placed successfully! We'll contact you shortly.");
    setCart([]);
    setCouponCode("");
    setPaymentMethod("cod");
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header cartCount={cart.reduce((n, it) => n + it.qty, 0)} onCartClick={() => setShowCart((s) => !s)} />

      <main className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
          <div>
            <div className="px-4 pt-6">
              <div className="rounded-xl border p-4 bg-gradient-to-br from-gray-50 to-white">
                <h2 className="text-xl font-semibold">Welcome</h2>
                <p className="text-sm text-gray-600">Add your favorite dishes to cart and checkout with Cash on Delivery, Card, or UPI.</p>
              </div>
            </div>
            <Menu onAdd={handleAdd} />
          </div>

          <div className={`hidden lg:block ${showCart ? "" : ""}`}>
            <Cart
              items={cart}
              onInc={inc}
              onDec={dec}
              onRemove={removeItem}
              couponCode={couponCode}
              onCouponChange={setCouponCode}
              discountAmount={discountAmount}
              subtotal={subtotal}
            />
          </div>
        </div>
      </main>

      <div className="lg:hidden fixed bottom-4 right-4 left-4">
        {showCart && (
          <div className="rounded-xl border bg-white shadow-xl overflow-hidden">
            <Cart
              items={cart}
              onInc={inc}
              onDec={dec}
              onRemove={removeItem}
              couponCode={couponCode}
              onCouponChange={setCouponCode}
              discountAmount={discountAmount}
              subtotal={subtotal}
            />
          </div>
        )}
      </div>

      <Checkout
        name={name}
        phone={phone}
        address={address}
        setName={setName}
        setPhone={setPhone}
        setAddress={setAddress}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        total={total}
        onPlaceOrder={placeOrder}
      />

      <footer className="border-t py-6 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Restaurant Shop • Built for a smooth ordering experience.
      </footer>
    </div>
  );
}
