---
name: accessibility
description: Đảm bảo accessibility (khả năng tiếp cận) cơ bản khi code bất kỳ UI/landing page nào — semantic HTML, contrast, keyboard navigation, alt text, focus state, aria-label. LUÔN áp dụng skill này mặc định cho mọi UI code, kể cả khi user không nhắc tới accessibility, vì đây là tiêu chuẩn chất lượng tối thiểu chứ không phải tính năng phụ.
---

# Accessibility Baseline

## Nguyên tắc

Accessibility không phải "thêm sau nếu có thời gian" — đây là checklist mặc định áp dụng cho MỌI UI được code, kể cả landing page bán hàng đơn giản.

## Checklist bắt buộc

**Semantic HTML**
- Dùng đúng thẻ: `<button>` cho hành động (không dùng `<div onClick>`), `<a>` cho điều hướng, `<nav>`, `<header>`, `<main>`, `<footer>`, `<section>` đúng vai trò.
- Heading phải theo thứ bậc đúng (`h1` → `h2` → `h3`, không nhảy cóc hoặc dùng heading chỉ vì muốn font to).
- Form input luôn có `<label>` gắn kèm (dùng `htmlFor`/`for`, không chỉ placeholder thay label).

**Contrast**
- Text thường: tỷ lệ contrast tối thiểu **4.5:1** so với nền.
- Text lớn (≥18px bold hoặc ≥24px regular): tối thiểu **3:1**.
- Kiểm tra kỹ với các theme màu "editorial" hay dùng màu pastel/be nhạt — dễ bị fail contrast, cần test lại bằng công cụ (WebAIM Contrast Checker hoặc tương đương) chứ không đoán bằng mắt.

**Keyboard navigation**
- Mọi phần tử tương tác (button, link, input, custom dropdown) phải bấm được bằng Tab + Enter/Space, không cần chuột.
- Thứ tự Tab phải theo thứ tự thị giác hợp lý (dùng DOM order tự nhiên, tránh `tabindex` dương tùy tiện).
- Modal/drawer khi mở phải bẫy focus bên trong (focus trap) và đóng được bằng phím Esc.

**Focus state**
- KHÔNG bao giờ set `outline: none` mà không thay bằng focus style rõ ràng khác (ví dụ box-shadow/ring màu thương hiệu).
```css
button:focus-visible {
  outline: 2px solid var(--color-focus, #2563eb);
  outline-offset: 2px;
}
```

**Hình ảnh & icon**
- Mọi `<img>` có nội dung ý nghĩa phải có `alt` mô tả đúng nội dung (không để trống hoặc alt="image").
- Ảnh trang trí thuần túy: `alt=""` để screen reader bỏ qua.
- Icon button (chỉ có icon, không có text) bắt buộc có `aria-label` mô tả hành động, ví dụ `aria-label="Đóng menu"`.

**Motion**
- Tôn trọng `prefers-reduced-motion` (chi tiết ở skill `motion-design`) — người dùng nhạy cảm với chuyển động cần tắt được animation.

**Ngôn ngữ**
- Khai báo `lang="vi"` (hoặc đúng ngôn ngữ chính) trên `<html>`; nếu trang song ngữ, đánh dấu đúng `lang` cho từng phần nội dung khác ngôn ngữ chính.

## Quy trình khi code

1. Viết HTML với đúng thẻ semantic ngay từ đầu, không "div soup" rồi style lại bằng CSS để trông giống button/heading.
2. Sau khi code xong một section, tự rà lại checklist trên trước khi chuyển section tiếp theo — không để dồn kiểm tra accessibility ở cuối dự án.
3. Với component tương tác phức tạp (dropdown, tab, accordion, modal), tham khảo pattern ARIA chuẩn (WAI-ARIA Authoring Practices) thay vì tự sáng tạo cấu trúc aria tùy tiện.
