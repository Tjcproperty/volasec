"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ============================================================================
// CONTENT CONFIG
// ============================================================================

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
    success:
      "🎉 Successfully subscribed! Check your email to confirm your subscription.",
    error: "Something went wrong. Please try again.",
    invalidEmail: "Please enter a valid email address.",
    alreadySubscribed: "This email is already subscribed.",
  },
  privacyNote: "We respect your privacy. Unsubscribe at any time.",
};

// ============================================================================

function cx(...c) {
  return c.filter(Boolean).join(" ");
}

const ease = [0.22, 1, 0.36, 1];

export default function NewsletterModal({ isOpen, onClose }) {
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
      }, 300);
    }
  }, [isOpen]);

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  // Inside NewsletterModal -> handleSubmit
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
      // Step 1: Call Volasec subscribers endpoint to get token
      // const volasecRes = await fetch(
      //   "https://subscribe.volasec.com/subscribers",
      //   {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ email, source: "landing_page" }),
      //   },
      // );

      // const volasecData = await volasecRes.json();
      // console.log("Volasec response:", volasecData);

      // if (!volasecRes.ok) {
      //   if (volasecRes.status === 409) {
      //     setStatus("error");
      //     setErrorMessage(SUBSCRIPTION_CONTENT.messages.alreadySubscribed);
      //     return;
      //   }
      //   throw new Error(volasecData.message || "Subscription failed");
      // }

      const token =
        "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im1veW9zb3JlamFtZXNAZ21haWwuY29tIiwiZXhwIjoxNzcyNDU3MTcyfQ.TaeM3EJzU5XQatMdZoSkP0qTv0meDDp5Y3AJYMF5PFY";
      if (!token) throw new Error("No confirmation token returned");
      console.log("Received token:", token);
      // Step 2: Pass token and email to your internal API to send email
      const internalRes = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token }),
      });

      const internalData = await internalRes.json();
      console.log("Internal API response:", internalData);

      if (!internalRes.ok)
        throw new Error(internalData.message || "Email send failed");

      setStatus("success");
      setEmail("");
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
            className="fixed inset-0 bg-dark/20 backdrop-blur-sm z-50"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease }}
              className="relative w-full max-w-2xl pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-secondary border-2 border-primary-30 rounded-2xl p-10 relative overflow-hidden">
                {/* Header */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-dark mb-4">
                    {SUBSCRIPTION_CONTENT.heading.title}{" "}
                    <span className="text-primary">
                      {SUBSCRIPTION_CONTENT.heading.titleAccent}
                    </span>
                  </h2>
                  <p className="text-dark/70">
                    {SUBSCRIPTION_CONTENT.heading.description}
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={SUBSCRIPTION_CONTENT.form.emailPlaceholder}
                      disabled={status === "loading" || status === "success"}
                      className={cx(
                        "flex-1 px-6 py-4 rounded-xl",
                        "bg-dark/50 border-2 border-primary-30",
                        "text-dark placeholder:text-dark/40",
                        "focus:border-primary focus:outline-none",
                        status === "error" &&
                          "border-red-500 focus:border-red-500",
                      )}
                    />

                    <button
                      type="submit"
                      disabled={status === "loading" || status === "success"}
                      className="px-8 py-4 rounded-xl font-bold bg-primary text-dark transition disabled:opacity-50"
                    >
                      {status === "loading"
                        ? SUBSCRIPTION_CONTENT.form.buttonTextLoading
                        : SUBSCRIPTION_CONTENT.form.buttonText}
                    </button>
                  </div>

                  {/* Messages */}
                  <AnimatePresence mode="wait">
                    {status === "success" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="p-4 rounded-xl bg-primary/10 border border-primary/30 text-primary text-sm"
                      >
                        {SUBSCRIPTION_CONTENT.messages.success}
                      </motion.div>
                    )}

                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
                      >
                        {errorMessage}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <p className="text-xs text-dark/50 text-center">
                    {SUBSCRIPTION_CONTENT.privacyNote}
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
