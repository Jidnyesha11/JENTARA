# Jentara Apparel - Complete File Structure

## 📁 Project Root Directory Structure

```
jentara-apparel/
├── app/                                    # Next.js App Router
│   ├── (storefront)/                      # Public customer pages
│   │   ├── layout.tsx
│   │   ├── page.tsx                       # Home page
│   │   ├── shop/
│   │   │   └── page.tsx                   # Shop/Products listing
│   │   ├── product/
│   │   │   ├── layout.tsx
│   │   │   └── [id]/
│   │   │       ├── layout.tsx
│   │   │       └── page.tsx               # Product detail page
│   │   ├── cart/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx                   # Shopping cart
│   │   ├── checkout/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx                   # Checkout flow
│   │   ├── order-confirmation/
│   │   │   └── [id]/
│   │   │       └── page.tsx               # Order success page
│   │   ├── wishlist/
│   │   │   └── page.tsx                   # Wishlist page
│   │   ├── search/
│   │   │   └── page.tsx                   # Search results
│   │   ├── account/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx                   # Account dashboard
│   │   │   ├── orders/
│   │   │   │   └── page.tsx               # Order history
│   │   │   ├── addresses/
│   │   │   │   └── page.tsx               # Saved addresses
│   │   │   └── settings/
│   │   │       └── page.tsx               # Account settings
│   │   └── static-pages/
│   │       ├── about/
│   │       │   └── page.tsx
│   │       ├── contact/
│   │       │   └── page.tsx
│   │       ├── privacy/
│   │       │   └── page.tsx
│   │       ├── terms/
│   │       │   └── page.tsx
│   │       ├── shipping/
│   │       │   └── page.tsx
│   │       └── returns/
│   │           └── page.tsx
│   │
│   ├── (auth)/                            # Authentication pages
│   │   ├── layout.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   ├── forgot-password/
│   │   │   └── page.tsx
│   │   └── verify-otp/
│   │       └── page.tsx
│   │
│   ├── admin/                             # Admin panel
│   │   ├── layout.tsx                     # Admin layout wrapper
│   │   ├── page.tsx                       # Dashboard
│   │   ├── products/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx                   # Products list
│   │   │   ├── new/
│   │   │   │   └── page.tsx               # Add product
│   │   │   └── [id]/
│   │   │       └── page.tsx               # Edit product
│   │   ├── categories/
│   │   │   ├── page.tsx                   # Categories list
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── inventory/
│   │   │   └── page.tsx                   # Stock management
│   │   ├── orders/
│   │   │   ├── page.tsx                   # Orders list
│   │   │   └── [id]/
│   │   │       └── page.tsx               # Order details
│   │   ├── users/
│   │   │   ├── page.tsx                   # Users list
│   │   │   └── [id]/
│   │   │       └── page.tsx               # User details
│   │   ├── analytics/
│   │   │   └── page.tsx                   # Analytics dashboard
│   │   ├── reports/
│   │   │   ├── page.tsx                   # Reports overview
│   │   │   ├── sales/
│   │   │   │   └── page.tsx
│   │   │   ├── customers/
│   │   │   │   └── page.tsx
│   │   │   └── inventory/
│   │   │       └── page.tsx
│   │   └── settings/
│   │       └── page.tsx                   # Admin settings
│   │
│   ├── api/                               # API routes
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── route.ts
│   │   │   ├── signup/
│   │   │   │   └── route.ts
│   │   │   ├── logout/
│   │   │   │   └── route.ts
│   │   │   └── verify-otp/
│   │   │       └── route.ts
│   │   ├── products/
│   │   │   ├── route.ts                   # GET all, POST create
│   │   │   └── [id]/
│   │   │       ├── route.ts               # GET one, PUT update, DELETE
│   │   │       ├── images/
│   │   │       │   └── route.ts           # Upload images
│   │   │       └── reviews/
│   │   │           └── route.ts
│   │   ├── categories/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   ├── cart/
│   │   │   ├── route.ts                   # Get cart
│   │   │   ├── add/
│   │   │   │   └── route.ts
│   │   │   ├── remove/
│   │   │   │   └── route.ts
│   │   │   └── update/
│   │   │       └── route.ts
│   │   ├── wishlist/
│   │   │   ├── route.ts
│   │   │   ├── add/
│   │   │   │   └── route.ts
│   │   │   └── remove/
│   │   │       └── route.ts
│   │   ├── orders/
│   │   │   ├── route.ts                   # Create order
│   │   │   └── [id]/
│   │   │       ├── route.ts               # Get order details
│   │   │       └── status/
│   │   │           └── route.ts           # Update status
│   │   ├── checkout/
│   │   │   └── route.ts                   # Initiate checkout
│   │   ├── payment/
│   │   │   ├── stripe/
│   │   │   │   ├── route.ts
│   │   │   │   └── webhook/
│   │   │   │       └── route.ts
│   │   │   └── razorpay/
│   │   │       ├── route.ts
│   │   │       └── verify/
│   │   │           └── route.ts
│   │   ├── search/
│   │   │   └── route.ts
│   │   ├── users/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       ├── route.ts
│   │   │       └── addresses/
│   │   │           └── route.ts
│   │   ├── uploads/
│   │   │   └── route.ts                   # File uploads
│   │   └── health/
│   │       └── route.ts                   # Health check
│   │
│   ├── layout.tsx                         # Root layout
│   ├── globals.css                        # Global styles
│   └── page.tsx                           # Root page (redirects to home)
│
├── components/                             # Reusable React components
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Navbar.module.css
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx                    # User sidebar
│   │   ├── MobileMenu.tsx
│   │   └── Container.tsx                  # Layout wrapper
│   │
│   ├── admin/
│   │   ├── AdminSidebar.tsx
│   │   ├── AdminHeader.tsx
│   │   ├── StatCard.tsx
│   │   ├── RecentOrders.tsx
│   │   ├── ProductForm.tsx                # Form for add/edit product
│   │   ├── OrderTable.tsx
│   │   ├── UserTable.tsx
│   │   ├── InventoryTable.tsx
│   │   ├── AnalyticsChart.tsx
│   │   └── AdminBreadcrumb.tsx
│   │
│   ├── products/
│   │   ├── ProductCard.tsx                # Product card component
│   │   ├── ProductGrid.tsx                # Grid of products
│   │   ├── ProductGallery.tsx             # Image gallery
│   │   ├── ProductInfo.tsx                # Product details
│   │   ├── ProductReviews.tsx             # Reviews section
│   │   ├── RatingStars.tsx
│   │   ├── ReviewForm.tsx
│   │   └── SizeSelector.tsx
│   │
│   ├── cart/
│   │   ├── CartItem.tsx                   # Single cart item
│   │   ├── CartSummary.tsx                # Cart totals
│   │   ├── CartEmpty.tsx
│   │   ├── PromoCode.tsx                  # Coupon input
│   │   └── CartDrawer.tsx                 # Side cart drawer
│   │
│   ├── checkout/
│   │   ├── CheckoutForm.tsx               # Main checkout form
│   │   ├── ShippingForm.tsx
│   │   ├── BillingForm.tsx
│   │   ├── PaymentForm.tsx
│   │   ├── OrderSummary.tsx
│   │   ├── AddressSelector.tsx
│   │   └── DeliveryOptions.tsx
│   │
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   ├── SignupForm.tsx
│   │   ├── OtpVerification.tsx
│   │   ├── ForgotPasswordForm.tsx
│   │   └── SocialLogin.tsx
│   │
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── FeaturedProducts.tsx
│   │   ├── CategoryPreview.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Newsletter.tsx
│   │   ├── BrandStory.tsx
│   │   └── CTA.tsx
│   │
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Checkbox.tsx
│   │   ├── Radio.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Toast.tsx
│   │   ├── Badge.tsx
│   │   ├── Skeleton.tsx
│   │   ├── Spinner.tsx
│   │   ├── Pagination.tsx
│   │   ├── Tabs.tsx
│   │   ├── Accordion.tsx
│   │   ├── Breadcrumb.tsx
│   │   ├── EmptyState.tsx
│   │   └── Alert.tsx
│   │
│   ├── filters/
│   │   ├── FilterSidebar.tsx
│   │   ├── PriceFilter.tsx
│   │   ├── CategoryFilter.tsx
│   │   ├── SizeFilter.tsx
│   │   ├── ColorFilter.tsx
│   │   └── SortDropdown.tsx
│   │
│   ├── common/
│   │   ├── Loading.tsx
│   │   ├── Error.tsx
│   │   ├── NotFound.tsx
│   │   ├── BackButton.tsx
│   │   ├── ShareButtons.tsx
│   │   ├── Breadcrumbs.tsx
│   │   └── TrustBadges.tsx
│   │
│   └── email/
│       ├── OrderConfirmation.tsx
│       ├── ShippingNotification.tsx
│       ├── WelcomeEmail.tsx
│       └── NewsletterEmail.tsx
│
├── lib/                                   # Utility functions & configs
│   ├── supabase/
│   │   ├── client.ts                      # Supabase client
│   │   ├── server.ts                      # Server-side Supabase
│   │   ├── auth.ts                        # Auth utilities
│   │   └── database.ts                    # Database queries
│   │
│   ├── utils/
│   │   ├── formatting.ts                  # Format currency, date, etc
│   │   ├── validation.ts                  # Form validation
│   │   ├── helpers.ts                     # General helpers
│   │   ├── cn.ts                          # Class name merger
│   │   ├── api.ts                         # API call utilities
│   │   └── storage.ts                     # Local storage helpers
│   │
│   ├── stripe/
│   │   ├── client.ts                      # Stripe client
│   │   └── server.ts                      # Server-side Stripe
│   │
│   ├── razorpay/
│   │   └── client.ts                      # Razorpay client
│   │
│   ├── constants.ts                       # App-wide constants
│   ├── config.ts                          # Configuration
│   ├── env.ts                             # Environment validation
│   └── types.ts                           # Global types
│
├── hooks/                                 # Custom React hooks
│   ├── useAuth.ts                         # Auth context
│   ├── useCart.ts                         # Cart state
│   ├── useWishlist.ts                     # Wishlist state
│   ├── useProducts.ts                     # Products fetching
│   ├── useOrders.ts                       # Orders fetching
│   ├── useFilters.ts                      # Filter state
│   ├── useSearch.ts                       # Search functionality
│   ├── usePagination.ts                   # Pagination logic
│   ├── useLocalStorage.ts                 # Local storage
│   ├── useInfiniteScroll.ts               # Infinite scroll
│   ├── useDebounce.ts                     # Debounce hook
│   ├── useFetch.ts                        # Data fetching
│   └── useModal.ts                        # Modal state
│
├── store/                                 # Zustand stores (state management)
│   ├── authStore.ts                       # Auth store
│   ├── cartStore.ts                       # Cart store
│   ├── wishlistStore.ts                   # Wishlist store
│   ├── filterStore.ts                     # Filter state
│   ├── uiStore.ts                         # UI state (modals, etc)
│   └── notificationStore.ts               # Toast/notification state
│
├── types/                                 # TypeScript type definitions
│   ├── product.ts
│   ├── order.ts
│   ├── cart.ts
│   ├── user.ts
│   ├── auth.ts
│   ├── payment.ts
│   ├── address.ts
│   ├── review.ts
│   ├── category.ts
│   ├── coupon.ts
│   ├── api.ts
│   └── index.ts                           # Barrel export
│
├── styles/
│   ├── globals.css                        # Global styles
│   ├── colors.ts                          # Color tokens
│   ├── spacing.ts                         # Spacing tokens
│   ├── typography.ts                      # Typography tokens
│   └── animations.css                     # Animations
│
├── public/                                # Static assets
│   ├── images/
│   │   ├── logo.svg
│   │   ├── favicon.ico
│   │   ├── og-image.jpg
│   │   ├── hero/
│   │   ├── products/                      # Product sample images
│   │   ├── icons/
│   │   └── patterns/
│   ├── fonts/
│   └── documents/
│
├── data/                                  # Mock data & constants
│   ├── products.ts
│   ├── categories.ts
│   ├── testimonials.ts
│   └── navigation.ts
│
├── middleware.ts                          # Next.js middleware
├── next.config.js                         # Next.js config
├── tailwind.config.ts                     # Tailwind config
├── postcss.config.js                      # PostCSS config
├── tsconfig.json                          # TypeScript config
├── .eslintrc.json                         # ESLint config
├── .prettierrc                            # Prettier config
├── .gitignore
├── .env.local                             # Environment variables
├── .env.example                           # Example env file
├── package.json
├── package-lock.json
├── README.md
├── CONTRIBUTING.md
├── LICENSE
└── .github/
    ├── workflows/
    │   ├── deploy.yml                     # Deployment pipeline
    │   ├── tests.yml                      # Testing pipeline
    │   └── lint.yml                       # Linting pipeline
    └── ISSUE_TEMPLATE/
        └── bug_report.md
```

