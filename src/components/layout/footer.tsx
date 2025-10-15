import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="grid w-full grid-cols-1 md:grid-cols-12 px-5 gap-y-4 mt-20">
      <div className="container md:col-span-6">
      <div className="text-sm uppercase col-span-1 pb-4">Studio 587 is a design and technology hub   that builds brands and websites.</div>
        <p className="text-start text-xs">
          &copy; {new Date().getFullYear()} Studio 587. All rights reserved.
        </p>
      </div>
      <div className="text-[18rem] leading-none font-bold uppercase col-span-1 md:col-span-12 text-center">Studio 587</div>
    </footer>
  );
}
