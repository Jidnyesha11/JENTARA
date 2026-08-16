
"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

import {
  sendOtp,
  verifyOtp,
} from "@/lib/supabase/auth";

const OTP_LENGTH = 6;
const RESEND_DELAY = 55;

function OtpContent() {
  const router = useRouter();
  const searchParams =
    useSearchParams();

  const phone =
    searchParams.get("phone") ?? "";

  const [otp, setOtp] =
    useState<string[]>(
      Array(OTP_LENGTH).fill("")
    );

  const [seconds, setSeconds] =
    useState(RESEND_DELAY);

  const [loading, setLoading] =
    useState(false);

  const [resending, setResending] =
    useState(false);

  const [error, setError] =
    useState("");

  const [
    acceptedTerms,
    setAcceptedTerms,
  ] = useState(false);

  const inputRefs =
    useRef<
      Array<HTMLInputElement | null>
    >([]);

  useEffect(() => {
    if (seconds <= 0) {
      return;
    }

    const timer = window.setTimeout(
      () => {
        setSeconds(
          (current) => current - 1
        );
      },
      1000
    );

    return () =>
      window.clearTimeout(timer);
  }, [seconds]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange =
    useCallback(
      (
        event: React.ChangeEvent<HTMLInputElement>,
        index: number
      ) => {
        const value =
          event.target.value
            .replace(/\D/g, "")
            .slice(-1);

        setOtp((previous) => {
          const next = [
            ...previous,
          ];

          next[index] = value;

          return next;
        });

        if (
          value &&
          index <
            OTP_LENGTH - 1
        ) {
          inputRefs.current[
            index + 1
          ]?.focus();
        }
      },
      []
    );

  const handlePaste =
    useCallback(
      (
        event: React.ClipboardEvent<HTMLInputElement>
      ) => {
        event.preventDefault();

        const pasted =
          event.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(
              0,
              OTP_LENGTH
            );

        if (!pasted) {
          return;
        }

        const next =
          Array(OTP_LENGTH).fill(
            ""
          );

        pasted
          .split("")
          .forEach(
            (digit, index) => {
              next[index] = digit;
            }
          );

        setOtp(next);

        const focusIndex =
          Math.min(
            pasted.length,
            OTP_LENGTH - 1
          );

        inputRefs.current[
          focusIndex
        ]?.focus();
      },
      []
    );

  const handleKeyDown =
    useCallback(
      (
        event: React.KeyboardEvent<HTMLInputElement>,
        index: number
      ) => {
        if (
          event.key !==
          "Backspace"
        ) {
          return;
        }

        if (otp[index]) {
          setOtp((previous) => {
            const next = [
              ...previous,
            ];

            next[index] = "";

            return next;
          });

          return;
        }

        if (index > 0) {
          inputRefs.current[
            index - 1
          ]?.focus();
        }
      },
      [otp]
    );

  async function handleVerify(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    const token =
      otp.join("");

    if (
      token.length !==
      OTP_LENGTH
    ) {
      setError(
        "Please enter the complete verification code."
      );
      return;
    }

    if (!acceptedTerms) {
      setError(
        "Please accept the terms to continue."
      );
      return;
    }

    if (!phone) {
      setError(
        "Your phone number is missing. Please request a new OTP."
      );
      return;
    }

    try {
      setLoading(true);

      const { error: verifyError } =
        await verifyOtp(
          phone,
          token
        );

      if (verifyError) {
        throw verifyError;
      }

      router.replace("/");
      router.refresh();
    } catch (verifyError: unknown) {
      console.error(
        "OTP VERIFY ERROR:",
        verifyError
      );

      if (
        verifyError &&
        typeof verifyError === "object" &&
        "message" in verifyError
      ) {
        setError(
          String(
            (
              verifyError as {
                message: string;
              }
            ).message
          )
        );
      } else {
        setError(
          "The verification code is invalid or expired."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (
      seconds > 0 ||
      resending ||
      !phone
    ) {
      return;
    }

    try {
      setError("");
      setResending(true);

      const { error: resendError } =
        await sendOtp(phone);

      if (resendError) {
        throw resendError;
      }

      setOtp(
        Array(OTP_LENGTH).fill("")
      );

      setSeconds(
        RESEND_DELAY
      );

      inputRefs.current[0]?.focus();
    } catch (resendError: unknown) {
      console.error(
        "OTP RESEND ERROR:",
        resendError
      );

      setError(
        resendError &&
          typeof resendError ===
            "object" &&
          "message" in
            resendError
          ? String(
              (
                resendError as {
                  message: string;
                }
              ).message
            )
          : "Unable to resend the OTP."
      );
    } finally {
      setResending(false);
    }
  }

  const filledCount =
    otp.filter(Boolean).length;

  const progress =
    (filledCount /
      OTP_LENGTH) *
    100;

  function formatPhone(
    value: string
  ) {
    const digits =
      value.replace(
        /\D/g,
        ""
      );

    if (
      digits.length ===
      10
    ) {
      return `+91 ${digits.slice(
        0,
        5
      )} ${digits.slice(5)}`;
    }

    return value;
  }

  return (
    <main className="min-h-screen bg-[#f5ede4]">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        {/* Editorial */}

        <section
          className="
            relative
            hidden
            overflow-hidden
            bg-[#451713]
            px-10
            py-10
            text-[#f5ede4]
            lg:flex
            lg:flex-col
            lg:justify-between
            xl:px-16
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              -right-40
              -top-40
              h-[550px]
              w-[550px]
              rounded-full
              border
              border-white/10
            "
          />

          <Link
            href="/"
            className="
              relative
              z-10
              w-fit
              font-serif
              text-4xl
              tracking-[-0.08em]
            "
          >
            jentara
          </Link>

          <div className="relative z-10 max-w-xl">
            <div className="mb-8 h-px w-12 bg-white/35" />

            <p className="mb-5 text-[9px] font-semibold uppercase tracking-[0.35em] text-white/45">
              Secure Verification
            </p>

            <h1
              className="
                font-serif
                text-[72px]
                leading-[0.8]
                tracking-[-0.07em]
                xl:text-[96px]
              "
            >
              ONE CODE.
              <br />
              ONE
              <br />
              STEP.
            </h1>

            <p className="mt-8 max-w-sm text-sm leading-7 text-white/55">
              Enter the one-time code
              sent to your mobile number
              to securely access your
              JENTARA account.
            </p>

            <div className="mt-10 max-w-sm">
              <div className="mb-2 flex items-center justify-between text-[8px] uppercase tracking-[0.2em] text-white/35">
                <span>
                  Verification Progress
                </span>

                <span>
                  {filledCount}/
                  {OTP_LENGTH}
                </span>
              </div>

              <div className="h-px overflow-hidden bg-white/10">
                <div
                  className="h-full bg-[#e7dbd0] transition-all duration-300"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <p className="relative z-10 text-[8px] uppercase tracking-[0.18em] text-white/25">
            © {new Date().getFullYear()} JENTARA
          </p>
        </section>

        {/* Verification Card */}

        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12 xl:px-20">
          <div className="w-full max-w-[440px]">
            <div className="mb-8 lg:hidden">
              <Link
                href="/"
                className="
                  font-serif
                  text-4xl
                  tracking-[-0.08em]
                  text-[#451713]
                "
              >
                jentara
              </Link>

              <div className="mt-5 h-px w-10 bg-[#451713]" />
            </div>

            <div
              className="
                rounded-[28px]
                border
                border-[#451713]/10
                bg-[#faf6f1]
                p-6
                shadow-[0_25px_80px_rgba(69,23,19,0.10)]
                sm:p-9
                md:p-10
              "
            >
              <Link
                href="/phone-login"
                className="
                  mb-8
                  inline-flex
                  items-center
                  gap-2
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-[#451713]/50
                  transition
                  hover:text-[#451713]
                "
              >
                <ArrowLeft size={13} />
                Change Number
              </Link>

              <div className="mb-8">
                <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#451713]/45">
                  Step 2 of 2
                </p>

                <h2
                  className="
                    font-serif
                    text-4xl
                    leading-none
                    tracking-[-0.05em]
                    text-[#451713]
                    sm:text-5xl
                  "
                >
                  Verify Your Code
                </h2>

                <p className="mt-4 text-sm leading-6 text-[#151a2a]/45">
                  We sent a verification
                  code to{" "}
                  <strong className="font-medium text-[#451713]">
                    {formatPhone(
                      phone
                    )}
                  </strong>
                </p>
              </div>

              <form
                onSubmit={handleVerify}
              >
                <div className="mb-7">
                  <div className="grid grid-cols-6 gap-2 sm:gap-3">
                    {otp.map(
                      (
                        digit,
                        index
                      ) => (
                        <input
                          key={index}
                          ref={(
                            element
                          ) => {
                            inputRefs.current[
                              index
                            ] =
                              element;
                          }}
                          type="text"
                          inputMode="numeric"
                          autoComplete={
                            index ===
                            0
                              ? "one-time-code"
                              : "off"
                          }
                          maxLength={1}
                          value={digit}
                          onChange={(
                            event
                          ) =>
                            handleChange(
                              event,
                              index
                            )
                          }
                          onKeyDown={(
                            event
                          ) =>
                            handleKeyDown(
                              event,
                              index
                            )
                          }
                          onPaste={
                            handlePaste
                          }
                          aria-label={`OTP digit ${
                            index + 1
                          }`}
                          className="
                            aspect-square
                            w-full
                            rounded-xl
                            border
                            border-[#451713]/15
                            bg-white/60
                            text-center
                            font-serif
                            text-2xl
                            font-semibold
                            text-[#451713]
                            outline-none
                            transition
                            focus:border-[#451713]/60
                            focus:bg-white
                            sm:rounded-2xl
                            sm:text-3xl
                          "
                        />
                      )
                    )}
                  </div>
                </div>

                <div className="mb-7 flex items-center justify-between">
                  <p className="text-[8px] uppercase tracking-[0.13em] text-[#151a2a]/35">
                    {seconds > 0
                      ? `Resend in 00:${String(
                          seconds
                        ).padStart(
                          2,
                          "0"
                        )}`
                      : "Code expired?"}
                  </p>

                  <button
                    type="button"
                    disabled={
                      seconds >
                        0 ||
                      resending
                    }
                    onClick={
                      handleResend
                    }
                    className="
                      inline-flex
                      items-center
                      gap-2
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.13em]
                      text-[#451713]
                      disabled:cursor-not-allowed
                      disabled:opacity-30
                    "
                  >
                    <RefreshCw
                      size={12}
                      className={
                        resending
                          ? "animate-spin"
                          : ""
                      }
                    />

                    {resending
                      ? "Sending..."
                      : "Resend OTP"}
                  </button>
                </div>

                <label className="mb-7 flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={
                      acceptedTerms
                    }
                    onChange={(
                      event
                    ) =>
                      setAcceptedTerms(
                        event.target
                          .checked
                      )
                    }
                    className="
                      mt-0.5
                      h-4
                      w-4
                      shrink-0
                      accent-[#451713]
                    "
                  />

                  <span className="text-[9px] leading-5 text-[#151a2a]/40">
                    I agree to the
                    JENTARA{" "}
                    <Link
                      href="/policies#terms"
                      className="underline underline-offset-2"
                    >
                      Terms &
                      Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/policies#privacy"
                      className="underline underline-offset-2"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>

                {error && (
                  <div
                    role="alert"
                    className="
                      mb-6
                      rounded-xl
                      border
                      border-red-900/10
                      bg-red-50
                      px-4
                      py-3
                      text-xs
                      leading-5
                      text-red-800
                    "
                  >
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={
                    loading ||
                    filledCount !==
                      OTP_LENGTH ||
                    !acceptedTerms
                  }
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-full
                    bg-[#451713]
                    px-6
                    py-2
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-white
                    transition
                    hover:bg-[#32100d]
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  <span>
                    {loading
                      ? "Verifying..."
                      : "Verify Code"}
                  </span>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                    <ArrowRight size={15} />
                  </span>
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default function OtpPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#f5ede4]">
          <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#451713]">
            Loading...
          </p>
        </main>
      }
    >
      <OtpContent />
    </Suspense>
  );
}
