import { motion } from "framer-motion";
import SectionBadge from "./shared/SectionBadge";
import certifications from "@/data/certifications";
import MarqueeRow from "./shared/MarqueeRow";

function CertBadge({ cert }) {
  return (
    <div className="flex flex-col items-center gap-3 mx-6">
      <div className="w-20 h-20 rounded-full bg-white/10 border border-primary-30 flex items-center justify-center overflow-hidden p-3">
        {cert.logo ? (
          <img
            src={cert.logo}
            alt={cert.name}
            className="w-full h-full object-contain"
          />
        ) : (
          <span className="text-xs font-medium text-secondary-80 text-center leading-tight">
            {cert.abbr || cert.name}
          </span>
        )}
      </div>
      <span className="text-xs font-light text-secondary-50 whitespace-nowrap">
        {cert.name}
      </span>
    </div>
  );
}

export default function Certifications() {
  const items = certifications.map((cert, i) => (
    <CertBadge key={`${cert.name}-${i}`} cert={cert} />
  ));

  return (
    <section className="relative overflow-hidden bg-dark py-24 md:py-32 border-b border-primary-30">
      {/* Grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <SectionBadge
            label="Certifications & Frameworks"
            className="mx-auto mb-6 text-secondary-50 border-secondary-30"
          />
          <p className="text-sm text-secondary-80 font-light max-w-lg mx-auto">
            We hold expertise across the industry's most demanding compliance
            frameworks and security standards.
          </p>
        </motion.div>
      </div>

      <MarqueeRow speed={40}>{items}</MarqueeRow>

      <div className="mt-6">
        <MarqueeRow speed={35}>
          <div className="flex" style={{ direction: "rtl" }}>
            {items}
          </div>
        </MarqueeRow>
      </div>
    </section>
  );
}
