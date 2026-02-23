import React from "react";
import { motion } from "framer-motion";
import { scrollToSection } from "@/layout/Header";

export default function Hero() {
  const BG_IMAGE = "/blueee.png"; // MUST be in /public

  const onScroll = (id) => (e) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <section
      id="hero"
      className="relative bg-primary/30 min-h-[100svh] flex items-center justify-center pt-20 sm:pt-24 overflow-hidden"
    >
      {/* Background image */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${BG_IMAGE})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          // ✅ cover is better than 100% on mobile
              backgroundSize: "contain",
        }}
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1.2 }}
      />

      {/* Soft brand tint */}
      <div className="absolute inset-0 bg-primary/10 z-[1]" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-primary/70 to-dark z-[2]" />

      {/* Floating glow elements (scaled down on mobile) */}
      <motion.div
        className="absolute top-24 right-6 sm:top-40 sm:right-20 w-40 h-40 sm:w-64 sm:h-64 rounded-full opacity-30 sm:opacity-40 z-[3]"
        style={{
          background: "radial-gradient(circle, #0E1A2B 0%, transparent 70%)",
        }}
        animate={{ y: [0, -18, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-28 left-6 sm:bottom-40 sm:left-20 w-64 h-64 sm:w-96 sm:h-96 rounded-full opacity-10 z-[3]"
        style={{
          background: "radial-gradient(circle, #325a82 0%, transparent 70%)",
        }}
        animate={{ y: [0, 22, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="max-w-3xl mx-auto"
        >
          {/* Accent line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "84px" }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="h-0.5 accent-gradient mb-8 sm:mb-10"
          />

          {/* Headline */}
          <h1 className="tracking-tight leading-[1.05] mb-6 sm:mb-8">
            <motion.span
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="block text-4xl sm:text-5xl md:text-7xl font-black text-glow"
            >
              SECURITY
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="block text-4xl sm:text-5xl md:text-7xl font-black text-gradient"
            >
              ARCHITECTURE
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="block mt-3 sm:mt-4 text-xl sm:text-2xl md:text-5xl font-semibold text-secondary/80"
            >
              For High-Stakes Cloud Environments
            </motion.span>
          </h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-base sm:text-lg md:text-xl text-secondary/70 max-w-xl mb-10 sm:mb-12 font-light leading-relaxed"
          >
            Enterprise-grade security strategy for organizations where a breach
            isn&apos;t just costly — it&apos;s{" "}
            <span className="font-bold text-secondary">
              {"catastrophic".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + i * 0.04 }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>
            .
          </motion.p>

          {/* CTA (stack on mobile, row on desktop) */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start">
            <motion.button
              onClick={onScroll("contact")}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative inline-flex items-center justify-center px-8 py-4 text-sm font-black tracking-wider text-secondary overflow-hidden group w-full sm:w-auto"
            >
              <motion.span
                className="absolute bottom-0 left-0 h-0.5 w-full bg-secondary"
                animate={{ x: ["-100%", "0%", "70%", "100%"] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  times: [0, 0.2, 0.8, 1],
                }}
              />
              <span className="relative z-10">BOOK STRATEGY CALL</span>
            </motion.button>

            <motion.button
              onClick={onScroll("services")}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative inline-flex items-center justify-center px-8 py-4 text-sm font-black tracking-wider text-secondary overflow-hidden group w-full sm:w-auto"
            >
              <motion.span
                className="absolute bottom-0 left-0 h-0.5 w-full bg-secondary"
                animate={{ x: ["-100%", "0%", "70%", "100%"] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  times: [0, 0.2, 0.8, 1],
                }}
              />
              <span className="relative z-10">EXPLORE MORE</span>
            </motion.button>
          </div>

          {/* Stats (stack on mobile, 3 cols on md) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 sm:mt-12">
            {[
              { number: "99.9%", label: "Uptime Guarantee" },
              { number: "24/7", label: "Security Monitoring" },
              { number: "SOC 2", label: "Type II Certified" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + i * 0.12 }}
                className="border-l-2 border-secondary/40 pl-4"
              >
                <div className="text-2xl md:text-3xl font-black text-secondary">
                  {stat.number}
                </div>
                <div className="text-xs md:text-sm text-secondary/70">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator (hide on very small screens) */}
      <motion.div
        className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-5 h-8 border-2 border-secondary-30 rounded-lg flex justify-center pt-2">
          <div className="w-1 h-2 bg-secondary-50 rounded-sm" />
        </div>
      </motion.div>
    </section>
  );
}
