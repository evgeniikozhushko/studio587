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
      {/* <main className="my-20 space-y-24 md:my-48 md:space-y-48"> */}
      <main className="space-y-0">
        {/* <section className="h-screen w-full grid grid-cols-1 md:grid-cols-12 px-5 items-center">
          <div className="col-span-12 md:col-span-4 md:col-start-9 flex flex-col items-center md:items-start gap-2">
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

        <section className="grid w-full grid-cols-1 md:grid-cols-12 px-5 gap-y-4 md:my-60">
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

            <Separator className="col-span-1 mt-14 mb-6 md:hidden" />
          </div>
        </section>
      </main>
    </>
  );
}
