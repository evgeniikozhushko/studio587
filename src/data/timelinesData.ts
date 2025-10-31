export interface TimelineItem {
  phase: string;
  duration: string;
  rowStart: number;
  colStart: number;
  colSpan: number;
}

export interface TimelineConfig {
  id: string;
  name: string;
  description: string;
  cost: string;
  items: TimelineItem[];
}

export const timelines: TimelineConfig[] = [
  {
    id: "Single",
    name: "Single Page",
    description: "A landing-page-focused website built for smaller-scale projects, designed to launch quickly and communicate important information.",
    cost: "1k",
    items: [
      {
        phase: "Strategy",
        duration: "1 week",
        rowStart: 1,
        colStart: 3,
        colSpan: 1,
      },
      {
        phase: "Development",
        duration: "2 weeks",
        rowStart: 2,
        colStart: 4,
        colSpan: 2,
      },
      {
        phase: "Test & Deploy",
        duration: "1 week",
        rowStart: 3,
        colStart: 6,
        colSpan: 1,
      },
    ],
  },
  {
    id: "MultiPage",
    name: "Multi-Page",
    description: "A service-focused website built for information, designed to elevate your brand and engage your audience.",
    cost: "3k",
    items: [
      {
        phase: "Strategy",
        duration: "2 weeks",
        rowStart: 1,
        colStart: 3,
        colSpan: 2,
      },
      {
        phase: "Development",
        duration: "4 weeks",
        rowStart: 2,
        colStart: 5,
        colSpan: 4,
      },
      {
        phase: "Test & Deploy",
        duration: "2 weeks",
        rowStart: 3,
        colStart: 9,
        colSpan: 2,
      },
    ],
  },
  {
    id: "Ecommerce",
    name: "E-commerce",
    description: "A sales-focused website built for online commerce, designed to drive revenue and support business growth.",
    cost: "5k",
    items: [
      {
        phase: "Strategy",
        duration: "2 weeks",
        rowStart: 1,
        colStart: 3,
        colSpan: 2,
      },
      {
        phase: "Development",
        duration: "6 weeks",
        rowStart: 2,
        colStart: 5,
        colSpan: 6,
      },
      {
        phase: "Test & Deploy",
        duration: "2 weeks",
        rowStart: 3,
        colStart: 11,
        colSpan: 2,
      },
    ],
  },
];
