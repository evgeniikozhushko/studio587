"use client";

import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import processData from "@/data/processData";

export default function Process() {
  return (
    <>
      <section className="grid w-full grid-cols-1 md:grid-cols-12 px-5 my-20 md:my-50 gap-y-4">
        <div className="col-span-1 md:col-span-6 md:col-start-4 space-y-4 text-center">
          <div className="text-sm uppercase col-span-1">How we work</div>
          <div className="text-xl md:text-2xl font-semibold col-span-1 md:col-span-12">
            We work collaboratively with our clients to create brands,
            websites, and campaigns that shape how people connect and grow. Our
            partners are forward thinkers who see design and technology as
            engines for change—builders of futures and shapers of communities.
          </div>
        </div>
      </section>

      <section className="grid w-full grid-cols-1 md:grid-cols-12 px-5 mb-10 md:mb-30 gap-y-4">
      <Separator className="col-span-1 md:col-span-12 my-14 w-full"/>
      {/* <div className="col-span-1 md:col-span-12 my-14 border-t border-gray-700 h-[0.25px]" /> */}
      <div className="text-sm uppercase col-span-1 mb-14">What we do</div>
        {processData.map((item: any, index: any) => (
          <div
            key={index}
            className="col-span-1 md:col-span-5 md:col-start-7 mb-8 md:mb-12"
          >
            {/* { index !==0 && <Separator className="mb-12 w-full"/> } */}
           {/* <Separator className="mb-12 w-full"/>  */}
            <div className="flex gap-20">
              <div className="text-sm md:text-sm flex-shrink-0">
                {item.order}
              </div>
              <div className="space-y-2 text-start">
                <div className="text-sm uppercase">{item.type}</div>
                <div className="text-lg md:text-3xl font-semibold">{item.title}</div>
                <div className="text-sm md:text-sm">{item.description}</div>
              </div>
            </div>
          </div>
        ))}
        <Separator className="col-span-1 md:col-span-12 my-10" />
      </section>
    </>
  );
}
