import { useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import PageHero from "@/components/shared/PageHero";
import SectionBadge from "@/components/shared/SectionBadge";
import BlurRevealHeading from "@/components/shared/BlurRevealHeading";
import RelatedServices from "@/components/shared/RelatedServices";
import ContactSection from "@/components/shared/ContactSection";
import { getIndustryBySlug } from "@/data/industries";

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function IndustryPage() {
  const { slug } = useParams();
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{industry.title} — Volasec</title>
        <meta
          name="description"
          content={industry.shortDescription}
        />
      </Helmet>

      <PageHero
        badge={industry.title}
        title={industry.title}
        subtitle={industry.shortDescription}
        bgVideo="/cloud.mp4"
        breadcrumbs={[
          { label: "Industries", href: "/industries" },
          { label: industry.title },
        ]}
      />

      {/* Challenges */}
      <section className="bg-secondary py-24 md:py-32 border-b border-primary-30">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <SectionBadge label="Industry Challenges" className="mb-6 text-dark-80" />
          <BlurRevealHeading
            text="Key Security Challenges"
            as="h2"
            className="text-3xl sm:text-4xl font-normal tracking-tight text-dark mb-10"
          />

          <motion.div
            variants={gridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {industry.challenges.map((challenge, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                className="p-6 border border-primary-30"
              >
                <div className="w-8 h-8 bg-gradient-to-b from-primary to-primary-80 text-secondary flex items-center justify-center mb-4 text-sm font-medium">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-xl font-medium text-dark mb-2">
                  {challenge.title}
                </h3>
                <p className="text-sm text-dark-80 font-light leading-relaxed">
                  {challenge.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Recommended Services */}
      {industry.recommendedSlugs && industry.recommendedSlugs.length > 0 && (
        <section className="bg-dark py-24 md:py-32 border-b border-primary-30">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <SectionBadge
              label="Recommended Services"
              className="mb-6 text-secondary-50 border-secondary-30"
            />
            <BlurRevealHeading
              text="How We Help"
              as="h2"
              className="text-3xl sm:text-4xl font-normal tracking-tight text-secondary mb-10"
            />
            <RelatedServices slugs={industry.recommendedSlugs} dark />
          </div>
        </section>
      )}

      {/* Case Study */}
      {industry.caseStudy && (
        <section className="bg-secondary py-24 md:py-32 border-b border-primary-30">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <SectionBadge label="Case Study" className="mb-6 text-dark-80" />

            <div className="max-w-3xl border border-primary-30 p-8">
              <h3 className="text-2xl font-normal text-dark mb-4">
                {industry.caseStudy.title}
              </h3>
              <p className="text-sm text-dark-80 font-light leading-relaxed mb-8">
                {industry.caseStudy.description}
              </p>

              <div className="grid grid-cols-3 gap-6">
                {industry.caseStudy.stats.map((stat, i) => (
                  <div key={i} className="border-l-2 border-primary pl-4">
                    <div className="text-2xl font-normal text-primary">
                      {stat.value}
                    </div>
                    <div className="text-xs text-dark-80 font-light">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <ContactSection />
    </>
  );
}
