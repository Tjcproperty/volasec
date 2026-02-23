import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

function cx(...c) {
  return c.filter(Boolean).join(" ");
}

const headerVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};

const stepVariants = {
  hidden: { opacity: 0, x: -12 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Process({
  // pass your logo path here, e.g. "/volasec-logo.svg"
  logoSrc = "/Iconwhite.png",
}) {
  const steps = useMemo(
    () => [
      {
        number: "01",
        title: "Discovery & Risk Assessment",
        timeline: "1–2 weeks",
        description:
          "Deep-dive interviews, architecture review, and threat modeling. We identify gaps and prioritize based on real business impact.",
      },
      {
        number: "02",
        title: "Strategy & Roadmap",
        timeline: "1 week",
        description:
          "Clear, actionable security roadmap aligned with your business goals. Quick wins for immediate risk reduction.",
      },
      {
        number: "03",
        title: "Implementation",
        timeline: "4–12 weeks",
        description:
          "Hands-on implementation working alongside your team. Infrastructure-as-code for reproducibility.",
      },
      {
        number: "04",
        title: "Validation & Testing",
        timeline: "1–2 weeks",
        description:
          "Rigorous testing, penetration testing, and compliance verification. Documentation for ongoing operations.",
      },
      {
        number: "05",
        title: "Ongoing Support",
        timeline: "Optional",
        description:
          "Flexible support: quarterly reviews, on-call incident response, compliance maintenance.",
      },
    ],
    [],
  );

  // ONLY highlight the active number (keep your current token approach)
  const activeNumClass = [
    "text-secondary",
    "text-secondary",
    "text-secondary",
    "text-secondary",
    "text-secondary",
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef([]);
  const rafRef = useRef(0);
  const activeRef = useRef(0);

  useEffect(() => {
    const els = stepRefs.current.filter(Boolean);
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (!intersecting.length) return;

        const centerY = window.innerHeight / 2;
        let best = null;
        let bestDist = Infinity;

        for (const e of intersecting) {
          const r = e.boundingClientRect;
          const mid = r.top + r.height / 2;
          const dist = Math.abs(mid - centerY);
          if (dist < bestDist) {
            bestDist = dist;
            best = e;
          }
        }

        if (!best) return;
        const idx = Number(best.target.getAttribute("data-index"));
        if (Number.isNaN(idx)) return;

        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
          if (idx === activeRef.current) return;
          activeRef.current = idx;
          setActiveIndex(idx);
        });
      },
      {
        root: null,
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0.35,
      },
    );

    els.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [steps.length]);

  // background logo marks (small, mixed faint + slightly stronger)
  const bgMarks = useMemo(
    () => [
      // 🔹 faint layer (texture)
      { top: "6%", left: "4%", size: 36, opacity: 0.1, rotate: -12 },
      { top: "12%", right: "8%", size: 32, opacity: 0.1, rotate: 10 },
      { top: "22%", left: "18%", size: 34, opacity: 0.1, rotate: -6 },
      { top: "38%", right: "2%", size: 30, opacity: 0.1, rotate: 14 },
      { top: "52%", left: "4%", size: 32, opacity: 0.1, rotate: -10 },
      { top: "68%", right: "14%", size: 34, opacity: 0.1, rotate: 8 },
      { bottom: "18%", left: "22%", size: 30, opacity: 0.1, rotate: -14 },
      { bottom: "6%", right: "18%", size: 28, opacity: 0.1, rotate: 12 },

      // 🔸 medium presence (noticeable)
      { top: "16%", left: "42%", size: 42, opacity: 0.12, rotate: -8 },
      { top: "34%", right: "28%", size: 40, opacity: 0.14, rotate: 10 },
      { top: "58%", left: "36%", size: 44, opacity: 0.15, rotate: -6 },
      { bottom: "32%", right: "34%", size: 42, opacity: 0.13, rotate: 12 },

      // 🔺 strong accents (few, intentional)
      { top: "46%", left: "12%", size: 56, opacity: 0.18, rotate: -10 },
      { bottom: "22%", right: "8%", size: 54, opacity: 0.17, rotate: 8 },
    ],
    [],
  );

  return (
    <section
      id="process"
      className="relative overflow-hidden bg-dark-80/100 py-20"
    >
      {/* small logo background marks */}
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

      {/* subtle ambient (no blur) */}
      <div className="pointer-events-none absolute -top-40 right-0 h-[420px] w-[420px] sm:h-[520px] sm:w-[520px] bg-primary-30 opacity-20" />
      <div className="pointer-events-none absolute -bottom-40 left-0 h-[420px] w-[420px] sm:h-[520px] sm:w-[520px] bg-secondary-30 opacity-10" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-16 xl:px-24">
        {/* Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="mb-10 sm:mb-14"
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 sm:mb-6 h-1 bg-primary"
          />

          <h2 className="mb-3 text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-secondary">
            HOW WE <span className="text-secondary-50/40">WORK</span>
          </h2>

          <p className="text-sm sm:text-base text-secondary-80 font-light">
            A proven, repeatable methodology
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="space-y-10 sm:space-y-12"
        >
          {steps.map((step, index) => {
            const isActive = index === activeIndex;

            return (
              <motion.div
                key={index}
                ref={(el) => (stepRefs.current[index] = el)}
                data-index={index}
                variants={stepVariants}
                className="border-b border-secondary-30 pb-8 sm:pb-10"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8">
                  {/* Number (ONLY highlight) */}
                  <motion.div
                    className={cx(
                      "leading-none",
                      "text-4xl sm:text-6xl font-black",
                      "min-w-0 sm:min-w-[90px]",
                      isActive ? activeNumClass[index] : "text-secondary-30",
                    )}
                    animate={{ opacity: isActive ? 1 : 0.35 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    style={
                      isActive
                        ? { textShadow: "0 0 24px rgba(14, 26, 43, 0.35)" }
                        : undefined
                    }
                  >
                    {step.number}
                  </motion.div>

                  {/* Text (always bright + readable, no highlight animation) */}
                  <div className="flex-1">
                    <h3 className="mb-2 text-xl sm:text-3xl font-black text-secondary">
                      {step.title}
                    </h3>

                    <p className="mb-3 sm:mb-4 text-[11px] sm:text-xs font-black tracking-wider text-secondary-80">
                      TIMELINE:{" "}
                      <span className="text-secondary">{step.timeline}</span>
                    </p>

                    <p className="max-w-2xl text-sm sm:text-base font-light leading-relaxed sm:leading-relaxed text-secondary-80">
                      {step.description}
                    </p>

                    <div className="mt-5 sm:mt-6 h-px w-full bg-secondary-30 opacity-40" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
