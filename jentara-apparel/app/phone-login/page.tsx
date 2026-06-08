"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function PhoneLoginPage() {
  const [phone, setPhone] = useState("");

  const handlePhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value.replace(/\D/g, "");

    if (value.length <= 10) {
      setPhone(value);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#4a0f0f] to-[#8b2e24] flex">

      {/* Left Section */}
      <div className="w-[70%] relative flex flex-col justify-center px-24 text-white">

        <h1
          className="text-7xl font-light mb-20 tracking-wide"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          JENTARA
        </h1>

        <div className="absolute right-10 bottom-0">
          <Image
            src="/images/login-model.png"
            alt="Model"
            width={550}
            height={700}
            className="object-contain"
          />
        </div>
      </div>

      {/* Right Login Card */}
      <div className="w-[30%] flex items-center justify-center p-6">

        <div className="bg-[#4f140f]/70 backdrop-blur-md rounded-[30px] p-10 w-full max-w-md border border-white/10 shadow-2xl">

          {/* Heading */}
          <h2
            className="text-white text-5xl mb-2"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Welcome Back
          </h2>

          <p className="text-white/80 text-2xl mb-10">
            Let&apos;s Get Styled
          </p>

          {/* Mobile Number Input */}
          <div className="border-2 border-white rounded-full flex items-center overflow-hidden mb-3">

            <div className="px-4 py-3 border-r border-white flex items-center gap-2 text-white text-xl">
              🇮🇳
              <span>+91</span>
            </div>

            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="Enter Mobile Number"
              className="bg-transparent flex-1 px-4 py-3 text-white text-xl outline-none placeholder:text-white/60"
            />
          </div>

          {/* Validation Message */}
          {phone.length > 0 && phone.length < 10 && (
            <p className="text-red-300 text-sm mb-6">
              Mobile number must contain exactly 10 digits
            </p>
          )}

          {/* SEND OTP Button */}
          {phone.length === 10 ? (
            <Link href="/otp">
              <button className="w-full border-2 border-white text-white py-4 rounded-full text-2xl font-semibold tracking-widest hover:bg-white/10 transition">
                SEND OTP
              </button>
            </Link>
          ) : (
            <button
              disabled
              className="w-full border-2 border-white/30 text-white/40 py-4 rounded-full text-2xl font-semibold tracking-widest cursor-not-allowed"
            >
              SEND OTP
            </button>
          )}

          {/* Divider */}
          <div className="flex items-center my-10">
            <div className="flex-1 h-[1px] bg-white/30"></div>
            <span className="mx-4 text-white text-3xl">OR</span>
            <div className="flex-1 h-[1px] bg-white/30"></div>
          </div>

          {/* Google Login */}
          <div className="flex justify-center mb-8">
            <button className="text-white text-6xl font-bold hover:scale-110 transition">
              G
            </button>
          </div>

          {/* Register Link */}
          <p className="text-center text-white/70 text-lg">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-white font-semibold hover:underline"
            >
              Register Now
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}