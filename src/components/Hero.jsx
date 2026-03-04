import { motion } from "framer-motion";
import { scrollToSection } from "@/lib/utils";
import SectionBadge from "./shared/SectionBadge";
import BlurRevealHeading from "./shared/BlurRevealHeading";

/* Grain texture overlay */
function GrainOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[4] opacity-[0.02]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

export default function Hero() {
  const BG_IMAGE = "/blueee.png";

  const onScroll = (id) => (e) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <section
      id="hero"
      className="relative bg-secondary/30 min-h-[100svh] flex items-center justify-center pt-20 sm:pt-24 p-3 overflow-hidden"
    >
      {/* Background image */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${BG_IMAGE})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
        }}
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1.2 }}
      />

      {/* Soft brand tint */}
      <div className="absolute inset-0 bg-secondary/10 z-[1]" />

      {/* Gradient overlay — inverted: secondary replaces dark, primary stays as mid */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary via-primary/20 to-secondary z-[2]" />

      <GrainOverlay />

      {/* Floating glow elements */}
      <motion.div
        className="absolute top-24 right-6 sm:top-40 sm:right-20 w-40 h-40 sm:w-64 sm:h-64 opacity-30 sm:opacity-40 z-[3]"
        style={{
          background: "radial-gradient(circle, #F1F2F2 0%, transparent 70%)",
        }}
        animate={{ y: [0, -18, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-28 left-6 sm:bottom-40 sm:left-20 w-64 h-64 sm:w-96 sm:h-96 opacity-10 z-[3]"
        style={{
          background: "radial-gradient(circle, #7da8c9 0%, transparent 70%)",
        }}
        animate={{ y: [0, 22, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="max-w-3xl mx-auto"
        >
          <SectionBadge
            label="Cloud Security & FinOps"
            className="mb-8 text-secondary-50 border-secondary-30"
          />

          <BlurRevealHeading
            text="Security Architecture For High-Stakes Cloud Environments"
            as="h1"
            className="tracking-tight leading-[1.05] mb-6 sm:mb-8 text-4xl sm:text-5xl md:text-7xl font-normal text-secondary"
          />

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-base sm:text-lg md:text-xl text-primary/70 max-w-xl mb-10 sm:mb-12 font-light leading-relaxed"
          >
            Enterprise-grade security strategy for organisations where a breach
            isn&apos;t just costly — it&apos;s{" "}
            <span className="font-bold text-primary">
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

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start">
            <motion.button
              onClick={onScroll("contact")}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative inline-flex items-center justify-center px-8 py-4 text-sm font-medium tracking-wider text-secondary overflow-hidden group w-full sm:w-auto"
            >
              <motion.span
                className="absolute bottom-0 left-0 h-0.5 w-full bg-primary"
                animate={{ x: ["-100%", "0%", "70%", "100%"] }}
                transition={{ duration: 5, repeat: Infinity, times: [0, 0.2, 0.8, 1] }}
              />
              <span className="relative z-10">BOOK STRATEGY CALL</span>
            </motion.button>

            <motion.button
              onClick={onScroll("services")}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative inline-flex items-center justify-center px-8 py-4 text-sm font-medium tracking-wider text-secondary overflow-hidden group w-full sm:w-auto"
            >
              <motion.span
                className="absolute bottom-0 left-0 h-0.5 w-full bg-primary"
                animate={{ x: ["-100%", "0%", "70%", "100%"] }}
                transition={{ duration: 5, repeat: Infinity, times: [0, 0.2, 0.8, 1] }}
              />
              <span className="relative z-10">EXPLORE MORE</span>
            </motion.button>
          </div>

          {/* Stats */}
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
                className="border-l-2 border-primary/40 pl-4"
              >
                <div className="text-2xl md:text-3xl font-normal text-secondary">
                  {stat.number}
                </div>
                <div className="text-xs md:text-sm text-primary/70">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

     
    </section>
  );
}