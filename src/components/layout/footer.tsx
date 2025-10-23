import React from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="grid w-full grid-cols-1 md:grid-cols-12 px-5 gap-y-4">
      <Separator className="col-span-1 md:col-span-12 my-10" />

      <div className="col-span-1 md:col-span-10 mb-10 uppercase">
        Bridging strategic creativity and advanced technology to build brands
        and digital platforms that connect audiences and drive growth.
      </div>
      <div className="text-xs md:col-span-2">
        &copy; {new Date().getFullYear()} Studio 587. All rights reserved.
      </div>

      <div className="text-[4rem] sm:text-[6rem] md:text-[10rem] lg:text-[14rem] xl:text-[18rem] leading-none font-bold uppercase col-span-1 md:col-span-12 text-center">
        Studio 587
      </div>
    </footer>
  );
}

// <footer className="grid w-full grid-cols-1 md:grid-cols-12 px-5 gap-y-4 mt-10 md:mt-20">
//       <Separator className="col-span-1 md:col-span-12 my-10" />

//       <div className="col-span-1 md:col-span-12">
//         <div className="text-sm uppercase pb-4 text-center">
//           Bridging strategic creativity and advanced technology to build brands
//           and digital platforms that connect audiences and drive growth.
//         </div>
//       </div>

//       <div className="col-span-1 md:col-span-12">
//         {/* <Separator className="m-10" /> */}
//         <div className="text-[4rem] sm:text-[6rem] md:text-[10rem] lg:text-[14rem] xl:text-[18rem] leading-none font-bold uppercase col-span-1 md:col-span-12 text-center">
//           Studio 587
//         </div>
//         <div className="text-center text-xs m-10">
//           &copy; {new Date().getFullYear()} Studio 587. All rights reserved.
//         </div>
//       </div>
//     </footer>
