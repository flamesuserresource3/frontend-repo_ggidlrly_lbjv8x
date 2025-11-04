import { Minus, Plus, Trash2, Percent } from "lucide-react";

export default function Cart({
  items,
  onInc,
  onDec,
  onRemove,
  couponCode,
  onCouponChange,
  discountAmount,
  subtotal,
}) {
  return (
    <aside className="w-full lg:w-96 border-l lg:sticky lg:top-[64px] h-fit bg-white">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="text-lg font-semibold">Your Cart</h3>
        <span className="text-sm text-gray-600">{items.length} items</span>
      </div>
      <div className="p-4 space-y-4">
        {items.length === 0 && (
          <p className="text-sm text-gray-600">Your cart is empty.</p>
        )}
        {items.map((it) => (
          <div key={it.id} className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="font-medium truncate">{it.name}</div>
              <div className="text-sm text-gray-600">₹{it.price} × {it.qty}</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="w-8 h-8 rounded border flex items-center justify-center hover:bg-gray-50"
                onClick={() => onDec(it.id)}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-6 text-center">{it.qty}</span>
              <button
                className="w-8 h-8 rounded border flex items-center justify-center hover:bg-gray-50"
                onClick={() => onInc(it.id)}
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                className="w-8 h-8 rounded border flex items-center justify-center hover:bg-red-50 text-red-600 border-red-200"
                onClick={() => onRemove(it.id)}
                aria-label="Remove"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        <div className="pt-2 mt-2 border-t space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700">
              <Percent className="w-4 h-4" />
            </div>
            <input
              placeholder="Coupon code (e.g. SAVE10)"
              value={couponCode}
              onChange={(e) => onCouponChange(e.target.value)}
              className="flex-1 rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="text-sm text-gray-600">
            Add coupons and offers here. More offers can be added later.
          </div>
        </div>

        <div className="pt-3 mt-2 border-t space-y-1 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal}</span></div>
          {discountAmount > 0 && (
            <div className="flex justify-between text-green-700"><span>Discount</span><span>-₹{discountAmount}</span></div>
          )}
        </div>
      </div>
    </aside>
  );
}
