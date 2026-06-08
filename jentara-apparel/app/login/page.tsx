import Image from "next/image";
import Link from "next/link";
import { Mail, Lock, ArrowRight, Sparkles } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#4a0f0f] to-[#8b2e24] flex overflow-hidden relative">

      {/* Decorative ambient circles */}
      <div className="absolute top-[-120px] left-[-80px] w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[30%] w-[300px] h-[300px] rounded-full bg-[#c0392b]/20 blur-2xl pointer-events-none" />
      <div className="absolute top-[20%] right-[32%] w-[200px] h-[200px] rounded-full bg-white/5 blur-2xl pointer-events-none" />

      {/* ─── Left Section ─── */}
      <div className="w-[65%] relative flex flex-col justify-between py-16 px-20 text-white overflow-hidden">

        {/* Top nav row */}
        <div className="flex items-center justify-between">
          <h1
            className="text-5xl font-light tracking-[0.35em] uppercase"
            style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.4em" }}
          >
            JENTARA
          </h1>

          <div className="flex items-center gap-2 text-white/50 text-sm tracking-widest uppercase">
            <Sparkles size={14} className="text-white/40" />
            <span>New Season 2025</span>
          </div>
        </div>

        {/* Center content */}
        <div className="flex flex-col gap-12">
          {/* Thin top rule */}
          <div className="w-16 h-[1px] bg-white/30" />

          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-white/50 mb-4 font-light">
              Explore the Collection
            </p>
            <h2
              className="text-8xl font-semibold leading-none mb-10 tracking-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              SHOP
            </h2>

            <ul className="space-y-5">
              <li className="flex items-center gap-5 text-2xl font-medium tracking-widest group cursor-pointer">
                <span className="w-10 h-[1px] bg-white group-hover:w-16 transition-all duration-300" />
                <span className="group-hover:translate-x-1 transition-transform duration-300">New Arrivals</span>
                <span className="ml-auto text-xs tracking-widest text-white/40 uppercase group-hover:text-white/70 transition-colors">↗</span>
              </li>
              <li className="flex items-center gap-5 text-2xl text-white/50 tracking-widest group cursor-pointer hover:text-white/80 transition-colors pl-1">
                <span className="w-0 h-[1px] bg-white group-hover:w-10 transition-all duration-300 opacity-0 group-hover:opacity-100" />
                Men
              </li>
              <li className="flex items-center gap-5 text-2xl text-white/50 tracking-widest group cursor-pointer hover:text-white/80 transition-colors pl-1">
                <span className="w-0 h-[1px] bg-white group-hover:w-10 transition-all duration-300 opacity-0 group-hover:opacity-100" />
                Women
              </li>
            </ul>
          </div>

          {/* Bottom decorative tag */}
          <div className="flex items-center gap-4">
            <div className="px-4 py-1.5 border border-white/20 rounded-full text-xs tracking-widest text-white/40 uppercase">
              Free Shipping · ₹999+
            </div>
            <div className="px-4 py-1.5 border border-white/20 rounded-full text-xs tracking-widest text-white/40 uppercase">
              30-Day Returns
            </div>
          </div>
        </div>

        {/* Model Image — anchored bottom-right of left panel */}
        <div className="absolute right-0 bottom-0 select-none">
          <Image
            src="/images/login-model.png"
            alt="Model"
            width={500}
            height={680}
            className="object-contain drop-shadow-2xl"
          />
          {/* Subtle vignette gradient on model edge */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent pointer-events-none" />
        </div>

        {/* Bottom-left fine print */}
        <p className="text-white/25 text-xs tracking-widest uppercase">
          © 2025 Jentara · All Rights Reserved
        </p>
      </div>

      {/* ─── Right Login Panel ─── */}
      <div className="w-[35%] flex items-center justify-center p-8 relative z-10">
        <div
          className="w-full max-w-sm rounded-[28px] p-10 flex flex-col gap-0"
          style={{
            background: "rgba(60, 10, 8, 0.65)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          {/* Header */}
          <div className="mb-8">
            <p className="text-white/40 text-[10px] tracking-[0.35em] uppercase mb-3">Member Access</p>
            <h2
              className="text-white text-4xl font-semibold leading-tight mb-1"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Welcome Back
            </h2>
            <p className="text-white/55 text-sm tracking-widest uppercase mt-1">
              Let&apos;s Get Styled
            </p>
          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-white/10 mb-8" />

          {/* Email Field */}
          <div className="group mb-6">
            <label className="block text-[10px] tracking-[0.3em] uppercase text-white/40 mb-2.5 group-focus-within:text-white/70 transition-colors">
              Email Address
            </label>
            <div className="flex items-center gap-3 border-b border-white/20 pb-3 group-focus-within:border-white/60 transition-colors">
              <Mail className="text-white/40 group-focus-within:text-white/70 transition-colors shrink-0" size={16} />
              <input
                type="email"
                placeholder="yourname@email.com"
                className="bg-transparent outline-none text-white w-full placeholder:text-white/25 text-sm tracking-wide"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="group mb-8">
            <label className="block text-[10px] tracking-[0.3em] uppercase text-white/40 mb-2.5 group-focus-within:text-white/70 transition-colors">
              Password
            </label>
            <div className="flex items-center gap-3 border-b border-white/20 pb-3 group-focus-within:border-white/60 transition-colors">
              <Lock className="text-white/40 group-focus-within:text-white/70 transition-colors shrink-0" size={16} />
              <input
                type="password"
                placeholder="••••••••"
                className="bg-transparent outline-none text-white w-full placeholder:text-white/25 text-sm tracking-wide"
              />
            </div>
            <div className="flex justify-end mt-2">
              <Link href="/forgot-password" className="text-[10px] text-white/35 hover:text-white/60 tracking-widest uppercase transition-colors">
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* CTA Button */}
          <button className="w-full bg-[#e7dbd0] text-[#5c1d15] py-4 rounded-full flex items-center justify-between px-7 font-semibold tracking-widest uppercase text-xs hover:bg-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/30 mb-7">
            <span>Continue</span>
            <div className="w-8 h-8 rounded-full bg-[#5c1d15]/10 flex items-center justify-center">
              <ArrowRight size={15} />
            </div>
          </button>

          {/* OR Divider */}
          <div className="flex items-center gap-4 mb-7">
            <div className="flex-1 h-[1px] bg-white/15" />
            <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase">or</span>
            <div className="flex-1 h-[1px] bg-white/15" />
          </div>

          {/* Social Login */}
          <div className="flex items-center justify-center gap-6 mb-8">

            {/* Phone Login */}
            <Link href="/phone-login">
              <button
                className="h-12 px-5 rounded-full text-white text-xs tracking-widest font-medium flex items-center gap-2 transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "rgba(255,255,255,0.05)",
                }}
              >
                <span className="text-base">📞</span>
                +91
              </button>
            </Link>

            {/* Vertical separator */}
            <div className="w-[1px] h-7 bg-white/15" />

            {/* Google Login */}
            <button
              className="h-12 px-5 rounded-full text-white text-xs tracking-widest font-semibold flex items-center gap-2 transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.05)",
              }}
            >
              <span
                className="text-lg font-black"
                style={{ fontFamily: "Georgia, serif", color: "#e7dbd0" }}
              >
                G
              </span>
              Google
            </button>
          </div>

          {/* Register */}
          <p className="text-center text-white/35 text-[11px] tracking-widest uppercase">
            New here?{" "}
            <Link
              href="/register"
              className="text-white/75 font-semibold hover:text-white transition-colors underline underline-offset-4 decoration-white/30"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}