import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionBadge from "./shared/SectionBadge";
import BlurRevealHeading from "./shared/BlurRevealHeading";
import industries from "@/data/industries";

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Industries() {
  return (
    <section className="relative overflow-hidden bg-dark py-24 md:py-32 border-b  border-primary-30">
      <div className="pointer-events-none absolute -top-24 left-0 h-96 w-96 bg-primary-30 blur-[120px] opacity-20" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <SectionBadge
            label="Industries We Serve"
            className="mb-6 text-secondary-50 border-secondary-30"
          />

          <BlurRevealHeading
            text="Sector-Specific Security Expertise"
            as="h2"
            className="mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-secondary"
          />

          <p className="max-w-2xl text-sm font-light leading-relaxed text-secondary-80 sm:text-base">
            Deep domain knowledge across regulated industries with unique
            compliance and threat landscapes.
          </p>
        </motion.div>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <motion.div key={industry.slug} variants={cardVariants}>
                <Link
                  to={`/industries/${industry.slug}`}
                  className="group block p-6 border  border-primary-30 hover:bg-primary-30/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-gradient-to-b from-primary to-primary-80 shadow-lg shadow-primary/20 text-secondary flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-medium text-secondary mb-2 leading-tight">
                    {industry.title}
                  </h3>

                  <p className="text-sm font-light text-secondary-80 leading-relaxed mb-4">
                    {industry.shortDescription}
                  </p>

                  <span className="inline-flex items-center gap-2 text-xs font-medium text-secondary-50 tracking-wider uppercase group-hover:text-secondary transition-colors">
                    Explore
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
