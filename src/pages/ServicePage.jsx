import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import PageHero from "@/components/shared/PageHero";
import FeatureGrid from "@/components/shared/FeatureGrid";
import ProcessSteps from "@/components/shared/ProcessSteps";
import RelatedServices from "@/components/shared/RelatedServices";
import ContactSection from "@/components/shared/ContactSection";
import SectionBadge from "@/components/shared/SectionBadge";
import BlurRevealHeading from "@/components/shared/BlurRevealHeading";
import { getServiceBySlug } from "@/data/services";

export default function ServicePage() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  if (!service || service.isTelescope) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{service.title} — Volasec</title>
        <meta name="description" content={service.description} />
      </Helmet>

      <PageHero
        badge={service.category === "finops" ? "Cloud FinOps" : "Security Services"}
        title={service.title}
        subtitle={service.description}
        bgVideo="/seam.mp4"
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />

      {/* Problem Statement */}
      {service.problemStatement && (
        <section className="bg-secondary py-24 md:py-32 border-b border-primary-30">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <div className="max-w-3xl">
              <SectionBadge label="The Challenge" className="mb-6 text-dark-80" />
              <p className="text-lg sm:text-xl text-dark-80 font-light leading-relaxed">
                {service.problemStatement}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Value Proposition */}
      {service.valueProps && (
        <section className="bg-dark py-24 md:py-32 border-b border-primary-30">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <SectionBadge
              label="Why Volasec"
              className="mb-6 text-secondary-50 border-secondary-30"
            />
            <BlurRevealHeading
              text="What Sets Us Apart"
              as="h2"
              className="text-3xl sm:text-4xl font-normal tracking-tight text-secondary mb-10"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {service.valueProps.map((prop, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-b from-primary to-primary-80 text-secondary flex items-center justify-center shrink-0 text-sm font-medium">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <p className="text-sm text-secondary-80 font-light leading-relaxed">
                    {prop}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      {service.features && (
        <section className="bg-secondary py-24 md:py-32 border-b border-primary-30">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <SectionBadge label="Capabilities" className="mb-6 text-dark-80" />
            <BlurRevealHeading
              text="What's Included"
              as="h2"
              className="text-3xl sm:text-4xl font-normal tracking-tight text-dark mb-10"
            />
            <FeatureGrid features={service.features} />
          </div>
        </section>
      )}

      {/* Process */}
      {service.process && (
        <section className="bg-dark py-24 md:py-32 border-b border-primary-30">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <SectionBadge
              label="Our Approach"
              className="mb-6 text-secondary-50 border-secondary-30"
            />
            <BlurRevealHeading
              text="How We Deliver"
              as="h2"
              className="text-3xl sm:text-4xl font-normal tracking-tight text-secondary mb-10"
            />
            <ProcessSteps steps={service.process} dark />
          </div>
        </section>
      )}

      {/* Related Services */}
      {service.relatedSlugs && service.relatedSlugs.length > 0 && (
        <section className="bg-secondary py-24 md:py-32 border-b border-primary-30">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <SectionBadge
              label="Related Services"
              className="mb-6 text-dark-80"
            />
            <BlurRevealHeading
              text="You Might Also Need"
              as="h2"
              className="text-3xl sm:text-4xl font-normal tracking-tight text-dark mb-10"
            />
            <RelatedServices slugs={service.relatedSlugs} />
          </div>
        </section>
      )}

      <ContactSection />
    </>
  );
}
