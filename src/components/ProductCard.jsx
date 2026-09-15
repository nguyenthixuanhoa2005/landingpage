import { useLanguage } from "../contexts/LanguageContext"
import { translations } from "../data/translations"
import { formatPrice } from "../lib/utils"

export default function ProductCard({ product, onAddToCart, onOpenDetails }) {
  const { language } = useLanguage()
  const t = translations[language]

  const getProp = (prop) => {
    if (prop && typeof prop === "object") {
      return prop[language] || prop.vi || ""
    }
    return prop || ""
  }

  return (
    <article className="flex flex-col h-full group overflow-hidden rounded-2xl border border-tea-100 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-lg">
      <div className="aspect-square overflow-hidden bg-tea-50/20">
        <img
          src={product.image}
          alt={getProp(product.name)}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>


      <div className="flex flex-col flex-grow p-5">
        <div className="flex-grow space-y-3">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-tea-500">
            {getProp(product.category)}
          </p>
          <h3 className="font-display text-xl font-semibold text-tea-950">{getProp(product.name)}</h3>
          <p className="text-sm text-tea-700">{getProp(product.shortDescription)}</p>
        </div>

        <div className="flex items-center justify-between pt-4 mt-5 border-t border-tea-50">
          <p className="text-lg font-semibold text-tea-900">{formatPrice(product.price, language)}</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onOpenDetails}
              className="rounded-full border border-tea-200 px-3.5 py-2 text-xs font-semibold text-tea-700 transition hover:bg-tea-50 hover:text-tea-900"
            >
              {t.featured.viewDetails}
            </button>
            <button
              type="button"
              onClick={() => onAddToCart(product)}
              className="rounded-full bg-tea-800 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-tea-900"
            >
              {t.featured.addToCart}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}



