import { menuData } from "./menuData";
import { Plus } from "lucide-react";

export default function Menu({ onAdd }) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">Menu</h2>
        <p className="text-sm text-gray-600">Tap an item to add to cart.</p>
      </div>
      <div className="space-y-8">
        {menuData.map((section) => (
          <div key={section.category}>
            <h3 className="text-xl font-semibold mb-3">{section.category}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {section.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onAdd(item)}
                  className="group flex items-center justify-between rounded-lg border p-3 hover:shadow-sm transition text-left"
                >
                  <div>
                    <div className="font-medium group-hover:text-black text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-600">₹{item.price}</div>
                  </div>
                  <div className="shrink-0 w-9 h-9 rounded-full bg-black text-white flex items-center justify-center group-hover:scale-105 transition">
                    <Plus className="w-5 h-5" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
