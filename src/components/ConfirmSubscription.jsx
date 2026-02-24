"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = "https://subscribe.volasec.com/confirm";

export default function ConfirmSubscription({ logoSrc = "/Iconwhite.png" }) {
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      setStatus("error");
      setMessage("No confirmation token provided.");
      return;
    }

    async function confirm() {
      try {
        const res = await fetch(`${API_URL}?token=${token}`);
        const data = await res.json();

        if (!res.ok) {
          setStatus("error");
          setMessage(data.message || "Subscription confirmation failed.");
        } else {
          setStatus("success");
          setMessage(data.message || "Your subscription is confirmed!");
        }
      } catch {
        setStatus("error");
        setMessage("Unexpected error. Please try again.");
      }
    }

    confirm();
  }, []);

  /* 🔹 Same subtle logo pattern logic as footer */
  const bgMarks = useMemo(
    () => [
      { top: "12%", left: "6%", size: 30, opacity: 0.05, rotate: -8 },
      { top: "22%", right: "10%", size: 28, opacity: 0.05, rotate: 10 },
      { top: "46%", left: "16%", size: 34, opacity: 0.08, rotate: 6 },
      { bottom: "28%", right: "12%", size: 38, opacity: 0.12, rotate: -10 },
      { bottom: "16%", left: "30%", size: 42, opacity: 0.14, rotate: 8 },
    ],
    [],
  );

  return (
    <div className="relative min-h-screen bg-dark overflow-hidden flex items-center justify-center px-6">

      {/* Logo texture */}
      <div className="pointer-events-none absolute inset-0">
        {bgMarks.map((m, i) => (
          <img
            key={i}
            src={logoSrc}
            alt=""
            aria-hidden="true"
            className="absolute select-none"
            style={{
              top: m.top,
              left: m.left,
              right: m.right,
              bottom: m.bottom,
              width: m.size,
              height: m.size,
              opacity: m.opacity,
              transform: `rotate(${m.rotate}deg)`,
              filter: "contrast(1.1) brightness(1.05)",
            }}
          />
        ))}
      </div>

      {/* Accent glows */}
      <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 bg-primary-30 blur-[160px] opacity-20" />
      <div className="pointer-events-none absolute -bottom-32 left-0 h-96 w-96 bg-secondary-30 blur-[160px] opacity-10" />

      <AnimatePresence mode="wait">
        <motion.div
          key={status}
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-xl border border-secondary-10 bg-primary/20 backdrop-blur-sm p-12"
        >
          {/* Top logo */}
          <div className="mb-10 flex justify-center">
            <img src={logoSrc} className="h-16" alt="Volasec" />
          </div>

          {status === "loading" && (
            <div className="text-center">
              <div className="w-14 h-14 border-2 border-secondary/20 border-t-secondary animate-spin mx-auto mb-6" />
              <p className="text-[11px] tracking-[0.3em] uppercase text-secondary/40 mb-3">
                SECURITY VERIFICATION
              </p>
              <h1 className="text-2xl font-black text-secondary">
                Confirming Access…
              </h1>
            </div>
          )}

          {status === "success" && (
            <div className="text-center">
              <p className="text-[11px] tracking-[0.3em] uppercase text-secondary/40 mb-3">
                ACCESS GRANTED
              </p>
              <h1 className="text-3xl font-black text-secondary mb-4">
                Subscription Confirmed
              </h1>
              <p className="text-secondary/60 text-sm leading-relaxed">
                {message}
              </p>

              <a
                href="/"
                className="inline-block mt-8 px-8 py-4 border-2 border-secondary text-secondary font-black text-xs tracking-wider hover:bg-secondary hover:text-dark transition-all duration-200"
              >
                RETURN TO SITE
              </a>
            </div>
          )}

          {status === "error" && (
            <div className="text-center">
              <p className="text-[11px] tracking-[0.3em] uppercase text-secondary/40 mb-3">
                VERIFICATION FAILED
              </p>
              <h1 className="text-3xl font-black text-secondary mb-4">
                Confirmation Error
              </h1>
              <p className="text-secondary/60 text-sm leading-relaxed">
                {message}
              </p>

              <div className="mt-8 flex justify-center gap-4">
                <button
                  onClick={() => window.location.reload()}
                  className="px-8 py-4 border-2 border-secondary text-secondary font-black text-xs tracking-wider hover:bg-secondary hover:text-dark transition-all duration-200"
                >
                  RETRY
                </button>

                <a
                  href="/"
                  className="px-8 py-4 border border-secondary/20 text-secondary/60 text-xs tracking-wider hover:border-secondary hover:text-secondary transition-all duration-200"
                >
                  HOME
                </a>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}