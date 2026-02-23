import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Testimonial from "./Testimonial";

const SECTION_CONTENT = {
  // Main heading and description
  heading: {
    title: "PROVEN",
    titleAccent: "RESULTS",
    description: "Real outcomes from real engagements. Hover over any card to reveal detailed metrics and impact.",
  },

  studies: [
    {
      client: "FINTECH SERIES B",
      title: "Zero to SOC 2 in 90 Days",
      outcome: "Achieved SOC 2 Type I in 89 days. Closed $8M enterprise deal. Zero critical findings.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
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
      outcome: "Reduced security incidents by 87%. Cut review time from 2 weeks to 2 days.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
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
      outcome: "Rebuilt architecture with defense-in-depth. Zero incidents in 18 months post-engagement.",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
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
      outcome: "$2.3M annual savings through right-sizing and waste elimination. 60% faster deployments.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
      rail: "bg-primary-30",
      tag: "text-primary",
      stats: [
        { value: "$2.3M", label: "Annual Cloud Savings" },
        { value: "60%", label: "Faster Deployment Speed" },
        { value: "43%", label: "Total Cost Reduction" },
      ],
    },
    {
      client: "DEVOPS PLATFORM",
      title: "CI/CD Pipeline Overhaul",
      outcome: "Reduced deployment time from 4 hours to 12 minutes. 10x increase in deployment frequency.",
      image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=600&fit=crop",
      rail: "bg-primary",
      tag: "text-primary",
      stats: [
        { value: "12min", label: "Average Deploy Time" },
        { value: "10x", label: "More Frequent Deploys" },
        { value: "0", label: "Failed Production Releases" },
      ],
    },
        {
      client: "B2B SAAS",
      title: "Post-Breach Recovery",
      outcome: "Rebuilt architecture with defense-in-depth. Zero incidents in 18 months post-engagement.",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
      rail: "bg-primary-50",
      tag: "text-primary",
      stats: [
        { value: "18", label: "Months Incident-Free" },
        { value: "5", label: "Defense Layers Deployed" },
        { value: "99.99%", label: "Platform Uptime SLA" },
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
function ExplosiveStatsCard({ item, index, dir }) {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.article
      variants={cardIn(dir)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cx(
        "group relative overflow-hidden",
        "border border-primary-30",
        "bg-secondary rounded-2xl",
        "transition-all duration-500",
        "cursor-pointer min-h-[480px]",
      )}
    >
      {/* Dynamic gradient background that follows mouse */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        animate={{
          background: isHovered
            ? `radial-gradient(circle at 50% 50%, rgba(var(--primary-rgb), 0.15), transparent 70%)`
            : `radial-gradient(circle at 0% 0%, rgba(var(--primary-rgb), 0.08), transparent 50%)`,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Shimmer effect on top */}
      <div className="relative h-1 bg-gradient-to-r from-transparent via-primary to-transparent overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
          animate={{
            x: ['-200%', '200%'],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 1,
          }}
          style={{ opacity: 0.4 }}
        />
      </div>

      {/* Image section with advanced effects */}
      <div className="relative h-52 overflow-hidden">
        <motion.div
          className="relative w-full h-full"
          animate={{
            scale: isHovered ? 1.15 : 1,
          }}
          transition={{ duration: 0.8, ease }}
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          
          {/* Multi-layer gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-transparent" />
          
          {/* Scan line effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-transparent"
            animate={{
              y: isHovered ? ['-100%', '200%'] : '0%',
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
            }}
            style={{ height: '30%' }}
          />
        </motion.div>

        {/* Floating badge with pulse */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="absolute top-4 left-4 z-10"
        >
          <motion.div
            animate={{
              boxShadow: isHovered
                ? ['0 0 0 0 rgba(var(--primary-rgb), 0.4)', '0 0 0 8px rgba(var(--primary-rgb), 0)']
                : '0 0 0 0 rgba(var(--primary-rgb), 0)',
            }}
            transition={{
              duration: 1.5,
              repeat: isHovered ? Infinity : 0,
            }}
            className="rounded-full"
          >
            <span className={cx(
              "block px-4 py-1.5 text-[10px] font-black tracking-[0.22em]",
              "bg-secondary/95 backdrop-blur-md rounded-full border-2 border-primary",
              item.tag
            )}>
              {item.client}
            </span>
          </motion.div>
        </motion.div>

        {/* Corner accent */}
        <motion.div
          className="absolute top-0 right-0 w-20 h-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.2 : 0 }}
        >
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-primary to-transparent" />
        </motion.div>
      </div>

      {/* Content section */}
      <div className="relative p-6 sm:p-8" style={{ transformStyle: "preserve-3d" }}>
        <h3 className="mb-4 text-2xl sm:text-3xl font-black leading-tight text-dark">
          {item.title}
        </h3>

        {/* Outcome/Stats toggle with advanced animations */}
        <div className="relative min-h-[140px]">
          {/* Outcome text */}
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: isHovered ? 0 : 1,
              y: isHovered ? -10 : 0,
              filter: isHovered ? "blur(4px)" : "blur(0px)",
            }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-sm sm:text-base text-dark/70 font-light leading-relaxed">
              {item.outcome}
            </p>
          </motion.div>

          {/* Stats reveal */}
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 10,
              filter: isHovered ? "blur(0px)" : "blur(4px)",
            }}
            transition={{ duration: 0.4 }}
          >
            <div className="space-y-4">
              {item.stats?.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{
                    x: isHovered ? 0 : -20,
                    opacity: isHovered ? 1 : 0,
                  }}
                  transition={{
                    delay: isHovered ? 0.1 + i * 0.08 : 0,
                    duration: 0.5,
                    ease,
                  }}
                  className="relative"
                >
                  <div className="flex items-baseline gap-3">
                    {/* Counter animation */}
                    <motion.span
                      className="text-3xl  font-black text-primary"
                      style={{ transformStyle: "preserve-3d" }}
                      whileHover={{ scale: 1.05, z: 20 }}
                    >
                      {stat.value}
                    </motion.span>
                    <span className="text-sm text-dark/70 font-light flex-1">
                      {stat.label}
                    </span>
                  </div>
                  
                  {/* Progress bar effect */}
                  <motion.div
                    className="mt-2 h-1 bg-primary-30 rounded-full overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: isHovered ? '100%' : '0%' }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.6 }}
                  >
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ x: '-100%' }}
                      animate={{ x: isHovered ? '0%' : '-100%' }}
                      transition={{
                        delay: 0.2 + i * 0.08,
                        duration: 0.8,
                        ease,
                      }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Hover indicator with magnetic effect */}
        <motion.div
          className="mt-6 flex items-center gap-2 text-xs text-primary"
          animate={{
            x: isHovered ? 8 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <span className="tracking-wider">
            {isHovered ? '' : 'HOVER FOR STATS'}
          </span>
          <motion.svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            animate={{
              x: isHovered ? [0, 4, 0] : 0,
              opacity: isHovered ? [1, 0.5, 1] : 1,
            }}
            transition={{
              duration: 1.2,
              repeat: isHovered ? Infinity : 0,
              ease: "easeInOut",
            }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </motion.svg>
        </motion.div>
      </div>

      {/* Side rail with animated pulse */}
      <div className={cx("absolute left-0 top-0 h-full w-1.5 overflow-hidden", item.rail)}>
        <motion.div
          className="w-full h-1/3 bg-white"
          animate={{
            y: isHovered ? ['0%', '200%', '0%'] : '0%',
            opacity: isHovered ? [0.3, 0.7, 0.3] : 0,
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          boxShadow: isHovered
            ? '0 0 40px rgba(var(--primary-rgb), 0.3), inset 0 0 20px rgba(var(--primary-rgb), 0.1)'
            : '0 18px 60px rgba(14,26,43,0.25)',
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
      className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-dark-30/10 via-primary-80/50 to-dark overflow-hidden"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
            backgroundSize: '40px 40px',
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
                x: ['-100%', '200%'],
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

          <h2 className="mb-4 text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-secondary">
            {SECTION_CONTENT.heading.title} <span className="text-primary">{SECTION_CONTENT.heading.titleAccent}</span>
          </h2>
          <p className="text-sm sm:text-base text-dark/70 font-light max-w-2xl">
            {SECTION_CONTENT.heading.description}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16 sm:mb-24">
          {studies.map((item, i) => {
            const dir = i % 2 === 0 ? -1 : 1;
            return <ExplosiveStatsCard key={i} item={item} index={i} dir={dir} />;
          })}
        </div>

      
      </div>

      <Testimonial />
    </section>
  );
}