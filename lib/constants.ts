// App constants and configuration
export const APP_CONFIG = {
  name: 'Jentara Apparel',
  tagline: 'Star of the new generation',
  description: 'Modern streetwear with perfect oversized fit',
  email: 'support@jentara.in',
  phone: '+91 9284191297',
  whatsapp: 'https://wa.me/919284191297',
}

export const NAVIGATION = {
  main: [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'Women', href: '/shop?category=women' },
    { label: 'Men', href: '/shop?category=men' },
    { label: 'New Arrivals', href: '/shop?sort=newest' },
    { label: 'About Us', href: '/about' },
  ],
  footer: [
    {
      title: 'Shop',
      links: [
        { label: 'All Products', href: '/shop' },
        { label: 'Best Sellers', href: '/shop?sort=popular' },
        { label: 'New Arrivals', href: '/shop?sort=newest' },
        { label: 'Sale', href: '/shop?filter=sale' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Blog', href: '/blog' },
        { label: 'Careers', href: '/careers' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms & Conditions', href: '/terms' },
        { label: 'Shipping Policy', href: '/shipping' },
        { label: 'Returns & Exchange', href: '/returns' },
      ],
    },
  ],
}

export const PRODUCT_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export const PRODUCT_COLORS = [
  'Black',
  'White',
  'Beige',
  'Brown',
  'Cream',
  'Navy',
  'Gray',
]

export const PRICING = {
  freeShippingThreshold: 999,
  shippingCost: 100,
  taxRate: 0.18, // 18% GST for India
  codCharge: 50,
}

export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  RETURNED: 'returned',
}

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
}

export const PAYMENT_METHODS = {
  CARD: 'card',
  UPI: 'upi',
  NETBANKING: 'netbanking',
  WALLET: 'wallet',
  COD: 'cod', // Cash on Delivery
}

export const DELIVERY_TIMEFRAMES = {
  STANDARD: '5-7 business days',
  EXPRESS: '2-3 business days',
  OVERNIGHT: 'Next business day',
}

// Admin roles and permissions
export const ADMIN_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  SUPPORT: 'support',
}

export const PERMISSIONS = {
  MANAGE_PRODUCTS: 'manage_products',
  MANAGE_ORDERS: 'manage_orders',
  MANAGE_USERS: 'manage_users',
  MANAGE_INVENTORY: 'manage_inventory',
  VIEW_ANALYTICS: 'view_analytics',
  MANAGE_ADMIN: 'manage_admin',
}

// Analytics events
export const ANALYTICS_EVENTS = {
  PAGE_VIEW: 'page_view',
  PRODUCT_VIEW: 'view_item',
  ADD_TO_CART: 'add_to_cart',
  REMOVE_FROM_CART: 'remove_from_cart',
  CHECKOUT_START: 'begin_checkout',
  CHECKOUT_COMPLETE: 'purchase',
  SEARCH: 'search',
  FILTER: 'view_item_list',
}

export const CURRENCY = {
  code: 'INR',
  symbol: '₹',
  locale: 'en-IN',
}

export const VALIDATION_RULES = {
  password: {
    min: 8,
    pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
  },
  phone: {
    pattern: /^[0-9]{10}$/,
  },
  pincode: {
    pattern: /^[0-9]{6}$/,
  },
}