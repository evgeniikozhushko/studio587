import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "bvcas",
    category: "Brand & web development",
    title: "Bow Valley Climbing Access Society (BVCAS)",
    summary:
      "Brand-aligned site and CMS to improve outreach, updates, and volunteer engagement.",
    cover: {
      src: "/projects/bvcas/Studio587_Carousel_Images_bvcas.jpg",
      alt: "Bow Valley Climbing Access Society homepage hero section",
    },
    details:
      "A considered digital presence designed to strengthen communication, simplify updates, and support a growing volunteer-driven organization. The site balances advocacy, education, and community engagement while remaining easy to maintain over time.",
    additionalDetails:
      "The Bow Valley Climbing Access Society is a non-profit organization dedicated to protecting and maintaining climbing access in the Bow Valley through stewardship, education, and collaboration with land managers and the climbing community. We collaborated with BVCAS to establish a clear brand foundation and translate it into a flexible, accessible website. Built on Webflow with a structured CMS, the platform allows volunteers to publish updates, events, and partner information without technical friction. The result is a durable, mobile-first site that supports ongoing advocacy efforts and strengthens engagement with the local climbing community.",
    industry: ["Non-profit", "Outdoor Recreation", "Information"],
    year: ["2023", "Present"],
    tags: ["Webflow", "CMS", "SEO"],
    gallery: [
      { src: "/projects/bvcas/bvcas.jpg", alt: "BVCAS homepage" },
      { src: "/projects/bvcas/bvcas.jpg", alt: "Webflow CMS collections" },
    ],
    cta: { label: "View site", href: "https://bvcas.ca" },
  },

  {
    slug: "cics",
    category: "Brand & web development",
    title: "Canmore Indoor Climbing Society (CICS)",
    summary: "Website and brand system supporting youth programs.",
    cover: {
      src: "/projects/cics/Studio587_Carousel_Images_cics.jpg",
      alt: "CICS site hero with program CTAs",
    },
    details: `A focused digital presence designed to support youth programs, communicate structure, and make participation easy for families. The website prioritizes clarity, accessibility, and trust, helping parents quickly understand programs, schedules, and next steps.`,
    additionalDetails:
      "We worked with CICS to design and build a brand and a website that reflects the organization’s values while addressing the practical needs of parents and athletes. The site organizes programs, schedules, and key information into a clear, mobile-first structure, reducing friction for new families and improving overall communication. The result is a reliable digital foundation that supports program growth and reinforces trust within the local community.",
    industry: ["Non-profit", "Indoor Recreation"],
    year: ["2022"],
    tags: ["Squarespace", "Ecommerce", "SEO", "Information Architecture"],
    gallery: [
      { src: "/projects/cics/hero.jpg", alt: "CICS homepage hero" },
      { src: "/projects/cics/programs.jpg", alt: "Programs overview" },
    ],
    cta: { label: "Visit site", href: "https://canmorecics.net" },
  },

  {
    slug: "summit-custom-conversions",
    category: "Brand & web development",
    title: "Summit Custom Conversions",
    summary:
      "Website and brand development that showcase craftsmanship and increase sales.",
    cover: {
      src: "/projects/summitCustomConversions/Studio587_Carousel_Images_scc.png",
      alt: "Custom van exterior with mountain backdrop",
    },
    details: `A visually driven website designed to highlight custom vehicle builds while keeping the experience clear, fast, and conversion-focused. The site balances immersive photography with straightforward navigation, allowing potential customers to quickly understand the scope, quality, and care behind each build.`,
    additionalDetails:
      "We worked with Summit Custom Conversions to create a website that reflects the precision and craftsmanship of their builds. The project focused on visual hierarchy, image-led layouts, and a custom photo gallery that elevates the finished work without overwhelming the user. Built to perform well across devices, the site helps turn visual interest into genuine inquiries while reinforcing trust in the brand’s expertise.",
    industry: ["Services", "Auto Conversions"],
    year: ["2022"],
    tags: ["WIX", "Ecommerce", "SEO", "Photography Direction"],
    gallery: [
      { src: "/projects/summit/van.jpg", alt: "Exterior hero image" },
      { src: "/projects/summit/interior.jpg", alt: "Interior detail shot" },
    ],
    cta: { label: "View site", href: "https://summitcustomconversions.ca" },
  },

  {
    slug: "journey-unltd",
    category: "Brand & web development",
    title: "Journey Unltd",
    summary:
      "A conceptual brand and website exploring how adventure travel companies can present trust, clarity, and experience online.",
    cover: {
      src: "/projects/journey/Studio587_Carousel_Images_journey.jpg",
      alt: "Journey Unltd brand and website concept",
    },
    details:
      "A conceptual brand identity and website designed to explore positioning, storytelling, and structure for an adventure travel company. The project focuses on how visual identity, content hierarchy, and navigation can support trust and decision-making in a high-consideration industry.",
    additionalDetails:
      "The work explores brand tone, information architecture, and accessibility considerations for a travel company offering guided adventure experiences. Emphasis was placed on clear program presentation, strong visual storytelling, and SEO-aware content structure. The result is a complete concept that demonstrates how a travel brand could communicate credibility and experience through a cohesive brand and web presence.",
    tags: [
      "concept development",
      "brand strategy",
      "web design",
    ],
    gallery: [
      { src: "/projects/journey/home.jpg", alt: "Journey Unltd homepage concept" },
      { src: "/projects/journey/programs.jpg", alt: "Adventure programs layout" },
    ],
  },  

  {
    slug: "shovels-up",
    category: "web development",
    title: "Shovels Up",
    summary:
      "Designed to support reliable, local service work.",
    cover: {
      src: "/projects/shovelsUp/Studio587_Carousel_Images_shovelsUp.png",
      alt: "Shovels Up homepage with service highlights",
    },
    details: `A mobile-first website focused on helping customers quickly understand services and take the next step. The experience prioritizes clarity, speed, and usability, supporting real-world decision-making without unnecessary friction.`,
    additionalDetails:
      "The project focused on structuring information around how customers actually search for services. Clear service pages, scannable content, and prominent calls-to-action guide users toward inquiry while keeping the experience fast and accessible across devices. The result is a practical digital foundation that supports local visibility and consistent lead generation.",
    industry: ["Services", "Construction"],
    year: ["2024"],
    tags: ["WIX Studio", "EmailJS", "SEO"],
    gallery: [
      { src: "/projects/shovelsup/services.jpg", alt: "Services grid" },
      { src: "/projects/shovelsup/cta.jpg", alt: "Primary CTA section" },
    ],
    cta: { label: "View site", href: "https://www.shovelsup.ca" },
  },

  {
    slug: "clearwater-paddleboards",
    category: "Brand & web development",
    title: "Clearwater Paddleboards",
    summary:
      "A brand and eCommerce experience designed to support products, sales, and real-world use.",
    cover: {
      src: "/projects/clearwaterPaddleboard/Studio587_Carousel_Images_cwp.png",
      alt: "Clearwater Paddleboards logo lockup",
    },
    details: `A combined brand identity and eCommerce presence built to support a physical product business. The work focuses on creating a clear, recognizable system that translates effectively from boards and gear to an online storefront, ensuring consistency across all customer touchpoints.`,
    additionalDetails: "The work focused on creating a logo system and online presence that function across physical products and eCommerce. Design decisions prioritized legibility on boards and merchandise, while the website provides a clear, straightforward shopping experience. The result is a cohesive brand and digital foundation that supports product sales and future growth.",
  industry: ["Product", "Outdoor Equipment"],
  year: ["2025"],
  tags: ["Squarespace", "Ecommerce", "SEO"],
    gallery: [
      { src: "/projects/clearwater/lockup.jpg", alt: "Primary lockup" },
      { src: "/projects/clearwater/merch.jpg", alt: "Logo on apparel" },
    ],
    cta: { label: "View site", href: "https://www.clearwaterpaddleboards.ca" },
  },

  // {
  //   slug: "evgenii-portfolio",
  //   category: "web development",
  //   title: "Evgenii.ca Portfolio",
  //   summary:
  //     "Design-first Next.js site showcasing selected work, writing, and experiments.",
  //   cover: {
  //     src: "/projects/evgenii/evgenii.jpg",
  //     alt: "Portfolio UI preview",
  //   },
  //   details: `Built with Next.js and Tailwind, focusing on fast LCP, clean typography, and component reuse. The site doubles as a sandbox for UI libraries and interaction patterns, with a simple content model for adding new case studies over time.`,
  //   tags: ["Next.js", "Tailwind", "TypeScript", "UI/UX"],
  //   gallery: [
  //     { src: "/projects/evgenii/home.jpg", alt: "Homepage layout" },
  //     { src: "/projects/evgenii/components.jpg", alt: "Components preview" },
  //   ],
  //   cta: { label: "Visit site", href: "https://www.evgenii.ca" },
  // },

  // {
  //   slug: "beta-board",
  //   category: "Product",
  //   title: "BetaBoard — Climbing Route-Management",
  //   summary:
  //     "A platform for climbing gyms to plan, schedule, and track routes with a clear, role-aware UI.",
  //   cover: {
  //     src: "/projects/betaboard/cover.jpg",
  //     alt: "BetaBoard dashboard mockup",
  //   },
  //   details: `Built with Next.js, MongoDB, and Shadcn UI. Models cover Gyms → Sections → Zones → Anchors → Routes with versioning and access controls. Includes route charts, setter workflows, and mobile-friendly views for quick updates on the wall.`,
  //   tags: ["Next.js", "MongoDB", "Shadcn UI", "RBAC", "Design Systems"],
  //   gallery: [
  //     { src: "/projects/betaboard/dashboard.jpg", alt: "Routes dashboard" },
  //     { src: "/projects/betaboard/versioning.jpg", alt: "Route version view" },
  //   ],
  // },
];
