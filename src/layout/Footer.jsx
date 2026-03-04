import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Linkedin, Twitter } from "lucide-react";
import services from "@/data/services";
import industries from "@/data/industries";

function cx(...c) {
  return c.filter(Boolean).join(" ");
}

const footerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const colsVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const colVariants = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (res.ok) {
        setSubStatus("success");
        setEmail("");
      } else {
        setSubStatus("error");
      }
    } catch {
      setSubStatus("error");
    }
  };

  const topServices = services.filter((s) => !s.isTelescope).slice(0, 6);

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="relative overflow-hidden bg-dark border-t border-primary-30 py-16 sm:py-20"
    >
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 bg-primary-30 blur-[140px] opacity-20" />
      <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 bg-secondary-30 blur-[140px] opacity-10" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <motion.div
          variants={colsVariants}
          className="grid gap-10 mb-12 md:grid-cols-2 lg:grid-cols-5"
        >
          {/* Column 1: Logo + tagline + social */}
          <motion.div variants={colVariants} className="lg:col-span-1">
            <img src="/Iconwhite.png" className="h-14 mb-4" alt="Volasec" />
            <p className="text-sm text-secondary-80/50 font-light leading-relaxed mb-6">
              Enterprise-grade security architecture for high-stakes cloud
              environments.
            </p>
            <div className="flex gap-3">
              <a
                href="https://linkedin.com/company/volasec"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 border border-primary-30 flex items-center justify-center text-secondary-80/50 hover:text-secondary hover:border-secondary-80/50 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/volasec"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 border border-primary-30 flex items-center justify-center text-secondary-80/50 hover:text-secondary hover:border-secondary-80/50 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Column 2: Services */}
          <motion.div variants={colVariants}>
            <h4 className="mb-4 text-[11px] font-black tracking-wider text-secondary uppercase">
              Services
            </h4>
            <ul className="space-y-2">
              {topServices.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/services/${s.slug}`}
                    className="text-sm font-light text-secondary-80/50 hover:text-secondary transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/services/telescope"
                  className="text-sm font-light text-secondary-80/50 hover:text-secondary transition-colors"
                >
                  Telescope
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Column 3: Industries */}
          <motion.div variants={colVariants}>
            <h4 className="mb-4 text-[11px] font-black tracking-wider text-secondary uppercase">
              Industries
            </h4>
            <ul className="space-y-2">
              {industries.map((ind) => (
                <li key={ind.slug}>
                  <Link
                    to={`/industries/${ind.slug}`}
                    className="text-sm font-light text-secondary-80/50 hover:text-secondary transition-colors"
                  >
                    {ind.title}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Company */}
          <motion.div variants={colVariants}>
            <h4 className="mb-4 text-[11px] font-black tracking-wider text-secondary uppercase">
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/#about"
                  className="text-sm font-light text-secondary-80/50 hover:text-secondary transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-sm font-light text-secondary-80/50 hover:text-secondary transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/industries"
                  className="text-sm font-light text-secondary-80/50 hover:text-secondary transition-colors"
                >
                  Industries
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm font-light text-secondary-80/50 hover:text-secondary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Column 5: Contact + Newsletter */}
          <motion.div variants={colVariants} className="space-y-10">
            {/* CONTACT */}
            <div>
              <h4 className="mb-5 text-[11px] font-black tracking-wider text-secondary uppercase">
                Contact
              </h4>

              <ul className="space-y-4">
                <li>
                  <a
                    href="mailto:services@volasec.com"
                    className="text-sm font-light text-secondary-80/60 hover:text-secondary transition-colors"
                  >
                    services@volasec.com
                  </a>
                </li>

                <li>
                  <a
                    href="https://maps.app.goo.gl/Be3CgpgdN36JsCh77"
                    target="_blank"
                    rel="noreferrer"
                    className="group block text-sm font-light text-secondary-80/60 transition-colors"
                  >
                    <li className="block font-extrabold text-white group-hover:text-secondary transition-colors">
                      Toronto | HQ
                    </li>

                    <li className="block group-hover:text-secondary transition-colors">
                      2000–2 Sheppard Ave E
                    </li>

                    <span className="block group-hover:text-secondary transition-colors">
                      Toronto, Ontario, Canada
                    </span>

                    <span className="block group-hover:text-secondary transition-colors">
                      ON M2N 5Y7
                    </span>

                    {/* subtle underline accent */}
                    <span className="mt-2 block h-[1px] w-0 bg-primary transition-all duration-500 group-hover:w-12" />
                  </a>
                </li>
              </ul>
            </div>

            {/* MAP */}
            <div className="overflow-hidden rounded-lg border border-primary-30/50 hover:border-primary-50 transition-all duration-500">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2881.4953396422716!2d-79.41309162204254!3d43.76257554534705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b2d6464e60c75%3A0x7be9a45035bea488!2s2%20Sheppard%20Ave%20E%2C%20Old%20Toronto%2C%20ON%20M2N%205Y7!5e0!3m2!1sen!2sca!4v1772111136742!5m2!1sen!2sca"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Volasec Toronto HQ Location"
                className="grayscale hover:grayscale-0 hover:scale-[1.02] transition-all duration-700"
              />
            </div>

            {/* NEWSLETTER */}
            <div>
              <h4 className="mb-4 text-[11px] font-black tracking-wider text-secondary uppercase">
                Newsletter
              </h4>

              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setSubStatus("");
                  }}
                  placeholder="your@email.com"
                  className="flex-1 bg-dark-80 border border-primary-30 px-4 py-2 text-xs text-secondary placeholder:text-secondary-80/50 focus:outline-none focus:border-primary transition-colors"
                />

                <button
                  type="submit"
                  className="bg-primary rounded-md text-secondary px-5 py-2 text-xs font-bold tracking-wider hover:bg-primary-80 transition-colors"
                >
                  JOIN
                </button>
              </form>

              {subStatus === "success" && (
                <p className="text-xs text-green-400 mt-3">
                  Check your inbox to confirm.
                </p>
              )}

              {subStatus === "error" && (
                <p className="text-xs text-red-400 mt-3">
                  Something went wrong. Try again.
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>

        <div className="border-t border-primary-30 pt-6 text-center text-xs font-light text-secondary-30">
          <p>&copy; {new Date().getFullYear()} Volasec. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
}