"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Project } from "@/types/project";

export default function ProjectCardContent({ project }: { project: Project }) {
  const cta = project.cta;

  return (
    <div className="space-y-6">

      {/* Summary section */}
      {project.summary && (
        <div className="text-lg dark:text-neutral-300">
          {project.summary}
        </div>
      )}

      {/* Details section */}
      {project.details && (
        <div className=" dark:bg-neutral-800">
          {/* <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-6 rounded-sm"> */}
          <p className="dark:text-neutral-400 text-sm">
            {project.details}
          </p>
        </div>
      )}

      {/* Details section */}
      {project.additionalDetails && (
        <div className=" dark:bg-neutral-800">
          {/* <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-6 rounded-sm"> */}
          <p className="dark:text-neutral-400 text-sm">
            {project.additionalDetails}
          </p>
        </div>
      )}

      {/* Tags section */}
      {project.tags && project.tags.length > 0 && (
        <div>
          <h3 className="text-xs dark:text-neutral-300s mb-2 mt-10 uppercase">
            Technology
          </h3>
          <ul className="flex flex-wrap gap-2 capitalize">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="px-3 py-1 text-sm border rounded-sm"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Industry section */}
      {project.industry && (
        <div>
          <h3 className="text-xs dark:text-neutral-300 mb-2 mt-4 uppercase">
            Industry
          </h3>
          <ul className="flex flex-wrap gap-2">
            {project.industry.map((industry) => (
              <li
                key={industry}
                className="px-3 py-1 text-sm border rounded-sm"
              >
                {industry}
              </li>
            ))}
          </ul>
        </div>
      )}

      {project.year && (
        <div>
          <h3 className="text-xs dark:text-neutral-300 mb-2 mt-4 uppercase">
            Year
          </h3>
          <ul className="flex flex-wrap gap-2">
            {project.year.map((year) => (
              <li
                key={year}
                className="px-3 py-1 text-sm border rounded-sm"
              >
                {year}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Gallery section */}
      {/* {project.gallery && project.gallery.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 uppercase">
            Project Gallery
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.gallery.map((image, idx) => (
              <div
                key={idx}
                className="relative aspect-video rounded-sm overflow-hidden"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )} */}

      {/* Call to action */}
      {cta && (
        // <div className="pt-4">
        //   <a
        //     href={project.cta.href}
        //     target="_blank"
        //     rel="noopener noreferrer"
        //     className="inline-block px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-sm font-medium hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-colors"
        //   >
        //     {project.cta.label} →
        //   </a>
        // </div>

        <Button
          type="button"
          onClick={() => window.open(cta.href, "_blank", "noopener,noreferrer")}
          className="inline-block text-sm px-10 mt-4 glow-on-hover"
        >
          {cta.label} →
        </Button>
      )}
    </div>
  );
}
