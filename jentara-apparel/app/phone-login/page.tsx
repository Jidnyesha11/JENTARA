"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";

export default function PhoneLoginPage() {
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) setPhone(value);
  };

  const handleSendOtp = () => {
    if (phone.length !== 10) return;
    // Trigger OTP API here, then navigate
    router.push(`/otp?phone=${phone}`);
  };

  const isValid = phone.length === 10;
  const hasStarted = phone.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#4a0f0f] to-[#8b2e24] flex overflow-hidden relative">

      {/* Ambient blobs */}
      <div className="absolute top-[-120px] left-[-80px] w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[30%] w-[300px] h-[300px] rounded-full bg-[#c0392b]/20 blur-2xl pointer-events-none" />
      <div className="absolute top-[20%] right-[32%] w-[200px] h-[200px] rounded-full bg-white/5 blur-2xl pointer-events-none" />

      {/* Left Section */}
      <div className="w-[65%] relative flex flex-col justify-between py-16 px-20 text-white overflow-hidden">

        {/* Top nav */}
        <div className="flex items-center justify-between">
          <h1
            className="text-5xl font-light uppercase"
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
          <p className="text-xs tracking-[0.4em] uppercase text-white/50 font-light">
            Quick Access
          </p>
          <h2
            className="text-8xl font-semibold leading-none tracking-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            SIGN IN<br />WITH OTP
          </h2>
          <p className="text-white/55 text-base leading-relaxed max-w-xs tracking-wide">
            Enter your mobile number and we&apos;ll send a one-time code — no passwords, no hassle.
          </p>

          {/* Live digit progress */}
          <div className="max-w-xs">
            <div className="flex justify-between text-[10px] tracking-widest uppercase text-white/35 mb-2">
              <span>Digits Entered</span>
              <span>{phone.length}/10</span>
            </div>
            <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#e7dbd0] rounded-full transition-all duration-300"
                style={{ width: `${(phone.length / 10) * 100}%` }}
              />
            </div>
          </div>

          {/* Pills */}
          <div className="flex flex-wrap gap-3">
            {["No Password Needed", "Instant Access", "Secure OTP"].map((tag) => (
              <div key={tag} className="px-4 py-1.5 border border-white/20 rounded-full text-[10px] tracking-widest text-white/40 uppercase">
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

        <p className="text-white/25 text-xs tracking-widest uppercase">
          © 2025 Jentara · All Rights Reserved
        </p>
      </div>

      {/* Right Card */}
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

          <div className="w-full h-[1px] bg-white/10 mb-7" />

          {/* Phone Input */}
          <div className="group mb-2">
            <label className="block text-[10px] tracking-[0.3em] uppercase text-white/40 mb-2.5 group-focus-within:text-white/70 transition-colors">
              Mobile Number
            </label>
            <div className="flex items-center gap-0 border-b border-white/20 pb-3 group-focus-within:border-white/60 transition-colors">
              <div className="flex items-center gap-1.5 pr-3 border-r border-white/20 mr-3 shrink-0">
                <span className="text-base">🇮🇳</span>
                <span className="text-white/70 text-sm font-medium tracking-wider">+91</span>
              </div>
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="XXXXX XXXXX"
                className="bg-transparent outline-none text-white w-full placeholder:text-white/25 text-sm tracking-[0.2em] font-medium"
              />
              {isValid && (
                <span className="text-[#e7dbd0] text-xs ml-2 shrink-0">✓</span>
              )}
            </div>
          </div>

          {/* Validation message — fixed height to prevent layout shift */}
          <div className="h-5 mb-6">
            {hasStarted && !isValid && (
              <p className="text-red-300/70 text-[10px] tracking-widest uppercase">
                {10 - phone.length} more digit{10 - phone.length !== 1 ? "s" : ""} needed
              </p>
            )}
          </div>

          {/* Send OTP Button */}
          <button
            onClick={handleSendOtp}
            disabled={!isValid}
            className={`w-full py-4 rounded-full flex items-center justify-between px-7 font-semibold tracking-widest uppercase text-xs shadow-lg shadow-black/30 transition-all duration-300 mb-7
              ${isValid
                ? "bg-[#e7dbd0] text-[#5c1d15] hover:bg-white hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                : "bg-white/10 text-white/25 cursor-not-allowed"
              }`}
          >
            <span>Send OTP</span>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isValid ? "bg-[#5c1d15]/10" : "bg-white/5"}`}>
              <ArrowRight size={15} />
            </div>
          </button>

          {/* OR Divider */}
          <div className="flex items-center gap-4 mb-7">
            <div className="flex-1 h-[1px] bg-white/15" />
            <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase">or</span>
            <div className="flex-1 h-[1px] bg-white/15" />
          </div>

          {/* Google Login */}
          <button
            className="w-full h-12 rounded-full text-white text-xs tracking-widest font-semibold flex items-center justify-center gap-3 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] mb-7"
            style={{
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.05)",
            }}
          >
            <span
              className="text-xl font-black"
              style={{ fontFamily: "Georgia, serif", color: "#e7dbd0" }}
            >
              G
            </span>
            Continue with Google
          </button>

          {/* Register link */}
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