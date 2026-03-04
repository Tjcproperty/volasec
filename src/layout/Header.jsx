import { useEffect, useState, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { servicesMenu, industriesMenu } from "@/data/navigation";
import { scrollToSection } from "@/lib/utils";

function cx(...c) {
  return c.filter(Boolean).join(" ");
}

/* ── Tab config — only Services & Industries ── */
const TABS = [
  { key: "services", label: "Services", getMenu: () => servicesMenu },
  { key: "industries", label: "Industries", getMenu: () => industriesMenu },
];

/* ── Category grouping for Services tab ── */
const SERVICE_CATEGORIES = [
  { label: "Security Services", range: [0, 5] },
  { label: "Cloud Financial Services", range: [6, 8] },
  { label: "Proprietary Product", range: [9, 9] },
];

function getCategoryForIndex(index) {
  return SERVICE_CATEGORIES.find(
    (cat) => index >= cat.range[0] && index <= cat.range[1],
  );
}

/* ──────────────────────────────────────────────
   Desktop Mega Dropdown
────────────────────────────────────────────── */
function SolutionsDropdown({ onClose }) {
  const [activeTab, setActiveTab] = useState("services");

  const rawItems =
    TABS.find((t) => t.key === activeTab)?.getMenu()?.items ?? [];

  const isServices = activeTab === "services";

  const getColumns = () => {
    if (!isServices) {
      const colCount = Math.min(6, Math.ceil(rawItems.length / 6));
      const perCol = Math.ceil(rawItems.length / colCount);

      return Array.from({ length: colCount }, (_, i) =>
        rawItems.slice(i * perCol, i * perCol + perCol).map((item, j) => ({
          ...item,
          _globalIndex: i * perCol + j,
        })),
      ).filter((c) => c.length);
    }

    const indexed = rawItems.map((item, i) => ({
      ...item,
      _globalIndex: i,
    }));

    return [
      indexed.slice(0, 6),
      indexed.slice(6, 12),
      indexed.slice(12),
    ].filter((c) => c.length);
  };

  const columns = getColumns();

  return (
    <div
      className="fixed inset-x-0 z-50 flex justify-center"
      style={{ top: "calc(var(--nav-h, 80px))" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden rounded-sm bg-secondary text-dark shadow-xl"
        style={{
          width: activeTab === "industries" ? "520px" : "820px",
          border: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
        }}
      >
        {/* ── Tab Bar + Close ── */}
        <div className="flex items-stretch border-b border-dark/10">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;

            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cx(
                  "relative flex-1 py-4 text-[11px] font-black tracking-[0.18em] uppercase transition-all duration-200",
                  isActive
                    ? "bg-dark text-secondary"
                    : "bg-secondary text-dark/70 hover:bg-secondary-50 hover:text-dark",
                )}
              >
                {tab.label}
              </button>
            );
          })}

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="flex items-center justify-center w-12 shrink-0 border-l border-dark/10 bg-secondary text-dark/60 hover:bg-secondary-50 hover:text-dark transition-all duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── Items Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.14 }}
            className={cx(
              "grid divide-x divide-dark/10",
              columns.length === 1 && "grid-cols-1",
              columns.length === 2 && "grid-cols-2",
              columns.length === 3 && "grid-cols-3",
            )}
          >
            {columns.map((col, ci) => (
              <div key={ci} className="p-5">
                {isServices &&
                  (() => {
                    const firstIdx = col[0]?._globalIndex ?? 0;
                    const cat = getCategoryForIndex(firstIdx);
                    return cat ? (
                      <p className="text-[9px] font-black tracking-[0.2em] uppercase text-dark/40 mb-2 px-3 select-none">
                        {cat.label}
                      </p>
                    ) : null;
                  })()}

                <ul className="space-y-0.5">
                  {col.map((item, itemIdx) => {
                    const Icon = item.icon;

                    let categoryDivider = null;

                    if (isServices && itemIdx > 0) {
                      const prevCat = getCategoryForIndex(
                        col[itemIdx - 1]._globalIndex,
                      );
                      const currCat = getCategoryForIndex(item._globalIndex);

                      if (prevCat?.label !== currCat?.label && currCat) {
                        categoryDivider = (
                          <p className="text-[9px] font-black tracking-[0.2em] uppercase text-dark/40 mt-3 mb-2 px-3 select-none border-t border-dark/10 pt-3">
                            {currCat.label}
                          </p>
                        );
                      }
                    }

                    return (
                      <li key={item.href}>
                        {categoryDivider}
                        <Link
                          to={item.href}
                          onClick={onClose}
                          className="group flex items-center gap-3 px-3 py-2.5 hover:bg-dark/5 transition-colors"
                        >
                          <div className="w-7 h-7 bg-dark/10 text-dark flex items-center justify-center shrink-0 group-hover:bg-dark group-hover:text-secondary transition-all duration-200">
                            <Icon className="w-3.5 h-3.5" />
                          </div>

                          <span className="text-[13px] font-semibold text-dark/80 group-hover:text-dark transition-colors leading-tight">
                            {item.label}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Footer ── */}
        <div className="px-5 py-3 border-t border-dark/10 bg-secondary-50/40 flex items-center justify-between">
          <span className="text-[10px] text-dark/60 font-medium tracking-wider uppercase">
            {rawItems.length}{" "}
            {activeTab === "services" ? "Services" : "Industries"} available
          </span>

          <Link
            to={activeTab === "services" ? "/services" : "/industries"}
            onClick={onClose}
            className="text-[10px] font-black tracking-wider text-dark hover:opacity-70 transition-opacity uppercase"
          >
            View All →
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Mobile accordion
────────────────────────────────────────────── */
function MobileAccordion({ label, children }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="border-b border-dark-30">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold tracking-wider text-secondary"
      >
        {label}
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-secondary-50" />
        </motion.div>
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-3 space-y-1">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Mobile Solutions with tabs ── */
function MobileSolutions({ onClose }) {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("services");

  const items = TABS.find((t) => t.key === activeTab)?.getMenu()?.items ?? [];
  const isServices = activeTab === "services";

  return (
    <div className="border-b border-dark-30">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold tracking-wider text-secondary"
      >
        Solutions
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-secondary-50" />
        </motion.div>
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            {/* Tabs */}
            <div className="flex mx-4 mt-1 mb-3 overflow-hidden border border-dark-30">
              {TABS.map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={cx(
                      "flex-1 py-2.5 text-[11px] font-black tracking-widest uppercase transition-all duration-200",
                      isActive
                        ? "bg-secondary text-dark"
                        : "text-secondary-50 hover:text-secondary hover:bg-dark-30/30",
                    )}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="px-4 pb-4 space-y-0.5">
              {items.map((item, index) => {
                let categoryLabel = null;
                if (isServices) {
                  const currCat = getCategoryForIndex(index);
                  const prevCat =
                    index > 0 ? getCategoryForIndex(index - 1) : null;
                  if (
                    currCat &&
                    (!prevCat || prevCat.label !== currCat.label)
                  ) {
                    categoryLabel = (
                      <p className="text-[9px] font-black tracking-[0.2em] uppercase text-secondary-30 px-3 pt-3 pb-1 select-none">
                        {currCat.label}
                      </p>
                    );
                  }
                }

                return (
                  <div key={item.href}>
                    {categoryLabel}
                    <Link
                      to={item.href}
                      onClick={onClose}
                      className="block px-3 py-2 text-sm text-secondary-80 hover:text-secondary hover:bg-dark-30/20 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Main Header
────────────────────────────────────────────── */
export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const closeMenu = useCallback(() => setSolutionsOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      const sw = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${sw}px`;
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
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    closeMenu();
    setOpen(false);
  }, [location.pathname, closeMenu]);

  // Click outside → close
  useEffect(() => {
    const onDown = (e) => {
      if (!e.target.closest("[data-solutions-nav]")) closeMenu();
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [closeMenu]);

  const handleAboutClick = (e) => {
    e.preventDefault();
    if (isHome) scrollToSection("about");
    else navigate("/#about");
    setOpen(false);
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    if (isHome) scrollToSection("contact");
    else navigate("/contact");
    setOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ "--nav-h": scrolled ? "64px" : "80px" }}
        className={cx(
          "fixed top-0 w-full z-50 transition-all duration-300",
          scrolled
            ? "bg-secondary/95 border-b border-dark/10 shadow-lg backdrop-blur-sm"
            : "bg-dark border-b border-secondary-30/30 backdrop-blur-sm",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0">
              <motion.img
                src={scrolled ? "/monoblue.png" : "/monologo.png"}
                className="h-8 w-auto"
                alt="Volasec"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-8">
              {/* Solutions — trigger only, dropdown is portal-like fixed */}
              <div data-solutions-nav>
                <button
                  onClick={() => setSolutionsOpen((p) => !p)}
                  className={cx(
                    "flex items-center gap-1 text-xs font-bold tracking-wider transition-colors",
                    scrolled
                      ? "text-dark hover:text-dark"
                      : "text-secondary-80 hover:text-secondary",
                    solutionsOpen &&
                      (scrolled ? "text-dark" : "text-secondary"),
                  )}
                >
                  Solutions
                  <motion.span
                    animate={{ rotate: solutionsOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="inline-flex"
                  >
                    <ChevronDown className="w-3 h-3" />
                  </motion.span>
                </button>
              </div>

              {/* About */}
              <a
                href={isHome ? "#about" : "/#about"}
                onClick={handleAboutClick}
                className={cx(
                  "text-xs font-bold tracking-wider transition-colors",
                  scrolled
                    ? "text-dark hover:text-dark"
                    : "text-secondary-80 hover:text-secondary",
                )}
              >
                About
              </a>

              {/* Contact */}
              <a
                href="/contact"
                onClick={handleContactClick}
                className={cx(
                  "text-xs font-bold tracking-wider transition-colors",
                  scrolled
                    ? "text-dark hover:text-dark"
                    : "text-secondary-80 hover:text-secondary",
                )}
              >
                Contact
              </a>
            </div>

            {/* Desktop CTA */}
            <Link
              to="/contact"
              className={cx(
                "hidden lg:flex items-center px-6 py-2.5 text-xs font-black tracking-wider transition-all",
                scrolled
                  ? "bg-dark text-dark-foreground rounded-md hover:bg-dark-80"
                  : "bg-secondary text-dark rounded-md hover:bg-secondary-80",
              )}
            >
              WORK WITH US
            </Link>

            {/* Mobile toggle */}
            <motion.button
              onClick={() => setOpen(!open)}
              whileTap={{ scale: 0.9 }}
              className={cx(
                "lg:hidden p-2 transition-colors",
                scrolled ? "text-dark" : "text-secondary",
              )}
              aria-label="Toggle menu"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* ── Dropdown rendered at root level so it spans full viewport width ── */}
      <AnimatePresence>
        {solutionsOpen && (
          <div data-solutions-nav>
            <SolutionsDropdown onClose={closeMenu} />
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-dark/60 backdrop-blur-sm z-40 lg:hidden"
              style={{ top: "64px" }}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-16 right-0 bottom-0 w-full sm:w-96 bg-dark shadow-2xl z-50 lg:hidden overflow-y-auto"
            >
              <div className="py-4">
                <MobileSolutions onClose={() => setOpen(false)} />

                <div className="border-b border-dark-30">
                  <a
                    href={isHome ? "#about" : "/#about"}
                    onClick={handleAboutClick}
                    className="block px-4 py-3 text-sm font-bold tracking-wider text-secondary hover:bg-dark-30/20 transition-colors"
                  >
                    About
                  </a>
                </div>

                <div className="border-b border-dark-30">
                  <Link
                    to="/contact"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 text-sm font-bold tracking-wider text-secondary hover:bg-dark-30/20 transition-colors"
                  >
                    Contact
                  </Link>
                </div>

                <div className="p-4">
                  <Link
                    to="/contact"
                    onClick={() => setOpen(false)}
                    className="block w-full px-6 py-4 rounded-md text-center text-sm font-black tracking-wider bg-secondary text-dark"
                  >
                    WORK WITH US
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
