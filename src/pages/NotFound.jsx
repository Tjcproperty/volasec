import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="min-h-screen bg-dark flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl text-center"
      >
        <p className="text-xs tracking-widest text-secondary/40 mb-3">
          404 ERROR
        </p>

        <h1 className="text-5xl md:text-7xl font-black mb-6 text-secondary">
          Page not found
        </h1>

        <p className="text-secondary/60 font-light mb-10">
          The page you’re looking for doesn’t exist or was moved.
        </p>

        <Link
          to="/"
          className="inline-block px-8 py-4 text-sm font-black tracking-wider bg-primary text-secondary hover:bg-[#1a2f4a] transition-all"
        >
          GO HOME
        </Link>
      </motion.div>
    </section>
  );
}
