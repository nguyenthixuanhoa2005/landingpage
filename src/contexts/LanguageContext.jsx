import { createContext, useContext, useEffect, useState } from "react"

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("preferred_language") || "vi"
  })

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const next = prev === "vi" ? "en" : "vi"
      localStorage.setItem("preferred_language", next)
      return next
    })
  }

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider")
  }
  return context
}
