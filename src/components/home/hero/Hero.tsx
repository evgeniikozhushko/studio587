"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AnimatedCounter } from "@/app/components/animated-counter";
import { AnimatedText } from "@/app/components/animated-text";

export default function Hero() {
  const handleEmailClick = () => {
    const email = "hello@studio587.ca";
    const subject = "Studio587.ca";

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}`;
  };

  return (
    <>
      <main className="my-20 space-y-24 md:my-48 md:space-y-48">
        <section className="min-h-screen grid w-full grid-cols-1 md:grid-cols-12 px-5">
          <div className="col-span-1 md:col-span-6 md:col-start-6 gap-y-0">
          {/* <AnimatedCounter target={587} duration={[2000, 3500, 4000]} spinCycles={[4, 3, 2]} pauseDuration={10000} className="text-primary" />
          <AnimatedText text="Reasons to work together" duration={2000} className="text-primary" /> */}
          </div>
          {/* <div className="col-span-1 md:col-span-6 md:col-start-6">
          <AnimatedText text="Reasons to work together" duration={2000} className="text-primary" />
          </div> */}
          {/* <div className="col-span-1 md:col-span-6 md:col-start-8">
            <AnimatedText
              // text="REASONS TO WORK TOGETHER"
              text="Reasons to work together"
              duration={2000}
              className="text-primary"
            />
          </div> */}
        </section>
        <section className="grid w-full grid-cols-1 md:grid-cols-12 px-5 gap-y-4">
          <div className="col-span-1 md:col-span-6 space-y-4">
            <div className="text-sm uppercase col-span-1 md:col-span-12">
              Brand Design & Web Development for Culture, Technology, and
              Commerce.
            </div>
            <div className="text-4xl md:text-5xl font-semibold col-span-1 md:col-span-12">
              Building the next generation of brands, experiences && growth.
            </div>
          </div>

          {/* <div className="col-span-1 md:col-span-2 md:col-start-9 md:row-start-1 md:row-span-2 uppercase text-xs md:text-sm">
            Servicing Canmore, Banff, Bow Valley, Alberta, and clients globally.
          </div> */}

          <div className="col-span-1 md:col-span-2 md:col-start-9 md:row-start-1 flex flex-col gap-2 items-start">
            <div className="hidden md:block uppercase text-xs md:text-sm">
              Servicing Canmore, Banff, Bow Valley, Alberta, and clients
              globally.
            </div>
            <Button className="mt-2 px-18" onClick={handleEmailClick}>
              Start a project
            </Button>

            <div className="md:hidden uppercase text-xs md:text-sm mt-16">
              Servicing Canmore, Banff, Bow Valley, Alberta, and clients
              globally.
            </div>

            <Separator className="col-span-1 mt-14 md:hidden" />
          </div>
        </section>
      </main>
    </>
  );
}
