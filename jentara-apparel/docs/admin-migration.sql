-- docs/admin-migration.sql
-- JENTARA administration security + customer query storage.
-- Run this in Supabase SQL Editor before using admin mutations in production.

create or replace function public.is_jentara_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and lower(coalesce(role, '')) in ('admin', 'super_admin', 'owner')
  );
$$;

create or replace function public.is_jentara_super_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and lower(coalesce(role, '')) in ('super_admin', 'owner')
  );
$$;

grant execute on function public.is_jentara_admin() to authenticated;
grant execute on function public.is_jentara_super_admin() to authenticated;

create table if not exists public.customer_queries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  full_name text not null,
  email text not null,
  subject text not null,
  message text not null,
  status text not null default 'new'
    check (status in ('new', 'open', 'in_progress', 'resolved')),
  created_at timestamptz not null default now()
);

alter table public.customer_queries enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'customer_queries'
      and policyname = 'customer_queries_public_insert'
  ) then
    create policy customer_queries_public_insert
      on public.customer_queries
      for insert
      to anon, authenticated
      with check (
        user_id is null
        or user_id = auth.uid()
      );
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'customer_queries'
      and policyname = 'customer_queries_admin_select'
  ) then
    create policy customer_queries_admin_select
      on public.customer_queries
      for select
      to authenticated
      using (public.is_jentara_admin());
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'customer_queries'
      and policyname = 'customer_queries_admin_update'
  ) then
    create policy customer_queries_admin_update
      on public.customer_queries
      for update
      to authenticated
      using (public.is_jentara_admin())
      with check (public.is_jentara_admin());
  end if;
end
$$;

create or replace function public.admin_update_profile_role(
  target_user_id uuid,
  new_role text
)
returns public.profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  updated_profile public.profiles;
begin
  if not public.is_jentara_super_admin() then
    raise exception 'Only a super admin can change user roles';
  end if;

  if lower(new_role) not in (
    'customer',
    'support',
    'operations',
    'admin',
    'super_admin'
  ) then
    raise exception 'Invalid role';
  end if;

  update public.profiles
  set role = lower(new_role)
  where id = target_user_id
  returning * into updated_profile;

  if updated_profile.id is null then
    raise exception 'User profile not found';
  end if;

  return updated_profile;
end;
$$;

grant execute on function public.admin_update_profile_role(uuid, text)
to authenticated;

-- The policies below are additive. They grant existing authenticated
-- administrators access without removing customer-facing policies.
do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'products',
    'categories',
    'orders',
    'order_items',
    'product_reviews',
    'profiles'
  ]
  loop
    execute format('alter table public.%I enable row level security', table_name);
  end loop;
end
$$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'products'
      and policyname = 'products_admin_all'
  ) then
    create policy products_admin_all on public.products
      for all to authenticated
      using (public.is_jentara_admin())
      with check (public.is_jentara_admin());
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'categories'
      and policyname = 'categories_admin_all'
  ) then
    create policy categories_admin_all on public.categories
      for all to authenticated
      using (public.is_jentara_admin())
      with check (public.is_jentara_admin());
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'orders'
      and policyname = 'orders_admin_all'
  ) then
    create policy orders_admin_all on public.orders
      for all to authenticated
      using (public.is_jentara_admin())
      with check (public.is_jentara_admin());
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'order_items'
      and policyname = 'order_items_admin_all'
  ) then
    create policy order_items_admin_all on public.order_items
      for all to authenticated
      using (public.is_jentara_admin())
      with check (public.is_jentara_admin());
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'product_reviews'
      and policyname = 'product_reviews_admin_all'
  ) then
    create policy product_reviews_admin_all on public.product_reviews
      for all to authenticated
      using (public.is_jentara_admin())
      with check (public.is_jentara_admin());
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'profiles'
      and policyname = 'profiles_admin_select'
  ) then
    create policy profiles_admin_select on public.profiles
      for select to authenticated
      using (public.is_jentara_admin());
  end if;
end
$$;
