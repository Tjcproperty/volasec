import {
  securityServices,
  finopsServices,
  productServices,
} from "./services";
import industries from "./industries";

export const solutionsMenu = {
  label: "Solutions",
  columns: [
    {
      heading: "Security Services",
      items: securityServices.map((s) => ({
        label: s.title,
        href: `/services/${s.slug}`,
        description: s.shortDescription,
        icon: s.icon,
      })),
    },
    {
      heading: "Cloud Financial Services",
      items: finopsServices.map((s) => ({
        label: s.title,
        href: `/services/${s.slug}`,
        description: s.shortDescription,
        icon: s.icon,
      })),
    },
    {
      heading: "Proprietary Product",
      items: productServices.map((s) => ({
        label: s.title,
        href: `/services/${s.slug}`,
        description: s.shortDescription,
        icon: s.icon,
      })),
    },
  ],
};

export const servicesMenu = {
  label: "Services",
  items: [
    ...securityServices,
    ...finopsServices,
    ...productServices,
  ].map((s) => ({
    label: s.title,
    href: s.isTelescope ? "/services/telescope" : `/services/${s.slug}`,
    icon: s.icon,
  })),
};

export const industriesMenu = {
  label: "Industries",
  items: industries.map((ind) => ({
    label: ind.title,
    href: `/industries/${ind.slug}`,
    icon: ind.icon,
  })),
};
