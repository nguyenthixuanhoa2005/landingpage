import { Link, NavLink } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useCart } from "../contexts/CartContext"
import { useLanguage } from "../contexts/LanguageContext"
import { translations } from "../data/translations"

export default function Navbar() {
  const { user, logout } = useAuth()
  const { totalItems } = useCart()
  const { language, toggleLanguage } = useLanguage()
  const t = translations[language]

  const navItems = [
    { to: "/", label: t.nav.home },
    { to: "/shop", label: t.nav.shop },
    { to: "/cart", label: t.nav.cart },
    user && { to: "/orders", label: t.nav.orders },
  ].filter(Boolean)

  const projectTitle = language === "vi" ? "Mộc Trà" : "Moc Tra"
  const projectSubtitle = language === "vi" ? "Thuần khiết. Tự nhiên. Cao cấp." : "Pure. Natural. Premium."

  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-[rgba(248,252,246,0.9)] backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-3 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="group inline-flex items-center gap-2">
            <img 
              src="/logo.jpg" 
              alt="Mộc Trà Logo" 
              className="h-9 w-9 rounded-full object-cover shadow-soft transition-transform duration-300 group-hover:rotate-12 border border-tea-100" 
            />
            <div>
              <p className="font-display text-lg font-semibold text-tea-900">{projectTitle}</p>
              <p className="text-xs text-tea-600">{projectSubtitle}</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition ${
                    isActive ? "text-tea-900" : "text-tea-600 hover:text-tea-900"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="rounded-full border border-tea-200 bg-white px-3 py-1.5 text-xs font-bold text-tea-700 transition hover:border-tea-400 hover:bg-tea-50"
              aria-label="Chuyển đổi ngôn ngữ"
            >
              {language === "vi" ? "EN" : "VI"}
            </button>

            <Link
              to="/cart"
              className="relative rounded-full border border-tea-200 bg-white px-4 py-2 text-sm font-medium text-tea-700 transition hover:border-tea-400"
            >
              {t.nav.cart}
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-amber-500 px-1 text-xs font-semibold text-white">
                  {totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <button
                type="button"
                onClick={logout}
                className="rounded-full bg-tea-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-tea-900"
              >
                {t.nav.logout}
              </button>
            ) : (
              <Link
                to="/auth"
                className="rounded-full bg-tea-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-tea-900"
              >
                {t.nav.login}
              </Link>
            )}
          </div>
        </div>

        <nav className="mt-3 grid grid-cols-4 gap-2 md:hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-2 py-2 text-center text-xs font-semibold transition ${
                  isActive
                    ? "bg-tea-800 text-white"
                    : "border border-tea-200 text-tea-700 hover:border-tea-400"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

