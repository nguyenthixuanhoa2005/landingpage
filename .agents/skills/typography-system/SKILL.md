---
name: typography-system
description: Chọn và thiết lập hệ thống font (heading/body), type scale, line-height cho web/landing page — LUÔN dùng skill này trước khi code bất kỳ giao diện nào có text, để agent không tự ý chọn font mặc định của framework (Arial, system-ui, Inter một mình cho cả heading lẫn body) hoặc nhồi quá nhiều font. Đặc biệt quan trọng khi user muốn giao diện "đẹp", "sang", "độc đáo", "không generic".
---

# Typography System

## Nguyên tắc

**Không bao giờ để agent tự chọn ngẫu nhiên 4-5 font khác nhau.** Một hệ thống typography tốt chỉ cần **tối đa 2 font family**: một cho heading (thể hiện cá tính thương hiệu), một cho body/UI (ưu tiên khả năng đọc). Font thứ 3 (nếu có) chỉ dùng cho mono/số liệu, không dùng tràn lan.

## Chọn cặp font theo định hướng thương hiệu

| Định hướng | Heading | Body | Cảm giác |
|---|---|---|---|
| Editorial / premium tự nhiên | Playfair Display, Fraunces | Inter, Manrope | sang, kể chuyện |
| Hiện đại, tối giản, ít "mỹ phẩm" | Lora, Newsreader | Inter, IBM Plex Sans | tinh tế, đáng tin |
| Tech / SaaS hiện đại | Geist, Inter (weight nặng cho heading) | Inter, Geist | sạch, chuyên nghiệp |
| Bold / streetwear / Gen Z | Space Grotesk, General Sans | Inter, Satoshi | năng động, cá tính |
| Luxury / high-end | Cormorant, Canela-style serif | Neue Montreal, Inter | tối giản sang trọng |

Nếu không chắc, mặc định an toàn cho brand cần cảm giác cao cấp/tự nhiên: **heading Playfair Display + body Inter**. Nếu cần hiện đại/ít hoa mỹ hơn: **heading Lora + body Inter**.

**Bắt buộc hỗ trợ tiếng Việt có dấu** — kiểm tra font đã chọn có đủ Vietnamese glyphs (hầu hết Google Fonts hiện đại đều hỗ trợ, nhưng cần khai báo đúng subset khi load, ví dụ Google Fonts `&subset=vietnamese`).

## Type scale bắt buộc

Dùng scale nhất quán, không đặt font-size tùy tiện theo cảm tính:

```
Display / Hero heading   : 56–96px (responsive clamp)
H1 / Section heading      : 36–56px
H2                        : 28–36px
H3                        : 20–24px
Body large                : 18–20px
Body                      : 16px
Small / caption           : 13–14px
```

Dùng `clamp()` trong CSS để heading co giãn mượt theo viewport thay vì nhảy bậc đột ngột ở breakpoint:
```css
font-size: clamp(2.5rem, 5vw + 1rem, 6rem);
```

## Line-height & rhythm

- Heading lớn: line-height 1.0–1.15 (chật, có sức nặng thị giác).
- Body text: line-height 1.5–1.7 (thoáng, dễ đọc).
- Line length lý tưởng cho đoạn văn dài: 60–75 ký tự/dòng — dùng `max-width` trên block text, không để text chạy full-width trên màn hình rộng.
- Giữ khoảng cách theo hệ số nhất quán (4px/8px base spacing scale) giữa các cấp heading/body, không tùy tiện margin lẻ (13px, 17px...).

## Quy tắc dùng

- Không viết hoa toàn bộ (uppercase) cho các đoạn dài — chỉ dùng uppercase cho label/nav ngắn, kèm letter-spacing nhẹ (0.05–0.1em) để dễ đọc hơn.
- Heading và body phải tương phản rõ về "giọng": nếu cả hai đều là sans-serif hiện đại trung tính, trang sẽ trông generic — nên có ít nhất một yếu tố tương phản (serif vs sans, hoặc display weight rất nặng vs body nhẹ).
- Khai báo font qua CSS variable để dễ đổi đồng bộ toàn site:
```css
:root {
  --font-heading: 'Playfair Display', serif;
  --font-body: 'Inter', sans-serif;
}
```
- Preload font chính (heading + body regular/medium) để tránh FOUT/layout shift; dùng `font-display: swap`.

Kết hợp với `accessibility` skill để đảm bảo contrast và kích thước tối thiểu vẫn đạt chuẩn dù font có tính "trang trí".
