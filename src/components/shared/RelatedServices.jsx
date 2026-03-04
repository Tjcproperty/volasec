import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getRelatedServices } from "@/data/services";

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function RelatedServices({ currentSlug, dark = false }) {
  const related = getRelatedServices(currentSlug);

  if (!related.length) return null;

  const textPrimary = dark ? "text-secondary" : "text-dark";
  const textSecondary = dark ? "text-secondary-80" : "text-dark-80";
  const border = dark ? "border-primary-30" : "border-primary-30";
  const hoverBg = dark ? "hover:bg-primary-30/20" : "hover:bg-primary-30/10";

  return (
    <motion.div
      variants={gridVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {related.map((service) => {
        const Icon = service.icon;
        const href = service.isTelescope
          ? "/services/telescope"
          : `/services/${service.slug}`;

        return (
          <motion.div
            key={service.slug}
            variants={cardVariants}
            className="h-full"
          >
            <Link
              to={href}
              className={`flex flex-col h-full p-6 border rounded-md ${border} ${hoverBg} transition-all duration-300 group`}
            >
              <div className="flex items-start gap-4 flex-1">
                <div className="w-10 h-10 bg-primary text-secondary flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col flex-1">
                  <h3
                    className={`text-lg font-bold ${textPrimary} mb-2 group-hover:text-primary transition-colors line-clamp-2`}
                  >
                    {service.title}
                  </h3>
                  <p
                    className={`text-sm ${textSecondary} font-light leading-relaxed mb-4 line-clamp-3`}
                  >
                    {service.shortDescription}
                  </p>
                  <span className="inline-flex items-center gap-2 text-xs font-bold text-primary tracking-wider uppercase mt-auto">
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
