import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SUBSCRIPTION_CONTENT = {
  heading: {
    title: "Stay Ahead of",
    titleAccent: "Security Threats",
    description:
      "Get exclusive insights, security tips, and industry updates delivered to your inbox.",
  },
  form: {
    emailPlaceholder: "Enter your email address",
    buttonText: "Subscribe Now",
    buttonTextLoading: "Subscribing...",
  },
  messages: {
    success: "🎉 Successfully subscribed! Check your email to confirm.",
    error: "Something went wrong. Please try again.",
    invalidEmail: "Please enter a valid email address.",
    alreadySubscribed: "This email is already subscribed.",
  },
  privacyNote: "We respect your privacy. Unsubscribe at any time.",
};

function cx(...c) {
  return c.filter(Boolean).join(" ");
}

const ease = [0.22, 1, 0.36, 1];

export default function NewsletterModal({ isOpen, onClose, onSubscribed, onPending }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setEmail("");
        setStatus("idle");
        setErrorMessage("");
      }, 3000);
    }
  }, [isOpen]);

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateEmail(email)) {
      setStatus("error");
      setErrorMessage(SUBSCRIPTION_CONTENT.messages.invalidEmail);
      return;
    }

    setStatus("loading");

    try {
      const volasecRes = await fetch("https://subscribe.volasec.com/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "landing_page" }),
      });

      const volasecData = await volasecRes.json();

      if (!volasecRes.ok) {
        if (volasecRes.status === 409) {
          setStatus("error");
          setErrorMessage(SUBSCRIPTION_CONTENT.messages.alreadySubscribed);
          return;
        }
        throw new Error(volasecData.message || "Subscription failed");
      }

      const token = volasecData.token;
      if (!token) throw new Error("No confirmation token returned");

      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token }),
      });

      onPending?.(email);
      setStatus("success");
      setTimeout(() => onClose(), 2500);
    } catch (err) {
      console.error("Subscription error:", err);
      setStatus("error");
      setErrorMessage(SUBSCRIPTION_CONTENT.messages.error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 24 }}
              transition={{ duration: 0.35, ease }}
              className="relative w-full max-w-lg pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative bg-secondary rounded-2xl overflow-hidden shadow-2xl">

                {/* Top accent line */}
                <div className="h-1 w-full bg-gradient-to-r from-primary via-primary/60 to-primary/20" />

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-primary/40 hover:text-primary transition-colors z-10"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="p-8 sm:p-10">
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.4, ease }}
                    className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-6"
                  >
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </motion.div>

                  {/* Heading */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.5, ease }}
                    className="mb-8"
                  >
                    {/* Accent line */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "48px" }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="h-0.5 bg-primary/40 mb-4"
                    />
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-primary mb-3 leading-tight">
                      {SUBSCRIPTION_CONTENT.heading.title}{" "}
                      <span className="text-primary/40">
                        {SUBSCRIPTION_CONTENT.heading.titleAccent}
                      </span>
                    </h2>
                    <p className="text-sm text-primary/60 font-light leading-relaxed">
                      {SUBSCRIPTION_CONTENT.heading.description}
                    </p>
                  </motion.div>

                  {/* Form */}
                  <motion.form
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.5, ease }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={SUBSCRIPTION_CONTENT.form.emailPlaceholder}
                        disabled={status === "loading" || status === "success"}
                        className={cx(
                          "flex-1 px-4 py-3 text-sm",
                          "bg-white border-2 border-primary/10",
                          "text-primary placeholder:text-primary/30",
                          "focus:border-primary/40 focus:outline-none",
                          "transition-all duration-200",
                          "disabled:opacity-50",
                        )}
                      />
                      <motion.button
                        type="submit"
                        disabled={status === "loading" || status === "success"}
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-3 text-sm font-black tracking-wider uppercase bg-primary text-secondary transition-all duration-200 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                      >
                        {status === "loading"
                          ? SUBSCRIPTION_CONTENT.form.buttonTextLoading
                          : SUBSCRIPTION_CONTENT.form.buttonText}
                      </motion.button>
                    </div>

                    {/* Error message */}
                    <AnimatePresence mode="wait">
                      {status === "error" && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="px-4 py-3 border border-red-200 bg-red-50 text-red-700 text-xs"
                        >
                          {errorMessage}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Success message */}
                    <AnimatePresence mode="wait">
                      {status === "success" && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="px-4 py-3 border border-primary/20 bg-primary/5 text-primary text-xs"
                        >
                          {SUBSCRIPTION_CONTENT.messages.success}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Privacy note */}
                    <div className="flex items-center gap-2 pt-1">
                      <svg className="w-3.5 h-3.5 text-primary/30 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      <p className="text-[11px] text-primary/30">
                        {SUBSCRIPTION_CONTENT.privacyNote}
                      </p>
                    </div>
                  </motion.form>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}