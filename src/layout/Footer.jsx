import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { scrollToSection } from "./Header";
import { Button } from "@/components/ui/button";

function cx(...c) {
  return c.filter(Boolean).join(" ");
}
const onScroll = (id) => (e) => {
  e.preventDefault();
  scrollToSection(id);
};
const footerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const colsVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const colVariants = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const linkListVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const linkItemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Footer({ logoSrc = "/Iconwhite.png" }) {
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

  // 🔹 more + clearer logo marks (small, faint + stronger accents)
  const bgMarks = useMemo(
    () => [
      // faint texture
      { top: "10%", left: "4%", size: 28, opacity: 0.06, rotate: -10 },
      { top: "18%", right: "8%", size: 26, opacity: 0.05, rotate: 12 },
      { top: "34%", left: "12%", size: 30, opacity: 0.06, rotate: 8 },
      { top: "46%", right: "2%", size: 24, opacity: 0.05, rotate: -12 },
      { bottom: "28%", left: "6%", size: 26, opacity: 0.06, rotate: 10 },
      { bottom: "14%", right: "16%", size: 28, opacity: 0.05, rotate: -8 },
      { bottom: "6%", left: "22%", size: 22, opacity: 0.05, rotate: 14 },

      // medium presence
      { top: "26%", left: "44%", size: 34, opacity: 0.12, rotate: -8 },
      { top: "56%", right: "28%", size: 32, opacity: 0.13, rotate: 10 },
      { bottom: "18%", right: "6%", size: 36, opacity: 0.14, rotate: 8 },

      // strong accents (few)
      { top: "40%", right: "12%", size: 44, opacity: 0.18, rotate: -10 },
      { bottom: "34%", left: "28%", size: 42, opacity: 0.17, rotate: 12 },
    ],
    [],
  );

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="relative overflow-hidden bg-dark border-t border-secondary-10 py-12 sm:py-14"
    >
      {/* logo marks */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        {bgMarks.map((m, i) => {
          const style = {
            top: m.top,
            left: m.left,
            right: m.right,
            bottom: m.bottom,
            width: m.size,
            height: m.size,
            opacity: m.opacity,
            transform: `rotate(${m.rotate}deg)`,
            // helps marks read on dark bg without adding new colors
            filter: "contrast(1.12) brightness(1.06)",
          };

          return (
            <img
              key={i}
              src={logoSrc}
              alt=""
              aria-hidden="true"
              className="absolute select-none"
              style={style}
            />
          );
        })}
      </div>

      {/* subtle, serious accents */}
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 bg-primary-30 blur-[140px] opacity-20" />
      <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 bg-secondary-30 blur-[140px] opacity-10" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-16 xl:px-24">
        <motion.div
          variants={colsVariants}
          className="grid gap-10 mb-10 md:grid-cols-4"
        >
          {/* Logo */}
          <motion.div variants={colVariants} className="flex items-start">
            <img src={logoSrc} className="h-14 sm:h-16 md:h-20" alt="VolaSec" />
          </motion.div>

          {columns.map((col, i) => (
            <motion.div key={i} variants={colVariants}>
              <h4 className="mb-4 text-[11px] sm:text-xs font-black tracking-wider text-secondary">
                {col.title}
              </h4>

              <motion.ul
                variants={linkListVariants}
                className="space-y-2"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
              >
                {col.links.map((item, j) => (
                  <motion.li key={j} variants={linkItemVariants}>
                    <button
                      onClick={onScroll(item.id)}
                      className={cx(
                        "text-sm sm:text-xs font-light",
                        "text-secondary-50 hover:text-secondary",
                        "transition-colors duration-200",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-dark",
                      )}
                    >
                      {item.label}
                    </button>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </motion.div>

        <div className="border-t border-secondary-10 pt-6 text-center text-xs font-light text-secondary-30">
          <p>© 2026 Volasec. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
}
