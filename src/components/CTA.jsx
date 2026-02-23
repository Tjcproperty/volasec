import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};
export default function CTA({ setMobileMenuOpen }) {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };
  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="relative rounded-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100" />

          {/* Content */}
          <motion.div
            className="relative px-8 py-16 lg:px-12 lg:py-20 text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="mb-4">
              <div className="flex items-center justify-center gap-2 text-gray-600 text-sm font-semibold mb-4">
                <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                READY TO GET STARTED?
              </div>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6"
            >
              Let's secure your infrastructure
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg text-slate-700 mb-8 max-w-2xl mx-auto"
            >
              Book a free 30-minute strategy session to discuss your security
              challenges and get a personalized roadmap.
            </motion.p>

            <motion.button
              variants={itemVariants}
              onClick={() => scrollToSection("contact")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition shadow-lg"
            >
              Contact Us Today <ArrowRight className="w-5 h-5" />
            </motion.button>

            <motion.p
              variants={itemVariants}
              className="text-sm text-slate-600 mt-6"
            >
              Response within 1 business day. No long forms, no pressure.
            </motion.p>
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            className="absolute top-0 right-0 w-64 h-64 bg-gray-200 rounded-full opacity-10 -mr-32 -mt-32"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-48 h-48 bg-gray-300 rounded-full opacity-10 -ml-24 -mb-24"
            animate={{ y: [0, -15, 0] }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              delay: 0.5,
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
