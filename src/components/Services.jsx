import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

function cx(...c) {
  return c.filter(Boolean).join(" ");
}

const gridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Services() {
  const services = useMemo(
    () => [
      {
        title: "Cloud Security Architecture",
        question: "Building in the cloud without a blueprint for breaches?",
        description:
          "Design and implementation of secure, compliant cloud infrastructure across AWS, Azure, and GCP. Zero-trust architecture, identity management, and network segmentation.",
        border: "border-primary-30",
        baseBg: "bg-primary",
        hoverBg: "bg-secondary",
        baseTone: "dark",
        hoverTone: "light",
      },
      {
        title: "Compliance & Risk Management",
        question:
          "Treating compliance like a checklist instead of a competitive edge?",
        description:
          "Navigate SOC 2, ISO 27001, HIPAA, PCI-DSS, and GDPR requirements. Turn compliance from a checkbox exercise into competitive advantage.",
        border: "border-dark-30",
        baseBg: "bg-secondary",
        hoverBg: "bg-dark",
        baseTone: "light",
        hoverTone: "dark",
      },
      {
        title: "Security Assessments",
        question: "Waiting for attackers to find your vulnerabilities first?",
        description:
          "Penetration testing, vulnerability assessments, and architecture reviews that identify real risks before attackers do.",
        border: "border-dark-30",
        baseBg: "bg-dark",
        hoverBg: "bg-secondary",
        baseTone: "dark",
        hoverTone: "light",
      },
      {
        title: "Incident Response Planning",
        question: "What's your plan when—not if—you get breached?",
        description:
          "Build and test incident response runbooks. When (not if) a breach happens, you'll know exactly what to do.",
        border: "border-primary-30",
        baseBg: "bg-primary-80",
        hoverBg: "bg-secondary",
        baseTone: "dark",
        hoverTone: "light",
      },
      {
        title: "Security Automation",
        question: "Still running security checks manually at scale?",
        description:
          "Infrastructure-as-code security policies, automated compliance checks, and continuous security monitoring that scales.",
        border: "border-primary-30",
        baseBg: "bg-secondary-80",
        hoverBg: "bg-primary",
        baseTone: "light",
        hoverTone: "dark",
      },
      {
        title: "Security Team Training",
        question: "Expecting your team to secure what they don't understand?",
        description:
          "Upskill your engineering and operations teams on cloud security best practices, threat modeling, and secure development.",
        border: "border-dark-30",
        baseBg: "bg-dark-80",
        hoverBg: "bg-secondary",
        baseTone: "dark",
        hoverTone: "light",
      },
    ],
    [],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    if (paused || locked) return;

    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % services.length);
    }, 5200);

    return () => clearInterval(id);
  }, [paused, locked, services.length]);

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-secondary py-16 sm:py-20 md:py-24"
    >
      <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 bg-primary-30 blur-[80px] opacity-25" />
      <div className="pointer-events-none absolute -bottom-24 left-0 h-96 w-96 bg-dark-30 blur-[80px] opacity-20" />

      {/* Decorative blurred logo - top right */}
      <div className="pointer-events-none absolute top-0 right-0 z-0">
        <img
          src="/Icon dark mono@3x.png"
          alt=""
          className="
            w-[420px] sm:w-[520px] md:w-[620px]
            opacity-[0.15]
            blur-[3px]
            translate-x-1/4 -translate-y-1/4
            select-none
          "
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8 }}
            className="mb-6 h-1 bg-primary sm:mb-8"
          />

          <h2 className="mb-4 text-4xl font-black tracking-tight text-dark-30 sm:text-5xl md:text-6xl lg:text-7xl">
            WHAT WE <span className="text-primary">DO</span>
          </h2>

          <p className="max-w-2xl text-sm font-normal leading-relaxed text-dark-80 sm:text-base md:text-lg">
            End-to-end security architecture for cloud-native organizations in
            regulated environments.
          </p>
        </motion.div>

    <motion.div
  variants={gridVariants}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, amount: 0.2 }}
  className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3"
