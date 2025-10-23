"use client";

import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <>
      <main className="my-24 space-y-24 md:my-50 md:space-y-48">
        <section className="grid w-full grid-cols-1 md:grid-cols-12 px-5 gap-y-4">
          <div className="col-span-1 md:col-span-6 space-y-4">
            <div className="text-sm uppercase col-span-1 md:col-span-12">
              Some catchy text
            </div>
            <div className="text-4xl md:text-5xl font-semibold col-span-1 md:col-span-12">
              587 reasons to work together
            </div>
            <Button className="mt-2">Start a project</Button>
          </div>
          <div className="col-span-1 md:col-span-2 md:col-start-9 md:row-start-1 flex flex-col gap-1">
            <div className="uppercase text-xs md:text-sm">Contact</div>
            <div className="text-md font-semibold md:text-lg">evgeniimedium@gmail.com</div>
          </div>
        </section>
      </main>
    </>
  );
}
