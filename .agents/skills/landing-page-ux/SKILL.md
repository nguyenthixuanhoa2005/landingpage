---
name: landing-page-ux
description: Thiết kế logic UX và luồng chuyển đổi (conversion flow) cho landing page bán hàng/thương hiệu. LUÔN dùng skill này trước khi code bất kỳ landing page, trang giới thiệu sản phẩm, trang bán hàng nào — kể cả khi user chỉ nói "làm cho tôi cái web bán X" mà không nhắc tới UX. Ép agent suy nghĩ về information hierarchy và customer journey thay vì xếp section theo cảm tính.
---

# Landing Page UX / Conversion Logic

## Nguyên tắc cốt lõi

Một landing page KHÔNG phải là tập hợp các section đẹp xếp cạnh nhau. Nó là một **luồng thuyết phục có chủ đích** (persuasion flow), mỗi section tồn tại để trả lời đúng MỘT câu hỏi mà visitor đang có trong đầu ở thời điểm đó.

Trước khi viết bất kỳ dòng code nào, bắt buộc phải xác định:

1. Visitor là ai, họ đến từ đâu (ads, search, social, referral)?
2. Họ đang ở giai đoạn nhận thức nào (chưa biết vấn đề / biết vấn đề chưa biết giải pháp / đang so sánh giải pháp / sẵn sàng mua)?
3. Một hành động chuyển đổi (conversion action) duy nhất là gì? (mua, đăng ký, để lại contact, đặt lịch...)

## Cấu trúc luồng bắt buộc

```
Attention (Hero)
   ↓ Visitor hiểu được NGAY sản phẩm/thương hiệu là gì, trong 3 giây
Problem / Context
   ↓ Vì sao điều này đáng quan tâm với HỌ
Solution / Value proposition
   ↓ Tại sao đây là giải pháp đúng
Trust / Proof
   ↓ Vì sao tin được (nguồn gốc, quy trình, chứng nhận, review, số liệu)
Product / Offer
   ↓ Cụ thể có gì để mua/dùng
Objection handling (nếu cần)
   ↓ FAQ, so sánh, bảo hành — dập tắt lý do trì hoãn
Conversion (CTA chính)
   ↓ Hành động rõ ràng, không mơ hồ
Fallback (nếu chưa sẵn sàng mua)
   → Nhớ thương hiệu / liên hệ / theo dõi / lưu lại
```

**CẤM** thiết kế theo kiểu lặp lại vô nghĩa:
```
Hero → 3 cards → 3 cards → 3 cards → Buy now
```
Đây là dấu hiệu của template SaaS generic, không có logic thuyết phục — mỗi section chỉ đang "trông có nội dung" chứ không phục vụ một câu hỏi cụ thể nào của visitor.

## Quy tắc cho từng section

- **Hero**: một câu định vị (positioning statement) rõ ràng, không sáo rỗng, không dùng jargon marketing rỗng ("giải pháp tối ưu", "chất lượng hàng đầu"). Một CTA chính, không quá 1-2 CTA phụ.
- **Mỗi section chỉ nên có MỘT ý chính.** Nếu section đang cố nói 2-3 điều cùng lúc, tách ra.
- **Visual hierarchy phải phản ánh priority thật**: cái quan trọng nhất phải to nhất/đậm nhất/ở vị trí mắt nhìn thấy trước (F-pattern hoặc Z-pattern tùy layout), không phải cái nào code trước thì để trước.
- **CTA phải nhất quán**: cùng một hành động, cùng một cách gọi tên xuyên suốt trang (đừng chỗ thì "Mua ngay", chỗ thì "Đặt hàng", chỗ thì "Liên hệ" cho cùng một action).
- **Social proof đặt gần quyết định**, không đặt cuối trang cho có — đặt ngay trước hoặc trong section Product/Offer.
- **Loại bỏ section không phục vụ luồng.** Trước khi thêm section mới, tự hỏi: "section này trả lời câu hỏi gì mà visitor đang hỏi ở bước này?" — nếu không trả lời được, bỏ.

## Khi bắt đầu một task landing page mới

1. Hỏi hoặc tự suy luận: sản phẩm/dịch vụ là gì, đối tượng khách hàng, điểm khác biệt cạnh tranh, và hành động chuyển đổi mong muốn.
2. Viết ra outline luồng (đúng thứ tự phía trên) TRƯỚC khi code, dưới dạng comment hoặc file kế hoạch ngắn.
3. Với mỗi section, viết 1 câu "câu hỏi mà section này trả lời" trước khi code phần nội dung/UI của nó.
4. Chỉ sau đó mới bắt đầu code UI, kết hợp với skill `editorial-storytelling`, `typography-system`, `motion-design`, `responsive-design`.

## Red flags cần tránh

- Nhiều section trông giống hệt nhau về layout (3 cards lặp đi lặp lại) → nhàm, mất hierarchy.
- CTA xuất hiện quá sớm khi visitor chưa được thuyết phục đủ (trước khi có Trust/Proof).
- Không có single conversion goal rõ ràng — trang có 5 CTA khác nhau cho 5 mục đích khác nhau, làm loãng quyết định.
- Copy chung chung, không nói cụ thể về sản phẩm/thương hiệu này khác gì đối thủ.
