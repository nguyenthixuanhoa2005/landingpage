import { useLanguage } from "../contexts/LanguageContext"
import { translations } from "../data/translations"

export default function Footer() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <footer className="mt-16 border-t border-tea-100 bg-white/70">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 text-sm text-tea-700 md:flex-row md:items-center md:justify-between md:px-6">
        <p>{t.footer.copyright}</p>
        <p className="text-xs text-tea-500">{t.footer.links}</p>
      </div>
    </footer>
  )
}

