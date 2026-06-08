"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

const OTP_LENGTH = 4;
const RESEND_DELAY = 55;

export default function OtpPage() {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [seconds, setSeconds] = useState(RESEND_DELAY);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown Timer
  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds]);

  // O(1) — update single index, auto-advance focus
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const value = e.target.value.replace(/\D/g, "").slice(-1);
      setOtp((prev) => {
        const next = [...prev];
        next[index] = value;
        return next;
      });
      if (value && index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    []
  );

  // O(1) — backspace clears or moves focus back
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key !== "Backspace") return;
      if (otp[index]) {
        setOtp((prev) => {
          const next = [...prev];
          next[index] = "";
          return next;
        });
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [otp]
  );

  // O(1) reset
  const handleResend = useCallback(() => {
    setOtp(Array(OTP_LENGTH).fill(""));
    setSeconds(RESEND_DELAY);
    inputRefs.current[0]?.focus();
  }, []);

  // O(n) join — n = 4, effectively O(1)
  const handleVerify = useCallback(() => {
    const entered = otp.join("");
    if (entered.length !== OTP_LENGTH) {
      alert("Please enter the complete OTP");
      return;
    }
    console.log("OTP:", entered);
    // Call verify API here
  }, [otp]);

  // Filled count for progress — O(n), n = 4
  const filledCount = otp.filter(Boolean).length;
  const progress = (filledCount / OTP_LENGTH) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#4a0f0f] to-[#8b2e24] flex overflow-hidden relative">

      {/* Ambient blobs */}
      <div className="absolute top-[-120px] left-[-80px] w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[30%] w-[300px] h-[300px] rounded-full bg-[#c0392b]/20 blur-2xl pointer-events-none" />
      <div className="absolute top-[20%] right-[32%] w-[200px] h-[200px] rounded-full bg-white/5 blur-2xl pointer-events-none" />

      {/* ─── Left Section ─── */}
      <div className="w-[65%] relative flex flex-col justify-between py-16 px-20 text-white">

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

        {/* Center */}
        <div className="flex flex-col gap-6">
          <div className="w-16 h-[1px] bg-white/30" />
          <p className="text-xs tracking-[0.4em] uppercase text-white/50 font-light">
            Secure Verification
          </p>
          <h2
            className="text-8xl font-semibold leading-none tracking-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            OTP<br />VERIFY
          </h2>
          <p className="text-white/55 text-base leading-relaxed max-w-xs tracking-wide">
            Enter the 4-digit code we sent to your number. It keeps your account safe and yours alone.
          </p>

          {/* Live progress bar */}
          <div className="mt-4 max-w-xs">
            <div className="flex justify-between text-[10px] tracking-widest uppercase text-white/35 mb-2">
              <span>Code Progress</span>
              <span>{filledCount}/{OTP_LENGTH}</span>
            </div>
            <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#e7dbd0] rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Pills */}
          <div className="flex flex-wrap gap-3 mt-2">
            {["End-to-End Encrypted", "One-Time Code", "Expires Soon"].map((tag) => (
              <div key={tag} className="px-4 py-1.5 border border-white/20 rounded-full text-[10px] tracking-widest text-white/40 uppercase">
                {tag}
              </div>
            ))}
          </div>
        </div>

        <p className="text-white/25 text-xs tracking-widest uppercase">
          © 2025 Jentara · All Rights Reserved
        </p>
      </div>

      {/* ─── Right Card ─── */}
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
          <div className="mb-6">
            <p className="text-white/40 text-[10px] tracking-[0.35em] uppercase mb-3">Step 2 of 2</p>
            <h2
              className="text-white text-4xl font-semibold leading-tight mb-1"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              OTP Verification
            </h2>
            <p className="text-white/55 text-sm tracking-widest uppercase mt-1">
              Enter Your Code
            </p>
          </div>

          <div className="w-full h-[1px] bg-white/10 mb-6" />

          {/* Phone display */}
          <div className="mb-7">
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-3">Code sent to</p>
            <div className="flex items-center justify-between border-b border-white/20 pb-3">
              <span className="text-white text-xl font-semibold tracking-[3px]">
                +91 92841 91297
              </span>
              <button className="text-[10px] tracking-widest uppercase text-white/40 hover:text-white/70 transition-colors border border-white/20 rounded-full px-3 py-1">
                Edit
              </button>
            </div>
          </div>

          {/* OTP Inputs */}
          <div className="flex justify-between gap-2 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-[60px] h-[64px] rounded-2xl text-center text-2xl font-bold text-white outline-none transition-all duration-200"
                style={{
                  background: digit ? "rgba(231,219,208,0.15)" : "rgba(255,255,255,0.06)",
                  border: digit
                    ? "1.5px solid rgba(231,219,208,0.6)"
                    : "1.5px solid rgba(255,255,255,0.15)",
                  boxShadow: digit ? "0 0 16px rgba(231,219,208,0.1)" : "none",
                }}
              />
            ))}
          </div>

          {/* Timer / Resend */}
          <div className="text-center mb-6">
            {seconds > 0 ? (
              <p className="text-white/40 text-[11px] tracking-widest uppercase">
                Resend in{" "}
                <span className="text-[#e7dbd0] font-semibold tabular-nums">
                  00:{String(seconds).padStart(2, "0")}
                </span>
              </p>
            ) : (
              <button
                onClick={handleResend}
                className="text-[#e7dbd0] text-[11px] tracking-widest uppercase font-semibold hover:opacity-70 transition-opacity underline underline-offset-4 decoration-white/30"
              >
                Resend OTP
              </button>
            )}
          </div>

          {/* Terms */}
          <div className="flex gap-3 mb-6">
            <input
              type="checkbox"
              className="accent-[#e7dbd0] mt-0.5 shrink-0"
            />
            <p className="text-white/35 text-[11px] leading-5 tracking-wide">
              I agree to the Terms &amp; Conditions and consent to receive communications via WhatsApp, SMS, Email and RCS.
            </p>
          </div>

          <div className="h-[1px] bg-white/10 mb-6" />

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            className="w-full bg-[#e7dbd0] text-[#5c1d15] py-4 rounded-full flex items-center justify-between px-7 font-semibold tracking-widest uppercase text-xs hover:bg-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/30"
          >
            <span>Verify</span>
            <div className="w-8 h-8 rounded-full bg-[#5c1d15]/10 flex items-center justify-center">
              <ArrowRight size={15} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}