"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ConfirmSubscription() {
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
        const res = await fetch(`https://subscribe.volasec.com/confirm?token=${token}`);
        const data = await res.json();

        if (!res.ok) {
          setStatus("error");
          setMessage(data.message || "Subscription confirmation failed.");
        } else {
          setStatus("success");
          setMessage(data.message || "Your subscription is confirmed!");
        }
      } catch (err) {
        console.error(err);
        setStatus("error");
        setMessage("An unexpected error occurred. Please try again.");
      }
    }

    confirm();
  }, []);

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-6 font-sans">
      <AnimatePresence mode="wait">

        {/* Loading */}
        {status === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-5 text-center"
          >
            {/* Spinner */}
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-2 border-primary/10" />
              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin" />
              <div className="absolute inset-2 rounded-full bg-primary/5" />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary/40 mb-1">
                Please wait
              </p>
              <p className="text-lg font-bold text-dark">Confirming your subscription…</p>
            </div>
          </motion.div>
        )}

        {/* Success */}
        {status === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md bg-white border border-primary/10 rounded-3xl p-10 text-center overflow-hidden shadow-xl shadow-primary/5"
          >
            {/* Background orb */}
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            {/* Icon */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20"
            >
              <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
            >
              <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-primary/40 mb-2">
                All done
              </p>
              <h1 className="text-2xl font-black text-dark tracking-tight mb-3">
                You're confirmed!
              </h1>
              <p className="text-sm text-dark/50 leading-relaxed mb-8">
                {message}
              </p>

              <div className="w-full h-px bg-primary/8 mb-8" />

              <a
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold text-sm hover:bg-primary-80 transition-all duration-200 active:scale-95"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Back to site
              </a>
            </motion.div>
          </motion.div>
        )}

        {/* Error */}
        {status === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md bg-white border border-primary/10 rounded-3xl p-10 text-center overflow-hidden shadow-xl shadow-primary/5"
          >
            {/* Background orb */}
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-dark/3 rounded-full blur-3xl pointer-events-none" />

            {/* Icon */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-16 h-16 bg-dark/8 border border-dark/10 rounded-2xl flex items-center justify-center mx-auto mb-6"
            >
              <svg className="w-8 h-8 text-dark/50" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
            >
              <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-dark/30 mb-2">
                Something went wrong
              </p>
              <h1 className="text-2xl font-black text-dark tracking-tight mb-3">
                Confirmation failed
              </h1>
              <p className="text-sm text-dark/50 leading-relaxed mb-8">
                {message}
              </p>

              <div className="w-full h-px bg-primary/8 mb-8" />

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold text-sm hover:bg-primary-80 transition-all duration-200 active:scale-95"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Try again
                </button>
                <a
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary/8 text-dark rounded-xl font-bold text-sm hover:bg-primary/15 transition-all duration-200 active:scale-95"
                >
                  Go home
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}