>
  {services.map((service, index) => (
    <ServiceCard
      key={service.title}
      service={service}
      index={index}
      isActive={index === activeIndex}
      setPaused={setPaused}
      onActivate={() => setActiveIndex(index)}
      locked={locked}
      setLocked={setLocked}
    />
  ))}
</motion.div>

      </div>

      {/* Decorative blurred logo - bottom left */}
      <div className="pointer-events-none absolute bottom-0 left-0 z-0">
        <img
          src="/Icon dark mono@3x.png"
          alt=""
          className="
            w-[420px] sm:w-[520px] md:w-[620px]
            opacity-[0.15]
            blur-[3px]
            -translate-x-1/4 translate-y-1/4
            select-none
          "
        />
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
  isActive,
  setPaused,
  onActivate,
  locked,
  setLocked,
}) {
  const isDarkBase = service.baseTone === "dark";

  const BASE_TITLE = isDarkBase ? "text-secondary" : "text-dark";
  const BASE_DESC = isDarkBase ? "text-secondary-80" : "text-dark-80";
  const BASE_CTA = isDarkBase ? "text-secondary" : "text-primary";
  const BASE_QUESTION = isDarkBase
    ? " text-secondary-80 md:text-primary-80"
    : "text-primary";

  const HOVER_TITLE =
    service.hoverTone === "dark"
      ? "md:group-hover:text-secondary"
      : "md:group-hover:text-dark";
  const HOVER_DESC =
    service.hoverTone === "dark"
      ? "md:group-hover:text-secondary-80"
      : "md:group-hover:text-dark-80";
  const HOVER_CTA =
    service.hoverTone === "dark"
      ? "md:group-hover:text-secondary"
      : "md:group-hover:text-dark";
  const HOVER_QUESTION =
    service.hoverTone === "dark"
      ? "md:group-hover:text-secondary-80"
      : "md:group-hover:text-primary";

  const BASE_LINE = isDarkBase ? "bg-secondary-50" : "bg-primary";
  const HOVER_LINE =
    service.hoverTone === "dark"
      ? "md:group-hover:bg-secondary-50"
      : "md:group-hover:bg-dark-30";

  return (
    <motion.article
      variants={cardVariants}
      className={cx(
        "group relative overflow-hidden cursor-pointer",
        "border-l-4 border border-t border-b border-r",
        service.border,
        service.baseBg,
        "transition-colors duration-300",
        "shadow-md md:hover:shadow-xl rounded-xl",
        isActive ? "ring-1 ring-primary/30" : "opacity-95",
      )}
      animate={
        isActive
          ? { y: -4, scale: 1.01, opacity: 1 }
          : { y: 0, scale: 1, opacity: 0.92 }
      }
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onClick={() => {
        onActivate?.();
        setLocked((v) => !v);
      }}
    >
      {/* HOVER BACKGROUND (desktop only) */}
      <div
        className={cx(
          "absolute inset-0 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300",
          service.hoverBg,
        )}
      />

      <div className="relative z-10 p-6 sm:p-7 md:p-8">
        <div
          className={cx(
            "mb-6 h-0.5 transition-colors duration-300",
            BASE_LINE,
            HOVER_LINE,
          )}
        />

        {/* RHETORICAL QUESTION */}
        <p
          className={cx(
            "text-xs sm:text-sm font-bold tracking-wide uppercase transition-colors duration-300 mb-3",
            BASE_QUESTION,
            HOVER_QUESTION,
          )}
        >
          {service.question}
        </p>

        <h3
          className={cx(
            "text-xl sm:text-2xl font-black leading-tight transition-colors duration-300",
            BASE_TITLE,
            HOVER_TITLE,
          )}
        >
          {service.title}
        </h3>

        <p
          className={cx(
            "mt-4 text-sm leading-relaxed transition-colors duration-300",
            BASE_DESC,
            HOVER_DESC,
          )}
        >
          {service.description}
        </p>

        {/* Subtle "locked" indicator on mobile only */}
      </div>
    </motion.article>
  );
}
