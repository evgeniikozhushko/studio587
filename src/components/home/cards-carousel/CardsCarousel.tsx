"use client";

import React from "react"
import { Carousel, Card } from "@/components/ui/apple-cards-carousel"
import { projects } from "@/data/projects"
import ProjectCardContent from "../../projects/ProjectCardContent"

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