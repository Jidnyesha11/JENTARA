"use client";

import Image from "next/image";
import Link from "next/link";
import { User, Mail, Phone, Lock, ArrowRight, Sparkles } from "lucide-react";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { signUp } from "@/lib/supabase/auth";

    export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleRegister() {
    try {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      setLoading(true);

      const { error } =
        await signUp(
          email,
          password
        );

      if (error) {
        throw error;
      }

      alert(
        "Verification email sent."
      );

      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert(String(error));
      }
    } finally {
      setLoading(false);
    }
  }

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

          {/* Full Name */}

<div className="group mb-5">
  <label className="block text-[10px] tracking-[0.3em] uppercase text-white/40 mb-2">
    Full Name
  </label>

  <div className="flex items-center gap-3 border-b border-white/20 pb-2.5">
    <User size={15} className="text-white/40" />

    <input
      type="text"
      value={fullName}
      onChange={(e) =>
        setFullName(e.target.value)
      }
      placeholder="Your full name"
      className="bg-transparent outline-none text-white w-full placeholder:text-white/25 text-sm tracking-wide"
    />
  </div>
</div>

{/* Email */}

<div className="group mb-5">
  <label className="block text-[10px] tracking-[0.3em] uppercase text-white/40 mb-2">
    Email Address
  </label>

  <div className="flex items-center gap-3 border-b border-white/20 pb-2.5">
    <Mail size={15} className="text-white/40" />

    <input
      type="email"
      value={email}
      onChange={(e) =>
        setEmail(e.target.value)
      }
      placeholder="yourname@email.com"
      className="bg-transparent outline-none text-white w-full placeholder:text-white/25 text-sm tracking-wide"
    />
  </div>
</div>

{/* Phone */}

<div className="group mb-5">
  <label className="block text-[10px] tracking-[0.3em] uppercase text-white/40 mb-2">
    Mobile Number
  </label>

  <div className="flex items-center gap-3 border-b border-white/20 pb-2.5">
    <Phone size={15} className="text-white/40" />

    <input
      type="tel"
      value={phone}
      onChange={(e) =>
        setPhone(e.target.value)
      }
      placeholder="+91 00000 00000"
      className="bg-transparent outline-none text-white w-full placeholder:text-white/25 text-sm tracking-wide"
    />
  </div>
</div>

{/* Password */}

<div className="group mb-5">
  <label className="block text-[10px] tracking-[0.3em] uppercase text-white/40 mb-2">
    Password
  </label>

  <div className="flex items-center gap-3 border-b border-white/20 pb-2.5">
    <Lock size={15} className="text-white/40" />

    <input
      type="password"
      value={password}
      onChange={(e) =>
        setPassword(e.target.value)
      }
      placeholder="••••••••"
      className="bg-transparent outline-none text-white w-full placeholder:text-white/25 text-sm tracking-wide"
    />
  </div>
</div>

{/* Confirm Password */}

<div className="group mb-5">
  <label className="block text-[10px] tracking-[0.3em] uppercase text-white/40 mb-2">
    Confirm Password
  </label>

  <div className="flex items-center gap-3 border-b border-white/20 pb-2.5">
    <Lock size={15} className="text-white/40" />

    <input
      type="password"
      value={confirmPassword}
      onChange={(e) =>
        setConfirmPassword(
          e.target.value
        )
      }
      placeholder="••••••••"
      className="bg-transparent outline-none text-white w-full placeholder:text-white/25 text-sm tracking-wide"
    />
  </div>
</div>
          {/* Submit */}
        <div className="mt-3">
          <button
           onClick={handleRegister}
           disabled={loading}
           className="w-full bg-[#e7dbd0] text-[#5c1d15] py-4 rounded-full flex items-center justify-between px-7 font-semibold tracking-widest uppercase text-xs hover:bg-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/30"
           >
           <span>
             {loading
              ? "Creating..."
             : "Create Account"}
           </span>

            <div className="w-8 h-8 rounded-full bg-[#5c1d15]/10 flex items-center justify-center">
              <ArrowRight size={15} />
            </div>
          </button>
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