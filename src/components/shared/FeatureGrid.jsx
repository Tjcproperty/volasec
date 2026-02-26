import { motion } from "framer-motion";

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function FeatureGrid({ features, dark = false }) {
  const textPrimary = dark ? "text-secondary" : "text-dark";
  const textSecondary = dark ? "text-secondary-80" : "text-dark-80";

  return (
    <motion.div
      variants={gridVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 mb-16"
    >
      {features.map((feature, i) => {
        const Icon = feature.icon;
        return (
          <motion.div
            key={i}
            variants={itemVariants}
            className="group"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-b from-primary to-primary-80 shadow-lg shadow-primary/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
              {Icon ? (
                <Icon className="w-5 h-5 text-secondary" />
              ) : (
                <span className="text-sm font-medium text-secondary">
                  {String(i + 1).padStart(2, "0")}
                </span>
              )}
            </div>

            <h3 className={`text-xl font-medium ${textPrimary} mb-2`}>
              {feature.title}
            </h3>

            <p className={`text-base leading-relaxed ${textSecondary} font-light`}>
              {feature.description}
            </p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
