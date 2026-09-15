---
name: editorial-storytelling
description: Thiết kế landing page theo phong cách editorial/storytelling thay vì layout SaaS/CRUD generic — dùng cho thương hiệu premium, sản phẩm tự nhiên/thủ công, F&B, mỹ phẩm, lifestyle, hoặc bất kỳ trang nào cần "cảm giác thương hiệu" thay vì chỉ liệt kê tính năng. Dùng skill này khi user muốn web có "chất riêng", "câu chuyện", "premium", "sang", "độc đáo" — không dùng cho dashboard, SaaS B2B thuần chức năng.
---

# Editorial Storytelling Layout

## Khi nào dùng

Dùng phong cách editorial khi thương hiệu cần truyền tải **cảm xúc và câu chuyện**, không chỉ thông tin. Điển hình: sản phẩm tự nhiên, thủ công, F&B cao cấp, thời trang, mỹ phẩm, dịch vụ lifestyle. KHÔNG dùng cho dashboard nội bộ, công cụ B2B thuần năng suất — những trang đó cần rõ ràng/nhanh hơn là cảm xúc.

## Cấu trúc kể chuyện (thay cho cấu trúc feature-list)

```
HERO
Một câu tuyên ngôn (statement), không phải slogan quảng cáo
   ↓
NGUỒN GỐC / CÂU CHUYỆN
Vì sao thương hiệu/sản phẩm này tồn tại — hành trình, cảm hứng, con người
   ↓
GIÁ TRỊ CỐT LÕI
Vì sao điều này đáng quan tâm — không liệt kê tính năng, mà kể "tại sao nó quan trọng"
   ↓
MINH BẠCH / QUY TRÌNH
Nguồn nguyên liệu, cách làm, thành phần, tiêu chuẩn — xây niềm tin bằng chi tiết cụ thể
   ↓
SẢN PHẨM
Trình bày như một phần của câu chuyện, không phải catalog rời rạc
   ↓
LIÊN HỆ / KẾT NỐI
```

Khác biệt cốt lõi so với layout SaaS thông thường: mỗi section là một **đoạn văn thị giác** (visual paragraph) có nhịp điệu, không phải một "feature card grid" lặp lại.

## Nguyên tắc viết nội dung editorial

- **Hero không nói "chúng tôi bán gì"**, mà gợi một cảm giác/triết lý. Ví dụ hướng viết: một câu ngắn, có hình ảnh ẩn dụ, tránh ngôn ngữ quảng cáo sáo rỗng.
- **Dùng ngôn ngữ cụ thể, giác quan**, tránh tính từ rỗng ("chất lượng cao", "tốt nhất") — thay bằng chi tiết thật (nguồn gốc, quy trình, con số cụ thể).
- **Mỗi đoạn ngắn**, nhiều khoảng trắng — editorial là về nhịp đọc (reading rhythm), không nhồi chữ.
- **Ảnh lớn, full-bleed hoặc gần full-bleed** xen giữa các đoạn text thay vì icon nhỏ kiểu SaaS.

## Layout patterns đặc trưng editorial (khác SaaS)

- **Asymmetric split**: text một bên, ảnh lớn một bên, không căn giữa đều mọi thứ.
- **Overlap có kiểm soát**: ảnh và text có thể chồng nhẹ lên nhau (dùng z-index + negative margin) để tạo chiều sâu, thay vì mọi block đều nằm trong container đóng khung.
- **Pull quote / câu nhấn mạnh** đứng riêng một dòng lớn giữa các đoạn, dùng font heading, để tạo điểm dừng thị giác.
- **Không dùng generic 3-column icon grid** cho phần giá trị — thay bằng layout dạng bài báo: ảnh + đoạn text xen kẽ trái/phải qua từng section.

## Cách tránh generic

Trước khi code mỗi section, tự kiểm tra:
- Section này có thể copy-paste sang một thương hiệu bất kỳ khác mà vẫn hợp lý không? Nếu có → quá generic, cần thêm chi tiết đặc thù của thương hiệu này.
- Có đang dùng lại bố cục "icon + heading + 2 dòng mô tả x3 card" không? Nếu có, đó là dấu hiệu SaaS template, không phải editorial.

Kết hợp chặt với skill `typography-system` (heading serif/display + body sans-serif là combo phổ biến cho editorial) và `motion-design` (scroll reveal nhẹ nhàng, không giật).
