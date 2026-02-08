"use client";

import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/app/components/animated-counter";
import { AnimatedText } from "@/app/components/animated-text";

export default function Contact() {
  const handleEmailClick = () => {
    const email = "hello@studio587.ca";
    const subject = "Studio587.ca";

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}`;
  };

  return (
    <>
      <main className="my-0 space-y-24 my-20 md:my-20">
        <section className="grid w-full grid-cols-1 md:grid-cols-12 px-5 gap-y-4">
          <div className="col-span-1 md:col-span-6 space-y-4 mb-0">
            {/* <div className="text-sm uppercase col-span-1 md:col-span-12">
              Your growth is our growth.
            </div> */}
            {/* <div className="text-4xl md:text-5xl font-semibold col-span-1 md:col-span-12 bg-gradient-to-br from-neutral-900 to-neutral-500 bg-clip-text text-transparent pb-1">
              587 reasons to work together
            </div> */}
          <div className="col-span-12 md:col-span-4 md:col-start-1 flex flex-col items-start md:items-start gap-2">
              <AnimatedCounter
                target={587}
                duration={[2000, 3500, 4000]}
                spinCycles={[4, 3, 2]}
                pauseDuration={10000}
                className="text-primary"
              />
              <AnimatedText
                text="Reasons to work together"
                duration={2000}
                className="text-primary"
              />
            </div>
            <Button className="mt-2 px-18 glow-on-hover" onClick={handleEmailClick}>
              Get started
            </Button>
          </div>
          <div className="col-span-1 md:col-span-2 md:col-start-9 md:row-start-1 flex flex-col gap-1">
            <div className="uppercase text-xs md:text-sm">Contact</div>
            <div className="text-md font-semibold md:text-lg">
              <a href="mailto:hello@studio587.ca">hello@studio587.ca</a>
            </div>
          </div>
          <div className="border-t border-gray-400 col-span-1 md:col-span-12 mt-20 md:mt-50" />
        </section>

        {/* // Working with text under eachoner */}
        {/* <section className="h-screen w-full grid grid-cols-1 md:grid-cols-12 px-5 items-center">
          <div className="col-span-12 md:col-span-4 md:col-start-5 flex flex-col items-center md:items-start gap-2">
            <AnimatedCounter
              target={587}
              duration={[2000, 3500, 4000]}
              spinCycles={[4, 3, 2]}
              pauseDuration={10000}
              className="text-primary"
            />
            <AnimatedText
              text="Reasons to work together"
              duration={2000}
              className="text-primary"
            />
          </div>
        </section> */}

        {/* <section className="h-screen w-full grid grid-cols-1 md:grid-cols-12 px-5">
        <div className="col-span-1 md:col-span-4 md:col-start-8 md:row-start-2 h-32 md:h-48 lg:h-64">
          <AnimatedCounter target={587} duration={[2000, 3500, 4000]} spinCycles={[4, 3, 2]} pauseDuration={10000} className="text-primary" />
        </div>
        <div className="col-span-1 md:col-span-4 md:col-start-8 md:row-start-3 h-24 md:h-32">
          <AnimatedText text="Reasons to work together" duration={2000} className="text-primary" />
        </div>
        </section> */}
      </main>
    </>
  );
}
