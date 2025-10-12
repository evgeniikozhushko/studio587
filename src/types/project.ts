export type Project = {
    slug: string;            // stable key
    category: string;
    title: string;
    summary?: string;
    cover: {
      src: string;           // can be /public path or remote URL
      alt: string;
      width?: number;
      height?: number;
    };
    details?: string;        // longer paragraph for the inside area
    tags?: string[];
    gallery?: { src: string; alt: string }[];
    cta?: { label: string; href: string };
  };
  