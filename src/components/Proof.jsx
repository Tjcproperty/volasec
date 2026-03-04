import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionBadge from "./shared/SectionBadge";

// ─── PALETTE (light theme) ─────────────────────────────────────────────────────
const C = {
  bg: "#F1F2F2",
  surface: "#FFFFFF",
  surfaceHov: "#F7F8F8",
  ink: "#0E1A2B",
  inkMid: "rgba(14,26,43,0.55)",
  inkFaint: "rgba(14,26,43,0.2)",
  inkGhost: "rgba(14,26,43,0.05)",
  border: "rgba(14,26,43,0.1)",
  borderHov: "rgba(14,26,43,0.22)",
  bar: "rgba(14,26,43,0.1)",
};

// ─── DATA ──────────────────────────────────────────────────────────────────────
const STUDIES = [
  {
    index: "01",
    client: "FINTECH · SERIES B",
    title: "Zero to SOC 2 in 90 Days",
    outcome:
      "Achieved SOC 2 Type I in 89 days. Closed $8M enterprise deal. Zero critical findings.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    stats: [
      { value: "89", unit: "days", label: "To SOC 2 Type I" },
      { value: "$8M", unit: "", label: "Enterprise Deal" },
      { value: "0", unit: "", label: "Critical Findings" },
    ],
  },
  {
    index: "02",
    client: "HEALTHCARE · PLATFORM",
    title: "Multi-Cloud Transformation",
    outcome:
      "Reduced security incidents by 87%. Cut review time from 2 weeks to 2 days.",
    image:
      "/images/digi.jpeg",
    stats: [
      { value: "87%", unit: "", label: "Incident Reduction" },
      { value: "2", unit: "days", label: "Compliance Review" },
      { value: "100%", unit: "", label: "HIPAA Compliant" },
    ],
  },
  {
    index: "03",
    client: "B2B · SAAS",
    title: "Post-Breach Recovery",
    outcome:
      "Rebuilt architecture with defence-in-depth. Zero incidents in 18 months post-engagement.",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
    stats: [
      { value: "18", unit: "mo", label: "Incident-Free" },
      { value: "5", unit: "", label: "Defence Layers" },
      { value: "99.99%", unit: "", label: "Uptime SLA" },
    ],
  },
  {
    index: "04",
    client: "CLOUD · INFRASTRUCTURE",
    title: "Cost Optimisation Sprint",
    outcome:
      "$2.3M annual savings through right-sizing and waste elimination. 60% faster deployments.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
    stats: [
      { value: "$2.3M", unit: "", label: "Annual Savings" },
      { value: "60%", unit: "", label: "Faster Deploys" },
      { value: "43%", unit: "", label: "Cost Reduction" },
    ],
  },
  {
    index: "05",
    client: "DEVOPS · PLATFORM",
    title: "CI/CD Pipeline Overhaul",
    outcome:
      "Reduced deployment time from 4 hours to 12 minutes. 10× increase in deployment frequency.",
    image:
      "/images/dev.jpg",
    stats: [
      { value: "12", unit: "min", label: "Deploy Time" },
      { value: "10×", unit: "", label: "Frequency" },
      { value: "0", unit: "", label: "Failed Releases" },
    ],
  },
  {
    index: "06",
    client: "FINSERV · ENTERPRISE",
    title: "Zero-Trust Architecture",
    outcome:
      "Deployed zero-trust across 3,000-seat org. Passed Big 4 audit first attempt.",
    image:
      "https://images.unsplash.com/photo-1510511336377-1a9caa095849?w=800&h=600&fit=crop",
    stats: [
      { value: "3K", unit: "", label: "Seats Secured" },
      { value: "1st", unit: "", label: "Audit Attempt" },
      { value: "0", unit: "", label: "Policy Exceptions" },
    ],
  },
];

