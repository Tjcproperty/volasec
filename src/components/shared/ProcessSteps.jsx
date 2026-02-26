import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

function cx(...c) {
  return c.filter(Boolean).join(" ");
}

export default function ProcessSteps({ steps, dark = true }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [steps.length]);

  const textTitle = dark ? "text-secondary" : "text-dark";
  const textBody = dark ? "text-secondary-80" : "text-dark-80";
  const textMuted = dark ? "text-secondary-50" : "text-dark-50";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[400px]">
      {/* Left: Step visual */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-white/[0.03] border border-white/10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0 flex items-center justify-center p-8"
          >
            {steps[activeIndex].image ? (
              <img
                src={steps[activeIndex].image}
                alt={steps[activeIndex].title}
                className="w-full h-full object-cover absolute inset-0"
              />
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-b from-primary to-primary-80 mx-auto mb-6 flex items-center justify-center">
                  {steps[activeIndex].icon ? (
                    (() => { const Icon = steps[activeIndex].icon; return <Icon className="w-7 h-7 text-secondary" />; })()
                  ) : (
                    <span className="text-2xl font-medium text-secondary">
                      {String(activeIndex + 1).padStart(2, "0")}
                    </span>
                  )}
                </div>
                <h3 className={`text-2xl font-medium ${textTitle} mb-3`}>
                  {steps[activeIndex].title}
                </h3>
                <p className={`text-sm ${textBody} font-light max-w-sm mx-auto leading-relaxed`}>
                  {steps[activeIndex].description}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Progress bars */}
        <div className="absolute bottom-4 left-4 right-4 h-1 flex gap-2">
          {steps.map((_, idx) => (
            <div key={idx} className="h-full flex-1 bg-primary-30 overflow-hidden">
              {activeIndex === idx && (
                <motion.div
                  className="h-full bg-primary/80"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 8, ease: "linear" }}
                />
              )}
              {idx < activeIndex && (
                <div className="h-full w-full bg-primary/80" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right: Step list */}
      <div className="flex flex-col gap-4">
        {steps.map((step, index) => (
          <motion.button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={cx(
              "group relative w-full text-left p-6 transition-all duration-300 outline-none",
              activeIndex === index
                ? "bg-white/[0.03] border border-white/10"
                : "bg-transparent border border-transparent hover:bg-white/[0.02]",
            )}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start gap-4">
              <div
                className={cx(
                  "mt-1 w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300 shrink-0",
                  activeIndex === index
                    ? "bg-primary text-secondary"
                    : "bg-white/5 " + textMuted,
                )}
              >
                {step.icon ? (
                  <step.icon className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-medium">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                )}
              </div>

              <div className="flex-1 space-y-1">
                <h3
                  className={cx(
                    "text-xl font-medium transition-colors duration-300",
                    activeIndex === index ? textTitle : textMuted,
                  )}
                >
                  {step.title}
                </h3>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className={`${textBody} text-sm leading-relaxed overflow-hidden`}
                    >
                      {step.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div
                className={cx(
                  "mt-1.5 transition-all duration-300",
                  activeIndex === index
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-2",
                )}
              >
                <ChevronRight className={`w-5 h-5 ${textMuted}`} />
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
