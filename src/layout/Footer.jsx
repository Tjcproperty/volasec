import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { scrollToSection } from "./Header";

const ease = [0.22, 1, 0.36, 1];

const footerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease } },
};

const colsVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const colVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const onScroll = (id) => (e) => {
  e.preventDefault();
  scrollToSection(id);
};

export default function Footer({ logoSrc = "/Icon dark mono@3x.png" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateEmail(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");

    try {
      // STEP 1: Register subscriber
      const volasecRes = await fetch(
        "https://subscribe.volasec.com/subscribers",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, source: "landing_page" }),
        }
      );

      const volasecData = await volasecRes.json();

      if (!volasecRes.ok) {
        if (volasecRes.status === 409) {
          setStatus("error");
          setErrorMessage("This email is already subscribed.");
          return;
        }
        throw new Error(volasecData.message || "Subscription failed");
      }

      // STEP 2: Get confirmation token
      const token = volasecData.token;
      if (!token) throw new Error("No confirmation token returned");

      // STEP 3: Send confirmation email
      const confirmRes = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token }),
      });

      if (!confirmRes.ok) throw new Error("Confirmation email failed");

      // ✅ Only after confirmation email is sent
      setStatus("success");
      setEmail("");

    } catch (err) {
      console.error("Subscription error:", err);
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  const columns = [
    {
      title: "Services",
      links: [
        { label: "Cloud Security", href: "#services" },
        { label: "Compliance", href: "#services" },
        { label: "Assessments", href: "#services" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", id: "about" },
        { label: "Services", id: "services" },
        { label: "Proven Results", id: "proof" },
        { label: "Process", id: "process" },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: "services@volasec.com", href: "mailto:services@volasec.com" },
        { label: "+1 (555) 123-4567", href: "tel:+15551234567" },
      ],
    },
  ];

  const bgMarks = useMemo(
    () => [
      { top: "10%", left: "4%", size: 28, opacity: 0.06 },
      { top: "18%", right: "8%", size: 26, opacity: 0.05 },
      { bottom: "18%", right: "6%", size: 36, opacity: 0.14 },
    ],
    []
  );

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="relative overflow-hidden bg-gradient-to-b from-secondary-30/30 via-secondary-30/20 to-primary/40 border-t border-primary/40 py-14"
    >
      {/* Background marks */}
      <div className="pointer-events-none absolute inset-0">
        {bgMarks.map((m, i) => (
          <img
            key={i}
            src={logoSrc}
            alt=""
            aria-hidden="true"
            className="absolute"
            style={{
              top: m.top,
              left: m.left,
              right: m.right,
              bottom: m.bottom,
              width: m.size,
              height: m.size,
              opacity: m.opacity,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          variants={colsVariants}
          className="grid gap-10 mb-10 md:grid-cols-5"
        >
          {/* Logo */}
          <motion.div variants={colVariants}>
            <img src={logoSrc} className="h-16" alt="VolaSec" />
          </motion.div>

          {/* Columns */}
          {columns.map((col, i) => (
            <motion.div key={i} variants={colVariants}>
              <h4 className="mb-4 text-xs font-black tracking-wider text-primary">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((item, j) =>
                  item.id ? (
                    <li key={j}>
                      <button
                        onClick={onScroll(item.id)}
                        className="text-sm font-light text-primary/50 hover:text-primary transition-colors duration-200"
                      >
                        {item.label}
                      </button>
                    </li>
                  ) : (
                    <li key={j}>
                      <a
                        href={item.href}
                        className="text-sm font-light text-primary/50 hover:text-primary transition-colors duration-200"
                      >
                        {item.label}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </motion.div>
          ))}

          {/* Newsletter */}
          <motion.div variants={colVariants}>
            <h4 className="mb-4 text-xs font-black tracking-wider text-primary">
              Newsletter
            </h4>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={status === "loading" || status === "success"}
                className="w-full px-4 py-3 text-sm bg-white border border-primary/10 text-primary placeholder:text-primary/30 focus:border-primary/40 focus:outline-none transition-all duration-200 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="w-full px-6 py-3 text-sm font-black tracking-wider uppercase bg-primary text-secondary transition-all duration-200 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading"
                  ? "Subscribing..."
                  : status === "success"
                  ? "Subscribed ✓"
                  : "Subscribe"}
              </button>

              {status === "error" && (
                <div className="px-4 py-3 border border-red-200 bg-red-50 text-red-700 text-xs">
                  {errorMessage}
                </div>
              )}

              <p className="text-[11px] text-primary/30 pt-1">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </form>
          </motion.div>
        </motion.div>

        {/* Bottom */}
        <div className="border-t border-primary/10 pt-6 text-center text-xs font-light text-primary/30">
          © 2026 Volasec. All rights reserved.
        </div>
      </div>
    </motion.footer>
  );
}