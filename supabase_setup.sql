-- =======================================================
-- FILE HƯỚNG DẪN THIẾT LẬP SUPABASE
-- Bạn có thể mở file này bằng Notepad hoặc VS Code để copy dễ dàng.
-- =======================================================

-- =======================================================
-- 1. SQL TẠO BẢNG orders (LƯU ĐƠN HÀNG)
-- Copy toàn bộ phần này dán vào Supabase SQL Editor và chạy (Run)
-- =======================================================
create table public.orders (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users(id) on delete set null,
  full_name text not null,
  phone_number text not null,
  address text not null,
  payment_method text not null default 'COD',
  total_price numeric not null,
  order_items jsonb not null default '[]'::jsonb,
  status text not null default 'pending'
);

-- Bật bảo mật Row Level Security (RLS) cho bảng orders
alter table public.orders enable row level security;

-- Tạo chính sách (Policy) cho phép người dùng tự thêm đơn hàng của họ
create policy "Cho phép người dùng tạo đơn hàng" 
on public.orders for insert to authenticated 
with check (auth.uid() = user_id);

-- Tạo chính sách cho phép người dùng tự xem lại đơn hàng của họ
create policy "Cho phép người dùng xem đơn hàng cá nhân" 
on public.orders for select to authenticated 
using (auth.uid() = user_id);


-- =======================================================
-- 2. SQL TẠO BẢNG products & THÊM DỮ LIỆU MẪU (TÙY CHỌN)
-- Copy toàn bộ phần này dán vào Supabase SQL Editor và chạy (Run)
-- =======================================================
create table public.products (
  id text primary key,
  name text not null,
  price numeric not null,
  image text,
  short_description text,
  category text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Bật bảo mật RLS cho bảng products
alter table public.products enable row level security;

-- Cho phép tất cả mọi người xem sản phẩm
create policy "Cho phép mọi người xem sản phẩm" 
on public.products for select to anon, authenticated 
using (true);

-- Thêm sẵn dữ liệu mẫu cho sản phẩm tràm trà Việt Nam
insert into public.products (id, name, price, image, short_description, category) values
(
  'tt-001', 
  'Tinh Dầu Tràm Gió Huế Nguyên Chất 10ml', 
  120000, 
  'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80', 
  'Chiết xuất 100% từ lá tràm gió tự nhiên vùng cố đô Huế, giữ ấm hiệu quả, phòng ho và tránh gió cho em bé và gia đình.', 
  'Tinh dầu nguyên chất'
),
(
  'tt-002', 
  'Tinh Dầu Tràm Trà Năm Gân 10ml', 
  185000, 
  'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80', 
  'Giống tràm Melaleuca alternifolia chuẩn xuất khẩu, hàm lượng Terpinen-4-ol cao giúp kháng khuẩn, hỗ trợ xẹp mụn và xông phòng.', 
  'Tinh dầu nguyên chất'
),
(
  'tt-003', 
  'Toner Nước Cất Tràm Trà Hữu Cơ 100ml', 
  145000, 
  'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80', 
  'Nước chưng cất hydrosol tinh khiết giúp cân bằng độ ẩm, làm sạch sâu bã nhờn và làm dịu các vùng da bị mẩn đỏ.', 
  'Chăm sóc da'
),
(
  'tt-004', 
  'Xà Bông Thảo Dược Tràm Trà Mật Ong', 
  65000, 
  'https://images.unsplash.com/photo-1607006342411-92407c573b24?auto=format&fit=crop&w=900&q=80', 
  'Phôi xà bông từ dầu thực vật tự nhiên, kết hợp tinh dầu tràm kháng khuẩn và mật ong rừng giúp làm sạch và giảm mụn lưng.', 
  'Chăm sóc cơ thể'
),
(
  'tt-005', 
  'Xịt Kháng Khuẩn Tinh Dầu Tràm 250ml', 
  135000, 
  'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=900&q=80', 
  'Công thức kết hợp cồn thực vật lành tính và tinh dầu tràm trà giúp khử trùng tay, xịt phòng, ô tô và lọc sạch mùi ẩm mốc.', 
  'Chăm sóc nhà cửa'
),
(
  'tt-006', 
  'Dầu Massage Tràm Gió & Thảo Mộc 100ml', 
  260000, 
  'https://images.unsplash.com/photo-1611080541599-8c6dbde6ed28?auto=format&fit=crop&w=900&q=80', 
  'Dầu dẫn hướng dương kết hợp tràm gió, bạc hà và khuynh diệp. Lý tưởng để xoa bóp thư giãn, giảm mỏi cơ và lưu thông khí huyết.', 
  'Chăm sóc cơ thể'
),
(
  'tt-007', 
  'Nến Thơm Trị Liệu Tràm Trà Bạc Hà', 
  210000, 
  'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80', 
  'Nến sáp đậu nành cao cấp tỏa hương thanh mát từ tinh dầu thiên nhiên, giúp giảm căng thẳng mệt mỏi sau ngày dài làm việc.', 
  'Không gian sống'
),
(
  'tt-008', 
  'Hộp Quà Sức Khỏe Xanh (Combo Tràm Trà)', 
  310000, 
  'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?auto=format&fit=crop&w=900&q=80', 
  'Bộ quà tặng cao cấp gồm 1 Tinh dầu tràm Huế 10ml, 1 bánh Xà bông thảo dược và 1 Xịt kháng khuẩn. Món quà ý nghĩa cho người thân.', 
  'Bộ quà tặng'
);