const TESTIMONIALS = [
  {
    quote:
      "They didn't just check boxes — they built a security program that actually works for how we operate.",
    name: "Jennifer Park",
    role: "CTO, Healthcare Technology",
  },
  {
    quote:
      "The team identified critical gaps we didn't even know existed. Their pragmatic approach meant we could fix real risks without slowing down development.",
    name: "David Okonkwo",
    role: "CISO, Financial Services",
  },
  {
    quote:
      "Volasec shortened our compliance timeline by months. The roadmap they delivered was specific, actionable and immediately defensible to our board.",
    name: "Sarah Kim",
    role: "VP Engineering, Fintech",
  },
  {
    quote:
      "We came in post-breach with zero confidence. They rebuilt everything with rigour and transparency. Eighteen months on — not a single incident.",
    name: "Marcus Elliot",
    role: "CEO, SaaS Platform",
  },
];

const ease = [0.22, 1, 0.36, 1];

// ─── CASE CARD ─────────────────────────────────────────────────────────────────
function CaseCard({ item, i }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6, delay: i * 0.06, ease }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col overflow-hidden rounded-md  cursor-pointer"
      style={{
        background: hovered ? C.surfaceHov : C.surface,
        border: `1px solid ${hovered ? C.borderHov : C.border}`,
        minHeight: 420,
        transition: "background 0.25s, border-color 0.25s",
      }}
    >
      {/* Watermark index */}
      <span
        className="pointer-events-none absolute top-3 right-4 font-black leading-none select-none"
        style={{
          fontSize: 56,
          color: hovered ? "rgba(14,26,43,0.08)" : C.inkGhost,
          letterSpacing: "-0.05em",
          transition: "color 0.4s",
        }}
      >
        {item.index}
      </span>

      {/* Image */}
      <div className="relative h-40 overflow-hidden shrink-0">
        <motion.img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.75, ease }}
          style={{ filter: "saturate(0.7) brightness(1.05)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, transparent 20%, ${hovered ? C.surfaceHov : C.surface} 100%)`,
            transition: "background 0.25s",
          }}
        />
        <span
          className="absolute bottom-3 left-4 text-base font-black tracking-[0.2em] uppercase px-2 py-0.5"
          style={{
            background: C.surface,
            color: C.inkMid,
            border: `1px solid ${C.border}`,
          }}
        >
          {item.client}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 px-5 pt-4 pb-6">
        <h3
          className="text-base font-bold leading-snug mb-3"
          style={{ color: C.ink, letterSpacing: "-0.025em" }}
        >
          {item.title}
        </h3>

        <div className="relative flex-1" style={{ minHeight: 116 }}>
          {/* Outcome */}
          <motion.p
            className="absolute inset-0 text-xs leading-relaxed font-light"
            style={{ color: C.inkMid }}
            animate={{ opacity: hovered ? 0 : 1, y: hovered ? -6 : 0 }}
            transition={{ duration: 0.25 }}
          >
            {item.outcome}
          </motion.p>

          {/* Stats */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-between"
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
            transition={{ duration: 0.25 }}
          >
            {item.stats.map((s, si) => (
              <div key={si}>
                <div className="flex items-baseline gap-1.5 mb-1">
                  <span
                    className="font-black text-xl leading-none"
                    style={{ color: C.ink, letterSpacing: "-0.03em" }}
                  >
                    {s.value}
                  </span>
                  {s.unit && (
                    <span
                      className="text-base font-light"
                      style={{ color: C.inkMid }}
                    >
                      {s.unit}
                    </span>
                  )}
                  <span
                    className="text-base font-light ml-0.5"
                    style={{ color: C.inkMid }}
                  >
                    {s.label}
                  </span>
                </div>
                <div className="h-px w-full mb-2" style={{ background: C.bar }}>
                  <motion.div
                    className="h-full"
                    style={{ background: C.ink }}
                    animate={{ width: hovered ? "100%" : "0%" }}
                    transition={{
                      delay: 0.04 + si * 0.06,
                      duration: 0.5,
                      ease,
                    }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom ink line on hover */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{ background: C.ink, transformOrigin: "left" }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.4, ease }}
      />
    </motion.article>
  );
}

// ─── TESTIMONIALS ──────────────────────────────────────────────────────────────
function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setActive((a) => (a + 1) % TESTIMONIALS.length),
      5200,
    );
    return () => clearInterval(id);
  }, []);

  const t = TESTIMONIALS[active];

  return (
    <div
      className="mt-16 sm:mt-24 border-t pt-12 grid md:grid-cols-[200px_1fr] gap-10 md:gap-20 items-start"
      style={{ borderColor: C.border }}
    >
      {/* Left nav */}
      <div>
        <SectionBadge
          label="Client Testimonials "
          className="mb-6 text-primary-50 border-dark-30"
        />
        <div className="flex flex-col gap-2.5">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="flex items-center gap-3 text-left"
            >
              <motion.div
                animate={{
                  width: i === active ? 24 : 6,
                  height: 2,
                  background: i === active ? C.ink : C.bar,
                }}
                transition={{ duration: 0.35, ease }}
                style={{ flexShrink: 0 }}
              />
              {/* <span
                className="text-base font-light uppercase tracking-widest transition-all duration-300"
                style={{ color: i === active ? C.ink : C.inkFaint }}
              >
                {` ${i + 1}`}
              </span> */}
            </button>
          ))}
        </div>
      </div>

      {/* Quote */}
      <div className="relative min-h-[180px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease }}
          >
            <span
              className="block font-black leading-none select-none mb-3"
              style={{ fontSize: 64, color: C.inkGhost, lineHeight: 1 }}
            >
              "
            </span>
            <p
              className="text-lg sm:text-2xl font-light leading-relaxed mb-7"
              style={{ color: C.ink, letterSpacing: "-0.02em" }}
            >
              {t.quote}
            </p>
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 flex items-center justify-center text-sm font-black shrink-0"
                style={{ background: C.ink, color: "#F1F2F2" }}
              >
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-bold" style={{ color: C.ink }}>
                  {t.name}
                </p>
                <p
                  className="text-base font-light mt-0.5"
                  style={{ color: C.inkMid }}
                >
                  {t.role}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── MAIN ──────────────────────────────────────────────────────────────────────
