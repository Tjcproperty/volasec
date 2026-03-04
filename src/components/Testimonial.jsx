import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import SectionBadge from "./shared/SectionBadge";

const testimonials = [
  {
    quote:
      "They didn't just check boxes—they built a security program that actually works for how we operate.",
    name: "Jennifer Park",
    title: "CTO, Healthcare Technology",
    accent: "bg-primary",
  },
  {
    quote:
      "The team identified critical gaps we didn't even know existed. Their pragmatic approach meant we could fix real risks without slowing down development.",
    name: "David Okonkwo",
    title: "CISO, Financial Services",
    accent: "bg-primary-80",
  },
  {
    quote:
      "Volasec shortened our compliance timeline by months. The roadmap they delivered was specific, actionable and immediately defensible to our board.",
    name: "Sarah Kim",
    title: "VP Engineering, Fintech",
    accent: "bg-primary-50",
  },
  {
    quote:
      "We came in post-breach with zero confidence. They rebuilt everything with rigour and transparency. Eighteen months on — not a single incident.",
    name: "Marcus Elliot",
    title: "CEO, SaaS Platform",
    accent: "bg-primary",
  },
];

function cx(...c) {
  return c.filter(Boolean).join(" ");
}

const ease = [0.22, 1, 0.36, 1];

export default function Testimonial() {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });

  /* ── Sync active dot with scroll position ── */
  const updateState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < max - 4);

    // Estimate active card
    const cardWidth =
      el.querySelector("[data-card]")?.getBoundingClientRect().width ?? 340;
    const gap = 24;
    const idx = Math.round(el.scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.max(0, Math.min(idx, testimonials.length - 1)));
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateState();
    el.addEventListener("scroll", updateState, { passive: true });
    window.addEventListener("resize", updateState);
    return () => {
      el.removeEventListener("scroll", updateState);
      window.removeEventListener("resize", updateState);
    };
  }, [updateState]);

  const scrollTo = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const cardEl = el.querySelector("[data-card]");
    const cardW = cardEl ? cardEl.getBoundingClientRect().width : 340;
    el.scrollBy({ left: (cardW + 24) * dir, behavior: "smooth" });
  };

  const scrollToIndex = (i) => {
    const el = trackRef.current;
    if (!el) return;
    const cardEl = el.querySelector("[data-card]");
    const cardW = cardEl ? cardEl.getBoundingClientRect().width : 340;
    el.scrollTo({ left: i * (cardW + 24), behavior: "smooth" });
  };

  /* ── Drag to scroll ── */
  const onPointerDown = (e) => {
    const el = trackRef.current;
    if (!el) return;
    drag.current = {
      down: true,
      x: e.clientX,
      left: el.scrollLeft,
      moved: false,
    };
    el.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e) => {
    const el = trackRef.current;
    if (!el || !drag.current.down) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.left - dx;
  };
  const onPointerUp = (e) => {
    drag.current.down = false;
    trackRef.current?.releasePointerCapture?.(e.pointerId);
    updateState();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease }}
      className="border-t border-primary-30 pt-10 px-4 max-w-7xl mx-auto"
    >
      {/* ── Header row ── */}
      <div className="mb-7 flex items-center justify-between gap-6">
        <SectionBadge
          label="CLIENT'S TESTIMONIAL"
          className="mb-6 text-primary-50 border-dark-30"
        />

        {/* Nav arrows */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => scrollTo(-1)}
            disabled={!canPrev}
            className={cx(
              "w-8 h-8 flex items-center justify-center border border-primary-30 text-secondary transition-all duration-200 text-lg leading-none",
              canPrev
                ? "hover:border-primary hover:text-primary opacity-100"
                : "opacity-25 cursor-not-allowed",
            )}
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => scrollTo(1)}
            disabled={!canNext}
            className={cx(
              "w-8 h-8 flex items-center justify-center border border-primary-30 text-secondary transition-all duration-200 text-lg leading-none",
              canNext
                ? "hover:border-primary hover:text-primary opacity-100"
                : "opacity-25 cursor-not-allowed",
            )}
          >
            ›
          </button>
        </div>
      </div>

      {/* ── Scroller ── */}
      <div className="relative">
        {/* Left fade */}
        <div
          className={cx(
            "pointer-events-none absolute left-0 top-0 bottom-0 w-8 z-10 transition-opacity duration-300",
            "bg-gradient-to-r from-dark to-transparent",
            canPrev ? "opacity-100" : "opacity-0",
          )}
        />
        {/* Right fade */}
        <div
          className={cx(
            "pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10 transition-opacity duration-300",
            "bg-gradient-to-l from-dark to-transparent",
            canNext ? "opacity-100" : "opacity-0",
          )}
        />

        <div
          ref={trackRef}
          className="overflow-x-auto overflow-y-visible scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing select-none"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          <div className="flex gap-6 pb-2">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                data-card={i === 0 ? "true" : undefined}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: i * 0.08, ease }}
                className={cx(
                  "relative shrink-0 snap-start overflow-hidden",
                  "border border-primary-30 bg-secondary",
                  "hover:border-primary-50 transition-colors duration-300",
                  // Mobile: near full width; tablet: ~50%; desktop: ~33%
                  "w-[85vw] sm:w-[45%] lg:w-[31%]",
                )}
              >
                {/* Accent rail */}
                <div
                  className={cx("absolute left-0 top-0 bottom-0 w-1", t.accent)}
                />

                <div className="pl-6 pr-5 py-6">
                  {/* Quote mark */}
                  <span className="block text-3xl font-black text-primary/20 leading-none mb-2 select-none">
                    "
                  </span>

                  <p className="text-xs sm:text-[13px] text-dark/75 font-light leading-relaxed mb-5">
                    {t.quote}
                  </p>

                  <div className="flex items-center gap-3 pt-4 border-t border-primary-30/50">
                    <div className="w-8 h-8 bg-dark flex items-center justify-center text-xs font-black text-secondary shrink-0">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-dark leading-tight">
                        {t.name}
                      </p>
                      <p className="text-[10px] text-dark/50 font-light">
                        {t.title}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Dot indicators ── */}
      <div className="mt-5 flex items-center gap-1.5">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={cx(
              "transition-all duration-300",
              i === activeIndex
                ? "w-6 h-1 bg-primary"
                : "w-1.5 h-1 bg-secondary-30 hover:bg-secondary-50",
            )}
          />
        ))}
      </div>
    </motion.div>
  );
}
