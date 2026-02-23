import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Testimonial() {
  function cx(...c) {
    return c.filter(Boolean).join(" ");
  }

  const ease = [0.22, 1, 0.36, 1];

  const testimonials = [
    {
      quote:
        "They didn't just check boxes—they built a security program that actually works for how we operate.",
      name: "Jennifer Park",
      title: "CTO, Healthcare Technology",
      rail: "bg-primary",
    },
    {
      quote:
        "The team identified critical gaps we didn't even know existed. Their pragmatic approach meant we could fix real risks without slowing down development.",
      name: "David Okonkwo",
      title: "CISO, Financial Services",
      rail: "bg-primary-80",
    },
    {
      quote:
        "The team identified critical gaps we didn't even know existed. Their pragmatic approach meant we could fix real risks without slowing down development.",
      name: "David Okonkwo",
      title: "CISO, Financial Services",
      rail: "bg-primary-80",
    },
    {
      quote:
        "The team identified critical gaps we didn't even know existed. Their pragmatic approach meant we could fix real risks without slowing down development.",
      name: "David Okonkwo",
      title: "CISO, Financial Services",
      rail: "bg-primary-80",
    },
  ];

  const cardIn = (dir = 1) => ({
    hidden: { opacity: 0, x: 28 * dir, y: 10 },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.7, ease },
    },
  });

  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateNavState = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < max - 4);
  };

  useEffect(() => {
    updateNavState();
    const el = trackRef.current;
    if (!el) return;

    const onScroll = () => updateNavState();
    el.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => updateNavState();
    window.addEventListener("resize", onResize);

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const scrollByCard = (dir = 1) => {
    const el = trackRef.current;
    if (!el) return;

    // use first child width + gap (more accurate)
    const firstCard = el.querySelector("[data-card='1']");
    const cardW = firstCard ? firstCard.getBoundingClientRect().width : 320;

    // detect gap from computed style if possible
    const row = el.querySelector("[data-row='1']");
    let gap = 20;
    if (row) {
      const cs = window.getComputedStyle(row);
      const g = parseFloat(cs.columnGap || cs.gap || "20");
      if (!Number.isNaN(g)) gap = g;
    }

    el.scrollBy({ left: (cardW + gap) * dir, behavior: "smooth" });
  };

  // ✅ Mouse drag scroll (desktop + mobile)
  const drag = useRef({
    down: false,
    x: 0,
    left: 0,
  });

  const onPointerDown = (e) => {
    const el = trackRef.current;
    if (!el) return;
    drag.current.down = true;
    drag.current.x = e.clientX;
    drag.current.left = el.scrollLeft;
    el.setPointerCapture?.(e.pointerId);
    el.classList.add("cursor-grabbing");
  };

  const onPointerMove = (e) => {
    const el = trackRef.current;
    if (!el || !drag.current.down) return;
    const dx = e.clientX - drag.current.x;
    el.scrollLeft = drag.current.left - dx;
  };

  const onPointerUp = (e) => {
    const el = trackRef.current;
    drag.current.down = false;
    el?.classList.remove("cursor-grabbing");
    el?.releasePointerCapture?.(e.pointerId);
    updateNavState();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, ease }}
      className="border-t border-primary-30 pt-10 md:px-4 "
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
            "overflow-x-auto overflow-y-visible",
            "scroll-smooth",
            "snap-x snap-mandatory",
            "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            // ✅ room so arrows don’t cover content
            "px-12 md:px-12",
            // ✅ make it obvious you can drag
            "cursor-grab select-none",
          )}
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

                    <div className="mt-4 flex items-center gap-3">
                      <div className="h-10 w-10 border border-primary-30 bg-dark flex items-center justify-center font-black text-secondary">
                        {t.name.charAt(0)}
                      </div>

                      <div className="leading-tight">
                        <p className="text-sm font-black text-dark">{t.name}</p>
                        <p className="text-xs text-dark/60 font-light">
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

        <div className="hidden md:block mt-3 h-px w-full bg-primary-30/60" />
      </div>
    </motion.div>
  );
}
