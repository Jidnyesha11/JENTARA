import Link from "next/link";
import Container from "./Container";
import { Heart, ShoppingBag, User } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <Container>
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
            <Heart size={22} />
            <ShoppingBag size={22} />
            <User size={22} />
          </div>
        </div>
      </Container>
    </header>
  );
}