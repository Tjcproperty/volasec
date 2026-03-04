import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionBadge from "./shared/SectionBadge";
import BlurRevealHeading from "./shared/BlurRevealHeading";
import {
  securityServices,
  finopsServices,
  productServices,
} from "@/data/services";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionBadge from "./shared/SectionBadge";
import BlurRevealHeading from "./shared/BlurRevealHeading";
import {
  securityServices,
  finopsServices,
  productServices,
} from "@/data/services";

function cx(...c) {
  return c.filter(Boolean).join(" ");
}

const gridVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
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

export default function Services() {
  const categories = [
    {
      label: "Security Services",
      services: securityServices,
      variant: "dark",
    },
    {
      label: "Cloud Financial Services",
      services: finopsServices,
      variant: "light",
    },
    {
      label: "Proprietary Product",
      services: productServices,
      variant: "dark",
    },
  ];

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-secondary py-24 md:py-32 border-b border-primary-30"
    >
      <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 bg-primary-30 blur-[80px] opacity-25" />
      <div className="pointer-events-none absolute -bottom-24 left-0 h-96 w-96 bg-dark-30 blur-[80px] opacity-20" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <SectionBadge label="What We Do" className="mb-6 text-dark-80" />

          <BlurRevealHeading
            text="End-to-End Security & Cloud Financial Services"
            as="h2"
            className="mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-dark"
          />

          <p className="max-w-2xl text-sm font-normal leading-relaxed text-dark-80 sm:text-base md:text-lg">
            Comprehensive security architecture and FinOps for cloud-native
            organisations in regulated environments.
          </p>
        </motion.div>

        {categories.map((cat) => (
          <div key={cat.label} className="mb-12 last:mb-0">
            <h3 className="text-[11px] font-medium tracking-widest text-dark-50 uppercase mb-6">
              {cat.label}
            </h3>

            <motion.div
              variants={gridVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {cat.services.map((service) => (
                <ServiceCard
                  key={service.slug}
                  service={service}
                  variant={cat.variant}
                />
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
