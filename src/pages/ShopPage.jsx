import { useState } from "react"
import ProductCard from "../components/ProductCard"
import SectionTitle from "../components/SectionTitle"
import ProductDetailsModal from "../components/ProductDetailsModal"
import { useCart } from "../contexts/CartContext"
import { useLanguage } from "../contexts/LanguageContext"
import { translations } from "../data/translations"
import { products } from "../data/products"

export default function ShopPage() {
  const { addToCart } = useCart()
  const { language } = useLanguage()
  const t = translations[language]
  const [selectedProduct, setSelectedProduct] = useState(null)

  const getProp = (prop) => {
    if (prop && typeof prop === "object") {
      return prop[language] || prop.vi || ""
    }
    return prop || ""
  }

  const categories = [...new Set(products.map((product) => getProp(product.category)))]

  return (
    <div className="space-y-8 pb-6">
      <SectionTitle
        eyebrow={t.shop.eyebrow}
        title={t.shop.title}
        description={t.shop.description}
      />

      <section className="animate-rise rounded-2xl border border-tea-100 bg-white/85 p-5 shadow-soft">
        <p className="text-sm text-tea-700">
          {t.shop.hint}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-tea-200 bg-tea-50 px-3 py-1 text-xs font-semibold text-tea-700"
            >
              {category}
            </span>
          ))}
        </div>
      </section>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={addToCart} 
            onOpenDetails={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      <section className="animate-rise rounded-2xl border border-amber-200 bg-amber-50/70 p-5 text-sm text-amber-900">
        <p className="font-semibold">{t.shop.noticeTitle}</p>
        <p className="mt-1">
          {t.shop.noticeContent}
        </p>
      </section>

      <ProductDetailsModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  )
}
