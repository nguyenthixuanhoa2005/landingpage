---
name: motion-design
description: Thêm animation/motion có chủ đích cho landing page và UI (entrance, scroll reveal, hover, transition) — dùng skill này bất cứ khi nào code animation, transition, hoặc khi user yêu cầu web "sống động", "mượt", "có animation" nhưng chưa nói rõ animation gì ở đâu. Ngăn agent nhồi animation bừa bãi hoặc dùng animation gây giật layout.
---

# Motion Design

## Nguyên tắc cốt lõi

Animation phải **phục vụ UX** (dẫn mắt, xác nhận hành động, tạo nhịp đọc), không phải "thêm cho đẹp". Trước khi thêm animation cho một phần tử, tự hỏi: nó giúp visitor hiểu/tin/hành động tốt hơn, hay chỉ đang "trình diễn kỹ thuật"?

**Không animate mọi thứ.** Chọn lọc: hero, chuyển section khi scroll, feedback khi tương tác (hover/click), và một vài điểm nhấn sản phẩm. Phần còn lại giữ tĩnh.

## Bảng quy tắc theo loại phần tử

| Phần tử | Animation | Ghi chú |
|---|---|---|
| Hero | opacity 0→1, translateY 20px→0, duration 0.6–0.8s, ease-out | stagger nhẹ giữa heading/subheading/CTA (~80-120ms mỗi lớp) |
| Section vào viewport | fade + translateY nhẹ (12–24px), trigger bằng IntersectionObserver | chỉ trigger 1 lần, không lặp lại khi scroll qua lại |
| Ảnh sản phẩm | scale 1 → 1.02–1.05 khi hover, transition mượt 0.3–0.4s | không scale quá 1.1 — trông rẻ tiền/giật |
| Button | hover: đổi màu nền/border + scale nhẹ 1.0→1.02, active: scale 0.98 | luôn có transition, không đổi trạng thái đột ngột |
| Card/list item | stagger reveal khi scroll, delay tăng dần 60-100ms mỗi item | tối đa stagger ~6-8 item, nhiều hơn thì bỏ stagger |
| Cart/thêm giỏ hàng | micro feedback (icon bounce nhẹ, badge số tăng có animation) | xác nhận hành động thành công |
| Story/scroll section dài | parallax RẤT nhẹ hoặc scroll-linked opacity, dùng tiết chế | dễ lạm dụng, chỉ 1-2 chỗ trong toàn trang |

## Kỹ thuật bắt buộc

- **Chỉ animate `transform` và `opacity`** — đây là hai property không gây reflow, mượt trên mọi thiết bị. **CẤM animate `height`, `margin`, `padding`, `top/left`** cho entrance animation vì gây layout shift/giật.
- **Dùng easing tự nhiên**: `ease-out` cho entrance (nhanh vào, chậm dừng), `ease-in-out` cho transition qua lại. Tránh `linear` cho UI animation (trông máy móc).
- **Duration hợp lý**: micro-interaction 150–300ms, section reveal 400–700ms, không kéo dài animation quá 800ms trừ trường hợp đặc biệt (khiến trang cảm giác chậm).
- **Tôn trọng `prefers-reduced-motion`** — bắt buộc:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
- **Không lạm dụng thư viện animation nặng** cho hiệu ứng đơn giản — CSS transition/animation thuần đủ cho 80% trường hợp; chỉ dùng thư viện (Framer Motion/GSAP) khi cần orchestration phức tạp (stagger nhiều lớp, scroll-linked timeline).
- **Reveal once**: dùng `IntersectionObserver` với `threshold` ~0.15–0.2 và `unobserve` sau khi trigger, tránh animation lặp lại gây rối mắt khi user scroll lên xuống.

## Red flags cần tránh

- Animation làm nội dung "nhấp nháy" liên tục dù không tương tác.
- Loading spinner/skeleton animate quá lâu không cần thiết cho nội dung tĩnh.
- Hover effect quá mạnh (xoay, phóng to nhiều, đổi màu chói) làm mất chuyên nghiệp.
- Animate cùng lúc quá nhiều phần tử khi load trang → cảm giác hỗn loạn thay vì tinh tế.
