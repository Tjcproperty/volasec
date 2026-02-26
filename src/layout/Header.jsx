import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");
export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;

  const headerOffset = 64;
  const elementPosition = el.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({ top: offsetPosition, behavior: "smooth" });
}

export default function Header() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const navItems = useMemo(
    () => [
      { id: "hero", label: "Home" },
      { id: "about", label: "About" },
      { id: "services", label: "Services" },
      { id: "proof", label: "Proof" },
      { id: "process", label: "Process" },
      { id: "contact", label: "Contact" },
    ],
    [],
  );

  const [activeSection, setActiveSection] = useState("hero");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const headerOffset = 88;
    const observer = new IntersectionObserver(
      (entries) => {
        const inView = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => {
            const aTop = a.target.getBoundingClientRect().top;
            const bTop = b.target.getBoundingClientRect().top;
            return aTop - bTop;
          })[0];

        if (inView?.target?.id) setActiveSection(inView.target.id);
      },
      {
        root: null,
        rootMargin: `-${headerOffset}px 0px -55% 0px`,
        threshold: [0, 0.1, 0.2],
      },
    );

    const sections = Array.from(document.querySelectorAll("section[id]"));
    sections.forEach((s) => observer.observe(s));

    return () => {
      sections.forEach((s) => observer.unobserve(s));
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (open) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [open]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && open) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open]);

  const scrollToId = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    setOpen(false);
    setTimeout(() => {
      const headerOffset = 64;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      {/* Scroll progress bar — inverted: was from-secondary via-dark to-dark */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-secondary z-[60] origin-left"
        style={{ scaleX }}
      />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cx(
          "fixed top-0 w-full z-50 transition-all duration-300",
          scrolled
            ? "bg-dark border-b border-secondary/10 shadow-lg"
            : "bg-secondary/30 border-b border-primary/30",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">

            {/* Logo — swapped: scrolled shows monologo, unscrolled shows monoblue */}
            {scrolled ? (
              <motion.a
                href="/"
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src="/monologo.png" className="h-8 w-auto" alt="Logo" />
              </motion.a>
            ) : (
              <motion.a
                href="/"
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src="/monoblue.png" className="h-8 w-auto" alt="Logo" />
              </motion.a>
            )}

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-10">
              {navItems.slice(1).map((item) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={scrollToId(item.id)}
                  whileHover={{ y: -2 }}
                  className={cx(
                    "relative text-xs font-bold tracking-wider transition-colors",
                    activeSection === item.id
                      ? "text-secondary"
                      : scrolled
                        ? "text-secondary/80 hover:text-secondary"
                        : "text-primary/80 hover:text-primary",
                  )}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-secondary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.a>
              ))}
            </div>

            {/* Desktop CTA */}
            {scrolled ? (
              <motion.a
                href="#contact"
                onClick={scrollToId("contact")}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex relative px-5 lg:px-6 py-2.5 text-xs rounded-lg font-black tracking-wider bg-secondary text-secondary-foreground overflow-hidden group"
              >
                <span className="relative z-10">WORK WITH US</span>
                <motion.div
                  className="absolute inset-0 bg-secondary/80"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ) : (
              <motion.a
                href="#contact"
                onClick={scrollToId("contact")}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex relative px-5 lg:px-6 py-2.5 text-xs rounded-lg font-black tracking-wider border-2 bg-primary border-secondary/80 text-secondary/80 overflow-hidden group"
              >
                <span className="relative z-10">WORK WITH US</span>
                <motion.div
                  className="absolute inset-0 bg-primary/80"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setOpen(!open)}
              whileTap={{ scale: 0.9 }}
              className={`md:hidden p-2 hover:text-secondary transition-colors ${scrolled ? "text-secondary" : "text-primary"}`}
              aria-label="Toggle menu"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-secondary/60 backdrop-blur-sm z-40 md:hidden"
              style={{ top: "64px" }}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-16 right-0 bottom-0 w-full sm:w-80 bg-primary shadow-2xl z-50 md:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="space-y-2 mb-8">
                  {navItems.map((item, i) => (
                    <motion.a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={scrollToId(item.id)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={cx(
                        "block px-4 py-3 text-sm font-bold tracking-wider transition-all",
                        activeSection === item.id
                          ? "bg-secondary text-secondary-foreground"
                          : "text-secondary hover:bg-secondary/30 hover:text-secondary",
                      )}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </div>

                {/* Mobile CTA */}
                <motion.a
                  href="#contact"
                  onClick={scrollToId("contact")}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileTap={{ scale: 0.95 }}
                  className="block w-full px-6 py-4 text-center text-sm font-black tracking-wider bg-secondary text-secondary-foreground"
                >
                  WORK WITH US
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}