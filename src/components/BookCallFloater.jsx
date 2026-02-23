import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

export default function BookCallFloater() {
  const CAL_URL = import.meta.env.VITE_VOLASEC_CAL_URL;

  if (!CAL_URL) return null; // fail silently if missing

  return (
    <motion.a
      href={CAL_URL}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
      className="
        fixed bottom-6 right-6 z-50
        flex items-center gap-3
        bg-secondary text-primary
        px-2 py-2
        rounded-lg
        shadow-xl shadow-primary/30
        hover:bg-primary-80
        transition-colors
      "
    >
      <Calendar className="w-5 h-5" />
      <span className="text-sm font-semibold tracking-wide">
        Book a Call
      </span>
    </motion.a>
  );
}