export default function Proof() {
  return (
    <section
      id="proof"
      className="relative overflow-hidden"
      style={{ background: C.bg }}
    >
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(14,26,43,0.07) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Top rule */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: C.border }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:py-28">
        {/* Header */}
        <div className="mb-12 md:mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <SectionBadge
            label="Proven Results"
            className="mb-6 text-primary-50 border-dark-30"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-xs font-light max-w-xs leading-relaxed"
            style={{ color: C.inkMid }}
          >
            Real outcomes from real engagements.
          </motion.p>
        </div>

        {/* Counter strip */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-3 mb-12"
          style={{
            borderTop: `1px solid ${C.border}`,
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          {[
            { v: "50+", l: "Engagements" },
            { v: "100%", l: "Client Retention" },
            { v: "$40M+", l: "Value Unlocked" },
          ].map((s, i) => (
            <div
              key={i}
              className="py-5 px-4 flex flex-col gap-0.5"
              style={{ borderRight: i < 2 ? `1px solid ${C.border}` : "none" }}
            >
              <span
                className="text-2xl sm:text-3xl font-black leading-none"
                style={{ color: C.ink, letterSpacing: "-0.04em" }}
              >
                {s.v}
              </span>
              <span
                className="text-base font-light uppercase tracking-widest"
                style={{ color: C.inkMid }}
              >
                {s.l}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Cards */}
        <div
          className="grid gap-px sm:grid-cols-2 lg:grid-cols-3"
          style={{ background: C.border }}
        >
          {STUDIES.map((item, i) => (
            <div key={i} style={{ background: C.bg }}>
              <CaseCard item={item} i={i} />
            </div>
          ))}
        </div>

        <Testimonials />
      </div>
    </section>
  );
}