---

## 📊 File Count & Organization

### By Category:
- **Pages (App Router)**: ~30 files
- **Components**: ~60+ files
- **API Routes**: ~25 routes
- **Hooks**: ~12 custom hooks
- **Types**: ~10 type definition files
- **Utils & Config**: ~15 files
- **Styles**: 4 main files

**Total: ~170+ files**

---

## 🔄 Data Flow & File Relationships

### 1. **Authentication Flow**
```
app/(auth)/login → components/auth/LoginForm → 
lib/supabase/auth → hooks/useAuth → store/authStore
```

### 2. **Product Discovery Flow**
```
app/(storefront)/shop → components/products/ProductGrid → 
components/filters/* → hooks/useProducts → 
lib/supabase/database → types/product.ts
```

### 3. **Shopping Flow**
```
components/products/ProductCard → app/product/[id] → 
components/cart/CartItem → app/cart → 
app/checkout → app/order-confirmation
```

### 4. **Admin Flow**
```
app/admin → components/admin/* → 
app/api/admin/* → lib/supabase/database →
store/* → hooks/useAuth (admin check)
```

---

## 📝 File Naming Conventions

### Components
- **Page components**: `PascalCase` (HomePage.tsx)
- **UI components**: `PascalCase` (Button.tsx, Card.tsx)
- **Layout components**: `PascalCase` (Navbar.tsx, Footer.tsx)
- **Custom hooks**: `camelCase` with `use` prefix (useAuth.ts, useCart.ts)

