"use client";

import React from "react"
import { Carousel, Card } from "@/components/ui/apple-cards-carousel"
import { projects } from "@/data/projects"
import ProjectCardContent from "../projects/ProjectCardContent"

export function CardsCarousel() {
  // Transform our Project data into the Card format expected by the carousel
  const cards = projects.map((project, index) => (
    <Card
    key={project.slug}
    card={{
      src: project.cover.src,
      title: project.title,
      category: project.category,
      content: <ProjectCardContent project={project} /> //  expandable content when card is clicked
    }}
    index={index}
    />
  ))

  return (
    <section className="grid w-full grid-cols-1 md:grid-cols-12 px-5 gap-y-4">
      <div className="col-span-1 md:col-span-12 w-full h-full">
        <div className="col-span-1 md:col-span-12 space-y-4">
          <div className="text-sm uppercase col-span-1 md:col-span-12 space-y-4 mb-3">
            Featured work
          </div>
        </div>
        <div className="col-span-1 md:col-span-12 max-w-7xl text-xl md:text-3xl font-semibold text-neutral-800 dark:text-neutral-200 font-sans">
          Latest projects
        </div>
        <Carousel items={cards} />
      </div>
    </section>
  );
}

// const data = [
//   {
//     category: "Web dev",
//     title: "Bow Valley Climbing Access Society [BVCAS]",
//     src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     content: <DummyContent />,
//   },
//   {
//     category: "Productivity",
//     title: "Enhance your productivity.",
//     src: "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     content: <DummyContent />,
//   },
//   {
//     category: "Product",
//     title: "Launching the new Apple Vision Pro.",
//     src: "https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     content: <DummyContent />,
//   },

//   {
//     category: "Product",
//     title: "Maps for your iPhone 15 Pro Max.",
//     src: "https://images.unsplash.com/photo-1599202860130-f600f4948364?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     content: <DummyContent />,
//   },
//   {
//     category: "iOS",
//     title: "Photography just got better.",
//     src: "https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     content: <DummyContent />,
//   },
//   {
//     category: "Hiring",
//     title: "Hiring for a Staff Software Engineer",
//     src: "https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     content: <DummyContent />,
//   },
// ];

//   <section className="grid w-full grid-cols-1 md:grid-cols-12 px-5 gap-y-4">
//   <div className="col-span-1 md:col-span-12 w-full h-full py-20">
//     <div className="col-span-1 md:col-span-12 space-y-4">
//       <div className="text-sm uppercase col-span-1 md:col-span-12">
//         Featured work
//       </div>
//     </div>
//     <h2 className="col-span-1 md:col-span-12 max-w-7xl pl-4 mx-auto text-xl md:text-4xl font-semibold text-neutral-800 dark:text-neutral-200 font-sans">
//       Latest projects
//     </h2>
//     <Carousel items={cards} />
//   </div>
// </section>
