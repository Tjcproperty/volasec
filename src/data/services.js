import {
  Shield,
  FileCheck,
  Search,
  AlertTriangle,
  Cog,
  GraduationCap,
  TrendingDown,
  Receipt,
  BarChart3,
  Telescope,
  Map,
  Crosshair,
  PenTool,
  Hammer,
  CheckCircle,
  ClipboardList,
  Route,
  Wrench,
  FileText,
  UserCheck,
  Target,
  Radar,
  Bomb,
  FileBarChart,
  Eye,
  BookOpen,
  Dumbbell,
  LineChart,
  Settings,
  Plug,
  Users,
  Gauge,
  Zap,
  DollarSign,
  LayoutDashboard,
  Lightbulb,
  Monitor,
} from "lucide-react";

const services = [
  /* ── Security Services ── */
  {
    slug: "cloud-security-architecture",
    title: "Cloud Security Architecture",
    shortDescription:
      "Zero-trust design, multi-cloud infrastructure security, and identity management.",
    category: "security",
    icon: Shield,
    question: "Building in the cloud without a blueprint for breaches?",
    description:
      "Design and implementation of secure, compliant cloud infrastructure across AWS, Azure, and GCP. Zero-trust architecture, identity management, and network segmentation.",
    problemStatement:
      "Most organisations rush to the cloud without a security blueprint. Misconfigured IAM roles, flat networks, and shared-responsibility blind spots create an attack surface that grows with every sprint.",
    valueProps: [
      "Zero-trust architecture designed around your workloads",
      "Multi-cloud governance across AWS, Azure, and GCP",
      "Identity-first security with least-privilege enforcement",
    ],
    features: [
      {
        title: "Zero-Trust Network Design",
        description:
          "Micro-segmented networks with identity-aware access policies that eliminate implicit trust.",
      },
      {
        title: "IAM & Access Governance",
        description:
          "Least-privilege role design, federated identity, and continuous access reviews.",
      },
      {
        title: "Multi-Cloud Security Posture",
        description:
          "Unified policy enforcement and visibility across AWS, Azure, and GCP environments.",
      },
      {
        title: "Infrastructure as Code Security",
        description:
          "Pre-deploy scanning of Terraform, CloudFormation, and Pulumi templates for misconfigurations.",
      },
      {
        title: "Data Protection & Encryption",
        description:
          "Encryption at rest, in transit, and in use — with key management best practices.",
      },
      {
        title: "Cloud-Native Threat Detection",
        description:
          "Real-time monitoring and alerting using cloud-native tooling and custom detection rules.",
      },
    ],
    process: [
      {
        title: "Architecture Discovery",
        icon: Map,
        image: "/images/services/cloud-security-architecture-0.jpg",
        description:
          "Map existing cloud footprint, data flows, and trust boundaries across all environments.",
      },
      {
        title: "Threat Modelling",
        icon: Crosshair,
        image: "/images/services/cloud-security-architecture-1.jpg",
        description:
          "Identify attack vectors and prioritise risks based on real business impact.",
      },
      {
        title: "Blueprint & Design",
        icon: PenTool,
        image: "/images/services/cloud-security-architecture-2.jpg",
        description:
          "Deliver a zero-trust reference architecture tailored to your workloads and compliance needs.",
      },
      {
        title: "Implementation & Hardening",
        icon: Hammer,
        image: "/images/services/cloud-security-architecture-3.jpg",
        description:
          "Deploy security controls as code alongside your engineering team.",
      },
      {
        title: "Validation & Handoff",
        icon: CheckCircle,
        image: "/images/services/cloud-security-architecture-4.jpg",
        description:
          "Penetration testing, compliance verification, and operational runbook documentation.",
      },
    ],
    relatedSlugs: ["compliance-risk-management", "security-automation"],
  },
  {
    slug: "compliance-risk-management",
    title: "Compliance & Risk Management",
    shortDescription:
      "SOC 2, ISO 27001, PCI DSS, and GDPR readiness — turned into competitive advantage.",
    category: "security",
    icon: FileCheck,
    question:
      "Treating compliance like a checklist instead of a competitive edge?",
    description:
      "Navigate SOC 2, ISO 27001, HIPAA, PCI-DSS, and GDPR requirements. Turn compliance from a checkbox exercise into competitive advantage.",
    problemStatement:
      "Regulatory frameworks multiply while audit timelines shrink. Teams that treat compliance as a last-minute exercise burn cycles on remediation instead of shipping product.",
    valueProps: [
      "Compliance programmes that accelerate sales cycles",
      "Continuous monitoring replaces point-in-time audits",
      "Framework-agnostic controls mapped to your real infrastructure",
    ],
    features: [
      {
        title: "SOC 2 Type I & II Readiness",
        description:
          "End-to-end preparation, evidence collection, and auditor coordination.",
      },
      {
        title: "ISO 27001 Certification",
        description: "ISMS design, risk assessment, and certification support.",
      },
      {
        title: "PCI DSS Compliance",
        description:
          "Scope reduction, control implementation, and QSA engagement management.",
      },
      {
        title: "GDPR & Privacy Programmes",
        description:
          "Data mapping, DPIA, consent management, and privacy-by-design integration.",
      },
      {
        title: "Risk Assessment & Quantification",
        description:
          "FAIR-based risk quantification aligned to business objectives.",
      },
      {
        title: "Continuous Compliance Monitoring",
        description:
          "Automated evidence collection and real-time control status dashboards.",
      },
    ],
    process: [
      {
        title: "Scope & Gap Analysis",
        icon: ClipboardList,
        image: "/images/services/compliance-risk-management-0.jpg",
        description:
          "Map current controls against target frameworks and identify gaps.",
      },
      {
        title: "Remediation Roadmap",
        icon: Route,
        image: "/images/services/compliance-risk-management-1.jpg",
        description:
          "Prioritised action plan with quick wins and long-term improvements.",
      },
      {
        title: "Control Implementation",
        icon: Wrench,
        image: "/images/services/compliance-risk-management-2.jpg",
        description:
          "Deploy policies, processes, and technical controls to close gaps.",
      },
      {
        title: "Evidence & Documentation",
        icon: FileText,
        image: "/images/services/compliance-risk-management-3.jpg",
        description:
          "Automate evidence collection and prepare audit-ready documentation.",
      },
      {
        title: "Audit Support",
        icon: UserCheck,
        image: "/images/services/compliance-risk-management-4.jpg",
        description:
          "Direct coordination with auditors and assessors through certification.",
      },
    ],
    relatedSlugs: ["cloud-security-architecture", "penetration-testing"],
  },
  {
    slug: "penetration-testing",
    title: "Penetration Testing & Security Assessments",
    shortDescription:
      "Infrastructure, application, and network testing that finds risks before attackers do.",
    category: "security",
    icon: Search,
    question: "Waiting for attackers to find your vulnerabilities first?",
    description:
      "Penetration testing, vulnerability assessments, and architecture reviews that identify real risks before attackers do.",
    problemStatement:
      "Automated scanners generate noise. Real adversaries chain low-severity findings into critical exploits. Without expert-led testing, your risk picture is incomplete.",
    valueProps: [
      "Manual, expert-led testing — not automated scan dumps",
      "Business-context risk scoring, not CVSS alone",
      "Actionable remediation guidance your engineers can ship",
    ],
    features: [
      {
        title: "External Penetration Testing",
        description:
          "Simulate real-world attacks against your internet-facing infrastructure.",
      },
      {
        title: "Internal Network Assessment",
        description:
          "Identify lateral movement paths and privilege escalation risks.",
      },
      {
        title: "Web Application Testing",
        description:
          "OWASP Top 10 coverage with business logic and authentication testing.",
      },
      {
        title: "API Security Assessment",
        description:
          "REST and GraphQL endpoint testing for authorisation, injection, and data exposure.",
      },
      {
        title: "Cloud Configuration Review",
        description:
          "AWS, Azure, and GCP configuration audit against CIS benchmarks.",
      },
      {
        title: "Red Team Exercises",
        description:
          "Goal-oriented adversary simulation testing your detection and response capabilities.",
      },
    ],
    process: [
      {
        title: "Scoping & Rules of Engagement",
        icon: Target,
        image: "/images/services/penetration-testing-0.jpg",
        description:
          "Define targets, test windows, and communication protocols.",
      },
      {
        title: "Reconnaissance & Enumeration",
        icon: Radar,
        image: "/images/services/penetration-testing-1.jpg",
        description: "Map the attack surface using OSINT and active discovery.",
      },
      {
        title: "Exploitation & Validation",
        icon: Bomb,
        image: "/images/services/penetration-testing-2.jpg",
        description:
          "Attempt to exploit findings and validate real business impact.",
      },
      {
        title: "Reporting & Debrief",
        icon: FileBarChart,
        image: "/images/services/penetration-testing-3.jpg",
        description:
          "Deliver executive summary and technical findings with remediation priorities.",
      },
    ],
    relatedSlugs: ["incident-response", "cloud-security-architecture"],
  },
  {
    slug: "incident-response",
    title: "Incident Response Planning",
    shortDescription: "Breach preparedness, playbooks, and tabletop exercises.",
    category: "security",
    icon: AlertTriangle,
    question: "What's your plan when — not if — you get breached?",
    description:
      "Build and test incident response runbooks. When (not if) a breach happens, you'll know exactly what to do.",
    problemStatement:
      "The average time to identify a breach is 204 days. Without tested playbooks and clear escalation paths, incident response becomes chaos management.",
    valueProps: [
      "Battle-tested playbooks for your specific threat landscape",
      "Tabletop exercises that pressure-test your team",
      "Mean-time-to-respond measured in minutes, not days",
    ],
    features: [
      {
        title: "Incident Response Playbooks",
        description:
          "Scenario-specific runbooks covering ransomware, data breach, insider threat, and more.",
      },
      {
        title: "Tabletop Exercises",
        description:
          "Facilitated simulations that test decision-making under pressure.",
      },
      {
        title: "Communication Templates",
        description:
          "Pre-drafted stakeholder, regulatory, and customer notification templates.",
      },
      {
        title: "Forensic Readiness",
        description:
          "Logging, evidence preservation, and chain-of-custody procedures.",
      },
      {
        title: "Escalation & RACI Matrices",
        description:
          "Clear roles, responsibilities, and escalation paths for every scenario.",
      },
    ],
    process: [
      {
        title: "Current-State Assessment",
        icon: Eye,
        image: "/images/services/incident-response-0.jpg",
        description:
          "Review existing IR capabilities, tooling, and organisational readiness.",
      },
      {
        title: "Playbook Development",
        icon: BookOpen,
        image: "/images/services/incident-response-1.jpg",
        description:
          "Create scenario-specific runbooks tailored to your infrastructure and threats.",
      },
      {
        title: "Tabletop Exercise",
        icon: Dumbbell,
        image: "/images/services/incident-response-2.jpg",
        description:
          "Facilitate realistic simulations with your incident response team.",
      },
      {
        title: "Refinement & Training",
        icon: LineChart,
        image: "/images/services/incident-response-3.jpg",
        description:
          "Iterate on findings and train teams on updated procedures.",
      },
    ],
    relatedSlugs: ["penetration-testing", "security-training"],
  },
  {
    slug: "security-automation",
    title: "Security Automation & DevSecOps",
    shortDescription:
      "CI/CD pipeline security, IaC scanning, SAST/DAST integration.",
    category: "security",
    icon: Cog,
    question: "Still running security checks manually at scale?",
    description:
      "Infrastructure-as-code security policies, automated compliance checks, and continuous security monitoring that scales.",
    problemStatement:
      "Manual security reviews become bottlenecks when you deploy dozens of times per day. Without automation, security slows down delivery — or gets bypassed entirely.",
    valueProps: [
      "Security gates that don't slow down your pipeline",
      "Shift-left scanning catches issues before they reach production",
      "Policy-as-code ensures consistency across environments",
    ],
    features: [
      {
        title: "CI/CD Pipeline Security",
        description:
          "SAST, DAST, SCA, and secret scanning integrated into your build pipeline.",
      },
      {
        title: "Infrastructure as Code Scanning",
        description:
          "Pre-deploy validation of Terraform, CloudFormation, and Kubernetes manifests.",
      },
      {
        title: "Policy as Code",
        description:
          "OPA/Rego and Sentinel policies enforcing guardrails across all environments.",
      },
      {
        title: "Container Security",
        description:
          "Image scanning, runtime protection, and registry governance.",
      },
      {
        title: "Automated Compliance Checks",
        description:
          "Continuous verification of CIS benchmarks and framework controls.",
      },
      {
        title: "Security Observability",
        description:
          "Centralised logging, metrics, and alerting for security events.",
      },
    ],
    process: [
      {
        title: "Pipeline Assessment",
        icon: Settings,
        image: "/images/services/security-automation-0.jpg",
        description:
          "Audit existing CI/CD workflows and identify integration points.",
      },
      {
        title: "Tooling Selection",
        icon: Plug,
        image: "/images/services/security-automation-1.jpg",
        description:
          "Recommend and configure scanning tools based on your stack.",
      },
      {
        title: "Integration & Tuning",
        icon: Cog,
        image: "/images/services/security-automation-2.jpg",
        description:
          "Deploy security gates, tune policies, and suppress false positives.",
      },
      {
        title: "Developer Enablement",
        icon: Users,
        image: "/images/services/security-automation-3.jpg",
        description:
          "Train your team on secure development workflows and fix patterns.",
      },
    ],
    relatedSlugs: ["cloud-security-architecture", "security-training"],
  },
  {
    slug: "security-training",
    title: "Security Training & Awareness",
    shortDescription:
      "Team training, phishing simulations, and security culture building.",
    category: "security",
    icon: GraduationCap,
    question: "Expecting your team to secure what they don't understand?",
    description:
      "Upskill your engineering and operations teams on cloud security best practices, threat modelling, and secure development.",
    problemStatement:
      "Technology alone doesn't prevent breaches — people do. Without ongoing training and a strong security culture, your biggest vulnerability walks through the door every morning.",
    valueProps: [
      "Role-specific training for developers, ops, and executives",
      "Realistic phishing simulations with measurable improvement",
      "Security champions programme that scales your security team",
    ],
    features: [
      {
        title: "Secure Development Training",
        description:
          "Hands-on workshops covering OWASP Top 10, secure coding, and code review.",
      },
      {
        title: "Cloud Security Fundamentals",
        description:
          "AWS, Azure, and GCP security concepts for engineering teams.",
      },
      {
        title: "Phishing Simulations",
        description:
          "Realistic campaigns with metrics, coaching, and trend reporting.",
      },
      {
        title: "Threat Modelling Workshops",
        description:
          "STRIDE and PASTA methodologies applied to your real architecture.",
      },
      {
        title: "Security Champions Programme",
        description:
          "Build internal security advocates across engineering teams.",
      },
    ],
    process: [
      {
        title: "Needs Assessment",
        icon: ClipboardList,
        image: "/images/services/security-training-0.jpg",
        description:
          "Evaluate current security knowledge and identify skill gaps.",
      },
      {
        title: "Curriculum Design",
        icon: PenTool,
        image: "/images/services/security-training-1.jpg",
        description:
          "Build role-specific training modules using your real systems as examples.",
      },
      {
        title: "Delivery & Workshops",
        icon: Monitor,
        image: "/images/services/security-training-2.jpg",
        description:
          "Interactive, hands-on sessions — not death-by-PowerPoint.",
      },
      {
        title: "Measurement & Iteration",
        icon: LineChart,
        image: "/images/services/security-training-3.jpg",
        description:
          "Track knowledge retention, phishing click rates, and behaviour change.",
      },
    ],
    relatedSlugs: ["incident-response", "security-automation"],
  },

  /* ── Cloud Financial Services (FinOps) ── */
  {
    slug: "cloud-cost-optimisation",
    title: "Cloud Cost Optimisation",
    shortDescription:
      "Waste reduction, rightsizing, and commitment management across AWS, GCP, and Azure.",
    category: "finops",
    icon: TrendingDown,
    question: "Burning cloud budget on resources nobody uses?",
    description:
      "Identify and eliminate cloud waste through rightsizing, reserved instance strategy, and architectural optimisation across all major providers.",
    problemStatement:
      "The average organisation wastes 30% of its cloud spend. Over-provisioned instances, orphaned resources, and poor commitment coverage silently drain budgets every month.",
    valueProps: [
      "Typical 25–40% reduction in cloud spend within 90 days",
      "Rightsizing recommendations backed by utilisation data",
      "Commitment strategy (RIs, savings plans, CUDs) that maximises discounts",
    ],
    features: [
      {
        title: "Waste Identification",
        description:
          "Detect idle instances, unattached volumes, orphaned snapshots, and unused reservations.",
      },
      {
        title: "Rightsizing Analysis",
        description:
          "CPU, memory, and network utilisation analysis with instance family recommendations.",
      },
      {
        title: "Commitment Management",
        description:
          "Reserved instance and savings plan strategy to maximise discount coverage.",
      },
      {
        title: "Architectural Optimisation",
        description:
          "Spot/preemptible instance strategies, auto-scaling tuning, and serverless migration paths.",
      },
      {
        title: "Cost Anomaly Detection",
        description:
          "Real-time alerts for unexpected spend spikes before they hit your bill.",
      },
      {
        title: "Ongoing Optimisation",
        description:
          "Continuous monitoring and quarterly optimisation reviews.",
      },
    ],
    process: [
      {
        title: "Cost Assessment",
        icon: Search,
        image: "/images/services/cloud-cost-optimisation-0.jpg",
        description:
          "Analyse current spend patterns, utilisation, and waste across all accounts.",
      },
      {
        title: "Quick Wins",
        icon: Zap,
        image: "/images/services/cloud-cost-optimisation-1.jpg",
        description:
          "Implement immediate savings — terminate waste, rightsize obvious targets.",
      },
      {
        title: "Strategic Optimisation",
        icon: DollarSign,
        image: "/images/services/cloud-cost-optimisation-2.jpg",
        description:
          "Commitment purchases, architectural changes, and rate optimisation.",
      },
      {
        title: "Governance & Monitoring",
        icon: Gauge,
        image: "/images/services/cloud-cost-optimisation-3.jpg",
        description:
          "Deploy budgets, alerts, and dashboards for continuous cost visibility.",
      },
    ],
    relatedSlugs: ["cloud-billing", "finops-consulting"],
  },
  {
    slug: "cloud-billing",
    title: "Cloud Billing & Financial Management",
    shortDescription:
      "Cost allocation, showback/chargeback, and budget governance.",
    category: "finops",
    icon: Receipt,
    question: "Can you tell which team spent what on cloud last month?",
    description:
      "Implement cost allocation, showback/chargeback models, and budget governance so every pound of cloud spend is accounted for.",
    problemStatement:
      "Without proper tagging, allocation, and governance, cloud bills become a black box. Finance can't forecast, engineering can't be accountable, and waste hides in shared costs.",
    valueProps: [
      "100% cost allocation with automated tagging enforcement",
      "Showback and chargeback models finance teams can trust",
      "Budget governance that prevents runaway spend",
    ],
    features: [
      {
        title: "Tagging Strategy & Enforcement",
        description:
          "Comprehensive tagging taxonomy with automated compliance and remediation.",
      },
      {
        title: "Cost Allocation Models",
        description:
          "Map cloud spend to business units, products, and environments.",
      },
      {
        title: "Showback & Chargeback",
        description:
          "Transparent cost reporting that drives accountability across teams.",
      },
      {
        title: "Budget Governance",
        description: "Automated budgets, forecasting, and approval workflows.",
      },
      {
        title: "Financial Reporting",
        description:
          "Executive dashboards and detailed breakdowns for finance teams.",
      },
    ],
    process: [
      {
        title: "Current-State Review",
        icon: Eye,
        image: "/images/services/cloud-billing-0.jpg",
        description:
          "Audit existing tagging, accounts, and cost reporting capabilities.",
      },
      {
        title: "Allocation Framework",
        icon: LayoutDashboard,
        image: "/images/services/cloud-billing-1.jpg",
        description: "Design tagging taxonomy and cost allocation methodology.",
      },
      {
        title: "Implementation",
        icon: Hammer,
        image: "/images/services/cloud-billing-2.jpg",
        description:
          "Deploy tagging automation, dashboards, and budget policies.",
      },
      {
        title: "Operationalisation",
        icon: Users,
        image: "/images/services/cloud-billing-3.jpg",
        description:
          "Train finance and engineering on new workflows and reporting.",
      },
    ],
    relatedSlugs: ["cloud-cost-optimisation", "finops-consulting"],
  },
  {
    slug: "finops-consulting",
    title: "Cloud FinOps Consulting",
    shortDescription:
      "FinOps maturity assessment, practice building, and tooling strategy.",
    category: "finops",
    icon: BarChart3,
    question: "Is your FinOps practice crawling when it should be running?",
    description:
      "Assess your FinOps maturity, build a practice from scratch, and select the right tooling to embed financial accountability into your cloud culture.",
    problemStatement:
      "FinOps isn't just a tool or a team — it's a cultural shift. Without a structured practice, cost optimisation efforts are ad hoc, short-lived, and disconnected from business outcomes.",
    valueProps: [
      "FinOps Foundation-aligned maturity assessment",
      "Practice design that embeds cost awareness into engineering culture",
      "Vendor-neutral tooling strategy for your scale and complexity",
    ],
    features: [
      {
        title: "FinOps Maturity Assessment",
        description:
          "Crawl-Walk-Run evaluation across all FinOps capabilities.",
      },
      {
        title: "Practice Design",
        description:
          "Organisational structure, RACI, and operating model for your FinOps team.",
      },
      {
        title: "Tooling Strategy",
        description:
          "Vendor-neutral evaluation and selection of FinOps platforms.",
      },
      {
        title: "KPI & Metric Design",
        description:
          "Unit economics, cost-per-transaction, and efficiency metrics.",
      },
      {
        title: "Executive Enablement",
        description:
          "FinOps storytelling for leadership buy-in and budget alignment.",
      },
    ],
    process: [
      {
        title: "Maturity Assessment",
        icon: BarChart3,
        image: "/images/services/finops-consulting-0.jpg",
        description:
          "Evaluate current FinOps capabilities across people, process, and technology.",
      },
      {
        title: "Practice Blueprint",
        icon: PenTool,
        image: "/images/services/finops-consulting-1.jpg",
        description:
          "Design the operating model, governance, and reporting cadences.",
      },
      {
        title: "Tooling & Automation",
        icon: Lightbulb,
        image: "/images/services/finops-consulting-2.jpg",
        description:
          "Select, configure, and integrate FinOps tooling into existing workflows.",
      },
      {
        title: "Enablement & Coaching",
        icon: GraduationCap,
        image: "/images/services/finops-consulting-3.jpg",
        description:
          "Train stakeholders and embed FinOps practices into the organisation.",
      },
    ],
    relatedSlugs: ["cloud-cost-optimisation", "cloud-billing"],
  },

  /* ── Proprietary Product ── */
  {
    slug: "telescope",
    title: "Telescope",
    shortDescription:
      "Multi-cloud cost optimisation and security vulnerability platform.",
    category: "product",
    icon: Telescope,
    question:
      "Managing cloud costs and security across providers with spreadsheets?",
    description:
      "Unified cloud cost optimisation and security vulnerability platform. One dashboard for spend, waste, security posture, and AI-driven recommendations.",
    isTelescope: true,
    relatedSlugs: ["cloud-cost-optimisation", "cloud-security-architecture"],
  },
];

export const securityServices = services.filter(
  (s) => s.category === "security",
);
export const finopsServices = services.filter((s) => s.category === "finops");
export const productServices = services.filter((s) => s.category === "product");

export function getServiceBySlug(slug) {
  return services.find((s) => s.slug === slug);
}

export function getRelatedServices(currentSlug) {
  const current = services.find((s) => s.slug === currentSlug);
  if (!current) return [];

  const sameCategory = services.filter(
    (s) => s.slug !== currentSlug && s.category === current.category,
  );

  return [...sameCategory, services.find((s) => s.slug === "telescope")].filter(
    Boolean,
  );
}
export default services;
