"use client";

import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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
          <div className="col-span-1 md:col-span-6 space-y-4 mb-10">
            <div className="text-sm uppercase col-span-1 md:col-span-12">
              Your growth is our growth.
            </div>
            <div className="text-4xl md:text-5xl font-semibold col-span-1 md:col-span-12">
              587 reasons to work together
            </div>
            <Button className="mt-2 px-18" onClick={handleEmailClick}>
              Start a project
            </Button>
          </div>
          <div className="col-span-1 md:col-span-2 md:col-start-9 md:row-start-1 flex flex-col gap-1">
            <div className="uppercase text-xs md:text-sm">Contact</div>
            <div className="text-md font-semibold md:text-lg">
              <a href="mailto:hello@studio587.ca">hello@studio587.ca</a>
            </div>
            <div className="border-t border-gray-400 col-span-1 md:col-span-12 mt-20 md:my-20" />
          </div>
        </section>
      </main>
    </>
  );
}
