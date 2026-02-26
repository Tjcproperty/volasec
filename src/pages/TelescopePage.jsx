import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Search, BarChart3, Zap, Cloud, Shield, Cpu } from "lucide-react";
import SectionBadge from "@/components/shared/SectionBadge";
import BlurRevealHeading from "@/components/shared/BlurRevealHeading";
import ProcessSteps from "@/components/shared/ProcessSteps";
import FeatureGrid from "@/components/shared/FeatureGrid";

const statsData = [
  { value: "30%", label: "of cloud budgets wasted on average" },
  { value: "94%", label: "of organisations struggle with cloud costs" },
  { value: "204", label: "days average time to identify a breach" },
];

const telescopeSteps = [
  {
    title: "Discover",
    icon: Search,
    image: "/images/telescope-discover.png",
    description:
      "Multi-cloud inventory and pricing analysis across AWS, Azure, and GCP. Automated discovery of every resource, its cost, and its security posture.",
  },
  {
    title: "Analyse",
    icon: BarChart3,
    image: "/images/telescope-analyse.png",
    description:
      "100+ optimisation rules combined with ML and LLM-powered recommendations. Identify waste, rightsizing opportunities, and security vulnerabilities in one pass.",
  },
  {
    title: "Act",
    icon: Zap,
    image: "/images/telescope-act.png",
    description:
      "Auto-remediation and Infrastructure-as-Code PRs. Fix cost waste and security drift automatically — or approve changes before they're applied.",
  },
];

const telescopeFeatures = [
  {
    title: "Multi-Cloud Support",
    icon: Cloud,
    description:
      "Unified visibility across AWS, Azure, and GCP from a single dashboard.",
  },
  {
    title: "Hybrid AI Engine",
    icon: Cpu,
    description:
      "ML models and LLM reasoning combine for recommendations that understand context.",
  },
  {
    title: "Security + Cost Convergence",
    icon: Shield,
    description:
      "See cost waste and security vulnerabilities together — fix both at once.",
  },
  {
    title: "Auto-Remediation",
    icon: Zap,
    description:
      "Automated fixes via IaC pull requests with approval workflows.",
  },
  {
    title: "AI/ML Workload Optimisation",
    icon: BarChart3,
    description:
      "Specialised recommendations for GPU instances, training jobs, and inference endpoints.",
  },
  {
    title: "Compliance Reporting",
    icon: Search,
    description:
      "Continuous compliance checks mapped to SOC 2, ISO 27001, PCI DSS, and CIS benchmarks.",
  },
];

/* Grain texture overlay */
function GrainOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.02]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

export default function TelescopePage() {
  return (
    <>
      <Helmet>
        <title>Telescope — Cloud Cost & Security Intelligence | Volasec</title>
        <meta
          name="description"
          content="Telescope: unified multi-cloud cost optimisation and security vulnerability platform by Volasec."
        />
      </Helmet>

      {/* ── Hero ── Full height, video background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/cloud.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-dark/30" />
        <GrainOverlay />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <SectionBadge
            label="Proprietary Product"
            className="mx-auto mb-8 text-secondary-50 border-secondary-30"
          />

          <BlurRevealHeading
            text="Unified Cloud Cost & Security Intelligence"
            as="h1"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-secondary mb-6"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-base sm:text-lg text-secondary-80 font-light leading-relaxed max-w-2xl mx-auto mb-10"
          >
            One platform to discover cloud waste, surface security
            vulnerabilities, and act on AI-driven recommendations — across every
            provider.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-secondary text-dark text-sm font-medium tracking-wider hover:bg-secondary-80 transition-colors"
            >
              REQUEST A DEMO
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#telescope-problem"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-secondary-30 text-secondary text-sm font-medium tracking-wider hover:bg-secondary/10 transition-colors"
            >
              LEARN MORE
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-5 h-8 border-2 border-secondary-30 flex justify-center pt-2">
            <div className="w-1 h-2 bg-secondary-50" />
          </div>
        </motion.div>
      </section>

      {/* ── Problem Section ── */}
      <section
        id="telescope-problem"
        className="relative bg-dark py-24 md:py-32 border-b border-primary-30"
      >
        <GrainOverlay />

        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <SectionBadge
              label="The Problem"
              className="mx-auto mb-6 text-secondary-50 border-secondary-30"
            />
            <BlurRevealHeading
              text="Cloud Sprawl Is Costing You More Than Money"
              as="h2"
              className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-secondary mb-6"
            />
            <p className="text-base text-secondary-80 font-light leading-relaxed">
              Organisations lose millions to cloud waste while security
              vulnerabilities multiply across providers. Fragmented tooling
              creates blind spots that grow with every deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {statsData.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="border-l-4 border-secondary pl-6"
              >
                <div className="text-4xl sm:text-5xl font-normal text-secondary mb-2">
                  {stat.value}
                </div>
                <p className="text-sm text-secondary-80 font-light">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-secondary text-dark text-sm font-medium tracking-wider hover:bg-secondary-80 transition-colors"
            >
              REQUEST A DEMO
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#telescope-solution"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-secondary-30 text-secondary text-sm font-medium tracking-wider hover:bg-secondary/10 transition-colors"
            >
              SEE THE SOLUTION
            </a>
          </div>
        </div>
      </section>

      {/* ── Solution Section ── Interactive Steps */}
      <section
        id="telescope-solution"
        className="bg-dark py-24 md:py-32 border-b border-primary-30"
      >
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <SectionBadge
            label="The Solution"
            className="mb-6 text-secondary-50 border-secondary-30"
          />
          <BlurRevealHeading
            text="Introducing Telescope"
            as="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-secondary mb-6"
          />
          <p className="text-base text-secondary-80 font-light leading-relaxed max-w-2xl mb-12">
            A single platform that unifies cloud cost optimisation and security
            vulnerability management across AWS, Azure, and GCP.
          </p>

          <ProcessSteps steps={telescopeSteps} dark />

          <div className="mt-12 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-secondary text-dark text-sm font-medium tracking-wider hover:bg-secondary-80 transition-colors"
            >
              REQUEST A DEMO
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section className="bg-secondary py-24 md:py-32 border-b border-primary-30">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <SectionBadge label="Platform Features" className="mb-6 text-dark-80" />
          <BlurRevealHeading
            text="Built for Multi-Cloud at Scale"
            as="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-dark mb-12"
          />

          <FeatureGrid features={telescopeFeatures} />
        </div>
      </section>

      {/* ── CTA Section ── Background image */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(/blueee.png)` }}
        />
        <div className="absolute inset-0 bg-dark/40" />
        <GrainOverlay />

        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-16 text-center">
          <BlurRevealHeading
            text="See Telescope in Action"
            as="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-secondary mb-6"
          />
          <p className="text-secondary-80 font-light max-w-xl mx-auto mb-10">
            Book a demo to see how Telescope can cut your cloud costs and
            strengthen your security posture — simultaneously.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-secondary text-dark text-sm font-medium tracking-wider hover:bg-secondary-80 transition-colors"
          >
            REQUEST A DEMO
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
