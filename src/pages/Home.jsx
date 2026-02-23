"use client";

import React, { useState, useEffect, useRef } from "react";
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

/* ===================== Cookie Helpers ===================== */
function getCookie(name) {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=")[1]) : null;
}

function setCookie(name, value, days = 365) {
  if (typeof document === "undefined") return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(
    value,
  )}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

const VolaSecLanding = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const { scrollYProgress } = useScroll();

  // Smooth scroll progress (kept from your code)
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  /* ===================== Newsletter Modal Logic ===================== */
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const openedNewsletterRef = useRef(false);

  const LS_KEY = "volasec_newsletter_accepted";
  const COOKIE_KEY = "volasec_newsletter_accepted";

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const lsValue = window.localStorage.getItem(LS_KEY);
        const cookieValue = getCookie(COOKIE_KEY);
        const hasAccepted = lsValue === "1" || cookieValue === "1";

        if (!hasAccepted) setIsNewsletterOpen(true);
      } catch {
        setIsNewsletterOpen(true);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleNewsletterSubscribed = () => {
    try {
      window.localStorage.setItem(LS_KEY, "1");
    } catch {}

    setCookie(COOKIE_KEY, "1", 365);
    setIsNewsletterOpen(false);
  };

  const handleNewsletterClose = () => {
    // If you want "close" to also permanently stop it, uncomment:
    // handleNewsletterSubscribed();

    setIsNewsletterOpen(false);
  };

  /* ===================== Section Observer for Nav Highlighting ===================== */
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

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  /* ===================== Smooth Scroll to Sections ===================== */
  useEffect(() => {
    const handleSmoothScroll = (e) => {
      // Only handle anchor clicks
      const a = e.target.closest?.("a");
      if (!a) return;

      const href = a.getAttribute("href");
      if (!href) return;

      // You used "/sectionId" links; keep same behavior
      if (href.startsWith("/")) {
        const sectionId = href.substring(1); // remove leading "/"
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
    return () => document.removeEventListener("click", handleSmoothScroll);
  }, []);

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

      {/* Newsletter Modal */}
      <NewsletterModal
        isOpen={isNewsletterOpen}
        onClose={handleNewsletterClose}
        onSubscribed={handleNewsletterSubscribed}
      />
    </div>
  );
};

export default VolaSecLanding;
