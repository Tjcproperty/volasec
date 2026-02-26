import {
  Landmark,
  HeartPulse,
  Cpu,
  Factory,
  Building2,
  ShoppingCart,
  Zap,
} from "lucide-react";

const industries = [
  {
    slug: "financial-services",
    title: "Financial Services & Banking",
    icon: Landmark,
    shortDescription:
      "Security and compliance for banks, fintechs, and financial institutions.",
    challenges: [
      {
        title: "Regulatory Complexity",
        description:
          "PCI DSS, SOX, GLBA, and evolving open-banking regulations demand continuous compliance.",
      },
      {
        title: "Real-Time Fraud Prevention",
        description:
          "Sophisticated threat actors target payment systems, APIs, and customer data at scale.",
      },
      {
        title: "Cloud Migration Risk",
        description:
          "Moving core banking workloads to the cloud without introducing new attack surfaces.",
      },
      {
        title: "Third-Party Risk",
        description:
          "Fintech integrations and vendor dependencies expand the attack surface exponentially.",
      },
    ],
    recommendedSlugs: [
      "compliance-risk-management",
      "penetration-testing",
      "cloud-security-architecture",
    ],
    caseStudy: {
      title: "Series B Fintech — SOC 2 in 89 Days",
      description:
        "Achieved SOC 2 Type I certification in 89 days, enabling an $8M enterprise deal. Zero critical findings on first audit.",
      stats: [
        { value: "89 Days", label: "To SOC 2 Type I" },
        { value: "$8M", label: "Enterprise Deal Unlocked" },
        { value: "0", label: "Critical Findings" },
      ],
    },
  },
  {
    slug: "healthcare",
    title: "Healthcare & Life Sciences",
    icon: HeartPulse,
    shortDescription:
      "HIPAA compliance, patient data protection, and secure telehealth infrastructure.",
    challenges: [
      {
        title: "HIPAA & PHI Protection",
        description:
          "Protected health information requires encryption, access controls, and audit trails at every layer.",
      },
      {
        title: "Medical Device Security",
        description:
          "Connected medical devices introduce IoT attack vectors into clinical environments.",
      },
      {
        title: "Telehealth Infrastructure",
        description:
          "Rapid telehealth adoption demands secure, scalable, and compliant platforms.",
      },
      {
        title: "Research Data Integrity",
        description:
          "Clinical trial data and intellectual property require stringent access controls.",
      },
    ],
    recommendedSlugs: [
      "compliance-risk-management",
      "cloud-security-architecture",
      "incident-response",
    ],
    caseStudy: {
      title: "Healthcare Platform — 87% Incident Reduction",
      description:
        "Multi-cloud security transformation reduced security incidents by 87% and cut compliance review time from two weeks to two days.",
      stats: [
        { value: "87%", label: "Incident Reduction" },
        { value: "2 Days", label: "Compliance Review Time" },
        { value: "100%", label: "HIPAA Compliance" },
      ],
    },
  },
  {
    slug: "technology",
    title: "Technology & SaaS",
    icon: Cpu,
    shortDescription:
      "Security architecture for fast-moving SaaS companies and technology platforms.",
    challenges: [
      {
        title: "Rapid Release Cycles",
        description:
          "Daily deployments require security gates that don't slow down delivery velocity.",
      },
      {
        title: "Multi-Tenant Security",
        description:
          "Tenant isolation, data segregation, and access controls in shared infrastructure.",
      },
      {
        title: "Enterprise Sales Readiness",
        description:
          "SOC 2, ISO 27001, and security questionnaires gate enterprise revenue.",
      },
      {
        title: "API Security at Scale",
        description:
          "Public APIs, webhooks, and integrations create a broad attack surface.",
      },
    ],
    recommendedSlugs: [
      "security-automation",
      "compliance-risk-management",
      "penetration-testing",
    ],
    caseStudy: {
      title: "B2B SaaS — 18 Months Incident-Free",
      description:
        "Post-breach architecture rebuild with defence-in-depth. Zero security incidents in 18 months since engagement.",
      stats: [
        { value: "18", label: "Months Incident-Free" },
        { value: "5", label: "Defence Layers Deployed" },
        { value: "99.99%", label: "Platform Uptime" },
      ],
    },
  },
  {
    slug: "manufacturing",
    title: "Manufacturing & Industrial",
    icon: Factory,
    shortDescription:
      "OT/IT convergence security, SCADA protection, and supply chain resilience.",
    challenges: [
      {
        title: "OT/IT Convergence",
        description:
          "Connecting operational technology to cloud introduces new attack vectors to physical systems.",
      },
      {
        title: "Legacy System Protection",
        description:
          "Decades-old SCADA and ICS systems lack modern security controls.",
      },
      {
        title: "Supply Chain Security",
        description:
          "Vendor and supplier integrations create complex trust relationships.",
      },
      {
        title: "Ransomware Resilience",
        description:
          "Manufacturing downtime from ransomware costs millions per hour.",
      },
    ],
    recommendedSlugs: [
      "incident-response",
      "cloud-security-architecture",
      "penetration-testing",
    ],
    caseStudy: {
      title: "Manufacturing Group — OT Security Overhaul",
      description:
        "Segmented OT/IT networks across 12 facilities, deploying monitoring and incident response capabilities.",
      stats: [
        { value: "12", label: "Facilities Secured" },
        { value: "100%", label: "OT Network Visibility" },
        { value: "0", label: "Production Outages" },
      ],
    },
  },
  {
    slug: "government",
    title: "Government & Public Sector",
    icon: Building2,
    shortDescription:
      "FedRAMP, NIST compliance, and secure citizen-facing digital services.",
    challenges: [
      {
        title: "Regulatory Frameworks",
        description:
          "NIST 800-53, FedRAMP, Cyber Essentials, and sector-specific mandates.",
      },
      {
        title: "Citizen Data Protection",
        description:
          "PII at scale requires robust access controls and breach notification readiness.",
      },
      {
        title: "Legacy Modernisation",
        description:
          "Migrating decades-old systems to cloud while maintaining security posture.",
      },
      {
        title: "Nation-State Threats",
        description:
          "Advanced persistent threats targeting government infrastructure.",
      },
    ],
    recommendedSlugs: [
      "compliance-risk-management",
      "incident-response",
      "security-training",
    ],
    caseStudy: {
      title: "Public Sector — Cloud Migration",
      description:
        "Secured migration of citizen-facing services to AWS GovCloud with full NIST 800-53 compliance.",
      stats: [
        { value: "3", label: "Months to Production" },
        { value: "100%", label: "NIST Compliance" },
        { value: "2M+", label: "Citizens Served" },
      ],
    },
  },
  {
    slug: "retail",
    title: "Retail & E-commerce",
    icon: ShoppingCart,
    shortDescription:
      "PCI compliance, payment security, and e-commerce platform protection.",
    challenges: [
      {
        title: "Payment Security",
        description:
          "PCI DSS compliance and payment processing security across channels.",
      },
      {
        title: "Customer Data Protection",
        description:
          "Loyalty programmes, personal data, and behavioural analytics require GDPR-ready controls.",
      },
      {
        title: "Seasonal Scale",
        description:
          "Peak trading periods demand elastic infrastructure without security trade-offs.",
      },
      {
        title: "Supply Chain Attacks",
        description:
          "Third-party scripts, CDNs, and vendor integrations create Magecart-style risks.",
      },
    ],
    recommendedSlugs: [
      "penetration-testing",
      "compliance-risk-management",
      "security-automation",
    ],
    caseStudy: {
      title: "E-commerce Platform — PCI in 60 Days",
      description:
        "Achieved PCI DSS Level 1 compliance in 60 days for a high-traffic e-commerce platform.",
      stats: [
        { value: "60 Days", label: "To PCI Level 1" },
        { value: "99.99%", label: "Checkout Uptime" },
        { value: "0", label: "Card Data Incidents" },
      ],
    },
  },
  {
    slug: "energy",
    title: "Energy & Utilities",
    icon: Zap,
    shortDescription:
      "Critical infrastructure protection, NERC CIP compliance, and smart grid security.",
    challenges: [
      {
        title: "Critical Infrastructure",
        description:
          "Power grids, water systems, and pipelines are high-value targets for nation-state actors.",
      },
      {
        title: "NERC CIP Compliance",
        description:
          "Complex regulatory requirements for bulk electric system cyber security.",
      },
      {
        title: "Smart Grid Security",
        description:
          "IoT sensors, smart metres, and distributed energy resources expand the attack surface.",
      },
      {
        title: "Operational Resilience",
        description:
          "Downtime in energy systems has cascading effects on communities and economies.",
      },
    ],
    recommendedSlugs: [
      "incident-response",
      "cloud-security-architecture",
      "compliance-risk-management",
    ],
    caseStudy: {
      title: "Energy Provider — SCADA Modernisation",
      description:
        "Modernised SCADA security for a regional energy provider, achieving NERC CIP compliance across all facilities.",
      stats: [
        { value: "100%", label: "NERC CIP Compliance" },
        { value: "8", label: "Facilities Modernised" },
        { value: "24/7", label: "Monitoring Deployed" },
      ],
    },
  },
];

export function getIndustryBySlug(slug) {
  return industries.find((i) => i.slug === slug);
}

export default industries;
