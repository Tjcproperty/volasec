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
      <div className="mb-6 sm:mb-8 flex items-end justify-between gap-6">
        <h3 className="text-xl sm:text-2xl font-black text-secondary">
          CLIENT <span className="text-primary">TESTIMONIALS</span>
        </h3>
        <div className="hidden sm:block h-px flex-1 bg-primary-30/60" />
      </div>

      <div className="relative">
        {/* ✅ Buttons now work on BOTH mobile + desktop */}
        <button
          type="button"
          aria-label="Previous testimonial"
          onClick={() => scrollByCard(-1)}
          disabled={!canPrev}
          className={cx(
            "absolute left-0 top-1/2 -translate-y-1/2 z-10",
            "h-10 w-10",
            "border border-primary-30 bg-secondary-80/90 text-dark",
            "transition-opacity",
            canPrev ? "opacity-100" : "opacity-30 cursor-not-allowed",
          )}
        >
          ‹
        </button>

        <button
          type="button"
          aria-label="Next testimonial"
          onClick={() => scrollByCard(1)}
          disabled={!canNext}
          className={cx(
            "absolute right-0 top-1/2 -translate-y-1/2 z-10",
            "h-10 w-10",
            "border border-primary-30 bg-secondary-80/90 text-dark",
            "transition-opacity",
            canNext ? "opacity-100" : "opacity-30 cursor-not-allowed",
          )}
        >
          ›
        </button>

        <div
          ref={trackRef}
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
          <div
            data-row="1"
            className={cx(
              "flex gap-5 sm:gap-8",
              // ✅ Desktop peek
              "md:pr-24 lg:pr-32",
            )}
          >
            {testimonials.map((t, i) => {
              const dir = i === 0 ? -1 : 1;

              return (
                <motion.div
                  key={i}
                  data-card={i === 0 ? "1" : undefined}
                  variants={cardIn(dir)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.35, ease }}
                  className={cx(
                    "group relative overflow-hidden",
                    "rounded-xl",
                    "border border-primary-30",
                    "bg-secondary-80/90 text-dark-80",
                    "p-5 sm:p-6",
                    "shadow-[0_14px_40px_rgba(14,26,43,0.14)]",
                    "transition-colors duration-300",
                    "hover:bg-secondary-80 hover:border-primary-50",
                    "snap-start shrink-0",

                    // ✅ Mobile smaller
                    "w-[130%] ",

                    // ✅ Desktop: 2 full cards + peek
                    "md:w-[46%] lg:w-[44%]",
                  )}
                >
                  <div
                    className={cx(
                      "absolute left-0 top-0 h-full w-1 opacity-70",
                      t.rail,
                    )}
                  />

                  <div className="relative pl-3">
                    <p className="text-sm sm:text-base text-dark/80 italic font-light leading-relaxed">
                      “{t.quote}”
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
              );
            })}
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
