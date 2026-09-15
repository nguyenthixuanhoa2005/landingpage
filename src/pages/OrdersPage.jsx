import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { supabase } from "../lib/supabase"
import { formatPrice } from "../lib/utils"

export default function OrdersPage() {
  const { user, isSupabaseReady } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!isSupabaseReady || !user) {
      setLoading(false)
      return
    }

    async function fetchOrders() {
      try {
        const { data, error: fetchErr } = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })

        if (fetchErr) throw fetchErr
        setOrders(data || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [user, isSupabaseReady])

  const handleCancelOrder = async (orderId) => {
    if (!confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?")) return

    try {
      const { error: updateErr } = await supabase
        .from("orders")
        .update({ status: "cancelled" })
        .eq("id", orderId)
        .eq("user_id", user.id) // Bảo mật: Chỉ người sở hữu mới được hủy

      if (updateErr) throw updateErr

      // Cập nhật lại state local
      setOrders(prev =>
        prev.map(order =>
          order.id === orderId ? { ...order, status: "cancelled" } : order
        )
      )
      alert("Đơn hàng đã được hủy thành công.")
    } catch (err) {
      alert("Lỗi khi hủy đơn hàng: " + err.message)
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">Chờ xác nhận</span>
      case "processing":
        return <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">Đang xử lý</span>
      case "shipping":
        return <span className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-800">Đang giao hàng</span>
      case "delivered":
        return <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">Đã nhận hàng</span>
      case "cancelled":
        return <span className="inline-flex rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-800">Đã hủy đơn</span>
      default:
        return <span className="inline-flex rounded-full bg-tea-100 px-3 py-1 text-xs font-semibold text-tea-800">{status}</span>
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-tea-700 animate-pulse font-medium">Đang tải lịch sử đơn hàng...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold text-tea-950">Đơn hàng của tôi</h1>
          <p className="text-sm text-tea-700">Xem trạng thái giao nhận và quản lý đơn đặt hàng của bạn.</p>
        </div>
        <Link
          to="/shop"
          className="w-fit rounded-full border border-tea-300 px-4 py-2 text-sm font-semibold text-tea-800 transition hover:border-tea-500"
        >
          Tiếp tục mua sắm
        </Link>
      </div>

      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
          Có lỗi xảy ra: {error}
        </div>
      )}

      {!isSupabaseReady && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
          Supabase chưa được thiết lập. Hãy kết nối cơ sở dữ liệu để xem đơn hàng.
        </div>
      )}

      {isSupabaseReady && orders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-tea-200 bg-white p-8 text-center shadow-soft">
          <p className="text-tea-700">Bạn chưa có đơn hàng nào.</p>
          <Link
            to="/shop"
            className="mt-4 inline-block rounded-full bg-tea-800 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-tea-900"
          >
            Mua đơn hàng đầu tiên
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="overflow-hidden rounded-2xl border border-tea-100 bg-white shadow-soft"
            >
              {/* Order Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-tea-100 bg-tea-50/50 px-6 py-4">
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-tea-500">Mã đơn hàng</p>
                  <p className="font-mono text-sm text-tea-900">#{order.id.slice(0, 8)}...</p>
                </div>
                <div className="space-y-1 md:text-right">
                  <p className="text-xs font-semibold uppercase tracking-wider text-tea-500">Ngày đặt hàng</p>
                  <p className="text-sm text-tea-900">
                    {new Date(order.created_at).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div>{getStatusBadge(order.status)}</div>
              </div>

              {/* Order Content */}
              <div className="p-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-tea-500 mb-3">Sản phẩm đã mua</h3>
                <div className="divide-y divide-tea-100">
                  {order.order_items && Array.isArray(order.order_items) ? (
                    order.order_items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-3">
                        <div>
                          <p className="font-medium text-tea-950">{item.name}</p>
                          <p className="text-xs text-tea-600">Số lượng: {item.quantity}</p>
                        </div>
                        <p className="font-medium text-tea-900">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-tea-700">Không có thông tin chi tiết sản phẩm.</p>
                  )}
                </div>

                <div className="mt-4 border-t border-tea-100 pt-4 flex flex-wrap gap-4 items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-tea-500">Địa chỉ giao hàng</p>
                    <p className="text-sm text-tea-800 font-medium">{order.full_name} ({order.phone_number})</p>
                    <p className="text-xs text-tea-700 max-w-md">{order.address}</p>
                  </div>
                  
                  <div className="text-right space-y-3">
                    <div>
                      <p className="text-xs text-tea-600">Tổng cộng (COD)</p>
                      <p className="text-xl font-bold text-tea-950">{formatPrice(order.total_price)}</p>
                    </div>

                    {order.status === "pending" && (
                      <button
                        type="button"
                        onClick={() => handleCancelOrder(order.id)}
                        className="rounded-full border border-rose-300 px-4 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-50 hover:border-rose-400"
                      >
                        Hủy đơn đặt hàng
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
