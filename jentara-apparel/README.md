# Jentara Apparel

A modern premium streetwear e-commerce platform built with Next.js, Tailwind CSS, Supabase, and TypeScript.

## Overview

Jentara Apparel is a full-stack fashion e-commerce application designed to deliver a modern shopping experience with premium UI/UX, secure authentication, product management, cart functionality, wishlist support, order management, and an admin-ready architecture.

---

## Features

### Customer Features

* Modern responsive homepage
* Product catalog
* Category browsing
* Product details page
* Search and filtering
* Shopping cart
* Wishlist
* User authentication
* Profile management
* Address management
* Order tracking
* Secure checkout
* Mobile-first design

### Admin Features

* Product management
* Category management
* Inventory management
* Order management
* Customer management
* Homepage content management

### Homepage Sections

* Announcement Bar
* Navigation Bar
* Hero Banner
* Trust Badges
* Features Section
* New Arrivals
* Testimonials
* Instagram Gallery
* Newsletter Subscription
* Footer

---

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Lucide React

### Backend

* Supabase

### Database

* PostgreSQL

### State Management

* Zustand

### Form Validation

* React Hook Form
* Zod

---

## Project Structure

```text
jentara-apparel/
│
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── layout/
│   ├── sections/
│   ├── ui/
│   └── products/
│
├── lib/
│   └── supabase/
│
├── store/
│
├── types/
│
├── data/
│
├── public/
│   ├── images/
│   └── products/
│
├── .env.local
├── package.json
└── README.md
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/jentara-apparel.git
```

Navigate into the project:

```bash
cd jentara-apparel
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Environment Variables

Create a file named:

```text
.env.local
```

Add:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url

NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## Database Schema

### Categories

```sql
create table categories (
 id uuid primary key default gen_random_uuid(),
 name text not null,
 slug text unique not null,
 image_url text,
 created_at timestamptz default now()
);
```

### Products

```sql
create table products (
 id uuid primary key default gen_random_uuid(),
 category_id uuid references categories(id),
 name text not null,
 slug text unique not null,
 description text,
 price numeric(10,2),
 compare_price numeric(10,2),
 stock integer default 0,
 image_url text,
 featured boolean default false,
 created_at timestamptz default now()
);
```

### Hero Banners

```sql
create table hero_banners (
 id uuid primary key default gen_random_uuid(),
 title text,
 subtitle text,
 image_url text,
 button_text text,
 button_link text,
 active boolean default true
);
```

### Testimonials

```sql
create table testimonials (
 id uuid primary key default gen_random_uuid(),
 name text,
 role text,
 rating integer,
 comment text,
 image_url text
);
```

---

## Storage Buckets

Create the following buckets in Supabase:

```text
hero-images
product-images
testimonial-images
instagram-images
avatars
```

---

## Development Commands

Start development server:

```bash
npm run dev
```

Build production application:

```bash
npm run build
```

Start production server:

```bash
npm run start
```

Run linting:

```bash
npm run lint
```

---

## Future Enhancements

* Razorpay Integration
* OTP Authentication
* Coupon System
* Product Reviews
* Order Tracking
* Admin Dashboard
* Inventory Analytics
* AI Product Recommendations
* Email Notifications
* WhatsApp Notifications

---

## Author

Developed for Jentara Apparel.

Premium Streetwear for the New Generation.
