import { Link } from "react-router-dom"
import { useCart } from "../contexts/CartContext"
import { useLanguage } from "../contexts/LanguageContext"
import { translations } from "../data/translations"
import { formatPrice } from "../lib/utils"

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart()
  const { language } = useLanguage()
  const t = translations[language]

  const getProp = (prop) => {
    if (prop && typeof prop === "object") {
      return prop[language] || prop.vi || ""
    }
    return prop || ""
  }

  if (items.length === 0) {
    return (
      <div className="grid min-h-[50vh] place-items-center rounded-3xl border border-tea-100 bg-white/85 p-8 text-center shadow-soft">
        <div>
          <h1 className="font-display text-3xl font-semibold text-tea-950">{t.cart.empty}</h1>
          <p className="mt-3 text-tea-700">
            {language === "vi"
              ? "Thêm sản phẩm tràm trà để tiếp tục thanh toán."
              : "Add tea tree products to proceed with checkout."}
          </p>
          <Link
            to="/shop"
            className="mt-5 inline-flex rounded-full bg-tea-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-tea-900"
          >
            {t.cart.continue}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-8 pb-8 lg:grid-cols-[1.8fr_1fr]">
      <section className="space-y-4">
        <h1 className="font-display text-3xl font-semibold text-tea-950">{t.cart.title}</h1>

        {items.map((item) => (
          <article
            key={item.id}
            className="grid gap-4 rounded-2xl border border-tea-100 bg-white p-4 shadow-soft sm:grid-cols-[120px_1fr]"
          >
            <img src={item.image} alt={getProp(item.name)} className="h-28 w-full rounded-xl object-cover" />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-display text-xl font-semibold text-tea-950">{getProp(item.name)}</h2>
                <p className="text-tea-600">{formatPrice(item.price, language)}</p>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, e.target.value)}
                  className="w-20 rounded-lg border border-tea-200 px-3 py-2 text-center outline-none ring-tea-500 focus:ring"
                />
                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  {t.cart.remove}
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <aside className="h-fit rounded-2xl border border-tea-100 bg-white p-6 shadow-soft">
        <h2 className="font-display text-2xl font-semibold text-tea-950">{t.checkout.summary}</h2>
        <div className="mt-4 flex items-center justify-between text-tea-700">
          <span>{t.cart.total}</span>
          <span className="text-lg font-semibold text-tea-900">{formatPrice(totalPrice, language)}</span>
        </div>
        <Link
          to="/checkout"
          className="mt-6 inline-flex w-full justify-center rounded-full bg-tea-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-tea-900"
        >
          {t.cart.checkout}
        </Link>
      </aside>
    </div>
  )
}

