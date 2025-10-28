"use client";

import { Separator } from "@/components/ui/separator";
import Footer from "@/components/layout/footer";
import { NavMenu } from "@/components/layout/nav-menu";
import Process from "@/components/home/process/Process";
import processData from "@/data/processPageData";

export default function ProcessPage() {
  return (
    <div className="bg-backgroundTertiary text-foregroundTertiary fixed inset-0 overflow-auto">
      <NavMenu />
        <section className="grid w-full grid-cols-1 md:grid-cols-12 px-5 my-20 md:my-50 gap-y-4">
          <div className="text-sm uppercase col-span-1">How we work</div>
          <div className="col-span-1 md:col-span-4 md:col-start-3 space-y-4">
            <div className="text-xl md:text-lg font-medium col-span-1 md:col-span-12">
              At Studio 587 we build thoughtful, human-centric websites with a commitment to
              transparent timelines and clear pricing. Our open and honest
              approach keeps you informed every step of the way. We believe the
              best work comes from strong relationships, built on trust,
              communication, and collaboration. We value transparencyand
              collaboration onevery project.
            </div>
          </div>
          <div className="col-span-1 md:col-span-3 md:col-start-9 space-y-4">
            <div className="text-xl md:text-3xl font-semibold col-span-1 md:col-span-12">
              We are bridging strategic creativity and advanced technology to
              build brands and digital platforms that connect audiences and
              drive growth.
            </div>
          </div>
        </section>

        <section className="grid w-full grid-cols-1 md:grid-cols-12 px-5 mb-10 md:mb-10 gap-y-4">
        <div className="text-sm uppercase col-span-1">The process</div>
          {processData.map((item: any, index: any) => (
            <div
              key={index}
              className="col-span-1 md:col-span-5 md:col-start-7 mb-8 md:mb-12"
            >
              <Separator className="mb-12" variant="primary"/>
              <div className="flex gap-20">
                <div className="text-sm md:text-sm flex-shrink-0">
                  {item.order}
                </div>
                <div className="space-y-2 text-start">
                  <div className="text-sm uppercase">{item.type}</div>
                  <div className="text-lg md:text-3xl font-semibold">
                    {item.title}
                  </div>
                  <div className="text-sm md:text-sm">{item.description}</div>
                </div>
              </div>
            </div>
          ))}
          <Separator className="col-span-1 md:col-span-12 my-10" variant="primary"/>
        </section>
      <Footer separatorVariant="primary"/>
    </div>
  );
}
