import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import industries from "@/data/industries";

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

export default function IndustriesIndex() {
  return (
    <>
      <Helmet>
        <title>Industries — Volasec</title>
        <meta
          name="description"
          content="Sector-specific cloud security and compliance expertise across financial services, healthcare, technology, manufacturing, and more."
        />
      </Helmet>

      <PageHero
        badge="Industries"
        title="Sector-Specific Security Expertise"
        subtitle="Deep domain knowledge across regulated industries with unique compliance and threat landscapes."
        bgImage="/darkk.png"
        breadcrumbs={[{ label: "Industries" }]}
      />

      <section className="bg-secondary py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <motion.div
            variants={gridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {industries.map((industry) => {
              const Icon = industry.icon;
              return (
                <motion.div key={industry.slug} variants={cardVariants}>
                  <Link
                    to={`/industries/${industry.slug}`}
                    className="group block p-6 border rounded-md border-primary-30 hover:bg-primary-30/10 transition-all duration-300 h-full"
                  >
                    <div className="w-10 h-10 bg-gradient-to-b from-primary to-primary-80 shadow-lg shadow-primary/20 text-secondary flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-medium text-dark mb-2 group-hover:text-primary transition-colors">
                      {industry.title}
                    </h3>
                    <p className="text-sm text-dark-80 font-light leading-relaxed mb-4">
                      {industry.shortDescription}
                    </p>
                    <span className="inline-flex items-center gap-2 text-xs font-medium text-primary tracking-wider uppercase">
                      Learn More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
}
