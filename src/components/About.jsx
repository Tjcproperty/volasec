import { motion } from "framer-motion";
import SectionBadge from "./shared/SectionBadge";
import BlurRevealHeading from "./shared/BlurRevealHeading";

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-dark section relative border-b border-primary-30">
      {/* Grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 md:order-1 relative bg-secondary/90 backdrop-blur-sm p-8 sm:p-10 border rounded-md border-secondary-30"
          >
            <SectionBadge label="Who We Are" className="mb-6 text-dark-80" />

            <BlurRevealHeading
              text="We're Not a Traditional Security Consultancy"
              as="h2"
              className="text-3xl md:text-4xl font-normal mb-6 tracking-tight text-dark"
            />

            <p className="text-base font-light mb-10 leading-relaxed text-secondary-80 max-w-xl">
              We're former CISOs, security engineers, and cloud architects
              who've built and defended systems at enterprise scale.
            </p>

            {/* Stats */}
            <div className="space-y-6">
              {[
                { stat: "50+", label: "Cloud Security Implementations" },
                { stat: "ZERO", label: "Breaches (3 Years)" },
                { stat: "$2B+", label: "Protected Infrastructure" },
                { stat: "15+", label: "Industry Certifications" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-3xl font-normal text-primary">
                      {item.stat}
                    </span>
                    <span className="text-sm font-medium text-secondary-80">
                      {item.label}
                    </span>
                  </div>
                  <div className="h-px mt-3 bg-primary-30" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Video side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02, rotateY: 5 }}
            
            className="relative h-[520px] rounded-md md:h-[620px] overflow-hidden bg-transparent order-1 md:order-2"
            style={{ perspective: 1000 }}
          >
            <div className="pointer-events-none absolute -top-16 right-0 h-72 w-72 bg-primary-30 blur-[140px] opacity-20" />

            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover bg-transparent"
            >
              <source src="/seam.mp4" type="video/mp4" />
            </video>

            <div className="pointer-events-none absolute inset-0 bg-dark-80/30" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
