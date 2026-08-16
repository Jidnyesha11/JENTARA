// components/layout/NewsletterForm.tsx

"use client";

import { FormEvent, useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) {
      return;
    }

    setSubmitted(true);
    setEmail("");
  }

  return (
    <div className="w-full max-w-[480px]">
      <form
        onSubmit={handleSubmit}
        className="
          flex
          w-full
          border
          border-[#f5eee6]/30
        "
      >
        <input
          type="email"
          required
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          placeholder="Enter your email address"
          aria-label="Email address"
          className="
            min-w-0
            flex-1
            bg-transparent
            px-4
            py-4
            text-[10px]
            tracking-[0.04em]
            text-[#f5eee6]
            outline-none
            placeholder:text-[#f5eee6]/35
          "
        />

        <button
          type="submit"
          className="
            border-l
            border-[#f5eee6]/30
            px-5
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.12em]
            transition
            hover:bg-[#f5eee6]
            hover:text-[#451713]
          "
        >
          Subscribe
        </button>
      </form>

      {submitted && (
        <p
          className="
            mt-3
            text-[9px]
            uppercase
            tracking-[0.12em]
            text-[#f5eee6]/60
          "
        >
          Thank you for subscribing to JENTARA.
        </p>
      )}
    </div>
  );
}