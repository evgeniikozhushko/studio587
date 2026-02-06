"use client";

import { NavMenu } from "@/components/layout/nav-menu";
import Footer from "@/components/layout/footer";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import EmailCaptureCard from "@/components/ui/email-capture-card"

import React from "react";

const studioPage = () => {
  const handleEmailClick = () => {
    const email = "hello@studio587.ca";
    const subject = "Studio587.ca";

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}`;
  };

  return (
    <div className="bg-foreground text-foregroundTertiary fixed inset-0 overflow-auto">
      <NavMenu />
      <section className="grid w-full grid-cols-1 md:grid-cols-12 px-5 my-20 md:my-20 gap-y-4">
        {/* Intro */}
        <div className="col-span-1 md:col-span-12">
          <div className="text-sm uppercase md:w-1/2 mb-10 md:mb-20">
            Studio 587 is based in Canmore, Alberta, Canada and operates at a
            Bow Valley, Provincial, National and Global scale. We are a digital
            technology studio that builds brand and websites.
          </div>
        </div>

        {/* Mission Statement */}
        <div className="col-span-1 md:col-span-12 grid md:grid-cols-12 mb-14 md:mb-30">
          {/* <div className="text-xl md:text-3xl font-semibold col-span-1 md:col-span-6 md:col-start-3">
            We work collaboratively with our clients to create brands, websites,
            and campaigns that shape how people connect and grow. Our partners
            are forward thinkers who see design and technology as engines for
            change—builders of futures and shapers of communities.
          </div> */}
          <div className="text-xl md:text-3xl font-semibold col-span-1 md:col-span-6 md:col-start-3 bg-gradient-to-r from-neutral-50 to-neutral-500 bg-clip-text text-transparent">
            We work collaboratively with our clients to create brands, websites,
            and campaigns that shape how people connect and grow. Our partners
            are forward thinkers who see design and technology as engines for
            change—builders of futures and shapers of communities.
          </div>
        </div>

        {/* How we work */}
        <div className="col-span-1 md:col-span-12 grid md:grid-cols-12 gap-y-4 mb-14 md:mb-20">
          <div className="border-t border-gray-400 col-span-1 md:col-span-12 mb-10" />
          <div className="text-sm uppercase col-span-1 md:col-span-2">
            How we work
          </div>
          <div className="text-md font-medium col-span-1 md:col-span-4 md:col-start-3 md:mb-0">
            At Studio 587, we work fast, but we're intentional with every
            decision. Curiosity and creativity drive our process, while
            practicality keeps us rooted in what actually works.
            <br />
            <br />
            Every brand and website we build is crafted with performance,
            accessibility, and a distinct sense of personality. We don't get
            caught up in unnecessary processes or endless meetings. Instead, we
            collaborate closely and hands-on, working as an extension of your
            team to move projects forward with clarity and momentum.
            <br />
            <br />
            We're a small, independent studio with big ideas, focused on
            outcomes, not overhead, and dedicated to delivering work that makes
            a clear, measurable impact for the people and organizations we
            partner with.
          </div>
        </div>

        {/* What we want */}
        <div className="col-span-1 md:col-span-12 grid md:grid-cols-12 gap-y-4 mb-14 md:mb-30">
          <div className="text-sm uppercase col-span-1 md:col-span-2">
            What we want
          </div>
          <div className="text-md font-medium col-span-1 md:col-span-4 md:col-start-3">
            We want to make the web a better place – simpler, smarter, and more
            accessible for everyone.
            <br />
            <br />
            That means creating websites that aren't just beautiful, but
            functional. Websites that help brands tell their story, reach the
            right people, and achieve real results.
            <br />
            <br />
            We create work that lasts. Rather than chasing trends or relying on
            cookie-cutter templates, we build foundations that grow and evolve
            with your business over time.
          </div>
        </div>

        {/* Services */}
        <div className="col-span-1 md:col-span-12 grid md:grid-cols-12 gap-y-4 md:grid-flow-dense mb-10 md:mb-20">
          <div className="border-t border-gray-400 col-span-1 md:col-span-12 mb-10 md:hidden" />
          {/* <div className="text-sm uppercase col-span-1 md:col-span-5 md:col-start-2 flex justify-center md:row-span-2">
          <Image
              src="/Studio587_work.png"
              alt="Evgenii Kozhushko, Studio 587"
              width={800}
              height={800}
              className="w-full h-auto"
            />
          </div> */}
          <div className="text-sm uppercase col-span-1 md:col-span-2 md:col-start-8">
            Services
          </div>
          <div className="col-span-1 md:col-span-2 md:col-start-8 mb-14">
            <ul className="text-md font-medium">
              <li>Frontend Development</li>
              <li>Backend Development</li>
              <li>eCommerce Development</li>
              <li>API Development</li>
              <li>Technical Consulting</li>
              <li>Project Scoping</li>
              <li>Device Testing</li>
              <li>UX Design</li>
              <li>UI Design</li>
            </ul>
          </div>

          <div className="text-sm uppercase col-span-1 md:col-span-2 md:col-start-10">
            Capabilities
          </div>
          <div className="col-span-1 md:col-span-3 md:col-start-10">
            <ul className="text-md font-medium">
              <li>Static Websites</li>
              <li>Headless Websites</li>
              <li>API Integrations</li>
              <li>3rd Party Integrations</li>
              <li>Shopify</li>
              <li>Webflow</li>
              <li>Framer</li>
              <li>Stripe</li>
            </ul>
          </div>
        </div>

        {/* Who we are */}
        <div className="col-span-1 md:col-span-12 grid md:grid-cols-12 gap-y-4 md:mb-30">
          <div className="border-t border-gray-400 col-span-1 md:col-span-12 mb-10" />

          <div className="text-sm uppercase col-span-1 md:col-span-2">
            Who we are
          </div>

          <div className="text-sm uppercase col-span-1 md:col-span-2 md:col-start-3 mb-4 md:mb-0">
            Evgenii Kozhushko
            <div className="text-xs uppercase col-span-1 md:col-span-2 md:col-start-3">
              Founder & Creative / Technical Lead
            </div>
          </div>
          <div className="text-md font-medium col-span-1 md:col-span-4 md:col-start-3 mb-8 md:mb-0">
            With years of experience supporting local businesses, non-profits,
            and growing teams across Alberta, Evgenii Kozhushko is the founder
            and creative lead behind Studio 587. His work spans digital design,
            branding, and modern web development for organizations operating in
            tourism, outdoor recreation, community services, and small business
            sectors throughout the Bow Valley. This experience has shaped a
            practice that values clarity, longevity, and design solutions that
            feel grounded in place—reflecting both the culture of the region and
            the ambitions of the businesses within it.
            <br />
            <br />
            At the core of Studio 587’s approach is the integration of strong
            visual design and modern, scalable technology. As a designer,
            Evgenii brings a refined visual sensibility to every project, with
            expertise across logo design, typography, color systems, layout, and
            brand storytelling. This design-first foundation ensures that each
            website or digital product is visually cohesive, purposeful, and
            aligned with the client’s broader brand identity—creating
            experiences that are not only functional, but memorable and
            distinctive in competitive markets.
            <br />
            <br />
            Known for a detail-oriented approach, modern design sensibility, and
            thoughtful problem-solving, Evgenii guides Studio 587 with a focus
            on building digital work that lasts. Every project is approached
            with an understanding of Alberta’s local market—balancing aesthetic
            quality, technical rigor, and practical business goals to deliver
            digital solutions that support growth, credibility, and long-term
            success.
          </div>
          {/* <div className="text-md font-medium col-span-1 md:col-span-4 md:col-start-3 mb-8 md:mb-0">
            With years of experience supporting local businesses, non-profits,
            and growing teams across Alberta, Evgenii has worked on digital and
            branding projects that span tourism, outdoor recreation, community
            services, and small business development in the Bow Valley. His
            practice blends visual design and modern web development, creating
            scalable systems that feel grounded in the character and culture of
            the communities he serves.
            <br />
            <br />
            As both a designer and a developer, Evgenii brings a rare
            combination of aesthetic sensitivity and technical precision. He
            specializes in building clean, performant, and accessible websites
            supported by thoughtful branding and strong visual foundations. His
            design expertise includes logo creation, typography, color systems,
            layout design, and brand storytelling—ensuring every website is not
            only functional but visually cohesive and memorable.
            <br />
            <br />
            On the development side, he works with advanced frameworks like
            React and Next.js, flexible CMS platforms, and API-driven
            architectures that are easy for teams to manage and built for
            long-term growth. Evgenii collaborates closely with business owners,
            creative teams, and local organizations to refine ideas, streamline
            user experiences, and elevate brand presence online. He is known for
            his detail-oriented approach, modern design sensibility, and
            commitment to delivering clean, maintainable code tailored to the
            needs of Alberta’s market.
          </div> */}
        </div>

        {/* Me */}
        <div className="col-span-1 md:col-span-12 grid md:grid-cols-12 gap-y-4 md:grid-flow-dense md:mb-30">
          <div className="col-span-1 md:col-span-2 md:col-start-8">
            <Image
              src="/Evgenii_Studio587_Web Development_Canmore_Bow Valley.jpg"
              alt="Evgenii Kozhushko, Studio 587"
              width={800}
              height={800}
              className="w-full h-auto"
            />
          </div>

          <div className="text-sm uppercase col-span-1 md:col-span-2 md:col-start-10 flex justify-center">
            <Image
              src="/Studio587_Canmore_Web_Development.svg"
              alt="Studio 587"
              width={80}
              height={80}
              className=""
            />
          </div>
          <div className="text-sm uppercase col-span-1 md:col-span-2 md:col-start-8 md:mt-8 mb-8 md:mb-0">
            Work with us
            <div
              onClick={handleEmailClick}
              className="text-xs uppercase col-span-1 md:col-span-2 md:col-start-3 cursor-pointer hover:underline"
            >
              hello@studio587.ca
            </div>
          </div>
        </div>

        <div className="border-t border-gray-400 col-span-1 md:col-span-12 md:my-10" />

        {/* Email Capture Card */}
        <div className="col-span-1 md:col-span-4 md:col-start-1 my-12">
          <EmailCaptureCard
            headline="Stay connected"
            description="Studio notes, shared occasionally."
            successMessage="Thanks for subscribing!"
            privacyNote="We respect your privacy. Unsubscribe anytime."
          />
        </div>

        <div className="border-t border-gray-400 col-span-1 md:col-span-12 md:my-10" />
      </section>

      <Footer />
    </div>
  );
};

export default studioPage;
