import { useMemo, useState } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useCart } from "../contexts/CartContext"
import { useLanguage } from "../contexts/LanguageContext"
import { translations } from "../data/translations"
import { supabase } from "../lib/supabase"
import { formatPrice } from "../lib/utils"

export default function CheckoutPage() {
  const { user, isSupabaseReady } = useAuth()
  const { items, totalPrice, clearCart } = useCart()
  const { language } = useLanguage()
  const t = translations[language]

  const [fullName, setFullName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [address, setAddress] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState("")

  const getProp = (prop) => {
    if (prop && typeof prop === "object") {
      return prop[language] || prop.vi || ""
    }
    return prop || ""
  }

  const payloadItems = useMemo(
    () =>
      items.map((item) => {
        const nameString = typeof item.name === "object" ? (item.name.vi || item.name.en || "") : (item.name || "")
        return {
          product_id: item.id,
          name: nameString,
          quantity: item.quantity,
          price: item.price,
        }
      }),
    [items],
  )

  if (!user) {
    return <Navigate to="/auth" replace />
  }

  if (items.length === 0) {
    return <Navigate to="/cart" replace />
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatusMessage("")

    if (!isSupabaseReady) {
      setStatusMessage(t.checkout.errSupabase)
      return
    }

    setSubmitting(true)

    const { error } = await supabase.from("orders").insert({
      user_id: user.id,
      full_name: fullName,
      phone_number: phoneNumber,
      address,
      payment_method: "COD",
      total_price: totalPrice,
      order_items: payloadItems,
      status: "pending",
    })

    if (error) {
      setStatusMessage(error.message)
      setSubmitting(false)
      return
    }

    clearCart()
    setStatusMessage(t.checkout.success)
    setSubmitting(false)
    setFullName("")
    setPhoneNumber("")
    setAddress("")
  }

  return (
    <div className="grid gap-8 pb-8 lg:grid-cols-[1.4fr_1fr]">
      <section className="rounded-2xl border border-tea-100 bg-white p-6 shadow-soft md:p-8">
        <h1 className="font-display text-3xl font-semibold text-tea-950">{t.checkout.title}</h1>
        <p className="mt-2 text-tea-700">{t.checkout.cod}</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-tea-800">{t.checkout.name}</span>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-xl border border-tea-200 px-4 py-3 outline-none ring-tea-500 focus:ring"
              placeholder={t.checkout.placeholderName}
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-tea-800">{t.checkout.phone}</span>
            <input
              type="tel"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full rounded-xl border border-tea-200 px-4 py-3 outline-none ring-tea-500 focus:ring"
              placeholder={t.checkout.placeholderPhone}
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-tea-800">{t.checkout.address}</span>
            <textarea
              required
              rows={4}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-xl border border-tea-200 px-4 py-3 outline-none ring-tea-500 focus:ring"
              placeholder={t.checkout.placeholderAddress}
            />
          </label>

          {statusMessage && <p className="text-sm text-tea-700">{statusMessage}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-tea-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-tea-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? t.checkout.submitting : t.checkout.submit}
          </button>
        </form>
      </section>

      <aside className="h-fit rounded-2xl border border-tea-100 bg-white p-6 shadow-soft">
        <h2 className="font-display text-2xl font-semibold text-tea-950">{t.checkout.summary}</h2>
        <div className="mt-4 space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-start justify-between gap-3 text-sm text-tea-700">
              <p>
                {getProp(item.name)} x {item.quantity}
              </p>
              <p className="shrink-0 font-medium text-tea-900">
                {formatPrice(item.price * item.quantity, language)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 border-t border-tea-100 pt-4">
          <div className="flex items-center justify-between">
            <p className="text-tea-700">{t.checkout.total}</p>
            <p className="text-lg font-semibold text-tea-950">{formatPrice(totalPrice, language)}</p>
          </div>
        </div>
      </aside>
    </div>
  )
}

