"use client";

import React, { useState, useEffect } from "react";
import { useScroll, useSpring } from "framer-motion";

import Hero from "@/components/Hero";
import Header from "@/layout/Header";
import Services from "@/components/Services";
import About from "@/components/About";
import Footer from "@/layout/Footer";
import Proof from "@/components/Proof";
import Process from "@/components/Process";
import Contact from "../components/Contact";
import BookCallFloater from "@/components/BookCallFloater";
import NewsletterModal from "@/components/NewsletterModal";

/* ===================== Newsletter Storage Keys ===================== */

const LS_CONFIRMED = "volasec_newsletter_confirmed";
const LS_PENDING = "volasec_newsletter_pending";
const TWO_WEEKS = 14 * 24 * 60 * 60 * 1000;

/* ===================== Component ===================== */

const VolaSecLanding = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  /* ===================== Newsletter Logic ===================== */

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const confirmed = localStorage.getItem(LS_CONFIRMED);

        // ✅ If confirmed → never show again
        if (confirmed === "1") return;

        const pendingRaw = localStorage.getItem(LS_PENDING);

        if (pendingRaw) {
          const { timestamp } = JSON.parse(pendingRaw);
          const now = Date.now();

          // ⏳ If still within 14 days → do not show
          if (now - timestamp < TWO_WEEKS) return;
        }

        // Otherwise show modal
        setIsNewsletterOpen(true);
      } catch {
        setIsNewsletterOpen(true);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  /* Called after form submission (before email confirmation) */
  const handlePending = (email) => {
    localStorage.setItem(
      LS_PENDING,
      JSON.stringify({
        email,
        timestamp: Date.now(),
      }),
    );

    setIsNewsletterOpen(false);
  };

  /* Called after actual confirmation */
  const handleConfirmed = () => {
    localStorage.setItem(LS_CONFIRMED, "1");
    localStorage.removeItem(LS_PENDING);
    setIsNewsletterOpen(false);
  };

  const handleClose = () => {
    setIsNewsletterOpen(false);
  };

  /* ===================== Section Observer ===================== */

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 },
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () =>
      sections.forEach((section) =>
        observer.unobserve(section),
      );
  }, []);

  /* ===================== Smooth Scroll ===================== */

  useEffect(() => {
    const handleSmoothScroll = (e) => {
      const a = e.target.closest?.("a");
      if (!a) return;

      const href = a.getAttribute("href");
      if (!href) return;

      if (href.startsWith("/")) {
        const sectionId = href.substring(1);
        const section = document.getElementById(sectionId);

        if (section) {
          e.preventDefault();
          section.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    };

    document.addEventListener("click", handleSmoothScroll);
    return () =>
      document.removeEventListener(
        "click",
        handleSmoothScroll,
      );
  }, []);

  /* ===================== Render ===================== */

  return (
    <div className="flex flex-col min-h-screen">
      <Header activeSection={activeSection} scaleX={scaleX} />

      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <Proof />
        <Process />
        <Contact />
        <Footer />
        <BookCallFloater />
      </main>

      <NewsletterModal
        isOpen={isNewsletterOpen}
        onClose={handleClose}
        onPending={handlePending}
        onSubscribed={handleConfirmed}
      />
    </div>
  );
};

export default VolaSecLanding;