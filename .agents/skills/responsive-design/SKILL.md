---
name: responsive-design
description: Thiết kế responsive thực sự (không chỉ co giãn desktop layout xuống mobile) cho landing page và mọi giao diện web — LUÔN dùng skill này khi code bất kỳ layout nào có nhiều breakpoint, hoặc khi user nhắc "responsive", "màn hình nhỏ", "mobile". Ép agent thiết kế lại bố cục theo từng breakpoint thay vì chỉ dùng flex-wrap mặc định.
---

# Responsive Design

## Nguyên tắc cốt lõi

**KHÔNG được đơn giản là co nhỏ layout desktop xuống mobile.** Mỗi breakpoint cần được suy nghĩ lại về **thứ tự ưu tiên nội dung**, không chỉ về kích thước. Câu hỏi bắt buộc ở mỗi breakpoint: trên màn hình này, cái gì nên thấy TRƯỚC, cái gì nên ẨN/gộp lại?

## Breakpoint bắt buộc phải test

```
320px   – iPhone SE / màn nhỏ nhất
375px   – iPhone tiêu chuẩn
390px   – iPhone hiện đại
768px   – Tablet dọc / iPad mini
1024px  – Tablet ngang / laptop nhỏ
1440px  – Desktop tiêu chuẩn
1920px  – Desktop lớn (kiểm tra max-width, tránh line quá dài)
```

Dùng mobile-first CSS (`min-width` media query) làm mặc định, trừ khi codebase đã theo hướng khác.

## Ví dụ pattern bắt buộc áp dụng — KHÔNG chỉ stack đơn giản

**Hero:**
```
Desktop: [ Text/CTA (40%) | Ảnh lớn (60%) ]  — side by side
Mobile:  [ Ảnh (rút gọn/crop khác) ]
         [ Text ngắn hơn, CTA full-width, dễ bấm ]
```
Trên mobile, ảnh nên đổi crop/tỷ lệ (không chỉ resize) — ảnh ngang đẹp trên desktop có thể cần crop dọc/vuông trên mobile để giữ điểm nhấn thị giác.

**Navbar:**
```
Desktop: Logo | Link1 Link2 Link3 | Ngôn ngữ | CTA
Mobile:  Logo                              ☰ (hamburger)
```
Menu mobile nên là overlay/drawer full-screen với animation slide/fade, không nhồi toàn bộ nav item co nhỏ lại.

**Grid sản phẩm:**
```
Desktop (≥1024px): 3–4 cột
Tablet (768–1023px): 2 cột
Mobile (<768px): 1 cột, ảnh lớn hơn tương đối, hoặc carousel ngang nếu nhiều item
```

**Typography responsive:** dùng `clamp()` cho heading (xem skill `typography-system`) thay vì set font-size cố định theo từng breakpoint bằng tay — mượt hơn và ít code hơn.

**Spacing:** section padding giảm dần khi màn hình nhỏ (ví dụ desktop 120px vertical padding → mobile 48–64px), không giữ nguyên spacing lớn gây trang mobile quá dài/loãng.

## Nguyên tắc UX mobile bắt buộc

- **Touch target tối thiểu 44×44px** cho mọi phần tử bấm được (button, link, icon button).
- **CTA chính trên mobile nên full-width hoặc sticky ở đáy màn hình** nếu là trang bán hàng — dễ bấm, luôn thấy được khi scroll.
- **Không dùng hover-only interaction trên mobile** (không có hover thật) — mọi thông tin quan trọng phải truy cập được bằng tap.
- **Ảnh phải có `srcset`/kích thước responsive**, không load ảnh desktop full-size trên mobile (xem thêm skill `performance`).
- **Test cả orientation ngang** trên mobile/tablet nếu trang có nội dung dài hoặc video.

## Quy trình bắt buộc khi code

1. Thiết kế layout mobile trước (mobile-first), đảm bảo nội dung đọc được, thao tác được với một tay.
2. Mở rộng dần lên tablet/desktop, thêm bố cục song song/nhiều cột khi có đủ không gian — không chỉ set `max-width` và để nguyên.
3. Kiểm tra thủ công (hoặc mô tả rõ trong code review) ở tối thiểu 3 mốc: 375px, 768px, 1440px.
4. Kiểm tra không có horizontal scroll ngoài ý muốn ở bất kỳ breakpoint nào.
