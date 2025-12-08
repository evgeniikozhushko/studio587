"use client";

import { NavMenu } from "@/components/layout/nav-menu";
import Footer from "@/components/layout/footer";

import React from "react";

const studioPage = () => {
  return (
    <div className="bg-foreground text-foregroundTertiary fixed inset-0 overflow-auto">
      <NavMenu />
      <section className="grid w-full grid-cols-1 md:grid-cols-12 px-5 my-20 md:my-20 gap-y-4">
        <div className="text-sm uppercase col-span-6 mb-8">
          Studio 587 is based in Canmore, Alberta, Canada and operates at a Bow
          Valley, Provincial, National and Global scale. We are a digital
          technology studio that builds brand and websites.
        </div>

        <div className="col-span-1 md:col-span-4 md:col-start-3 space-y-4">
          <div className="text-xl md:text-3xl font-semibold col-span-1 md:col-span-12">
            We work collaboratively with our clients to create brands, websites,
            and campaigns that shape how people connect and grow. Our partners
            are forward thinkers who see design and technology as engines for
            change—builders of futures and shapers of communities.
          </div>
        </div>

        <div className="col-span-1 md:col-span-4 md:col-start-3 space-y-4 my-8">
          <div className="text-md md:text-md font-medium col-span-1 md:col-span-12">
            At 587 Labs, we work fast, but we’re intentional with every
            decision. Curiosity and creativity drive our process, while
            practicality keeps us rooted in what actually works.
            Every brand and
            website we build is crafted with performance, accessibility, and a
            distinct sense of personality. We don’t get caught up in unnecessary
            processes or endless meetings. Instead, we collaborate closely and
            hands-on, working as an extension of your team to move projects
            forward with clarity and momentum. We’re a small, independent studio
            with big ideas—focused on outcomes, not overhead, and dedicated to
            delivering work that makes a clear, measurable impact for the people
            and organizations we partner with.
          </div>
        </div>
        <div className="border-t border-gray-400 col-span-1 md:col-span-12 md:my-20" />
      </section>

      <Footer />
    </div>
  );
};

export default studioPage;
