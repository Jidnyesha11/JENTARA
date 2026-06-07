"use client";

import Link from "next/link";
import { Heart, ShoppingBag, User } from "lucide-react";

import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

export default function Navbar() {
  const cartItems = useCartStore(
  (state) => state.items
);

const wishlistItems =
  useWishlistStore(
    (state) => state.items
  );

const cartCount =
  cartItems.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

const wishlistCount =
  wishlistItems.length;
  
  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="h-20 flex items-center justify-between">

          <Link
            href="/"
            className="text-4xl font-bold tracking-wide text-[#4b1e1e]"
          >
            JENTARA
          </Link>

          <nav className="hidden md:flex gap-10 text-lg font-medium">
            <Link href="/">Home</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/women">Women</Link>
            <Link href="/men">Men</Link>
            <Link href="/about">About</Link>
          </nav>

          <div className="flex items-center gap-5">
            <Link
  href="/wishlist"
  className="relative"
>
  <Heart size={22} />

  {wishlistCount > 0 && (
    <span
      className="
      absolute
      -top-2
      -right-2
      bg-red-500
      text-white
      text-xs
      rounded-full
      w-5
      h-5
      flex
      items-center
      justify-center
    "
    >
      {wishlistCount}
    </span>
  )}
</Link>
           <Link
  href="/cart"
  className="relative"
>
  <ShoppingBag size={22} />

  {cartCount > 0 && (
    <span
      className="
      absolute
      -top-2
      -right-2
      bg-black
      text-white
      text-xs
      rounded-full
      w-5
      h-5
      flex
      items-center
      justify-center
    "
    >
      {cartCount}
    </span>
  )}
</Link>
            <User size={22} />
          </div>
        </div>
      </div>
    </header>
  );
}