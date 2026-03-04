import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import BlurRevealHeading from "./BlurRevealHeading";
import SectionBadge from "./SectionBadge";

export default function PageHero({
  badge,
  title,
  subtitle,
  breadcrumbs = [],
  bgVideo,
  bgImage,
}) {
  return (
    <section className="relative bg-dark pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Video background */}
      {bgVideo && (
        <>
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={bgVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-dark/70" />
        </>
      )}

      {/* Image background */}
      {bgImage && !bgVideo && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
          <div className="absolute inset-0 bg-dark/70" />
        </>
      )}

      {/* Default glow when no background asset */}
      {!bgVideo && !bgImage && (
        <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 bg-primary-30 blur-[140px] opacity-20" />
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        {breadcrumbs.length > 0 && (
          <nav className="mb-8 flex items-center gap-2 text-xs text-secondary-50">
            <Link to="/" className="hover:text-secondary transition-colors">
              Home
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                <ChevronRight className="w-3 h-3" />
                {crumb.href ? (
                  <Link
                    to={crumb.href}
                    className="hover:text-secondary transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-secondary">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {badge && (
          <div className="mb-6">
            <SectionBadge label={badge} className="text-secondary-50 border-secondary-30" />
          </div>
        )}

        <BlurRevealHeading
          text={title}
          as="h1"
          className="max-w-4xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-secondary mb-6"
        />

        {subtitle && (
          <p className="max-w-2xl text-lg text-secondary-80 font-light leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
