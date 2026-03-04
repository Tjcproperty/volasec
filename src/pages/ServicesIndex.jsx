import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import SectionBadge from "@/components/shared/SectionBadge";
import {
  securityServices,
  finopsServices,
  productServices,
} from "@/data/services";

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function ServiceCard({ service }) {
  const Icon = service.icon;
  const href = service.isTelescope
    ? "/services/telescope"
    : `/services/${service.slug}`;

  return (
    <motion.div variants={cardVariants}>
      <Link
        to={href}
        className="group block p-6 border border-primary-30 rounded-md hover:bg-primary-30/10 transition-all duration-300 h-full"
      >
        <div className="w-10 h-10 bg-gradient-to-b from-primary to-primary-80 shadow-lg shadow-primary/20 text-secondary flex items-center justify-center mb-4">
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-medium text-dark mb-2 group-hover:text-primary transition-colors">
          {service.title}
        </h3>
        <p className="text-sm text-dark-80 font-light leading-relaxed mb-4">
          {service.shortDescription}
        </p>
        <span className="inline-flex items-center gap-2 text-xs font-medium text-primary tracking-wider uppercase">
          Learn More
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </Link>
    </motion.div>
  );
}

function CategorySection({ label, services: items }) {
  return (
    <div className="mb-16 last:mb-0">
      <h3 className="text-[11px] font-medium tracking-widest text-dark-50 uppercase mb-6">
        {label}
      </h3>
      <motion.div
        variants={gridVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {items.map((s) => (
          <ServiceCard key={s.slug} service={s} />
        ))}
      </motion.div>
    </div>
  );
}

export default function ServicesIndex() {
  return (
    <>
      <Helmet>
        <title>Services — Volasec</title>
        <meta
          name="description"
          content="Cloud security, compliance, penetration testing, FinOps, and more. Explore our full range of services."
        />
      </Helmet>

      <PageHero
        badge="Our Services"
        title="Security & Cloud Financial Services"
        subtitle="End-to-end capabilities across cloud security, compliance, and cost optimisation."
        bgImage="/blueee.png"
        breadcrumbs={[{ label: "Services" }]}
      />

      <section className="bg-secondary py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <CategorySection
            label="Security Services"
            services={securityServices}
          />
          <CategorySection
            label="Cloud Financial Services"
            services={finopsServices}
          />
          <CategorySection
            label="Proprietary Product"
            services={productServices}
          />
        </div>
      </section>
    </>
  );
}
