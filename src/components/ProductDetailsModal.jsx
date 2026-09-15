import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useLanguage } from "../contexts/LanguageContext"
import { supabase } from "../lib/supabase"
import { formatPrice } from "../lib/utils"

export default function ProductDetailsModal({ product, isOpen, onClose }) {
  const { user, isSupabaseReady } = useAuth()
  const { language } = useLanguage()
  const [reviews, setReviews] = useState([])
  const [loadingReviews, setLoadingReviews] = useState(false)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  const modalText = {
    vi: {
      close: "Đóng",
      reviewsTitle: "Đánh giá từ khách hàng",
      noReviews: "Chưa có",
      reviewsCount: "đánh giá",
      loading: "Đang tải các đánh giá...",
      firstReview: "Sản phẩm này chưa có đánh giá nào. Hãy là người đầu tiên đánh giá!",
      writeReview: "Viết đánh giá của bạn",
      ratingLabel: "Đánh giá:",
      placeholder: "Chia sẻ trải nghiệm của bạn về sản phẩm...",
      submitting: "Đang gửi...",
      submit: "Gửi đánh giá",
      needLogin: "Bạn cần đăng nhập để đánh giá sản phẩm.",
      loginNow: "Đăng nhập ngay",
      errLogin: "Vui lòng đăng nhập để gửi đánh giá.",
      errComment: "Vui lòng nhập bình luận đánh giá.",
      success: "Gửi đánh giá thành công! Cảm ơn ý kiến của bạn.",
    },
    en: {
      close: "Close",
      reviewsTitle: "Customer Reviews",
      noReviews: "None",
      reviewsCount: "reviews",
      loading: "Loading reviews...",
      firstReview: "This product has no reviews yet. Be the first to write a review!",
      writeReview: "Write a review",
      ratingLabel: "Rating:",
      placeholder: "Share your experience with this product...",
      submitting: "Submitting...",
      submit: "Submit Review",
      needLogin: "You must sign in to review this product.",
      loginNow: "Sign In",
      errLogin: "Please sign in to submit a review.",
      errComment: "Please write a comment.",
      success: "Review submitted successfully! Thank you for your feedback.",
    }
  }[language] || {
    close: "Đóng",
    reviewsTitle: "Đánh giá từ khách hàng",
    noReviews: "Chưa có",
    reviewsCount: "đánh giá",
    loading: "Đang tải các đánh giá...",
    firstReview: "Sản phẩm này chưa có đánh giá nào. Hãy là người đầu tiên đánh giá!",
    writeReview: "Viết đánh giá của bạn",
    ratingLabel: "Đánh giá:",
    placeholder: "Chia sẻ trải nghiệm của bạn về sản phẩm...",
    submitting: "Đang gửi...",
    submit: "Gửi đánh giá",
    needLogin: "Bạn cần đăng nhập để đánh giá sản phẩm.",
    loginNow: "Đăng nhập ngay",
    errLogin: "Vui lòng đăng nhập để gửi đánh giá.",
    errComment: "Vui lòng nhập bình luận đánh giá.",
    success: "Gửi đánh giá thành công! Cảm ơn ý kiến của bạn.",
  }

  const getProp = (prop) => {
    if (prop && typeof prop === "object") {
      return prop[language] || prop.vi || ""
    }
    return prop || ""
  }

  useEffect(() => {
    if (!isOpen || !product || !isSupabaseReady) return

    fetchReviews()
  }, [product, isOpen, isSupabaseReady])

  async function fetchReviews() {
    setLoadingReviews(true)
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("product_id", product.id)
        .order("created_at", { ascending: false })

      if (error) throw error
      setReviews(data || [])
    } catch (err) {
      console.error("Lỗi khi tải đánh giá:", err.message)
    } finally {
      setLoadingReviews(false)
    }
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault()
    if (!isSupabaseReady) return
    if (!user) {
      setMessage(modalText.errLogin)
      return
    }

    if (!comment.trim()) {
      setMessage(modalText.errComment)
      return
    }

    setSubmitting(true)
    setMessage("")

    try {
      // Lấy tên khách hàng từ bảng profiles
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single()

      const reviewerName = profile?.full_name || user.email.split("@")[0]

      const { error } = await supabase.from("reviews").insert({
        product_id: product.id,
        user_id: user.id,
        rating: Number(rating),
        comment: comment.trim(),
        reviewer_name: reviewerName,
      })

      if (error) throw error

      setComment("")
      setRating(5)
      setMessage(modalText.success)
      fetchReviews() // Tải lại danh sách
    } catch (err) {
      setMessage("Lỗi: " + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (!isOpen || !product) return null

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
      : 0

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-tea-950/40 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-tea-100 bg-white p-6 shadow-2xl md:p-8 animate-rise"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-tea-50 text-tea-700 transition hover:bg-tea-100 hover:text-tea-950"
          aria-label={modalText.close}
        >
          ✕
        </button>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Product Left Column: Info & Image */}
          <div className="space-y-4">
            <div className="aspect-square w-full overflow-hidden rounded-2xl border border-tea-100 bg-tea-50/20">
              <img
                src={product.image}
                alt={getProp(product.name)}
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <span className="rounded-full bg-tea-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-tea-700">
                {getProp(product.category)}
              </span>
              <h2 className="mt-3 font-display text-2xl font-bold text-tea-950">{getProp(product.name)}</h2>
              <p className="mt-2 text-xl font-bold text-tea-900">{formatPrice(product.price, language)}</p>
              <p className="mt-4 text-sm leading-relaxed text-tea-700">{getProp(product.shortDescription)}</p>
            </div>
          </div>

          {/* Product Right Column: Reviews & Feedback */}
          <div className="flex flex-col justify-between border-t border-tea-100 pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-lg font-bold text-tea-950">{modalText.reviewsTitle}</h3>
                
                {/* Average Stars */}
                <div className="mt-2 flex items-center gap-3">
                  <span className="text-3xl font-bold text-tea-950">
                    {avgRating > 0 ? avgRating : modalText.noReviews}
                  </span>
                  <div className="space-y-0.5">
                    <div className="flex text-amber-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className="text-lg">
                          {star <= Math.round(avgRating) ? "★" : "☆"}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-tea-600">({reviews.length} {modalText.reviewsCount})</p>
                  </div>
                </div>
              </div>

              {/* Reviews List */}
              <div className="max-h-[300px] overflow-y-auto space-y-4 pr-2">
                {loadingReviews ? (
                  <p className="text-xs text-tea-600 animate-pulse">{modalText.loading}</p>
                ) : reviews.length === 0 ? (
                  <p className="text-sm text-tea-600 italic">{modalText.firstReview}</p>
                ) : (
                  reviews.map((rev) => (
                    <div key={rev.id} className="rounded-xl border border-tea-50 bg-tea-50/30 p-3 text-sm">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-tea-900">{rev.reviewer_name}</p>
                        <span className="text-xs text-tea-500">
                          {new Date(rev.created_at).toLocaleDateString(language === "vi" ? "vi-VN" : "en-US")}
                        </span>
                      </div>
                      <div className="flex text-amber-400 my-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star}>{star <= rev.rating ? "★" : "☆"}</span>
                        ))}
                      </div>
                      <p className="text-tea-700">{rev.comment}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Write a Review Section */}
            <div className="mt-6 border-t border-tea-100 pt-6">
              {user ? (
                <form onSubmit={handleSubmitReview} className="space-y-3">
                  <h4 className="text-sm font-semibold text-tea-900">{modalText.writeReview}</h4>
                  
                  {/* Star Rating Selector */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-tea-700">{modalText.ratingLabel}</span>
                    <div className="flex gap-1 text-2xl cursor-pointer">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className={star <= rating ? "text-amber-400" : "text-tea-200 hover:text-amber-300"}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Comment Input */}
                  <div className="relative">
                    <textarea
                      rows={2}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder={modalText.placeholder}
                      className="w-full rounded-xl border border-tea-200 p-3 text-sm outline-none ring-tea-500 focus:ring"
                      required
                    />
                  </div>

                  {message && <p className="text-xs font-medium text-tea-800">{message}</p>}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-full bg-tea-800 py-2 text-xs font-semibold text-white transition hover:bg-tea-900 disabled:opacity-50"
                  >
                    {submitting ? modalText.submitting : modalText.submit}
                  </button>
                </form>
              ) : (
                <div className="rounded-xl bg-tea-50/50 p-4 text-center text-xs">
                  <p className="text-tea-700">{modalText.needLogin}</p>
                  <Link
                    to="/auth"
                    className="mt-2 inline-block font-semibold text-tea-900 underline underline-offset-4"
                  >
                    {modalText.loginNow}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
