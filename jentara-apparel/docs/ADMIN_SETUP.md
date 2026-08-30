# JENTARA Admin Setup

## 1. Database

Run `docs/admin-migration.sql` in the Supabase SQL Editor.

The migration adds:

- `customer_queries`
- admin/super-admin helper functions
- secure super-admin role assignment RPC
- admin RLS policies for the existing commerce tables

Do not put a Supabase service-role key in the browser.

## 2. Give the first administrator access

After the first user has registered, set the user's profile role to `super_admin` once from the Supabase SQL Editor:

```sql
update public.profiles
set role = 'super_admin'
where email = 'YOUR_EMAIL';
```

After that user can manage roles through `/admin/users`.

## 3. Admin routes

- `/admin` — dashboard
- `/admin/analytics` — revenue, order and product analytics
- `/admin/products` — catalogue
- `/admin/products/add` — create product
- `/admin/products/edit/[id]` — edit product
- `/admin/categories` — category CRUD
- `/admin/inventory` — size-level stock
- `/admin/orders` — order management
- `/admin/orders/[id]` — order details
- `/admin/customers` — customer metrics
- `/admin/reviews` — review moderation
- `/admin/queries` — customer support inbox
- `/admin/users` — role assignment
- `/admin/roles` — permission model

## 4. Customer queries

The contact form now stores messages in `customer_queries`. If the database migration has not been run yet, the form falls back to the existing `mailto:support@jentara.in` behaviour.

## 5. Security

The client-side `AdminGuard` improves the user experience by preventing non-admin users from entering the administration UI.

The actual security boundary is Supabase RLS. Run the migration before using admin operations with real customer data.
