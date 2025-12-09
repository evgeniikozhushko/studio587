"use client";

import React, { Fragment } from "react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/layout/footer";
import { NavMenu } from "@/components/layout/nav-menu";
import processData from "@/data/processPageData";
import { Button } from "@/components/ui/button";
import { TimelineConfig, timelines } from "@/data/timelinesData";
import { Ghost } from "lucide-react";

export default function ProcessPage() {
  const [selectedTimeline, setSelectedTimeline] = useState<TimelineConfig>(
    timelines[0]
  );

  // Class mappings for dynamic Tailwind classes
  const colStartClasses: { [key: number]: string } = {
    1: "col-start-5 md:col-start-1",
    2: "col-start-5 md:col-start-2",
    3: "col-start-5 md:col-start-3",
    4: "col-start-5 md:col-start-4",
    5: "col-start-5 md:col-start-5",
    6: "col-start-5 md:col-start-6",
    7: "col-start-5 md:col-start-7",
    8: "col-start-5 md:col-start-8",
    9: "col-start-5 md:col-start-9",
    10: "col-start-5 md:col-start-10",
    11: "col-start-5 md:col-start-11",
    12: "col-start-5 md:col-start-12",
  };

  const colSpanClasses: { [key: number]: string } = {
    1: "col-span-1 md:col-span-1",
    2: "col-span-2 md:col-span-2",
    3: "col-span-2 md:col-span-3",
    4: "col-span-4 md:col-span-4",
    5: "col-span-3 md:col-span-5",
    6: "col-span-6 md:col-span-6",
    7: "col-span-4 md:col-span-7",
    8: "col-span-4 md:col-span-8",
    9: "col-span-5 md:col-span-9",
    10: "col-span-5 md:col-span-10",
    11: "col-span-6 md:col-span-11",
    12: "col-span-6 md:col-span-12",
  };

  const rowStartClasses: { [key: number]: string } = {
    1: "row-start-1 md:row-start-1",
    2: "row-start-2 md:row-start-2",
    3: "row-start-3 md:row-start-3",
    4: "row-start-4 md:row-start-4",
    5: "row-start-5 md:row-start-5",
    6: "row-start-6 md:row-start-6",
    7: "row-start-7 md:row-start-7",
    8: "row-start-8 md:row-start-8",
    9: "row-start-9 md:row-start-9",
    10: "row-start-10 md:row-start-10",
  };

  return (
    <div className="bg-backgroundTertiary text-foregroundTertiary fixed inset-0 overflow-auto">
      <NavMenu />
      <section className="grid w-full grid-cols-1 md:grid-cols-12 px-5 my-20 md:my-50 gap-y-4">
        <div className="text-sm uppercase col-span-1 mb-8">How we work</div>
        <div className="col-span-1 md:col-span-4 md:col-start-3 space-y-4 mb-8">
          <div className="text-lg md:text-lg font-medium col-span-1 md:col-span-12">
            At Studio 587 we build thoughtful, human-centric websites with a
            commitment to transparent timelines and clear pricing. Our open and
            honest approach keeps you informed every step of the way. We believe
            the best work comes from strong relationships, built on trust,
            communication, and collaboration. We value transparencyand
            collaboration onevery project.
          </div>
        </div>
        <div className="col-span-1 md:col-span-3 md:col-start-9 space-y-4">
          <div className="text-3xl md:text-3xl font-semibold col-span-1 md:col-span-12">
            We are bridging strategic creativity and advanced technology to
            build brands and digital platforms that connect audiences and drive
            growth.
          </div>
        </div>
      </section>

      {/* Timeline section */}
      <div className="grid w-full grid-cols-1 md:grid-cols-12 px-5 mb-10 md:mb-20">
        <div className="border-t border-gray-400 col-span-1 md:col-span-12 mb-20 md:my-20" />
        {/* <div className="grid w-full grid-cols-1 md:grid-cols-1 md:grid-rows-1 md:col-span-1 uppercase">
          Timeline
        </div> */}
        <div className="text-sm uppercase mb-10 md:mb-4 md:col-span-8">
          {selectedTimeline.description}
        </div>
        <div className="text-sm uppercase md:col-start-12 md:col-span-1 text-right self-end items-end hidden md:block">
          From
        </div>

        {/* Buttons to switch timelines */}
        <div className="col-span-1 md:col-span-12 flex justify-between items-center">
          <div className="flex flex-col md:flex-row gap-4 w-fit">
            {timelines.map((timeline) => (
              <Button
                key={timeline.id}
                onClick={() => setSelectedTimeline(timeline)}
                variant={"outlineTwo"}
                className={
                  selectedTimeline.id !== timeline.id ? "opacity-50" : ""
                }
              >
                {timeline.name}
              </Button>
            ))}
          </div>

          {/* Cost number*/}
          <div className="col-span-1 md:col-span-12 md:col-start-8 md:col-span-1 flex flex-col gap-4 items-center">
            <div className="text-sm uppercase block md:hidden">From</div>
            <div className="text-4xl">{selectedTimeline.cost}</div>
          </div>
        </div>

        {/* <div className="border-t border-gray-400 col-span-1 md:col-span-12 my-10 md:my-20" /> */}
        {/* <div className="col-span-1 md:col-span-12 md:col-start-8 md:col-span-1 flex gap-4 items-center">
            <div className="text-sm uppercase">From</div>
            <div className="text-4xl">{selectedTimeline.cost}</div>
          </div> */}

        {/* <Separator
          className="col-span-1 md:col-span-12 mt-6 md:mt-4"
          variant="primary"
        /> */}
      </div>

      {/* Timeline component */}
      <section className="grid w-full grid-cols-10 md:grid-cols-12 md:grid-rows-2 px-5 gap-y-2 my-0">
        {selectedTimeline.items.map((item, index) => (
          <React.Fragment key={index}>
            <div
              className={`text-xs uppercase col-start-1 col-span-4 md:col-span-1 ${
                rowStartClasses[item.rowStart]
              }`}
            >
              {item.phase}
              <div className="block md:hidden text-[10px] mt-1">
                {item.duration}
              </div>
            </div>
            <div
              className={`text-[8px] md:text-xs bg-background/4 ${
                colSpanClasses[item.colSpan]
              } ${rowStartClasses[item.rowStart]} ${
                colStartClasses[item.colStart]
              } border h-[60px] md:h-[80px] rounded-sm uppercase flex items-center justify-center`}
            >
              {/* {item.duration} */}
              <span className="hidden md:block">{item.duration}</span>
            </div>
          </React.Fragment>
        ))}
        {/* <Separator
          className="col-span-10 md:col-span-12 my-8 md:mt-20"
          variant="primary"
        /> */}
      </section>

      {/* The Process Section */}
      <section className="grid w-full grid-cols-1 md:grid-cols-12 px-5 mb-8 md:mt-10 gap-y-4">
        <div className="border-t border-gray-400 col-span-1 md:col-span-12 mt-20 md:mb-20" />
        <div className="text-sm uppercase col-span-1 my-10 md:my-0">
          The process
        </div>
        {processData.map((item: any, index: any) => (
          <div
            key={index}
            className="col-span-1 md:col-span-5 md:col-start-7 mb-20 md:mb-12"
          >
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
            {/* {index !== processData.length - 1 && <Separator className="mt-12" variant="primary" />} */}
          </div>
        ))}
        <div className="border-t border-gray-400 col-span-1 md:col-span-12 my-10 md:my-16" />
      </section>
      <Footer separatorVariant="primary" />
    </div>
  );
}

