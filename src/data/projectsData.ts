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
      alt: "BVCAS homepage hero section",
    },
    details: `I partnered with the Bow Valley Climbing Access Society to develop a clear brand presence and a site that supports their advocacy for responsible climbing access in the Bow Valley. Built on Webflow with a structured CMS for news, events, and partners. The result: easier updates, better mobile performance, and stronger community engagement.`,
    tags: ["Webflow", "CMS", "Non-profit", "SEO"],
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
    details: `Designed a streamlined site focused on what parents need first: programs, schedules, registration, and contact. Implemented strong mobile layout, and basic analytics to track interest. The update improved program visibility and community engagement.`,
    tags: ["Brand", "Web", "Accessibility", "Analytics"],
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
    details: `Built a visually rich site to highlight interior finishes and build quality. Created a custom photo gallery and refined brand elements to elevate trust and conversions. The project improved lead quality and helped drive vehicle sales.`,
    tags: ["Wix", "Branding", "Photography", "Gallery UI"],
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
      "A brand and website for a travel company that specializes in adventure travel.",
    cover: {
      src: "/projects/journey/Studio587_Carousel_Images_journey.jpg",
      alt: "BetaBoard dashboard mockup",
    },
    details: `Complete brand identity creation and website development for a travel company that specializes in adventure travel.`,
    tags: ["branding", "website development", "web design", "SEO", "accessibility"],
    gallery: [
      { src: "/projects/betaboard/dashboard.jpg", alt: "Routes dashboard" },
      { src: "/projects/betaboard/versioning.jpg", alt: "Route version view" },
    ],
    // internal product — add a link when public
  },

  {
    slug: "shovels-up",
    category: "web development",
    title: "Shovels Up",
    summary:
      "Local services website with clear CTAs, service pages, and mobile-first performance.",
    cover: {
      src: "/projects/shovelsUp/Studio587_Carousel_Images_shovelsUp.png",
      alt: "Shovels Up homepage with service highlights",
    },
    details: `Delivered a clean, responsive site for a Bow Valley services company (snow removal, landscaping, decks, line painting). Focused on straightforward navigation, persuasive service pages, and prominent calls-to-action. Implemented lightweight tracking and ongoing support.`,
    tags: ["HTML", "CSS", "JavaScript", "EmailJS", "Local SEO"],
    gallery: [
      { src: "/projects/shovelsup/services.jpg", alt: "Services grid" },
      { src: "/projects/shovelsup/cta.jpg", alt: "Primary CTA section" },
    ],
    // add a public link if available, or omit CTA
  },

  {
    slug: "clearwater-paddleboards",
    category: "Brand",
    title: "Clearwater Paddleboards",
    summary:
      "Logo and identity for a local paddleboard brand — clean, versatile, and outdoor-ready.",
    cover: {
      src: "/projects/clearwaterPaddleboard/Studio587_Carousel_Images_cwp.png",
      alt: "Clearwater Paddleboards logo lockup",
    },
    details: `Created a logo system and basic brand assets suitable for both digital and print applications. Emphasis on legibility, water-inspired forms, and easy application across boards, apparel, and packaging.`,
    tags: ["Logo", "Identity", "Brand Guidelines"],
    gallery: [
      { src: "/projects/clearwater/lockup.jpg", alt: "Primary lockup" },
      { src: "/projects/clearwater/merch.jpg", alt: "Logo on apparel" },
    ],
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

  {
    slug: "beta-board",
    category: "Product",
    title: "BetaBoard — Climbing Route-Management",
    summary:
      "A platform for climbing gyms to plan, schedule, and track routes with a clear, role-aware UI.",
    cover: {
      src: "/projects/betaboard/cover.jpg",
      alt: "BetaBoard dashboard mockup",
    },
    details: `Built with Next.js, MongoDB, and Shadcn UI. Models cover Gyms → Sections → Zones → Anchors → Routes with versioning and access controls. Includes route charts, setter workflows, and mobile-friendly views for quick updates on the wall.`,
    tags: ["Next.js", "MongoDB", "Shadcn UI", "RBAC", "Design Systems"],
    gallery: [
      { src: "/projects/betaboard/dashboard.jpg", alt: "Routes dashboard" },
      { src: "/projects/betaboard/versioning.jpg", alt: "Route version view" },
    ],
    // internal product — add a link when public
  },
];
