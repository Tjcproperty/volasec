import React from "react";
import { motion } from "framer-motion";

function About() {
  return (
    <section id="about" className="py-24 bg-dark section relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="
            order-2 md:order-1 
    relative
rounded-2xl
    bg-secondary/90
    backdrop-blur-sm
    p-8 sm:p-10
    border border-secondary-30
  "
          >
            {/* subtle top accent */}
            {/* <div className="absolute -top-px left-8 h-px w-20 bg-primary" /> */}

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-0.5  mb-6"
            />

            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-dark">
              WHO WE <span className="text-primary">ARE</span>
            </h2>

            <p className="text-lg md:text-xl font-medium mb-4 leading-relaxed text-dark">
              We're not a traditional security consultancy.
            </p>

            <p className="text-base font-light mb-10 leading-relaxed text-dark-80 max-w-xl">
              We're former CISOs, security engineers, and cloud architects
              who've built and defended systems at enterprise scale.
            </p>

            {/* stats */}
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
                    <span className="text-3xl font-black text-primary">
                      {item.stat}
                    </span>
                    <span className="text-sm font-medium text-dark-80">
                      {item.label}
                    </span>
                  </div>

                  <div className="h-px mt-3 bg-primary-30" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ✅ VIDEO SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02, rotateY: 5 }}
            className="relative h-[420px] rounded-xl sm:h-[520px] md:h-[600px] overflow-hidden bg-transparent order-1 md:order-2"
            style={{ perspective: 1000 }} // makes rotateY feel nicer
          >
            {/* Optional soft glow (keeps background transparent) */}
            <div className="pointer-events-none absolute -top-16 right-0 h-72 w-72 bg-primary-30 blur-[140px] opacity-20" />

            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover bg-transparent"
            >
              {/* ✅ replace with your real file path */}
              <source src="/seam.mp4" type="video/mp4" />
            </video>

            {/* Optional subtle overlay to blend video into dark section */}
            <div className="pointer-events-none absolute inset-0 bg-dark-80/30" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
