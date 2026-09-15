import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import ProductDetailsModal from "../components/ProductDetailsModal"
import { useCart } from "../contexts/CartContext"
import { useLanguage } from "../contexts/LanguageContext"
import { translations } from "../data/translations"
import { products } from "../data/products"

export default function HomePage() {
  const { addToCart } = useCart()
  const { language } = useLanguage()
  const [selectedProduct, setSelectedProduct] = useState(null)
  
  const t = translations[language]
  const featured = products.slice(0, 3)

  // Scroll Reveal Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active")
            observer.unobserve(entry.target) // Trigger once
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll(".reveal")
    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [language]) // Re-run when language changes to re-observe newly rendered DOM

  return (
    <div className="space-y-24 md:space-y-36 pb-16">
      
      {/* 1. HERO SECTION (Asymmetric Layout) */}
      <section className="reveal grid gap-12 items-center rounded-3xl border border-tea-100/50 bg-white/60 p-6 shadow-soft md:grid-cols-[1.2fr_1fr] md:p-12 lg:p-16">
        <div className="space-y-6">
          <div className="space-y-3">
            <span className="inline-flex rounded-full bg-tea-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-tea-700">
              {t.hero.eyebrow}
            </span>
            <p className="block w-fit rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1 text-xs font-semibold text-amber-800">
              {t.hero.highlight}
            </p>
          </div>
          
          <h1 className="font-display font-bold text-tea-950 font-clamp-hero">
            {t.hero.title}
          </h1>
          
          <p className="max-line-length text-tea-700 text-base md:text-lg leading-relaxed">
            {t.hero.description}
          </p>
          
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              to="/shop"
              className="rounded-full bg-tea-800 px-7 py-3.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-tea-900 active:translate-y-0"
            >
              {t.hero.primaryCTA}
            </Link>
            <a
              href="#about"
              className="rounded-full border border-tea-300 bg-white px-7 py-3.5 text-sm font-semibold text-tea-800 transition hover:border-tea-500 hover:bg-tea-50"
            >
              {t.hero.secondaryCTA}
            </a>
          </div>
        </div>

        {/* Hero Right: Premium Image Overlay */}
        <div className="relative aspect-[4/3] md:aspect-square overflow-hidden rounded-2xl border border-tea-100 shadow-soft">
          <div className="absolute inset-0 bg-gradient-to-t from-tea-950/20 to-transparent z-10" />
          <img
            src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=80"
            alt="Premium tea tree essential oil bottle"
            className="h-full w-full object-cover transition duration-1000 hover:scale-105"
            loading="eager"
            fetchpriority="high"
          />
          {/* Subtle overlay decorative badge */}
          <div className="absolute bottom-4 left-4 right-4 z-20 grid grid-cols-3 gap-2 md:gap-3 text-center">
            <div className="backdrop-blur-md bg-tea-950/65 p-2 md:p-3 rounded-xl border border-white/10 text-white flex flex-col justify-center transition hover:bg-tea-950/75">
              <span className="text-[8px] md:text-[9px] uppercase tracking-[0.12em] text-tea-200/80 font-semibold">
                {language === "vi" ? "Kiểm nghiệm" : "Purity"}
              </span>
              <span className="text-[10px] md:text-xs font-bold mt-0.5 text-white/95">{t.hero.badge1}</span>
            </div>
            <div className="backdrop-blur-md bg-tea-950/65 p-2 md:p-3 rounded-xl border border-white/10 text-white flex flex-col justify-center transition hover:bg-tea-950/75">
              <span className="text-[8px] md:text-[9px] uppercase tracking-[0.12em] text-tea-200/80 font-semibold">
                {language === "vi" ? "Vận chuyển" : "Delivery"}
              </span>
              <span className="text-[10px] md:text-xs font-bold mt-0.5 text-white/95">{t.hero.badge2}</span>
            </div>
            <div className="backdrop-blur-md bg-tea-950/65 p-2 md:p-3 rounded-xl border border-white/10 text-white flex flex-col justify-center transition hover:bg-tea-950/75">
              <span className="text-[8px] md:text-[9px] uppercase tracking-[0.12em] text-tea-200/80 font-semibold">
                {language === "vi" ? "Tư vấn" : "Support"}
              </span>
              <span className="text-[10px] md:text-xs font-bold mt-0.5 text-white/95">{t.hero.badge3}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PULL QUOTE SECTION (Editorial Breathing Space) */}
      <section className="reveal text-center max-w-4xl mx-auto py-8 px-4">
        <span className="text-4xl md:text-6xl font-display text-tea-300 block mb-4">“</span>
        <blockquote className="font-display text-2xl md:text-3xl italic text-tea-900 leading-relaxed font-semibold">
          {language === "vi"
            ? "Chúng tôi tin vào nguồn năng lượng tự nhiên nguyên bản – mỗi chai tinh dầu đại diện cho lời cam kết về sự tinh khiết tuyệt đối và nông nghiệp tái sinh."
            : "We believe in the raw, organic power of nature – every single bottle represents our pledge to absolute purity and regenerative agriculture."}
        </blockquote>
        <span className="text-4xl md:text-6xl font-display text-tea-300 block mt-2">”</span>
      </section>

      {/* 3. BRAND STORYTELLING (Alternating Article Layout - Not Generic Grids) */}
      <section id="about" className="space-y-24 md:space-y-36">
        
        {/* Story Block 1: Origins */}
        <div className="reveal grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-4 order-2 md:order-1">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-tea-500">01 / {t.story.eyebrow}</span>
            <h2 className="font-display font-bold text-tea-950 font-clamp-section">
              {t.story.milestones[0].title}
            </h2>
            <p className="max-line-length text-tea-700 leading-relaxed">
              {t.story.milestones[0].text}
            </p>
            <p className="max-line-length text-tea-700 leading-relaxed">
              {language === "vi" 
                ? "Tinh chất từ cây tràm trà được chiết xuất tự nhiên đem lại khả năng chăm sóc, kháng khuẩn nhẹ nhàng mà không gây kích ứng như hóa mỹ phẩm tổng hợp."
                : "Natural tea tree extracts provide gentle cleansing and antimicrobial care without the harsh irritation associated with synthetic chemical products."}
            </p>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-tea-100 shadow-soft order-1 md:order-2">
            <img
              src="https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=900&q=80"
              alt="Lush green botanical tea tree plants"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Story Block 2: Science & Distillation */}
        <div className="reveal grid gap-8 md:grid-cols-2 items-center">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-tea-100 shadow-soft">
            <img
              src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80"
              alt="Pure steam distillation process"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-tea-500">02 / {t.about.eyebrow}</span>
            <h2 className="font-display font-bold text-tea-950 font-clamp-section">
              {t.story.milestones[1].title}
            </h2>
            <p className="max-line-length text-tea-700 leading-relaxed">
              {t.story.milestones[1].text}
            </p>
            <p className="max-line-length text-tea-700 leading-relaxed">
              {t.about.benefits[1].text}
            </p>
          </div>
        </div>

        {/* Story Block 3: Modern Lifestyle Integration */}
        <div className="reveal grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-4 order-2 md:order-1">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-tea-500">03 / {t.about.title}</span>
            <h2 className="font-display font-bold text-tea-950 font-clamp-section">
              {t.story.milestones[2].title}
            </h2>
            <p className="max-line-length text-tea-700 leading-relaxed">
              {t.story.milestones[2].text}
            </p>
            <p className="max-line-length text-tea-700 leading-relaxed">
              {t.about.benefits[2].text}
            </p>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-tea-100 shadow-soft order-1 md:order-2">
            <img
              src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80"
              alt="Skincare bottle and leaf layout"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>


      </section>

      {/* 4. PROCESS SECTION (Editorial timeline) */}
      <section className="reveal space-y-12 rounded-3xl border border-tea-100/50 bg-white/50 p-6 md:p-12 shadow-soft">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-tea-500">{t.process.eyebrow}</span>
          <h2 className="mt-2 font-display font-bold text-tea-950 font-clamp-section">{t.process.title}</h2>
          <p className="mt-3 text-tea-700 text-sm md:text-base leading-relaxed">{t.process.description}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {t.process.steps.map((step, index) => (
            <div key={index} className="relative rounded-2xl bg-white border border-tea-100 p-6 shadow-soft transition hover:-translate-y-1">
              <span className="absolute -top-4 left-6 grid h-8 w-8 place-items-center rounded-full bg-tea-800 text-sm font-bold text-white shadow-md">
                {index + 1}
              </span>
              <p className="mt-2 text-sm text-tea-800 leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PRODUCT SHOWCASE */}
      <section className="reveal space-y-12">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-tea-500">{t.featured.eyebrow}</span>
            <h2 className="mt-2 font-display font-bold text-tea-950 font-clamp-section">{t.featured.title}</h2>
            <p className="mt-3 text-tea-700 text-sm md:text-base">{t.featured.description}</p>
          </div>
          <Link
            to="/shop"
            className="w-fit rounded-full border border-tea-800 px-6 py-3 text-sm font-semibold text-tea-800 transition hover:bg-tea-800 hover:text-white"
          >
            {language === "vi" ? "Xem tất cả sản phẩm" : "View all products"}
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onOpenDetails={() => setSelectedProduct(product)}
            />
          ))}
        </div>

        {/* Social Proof close to Decision */}
        <div className="rounded-2xl bg-tea-50/50 border border-tea-100 p-6 text-center text-xs md:text-sm text-tea-700">
          <p className="font-semibold text-tea-900">
            {language === "vi"
              ? "✓ 100% Khách hàng hài lòng • Đã được kiểm tra chất lượng hơi nước GC-MS của Tổng cục Tiêu chuẩn Đo lường Chất lượng"
              : "✓ 100% Customer Satisfaction • GC-MS Purity Tested under Bureau of Standards & Quality Measures"}
          </p>
        </div>
      </section>

      {/* 6. OBJECTION HANDLING & SAFETY INFO */}
      <section className="reveal grid gap-8 md:grid-cols-[1fr_2fr] rounded-3xl border border-amber-100 bg-amber-50/30 p-6 md:p-10">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">{t.knowledge.eyebrow}</span>
          <h2 className="mt-2 font-display font-bold text-amber-950 font-clamp-section">{t.knowledge.title}</h2>
          <p className="mt-3 text-amber-900/80 text-sm leading-relaxed">{t.knowledge.description}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {t.knowledge.cards.map((card, index) => (
            <article key={index} className="rounded-2xl border border-amber-100/50 bg-white p-5 shadow-soft">
              <h3 className="font-display font-bold text-amber-950 text-base">{card.title}</h3>
              <p className="mt-2 text-xs text-amber-900/90 leading-relaxed">{card.content}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 7. FINAL CONVERSION BLOCK (CTA) */}
      <section className="reveal rounded-3xl bg-tea-900 p-8 text-white text-center md:p-16 relative overflow-hidden shadow-2xl">
        {/* Subtle decorative visual elements */}
        <div className="absolute -left-12 -top-12 h-36 w-36 rounded-full bg-white/5 blur-lg" />
        <div className="absolute -right-12 -bottom-12 h-48 w-48 rounded-full bg-amber-300/10 blur-xl" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            {t.cta.heading}
          </h2>
          <p className="text-tea-100 text-sm md:text-base leading-relaxed">
            {t.cta.subheading}
          </p>
          <div className="pt-4">
            <Link
              to="/shop"
              className="inline-flex rounded-full bg-white px-8 py-4 text-sm font-bold text-tea-900 shadow-md transition hover:-translate-y-0.5 hover:bg-tea-100 active:translate-y-0"
            >
              {t.cta.button}
            </Link>
          </div>
        </div>
      </section>

      {/* Modal chi tiết & Đánh giá */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  )
}