### Utilities
- **Utils functions**: `camelCase` (formatting.ts, validation.ts)
- **Store/Context**: `PascalCase` with `Store` suffix (authStore.ts)
- **Types**: `PascalCase` (product.ts, order.ts)

### Styles
- **CSS Modules**: `ComponentName.module.css`
- **Tailwind**: Inline with `className`

---

## 🔐 Environment Variables (.env.local)

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Email
SENDGRID_API_KEY=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=

# Analytics
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_HOTJAR_ID=

# Other
NEXT_PUBLIC_APP_NAME=Jentara Apparel
NODE_ENV=development
```

---

## 🗂️ Key Directory Purposes

| Directory | Purpose | Key Files |
|-----------|---------|-----------|
| `app/` | Next.js pages & routes | page.tsx, layout.tsx, route.ts |
| `components/` | Reusable UI components | *.tsx files |
| `lib/` | Utilities & helpers | *.ts files |
| `hooks/` | Custom React hooks | use*.ts files |
| `store/` | State management (Zustand) | *Store.ts files |
| `types/` | TypeScript definitions | *.ts files |
| `styles/` | CSS & design tokens | *.css, *.ts |
| `public/` | Static assets | images, fonts, etc |

---

## 📦 Dependencies & Package.json

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "next": "^14.0.0",
    "@supabase/supabase-js": "^2.38.0",
    "zustand": "^4.4.0",
    "lucide-react": "^0.263.1",
    "stripe": "^13.0.0",
    "razorpay": "^2.8.0",
    "axios": "^1.6.0",
    "swr": "^2.2.0",
    "react-hook-form": "^7.48.0",
    "zod": "^3.22.0",
    "tailwindcss": "^3.4.0"
  }
}
```

---

## 🚀 Getting Started

### 1. **Clone & Setup**
```bash
git clone <repo>
cd jentara-apparel
npm install
```

### 2. **Configure Environment**
```bash
cp .env.example .env.local
# Fill in your API keys
```

### 3. **Run Development Server**
```bash
npm run dev
# Open http://localhost:3000
```

### 4. **Build for Production**
```bash
npm run build
npm run start
```

---

## 📋 File Checklist

- [ ] All 30+ page files created
- [ ] 60+ component files created
- [ ] 25+ API route files created
- [ ] 12+ custom hooks created
- [ ] Type definitions completed
- [ ] Supabase schema created
- [ ] Environment variables set
- [ ] Tailwind CSS configured
- [ ] Database migrations run
- [ ] Testing setup complete

