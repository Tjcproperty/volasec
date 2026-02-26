import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Testimonial from "./Testimonial";
import SectionBadge from "./shared/SectionBadge";

const SECTION_CONTENT = {
  // Main heading and description
  heading: {
    title: "PROVEN",
    titleAccent: "RESULTS",
    description:
      "Real outcomes from real engagements. Hover over any card to reveal detailed metrics and impact.",
  },

  studies: [
    {
      client: "FINTECH SERIES B",
      title: "Zero to SOC 2 in 90 Days",
      outcome:
        "Achieved SOC 2 Type I in 89 days. Closed $8M enterprise deal. Zero critical findings.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      rail: "bg-primary", // Options: bg-primary, bg-primary-80, bg-primary-50, bg-primary-30
      tag: "text-primary",
      stats: [
        { value: "89", label: "Days to SOC 2 Type I" },
        { value: "$8M", label: "Enterprise Deal Closed" },
        { value: "0", label: "Critical Findings" },
      ],
    },
    {
      client: "HEALTHCARE PLATFORM",
      title: "Multi-Cloud Transformation",
      outcome:
        "Reduced security incidents by 87%. Cut review time from 2 weeks to 2 days.",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
      rail: "bg-primary-80",
      tag: "text-primary",
      stats: [
        { value: "87%", label: "Security Incident Reduction" },
        { value: "2 Days", label: "Compliance Review Time" },
        { value: "100%", label: "HIPAA Compliance Achieved" },
      ],
    },
    {
      client: "B2B SAAS",
      title: "Post-Breach Recovery",
      outcome:
        "Rebuilt architecture with defense-in-depth. Zero incidents in 18 months post-engagement.",
      image:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
      rail: "bg-primary-50",
      tag: "text-primary",
      stats: [
        { value: "18", label: "Months Incident-Free" },
        { value: "5", label: "Defense Layers Deployed" },
        { value: "99.99%", label: "Platform Uptime SLA" },
      ],
    },

    {
      client: "CLOUD INFRASTRUCTURE",
      title: "Cost Optimization Sprint",
      outcome:
        "$2.3M annual savings through right-sizing and waste elimination. 60% faster deployments.",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
      rail: "bg-primary-30",
      tag: "text-primary",
      stats: [
        { value: "$2.3M", label: "Annual Cloud Savings" },
        { value: "60%", label: "Faster Deployment Speed" },
        { value: "43%", label: "Total Cost Reduction" },
      ],
    },
  ],
};

// ============================================================================
// END OF EDITABLE CONTENT
// You shouldn't need to edit anything below this line
// ============================================================================

function cx(...c) {
  return c.filter(Boolean).join(" ");
}

const ease = [0.22, 1, 0.36, 1];

const headerVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const cardIn = (dir = 1) => ({
  hidden: { opacity: 0, x: 28 * dir, y: 10 },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.7, ease },
  },
});

// EXPLOSIVE STATS CARD - Enhanced Version
function ExplosiveStatsCard({ item, index }) {
  const [isTilting, setIsTilting] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-4, 4]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - (rect.left + rect.width / 2)) / rect.width);
    mouseY.set((e.clientY - (rect.top + rect.height / 2)) / rect.height);
  };

  return (
    <motion.article
      variants={cardIn(index)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsTilting(true)}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
        setIsTilting(false);
      }}
      style={{
        rotateX: isTilting ? rotateX : 0,
        rotateY: isTilting ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className="group relative overflow-hidden border border-primary/20 bg-white rounded-2xl transition-shadow duration-500 cursor-pointer flex flex-col"
    >
      {/* Shimmer top line */}
      <div className="relative h-1 bg-gradient-to-r from-transparent via-primary to-transparent overflow-hidden shrink-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
          animate={{ x: ["-200%", "200%"] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 1.5,
          }}
        />
      </div>

      {/* Image — shorter on 4-col layout */}
      <div className="relative h-36 overflow-hidden shrink-0">
        <motion.img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
          loading="lazy"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.8, ease }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />

        {/* Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className={cx(
              "block px-3 py-1 text-[9px] font-black tracking-[0.2em]",
              "bg-white/95 backdrop-blur-md rounded-full border border-primary/40",
              item.tag,
            )}
          >
            {item.client}
          </span>
        </div>
      </div>

      {/* Content — compact for 4-col */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="mb-2 text-base font-black leading-tight text-primary">
          {item.title}
        </h3>

        <p className="text-xs text-primary/60 font-light leading-relaxed mb-4 flex-1">
          {item.outcome}
        </p>

        {/* Stats */}
        <div className="space-y-3">
          {item.stats?.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease }}
            >
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-lg font-black text-primary">
                  {stat.value}
                </span>
                <span className="text-[11px] text-primary/50 font-light flex-1 leading-tight">
                  {stat.label}
                </span>
              </div>
              <div className="h-px bg-primary/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary/40"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.8, ease }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Side rail */}
      <div className={cx("absolute left-0 top-0 h-full w-1", item.rail)} />

      {/* Hover shadow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          boxShadow: isTilting
            ? "0 20px 60px rgba(14,26,43,0.15)"
            : "0 4px 20px rgba(14,26,43,0.06)",
        }}
        transition={{ duration: 0.4 }}
      />
    </motion.article>
  );
}

export default function Proof() {
  const studies = SECTION_CONTENT.studies;

  return (
    <section
      id="proof"
      className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-primary-30/10 via-primary-80/50 to-primary/80 overflow-hidden"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-80/5 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 relative z-10">
        {/* Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="mb-12 sm:mb-16"
        >
          {/* Animated accent bar */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "140px" }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.85, ease }}
            className="mb-6 h-1.5 rounded-full overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-80 to-primary-30" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 1,
              }}
              style={{ opacity: 0.5 }}
            />
          </motion.div>

                 <SectionBadge label="Proven Results" className="mb-6 text-dark-80" />
          <p className="text-sm sm:text-base text-dark/70 font-light max-w-2xl">
            {SECTION_CONTENT.heading.description}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16 sm:mb-24">
          {studies.map((item, i) => {
            const dir = i % 2 === 0 ? -1 : 1;
            return (
              <ExplosiveStatsCard key={i} item={item} index={i} dir={dir} />
            );
          })}
        </div>
      </div>

      <Testimonial />
    </section>
  );
}
