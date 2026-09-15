# Bộ Skill Landing Page Độc Đáo — cho Google Antigravity

7 skill giúp Antigravity code landing page có logic UX tốt, chất riêng (editorial, không generic), typography chuẩn, animation có chủ đích, responsive thật sự, accessible, và nhanh.

## Cài đặt

Antigravity đọc skill từ thư mục `.agents/skills/<tên-skill>/SKILL.md` trong project.

1. Copy toàn bộ thư mục `.agents/` vào **gốc project** của bạn (cùng cấp `package.json`).
2. Mở project trong Antigravity — agent sẽ tự thấy 7 skill này trong danh sách skill khả dụng (không cần config thêm gì).
3. Khi bạn giao task kiểu "làm landing page cho [thương hiệu]", agent sẽ tự động đọc và áp dụng các skill liên quan dựa trên `description` của từng skill.

```
project-root/
├── .agents/
│   └── skills/
│       ├── landing-page-ux/SKILL.md
│       ├── editorial-storytelling/SKILL.md
│       ├── typography-system/SKILL.md
│       ├── motion-design/SKILL.md
│       ├── responsive-design/SKILL.md
│       ├── accessibility/SKILL.md
│       └── performance/SKILL.md
├── package.json
└── ...
```

## 7 skill gồm

| Skill | Vai trò |
|---|---|
| `landing-page-ux` | Logic UX / conversion flow — quan trọng nhất, ép agent nghĩ theo customer journey thay vì xếp section cảm tính |
| `editorial-storytelling` | Layout kể chuyện, tạo "chất thương hiệu" thay vì trang SaaS generic |
| `typography-system` | Hệ font heading/body chuẩn, type scale, line-height |
| `motion-design` | Animation có chủ đích, đúng chỗ, không giật layout |
| `responsive-design` | Responsive thật (đổi bố cục theo breakpoint) chứ không chỉ co giãn |
| `accessibility` | Contrast, keyboard nav, semantic HTML, alt text — mặc định luôn áp dụng |
| `performance` | Lazy-load ảnh, tối ưu font, tránh dependency thừa |

## Gợi ý dùng

- Với mỗi project cụ thể (ví dụ một thương hiệu riêng), bạn nên tạo thêm **1 skill riêng cho project** (ví dụ `.agents/skills/<ten-thuong-hieu>-brand/SKILL.md`) chứa: tên thương hiệu, tông giọng, bảng màu, font đã chốt, ví dụ copy mẫu — để agent không phải đoán lại từ đầu mỗi lần bạn yêu cầu sửa một section. 7 skill trong bộ này là **nguyên tắc chung**, còn skill riêng của brand là **dữ liệu cụ thể**.
- Có thể prompt trực tiếp: *"Redesign lại Hero, nhớ theo đúng landing-page-ux và editorial-storytelling skill"* để ép agent đọc lại skill trước khi sửa, tránh phá vỡ design system đã có.
- Nếu dùng shadcn/ui: các skill này không thay thế component library, mà quy định *cách* dùng nó (font, spacing, animation, layout) — đừng để mặc định style gốc của shadcn nếu muốn giao diện không bị "trông giống mọi web AI code khác".
