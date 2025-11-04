export default function Checkout({
  name,
  phone,
  address,
  setName,
  setPhone,
  setAddress,
  paymentMethod,
  setPaymentMethod,
  total,
  onPlaceOrder,
}) {
  return (
    <section className="max-w-6xl mx-auto px-4 pb-8">
      <div className="rounded-xl border overflow-hidden">
        <div className="p-4 border-b bg-gray-50">
          <h3 className="text-lg font-semibold">Checkout</h3>
          <p className="text-sm text-gray-600">Enter your details and choose a payment method.</p>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="mt-1 w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Contact Number</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
                className="mt-1 w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Delivery Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House no, street, area, city"
                rows={4}
                className="mt-1 w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium mb-2">Payment Method</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: "cod", label: "Cash on Delivery" },
                  { id: "card", label: "Card" },
                  { id: "upi", label: "UPI" },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id)}
                    className={`rounded border px-3 py-2 text-sm transition ${
                      paymentMethod === m.id ? "bg-black text-white" : "hover:bg-gray-50"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              onClick={onPlaceOrder}
              className="w-full rounded-lg bg-black text-white px-4 py-3 hover:bg-black/90"
            >
              Place Order
            </button>
            <p className="text-xs text-gray-600">Contact info is saved so you don't have to re-enter next time.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
