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
  items: TimelineItem[];
}

export const timelines: TimelineConfig[] = [
  {
    id: "Single",
    name: "Single Page",
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
