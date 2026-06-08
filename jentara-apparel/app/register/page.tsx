import Image from "next/image";
import Link from "next/link";
import { User, Mail, Phone, Lock, ArrowRight, Sparkles } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#4a0f0f] to-[#8b2e24] flex overflow-hidden relative">

      {/* Ambient glow blobs */}
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
        <div className="flex flex-col gap-8 max-w-lg">
          <div className="w-16 h-[1px] bg-white/30" />

          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-white/50 mb-4 font-light">
              Become a Member
            </p>
            <h2
              className="text-7xl font-semibold leading-tight mb-6 tracking-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              JOIN THE<br />FASHION<br />REVOLUTION
            </h2>
            <p className="text-white/60 text-base tracking-wide leading-relaxed max-w-sm">
              Create your account and explore premium collections curated just for you. Style is personal — make it yours.
            </p>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-3 mt-2">
            {["Exclusive Drops", "Early Access", "Free Returns", "Style Picks"].map((tag) => (
              <div
                key={tag}
                className="px-4 py-1.5 border border-white/20 rounded-full text-[10px] tracking-widest text-white/40 uppercase"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* Model Image */}
        <div className="absolute right-0 bottom-0 select-none">
          <Image
            src="/images/login-model.png"
            alt="Model"
            width={500}
            height={680}
            className="object-contain drop-shadow-2xl"
          />
        </div>

        {/* Bottom copyright */}
        <p className="text-white/25 text-xs tracking-widest uppercase">
          © 2025 Jentara · All Rights Reserved
        </p>
      </div>

      {/* ─── Register Card ─── */}
      <div className="w-[35%] flex items-center justify-center p-8 relative z-10">
        <div
          className="w-full max-w-sm rounded-[28px] p-10 flex flex-col"
          style={{
            background: "rgba(60, 10, 8, 0.65)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          {/* Header */}
          <div className="mb-7">
            <p className="text-white/40 text-[10px] tracking-[0.35em] uppercase mb-3">New Member</p>
            <h2
              className="text-white text-4xl font-semibold leading-tight mb-1"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Create Account
            </h2>
            <p className="text-white/55 text-sm tracking-widest uppercase mt-1">
              Let&apos;s Get Started
            </p>
          </div>

          <div className="w-full h-[1px] bg-white/10 mb-7" />

          {/* Fields */}
          {[
            { icon: <User size={15} />, label: "Full Name", type: "text", placeholder: "Your full name" },
            { icon: <Mail size={15} />, label: "Email Address", type: "email", placeholder: "yourname@email.com" },
            { icon: <Phone size={15} />, label: "Mobile Number", type: "tel", placeholder: "+91 00000 00000" },
            { icon: <Lock size={15} />, label: "Password", type: "password", placeholder: "••••••••" },
            { icon: <Lock size={15} />, label: "Confirm Password", type: "password", placeholder: "••••••••" },
          ].map(({ icon, label, type, placeholder }, i) => (
            <div className="group mb-5" key={i}>
              <label className="block text-[10px] tracking-[0.3em] uppercase text-white/40 mb-2 group-focus-within:text-white/70 transition-colors">
                {label}
              </label>
              <div className="flex items-center gap-3 border-b border-white/20 pb-2.5 group-focus-within:border-white/60 transition-colors">
                <span className="text-white/40 group-focus-within:text-white/70 transition-colors shrink-0">
                  {icon}
                </span>
                <input
                  type={type}
                  placeholder={placeholder}
                  className="bg-transparent outline-none text-white w-full placeholder:text-white/25 text-sm tracking-wide"
                />
              </div>
            </div>
          ))}

          {/* Submit */}
          <div className="mt-3">
            <Link href="/login">
              <button className="w-full bg-[#e7dbd0] text-[#5c1d15] py-4 rounded-full flex items-center justify-between px-7 font-semibold tracking-widest uppercase text-xs hover:bg-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/30">
                <span>Create Account</span>
                <div className="w-8 h-8 rounded-full bg-[#5c1d15]/10 flex items-center justify-center">
                  <ArrowRight size={15} />
                </div>
              </button>
            </Link>
          </div>

          {/* Login link */}
          <p className="text-center text-white/35 text-[11px] tracking-widest uppercase mt-6">
            Already a member?{" "}
            <Link
              href="/login"
              className="text-white/75 font-semibold hover:text-white transition-colors underline underline-offset-4 decoration-white/30"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}