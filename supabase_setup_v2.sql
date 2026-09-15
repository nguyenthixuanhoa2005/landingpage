-- =======================================================
-- FILE HƯỚNG DẪN THIẾT LẬP SUPABASE PHẦN 2 (NÂNG CẤP)
-- Bạn có thể mở file này bằng Notepad hoặc VS Code để copy dễ dàng.
-- =======================================================

-- =======================================================
-- 1. BẢNG THÔNG TIN KHÁCH HÀNG (profiles) & TỰ ĐỘNG ĐỒNG BỘ
-- =======================================================

-- Tạo bảng profiles chứa thông tin chi tiết của khách hàng
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  full_name text,
  phone_number text,
  address text,
  avatar_url text
);

-- Bật bảo mật RLS cho profiles
alter table public.profiles enable row level security;

-- Tạo policy cho phép người dùng tự xem thông tin profile của họ
create policy "Cho phép người dùng xem profile cá nhân"
on public.profiles for select to authenticated
using (auth.uid() = id);

-- Tạo policy cho phép người dùng tự cập nhật profile của họ
create policy "Cho phép người dùng cập nhật profile cá nhân"
on public.profiles for update to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

-- Tạo policy cho phép người dùng tự tạo profile (trong trường hợp tự tạo)
create policy "Cho phép người dùng tạo profile cá nhân"
on public.profiles for insert to authenticated
with check (auth.uid() = id);

-- --- HÀM TỰ ĐỘNG ĐỒNG BỘ KHI ĐĂNG KÝ TÀI KHOẢN ---
-- Tự động tạo một dòng trong bảng profiles khi có tài khoản mới đăng ký thành công ở Supabase Auth
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, phone_number, address)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'phone_number', ''),
    coalesce(new.raw_user_meta_data->>'address', '')
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger kích hoạt hàm handle_new_user
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- =======================================================
-- 2. CẬP NHẬT TRẠNG THÁI GIAO HÀNG TRÊN BẢNG orders
-- Bảng orders đã tạo trước đó đã có trường 'status' với mặc định là 'pending'.
-- Bạn có thể cập nhật trường 'status' này thành các trạng thái giao hàng sau:
--   - 'pending': Đơn hàng mới, chờ xác nhận
--   - 'processing': Đã xác nhận, đang đóng gói
--   - 'shipping': Đang giao hàng (đã giao cho đơn vị vận chuyển)
--   - 'delivered': Giao hàng thành công (khách đã nhận hàng)
--   - 'cancelled': Đơn hàng bị hủy
-- =======================================================


-- =======================================================
-- 3. BẢNG ĐÁNH GIÁ SẢN PHẨM (reviews)
-- =======================================================

create table public.reviews (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  product_id text references public.products(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  comment text not null,
  reviewer_name text not null
);

-- Bật bảo mật RLS cho bảng reviews
alter table public.reviews enable row level security;

-- Cho phép tất cả mọi người xem đánh giá sản phẩm
create policy "Cho phép xem tất cả đánh giá"
on public.reviews for select to anon, authenticated
using (true);

-- Chỉ cho phép người dùng đã đăng nhập tự viết đánh giá của mình
create policy "Cho phép người dùng viết đánh giá"
on public.reviews for insert to authenticated
with check (auth.uid() = user_id);

-- Cho phép người dùng tự xóa/sửa đánh giá của chính họ
create policy "Cho phép người dùng sửa đánh giá cá nhân"
on public.reviews for update to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Cho phép người dùng xóa đánh giá cá nhân"
on public.reviews for delete to authenticated
using (auth.uid() = user_id);
