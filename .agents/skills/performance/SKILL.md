---
name: performance
description: Tối ưu tốc độ tải cho landing page/UI — nén và lazy-load ảnh, giảm dependency thừa, tối ưu font loading, ưu tiên mobile-first performance. Dùng skill này mặc định khi code bất kỳ landing page nào có ảnh/animation, đặc biệt các trang có nhiều ảnh sản phẩm hoặc animation phong phú (dễ nặng nếu không kiểm soát).
---

# Performance Baseline

## Nguyên tắc

Một landing page đẹp nhưng tải chậm sẽ mất khách trước khi họ kịp thấy sự đẹp đó. Performance là một phần của UX, không tách rời.

## Ảnh

- **Luôn lazy-load ảnh dưới màn hình đầu tiên**: `loading="lazy"` cho mọi `<img>` không nằm trong viewport ban đầu; ảnh hero/above-the-fold thì load eager (`loading="eager"` hoặc mặc định) và có thể `fetchpriority="high"`.
- **Dùng định dạng hiện đại**: WebP hoặc AVIF thay vì JPEG/PNG nặng khi có thể, kèm fallback nếu cần hỗ trợ trình duyệt cũ.
- **Responsive image bắt buộc**: dùng `srcset` + `sizes` để trình duyệt tải đúng kích thước ảnh theo màn hình, không load ảnh 4000px cho khung hiển thị 400px trên mobile.
- **Không dùng ảnh nền (background-image) quá nặng cho toàn màn hình** mà không nén — kiểm tra kích thước file thực tế, mục tiêu ảnh hero < 200–300KB sau nén.
- Đặt `width`/`height` (hoặc `aspect-ratio` CSS) rõ ràng cho ảnh để tránh Cumulative Layout Shift (CLS) khi ảnh load.

## Font

- Chỉ load đúng weight/style thực sự dùng (ví dụ chỉ 400 và 600 của Inter, không load cả 9 weight).
- Preload font quan trọng nhất (heading + body regular):
```html
<link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>
```
- Dùng `font-display: swap` để tránh render bị chặn (blocking) bởi font chưa tải xong.

## JavaScript / Dependency

- Không thêm thư viện animation nặng (Framer Motion, GSAP, three.js...) chỉ để làm hiệu ứng đơn giản — CSS transition thường đủ (xem skill `motion-design`).
- Code-split / lazy-load các phần JS không cần thiết ngay khi trang load (ví dụ modal, carousel phức tạp chỉ load khi user tương tác tới).
- Tránh nhồi nhiều tracking script/analytics không cần thiết làm chậm First Contentful Paint.

## Content dưới màn hình đầu (below-the-fold)

- Section không nằm trong viewport đầu tiên nên được lazy-mount nếu dùng framework component nặng (React/Vue) — chỉ render khi gần tới viewport, đặc biệt với carousel, video embed, map embed.
- Video: không autoplay video nặng ngay khi load trang trừ khi thực sự cần thiết cho hero; nếu có, dùng video nén tốt + poster image + `preload="metadata"`.

## Mobile-first

- Vì phần lớn traffic landing page thường đến từ mobile, ưu tiên tối ưu cho mobile trước: ảnh nhỏ hơn, ít animation nặng hơn, JS bundle nhỏ hơn cho breakpoint mobile nếu có thể tách.
- Kiểm tra bằng Lighthouse (mobile mode) mục tiêu tối thiểu: Performance ≥ 85–90, không có layout shift lớn (CLS < 0.1), LCP < 2.5s.

## Quy trình khi code

1. Trước khi thêm bất kỳ ảnh/thư viện nào, tự hỏi: có cách nhẹ hơn để đạt cùng hiệu quả không?
2. Sau khi hoàn thành trang, rà lại: ảnh nào chưa lazy-load, font nào load thừa weight, thư viện nào chỉ dùng cho 1 hiệu ứng nhỏ có thể thay bằng CSS thuần.
