import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

import Hero from "@/components/Hero";
import About from "@/components/About";
import Certifications from "@/components/Certifications";
import Services from "@/components/Services";
import Industries from "@/components/Industries";
import Proof from "@/components/Proof";
import Process from "@/components/Process";
import ContactSection from "@/components/shared/ContactSection";

export default function Home() {
  /* ── Smooth scroll for hash links on homepage ── */
  useEffect(() => {
    const handleSmoothScroll = (e) => {
      const a = e.target.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href?.startsWith("#")) return;

      const sectionId = href.substring(1);
      const section = document.getElementById(sectionId);
      if (section) {
        e.preventDefault();
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    document.addEventListener("click", handleSmoothScroll);
    return () => document.removeEventListener("click", handleSmoothScroll);
  }, []);

  return (
    <>
      <Helmet>
        <title>Volasec — Cloud Security Architecture & FinOps</title>
        <meta
          name="description"
          content="Enterprise-grade cloud security architecture, compliance, and FinOps services for high-stakes environments."
        />
      </Helmet>

      <Hero />
      <About />
      <Certifications />
      <Services />
      <Industries />
      <Proof />
      <Process />
      <ContactSection />
    </>
  );
}
