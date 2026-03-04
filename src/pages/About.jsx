import React from "react";
import { motion } from "framer-motion";

function About() {
  return (
    <section id="about" className="relative py-24 bg-secondary overflow-hidden">
      
  
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/seam.mp4" type="video/mp4" />
        </video>
        {/* darken video so text stays readable */}
        <div className="absolute inset-0 bg-secondary/80" />
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center min-h-[600px]">

          {/* LEFT — text side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="py-12"
          >
            {/* Accent line */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-0.5 bg-primary mb-8"
            />

            {/* Label */}
            <p className="text-xs font-black tracking-[0.3em] text-primary/60 uppercase mb-4">
              About Us
            </p>

            <h2 className="text-5xl md:text-6xl font-black mb-8 tracking-tight leading-[1.0] text-primary">
              WHO WE <br />
              <span className="text-primary/40">ARE</span>
            </h2>

            <p className="text-xl font-semibold mb-4 leading-relaxed text-primary">
              We're not a traditional security consultancy.
            </p>

            <p className="text-base font-light mb-12 leading-relaxed text-primary/70 max-w-md">
              We're former CISOs, security engineers, and cloud architects
              who've built and defended systems at enterprise scale — where
              failure is never an option.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-8">
              {[
                { stat: "50+", label: "Cloud Security Implementations" },
                { stat: "ZERO", label: "Breaches in 3 Years" },
                { stat: "$2B+", label: "Protected Infrastructure" },
                { stat: "15+", label: "Industry Certifications" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="text-3xl md:text-4xl font-black text-primary mb-1">
                    {item.stat}
                  </div>
                  <div className="text-xs font-medium tracking-wide text-primary/60 uppercase">
                    {item.label}
                  </div>
                  <div className="h-px mt-3 bg-primary/15" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — intentionally empty, video shows through */}
          <div className="hidden md:block" />
        </div>
      </div>
    </section>
  );
}

export default About;