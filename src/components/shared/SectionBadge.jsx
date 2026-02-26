import { motion } from "framer-motion";

export default function SectionBadge({ label, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`flex items-center gap-3 px-4 py-2 border border-primary-30 w-fit ${className}`}
    >
      <div className="w-2.5 h-2.5 bg-primary" />
      <span className="text-sm font-medium tracking-wide">
        {label}
      </span>
    </motion.div>
  );
}
