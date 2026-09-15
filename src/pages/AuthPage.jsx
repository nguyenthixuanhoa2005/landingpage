import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function AuthPage() {
  const [mode, setMode] = useState("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const { login, register, isSupabaseReady } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const redirectTo = location.state?.from || "/checkout"

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setMessage("")

    const action = mode === "login" ? login : register
    const { error } = await action(email, password)

    if (error) {
      setMessage(error.message)
      setLoading(false)
      return
    }

    if (mode === "register") {
      setMessage("Đăng ký thành công. Vui lòng kiểm tra email nếu đang bật xác thực email.")
      setLoading(false)
      return
    }

    navigate(redirectTo)
  }

  return (
    <div className="mx-auto max-w-md rounded-3xl border border-tea-100 bg-white/90 p-6 shadow-soft md:p-8">
      <h1 className="font-display text-3xl font-semibold text-tea-950">
        {mode === "login" ? "Chào mừng bạn quay lại" : "Tạo tài khoản mới"}
      </h1>
      <p className="mt-2 text-sm text-tea-700">Đăng nhập bằng Supabase Auth để tiếp tục thanh toán.</p>

      {!isSupabaseReady && (
        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
          Thiếu biến môi trường Supabase. Hãy thêm vào file .env trước.
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-tea-800">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-tea-200 px-4 py-3 outline-none ring-tea-500 focus:ring"
            placeholder="ban@email.com"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-tea-800">Mật khẩu</span>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-tea-200 px-4 py-3 outline-none ring-tea-500 focus:ring"
            placeholder="Tối thiểu 6 ký tự"
          />
        </label>

        {message && <p className="text-sm text-tea-700">{message}</p>}

        <button
          type="submit"
          disabled={loading || !isSupabaseReady}
          className="w-full rounded-full bg-tea-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-tea-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Đang xử lý..." : mode === "login" ? "Đăng nhập" : "Đăng ký"}
        </button>
      </form>

      <button
        type="button"
        onClick={() => {
          setMode((current) => (current === "login" ? "register" : "login"))
          setMessage("")
        }}
        className="mt-4 text-sm font-medium text-tea-700 underline-offset-4 transition hover:text-tea-900 hover:underline"
      >
        {mode === "login" ? "Chưa có tài khoản? Đăng ký ngay" : "Đã có tài khoản? Đăng nhập"}
      </button>
    </div>
  )
}