{
  /* <section className="grid w-full grid-cols-1 md:grid-cols-12 md:grid-rows-2 px-5 gap-y-2 my-0">
        <div className="text-xs grid w-full grid-cols-1 md:grid-cols-1 md:grid-rows-1 md:col-span-1 uppercase">
          Strategy
        </div>
        <div className="text-xs grid w-full grid-cols-1 md:grid-cols-1 md:grid-rows-1 md:col-span-1 md:col-start-3 gap-y-2 border h-[100px] rounded-sm uppercase text-center items-center">
          1 week
        </div>

        <div className="text-xs grid w-full grid-cols-1 md:grid-cols-1 md:grid-rows-1 md:col-span-1 md:row-start-2 uppercase">
          Development
        </div>
        <div className="text-xs grid w-full grid-cols-1 md:grid-cols-1 md:grid-rows-1 md:col-span-2 md:row-start-2 md:col-start-4 gap-y-2 border h-[100px] rounded-sm uppercase text-center items-center">
          2 weeks
        </div>

        <div className="text-xs grid w-full grid-cols-1 md:grid-cols-1 md:grid-rows-1 md:col-span-1 md:row-start-3 uppercase">
          Content
        </div>
        <div className="text-xs grid w-full grid-cols-1 md:grid-cols-1 md:grid-rows-1 md:col-span-1 md:row-start-3 md:col-start-6 gap-y-2 border h-[100px] rounded-sm uppercase text-center items-center">
          1 week
        </div>

        <div className="text-xs grid w-full grid-cols-1 md:grid-cols-1 md:grid-rows-1 md:col-span-1 md:row-start-4 uppercase">
          Test
        </div>
        <div className="text-xs grid w-full grid-cols-1 md:grid-cols-1 md:grid-rows-1 md:col-span-1 md:row-start-4 md:col-start-7 gap-y-2 border h-[100px] rounded-sm uppercase text-center items-center">
          1 week
        </div>
      </section> */
}

{
  /* <section className="grid w-full grid-cols-1 md:grid-cols-12 px-5 gap-y-4">
        <Separator className="col-span-1 md:col-span-12 my-10" variant="primary"/>
          <div className="col-span-1 md:col-span-6 space-y-4 mb-10">
            <div className="text-sm uppercase col-span-1 md:col-span-12">
            We believe in keeping things crystal clear, just like our pricing system
            </div>
            <div className="text-4xl md:text-5xl font-semibold col-span-1 md:col-span-12">
              Pricing
            </div>
            <Button className="mt-2 px-18">
              Start a project
            </Button>
          </div>
          <div className="col-span-1 md:col-span-2 md:col-start-9 md:row-start-1 flex flex-col gap-1">
            <div className="uppercase text-xs md:text-sm">Contact</div>
            <div className="text-md font-semibold md:text-lg">
              <a href="mailto:hello@studio587.ca">hello@studio587.ca</a>
            </div>
          </div>
        </section> */
}
