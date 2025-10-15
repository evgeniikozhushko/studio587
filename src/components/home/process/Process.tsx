"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <>
      <section className="grid w-full grid-cols-1 md:grid-cols-12 px-5 my-40 gap-y-4">
        <div className="col-span-1 md:col-span-6 md:col-start-4 space-y-4 text-center">
          <div className="text-sm uppercase col-span-1">How we work</div>
          <div className="text-xl md:text-2xl font-semibold col-span-1 md:col-span-12">
            We work collaboratively with our clients to create brands,
            webspaces, and campaigns that shape how people connect and grow. Our
            partners are forward thinkers who see design and technology as
            engines for change—builders of futures and shapers of communities.
          </div>
        </div>
      </section>
    </>
  );
}
