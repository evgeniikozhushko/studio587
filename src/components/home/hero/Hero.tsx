"use client";
import Image from "next/image";

export default function Hero() {
  return (
    <>
      <main className="my-24 space-y-24 md:my-48 md:space-y-48">
        <section className="grid w-full grid-cols-1 md:grid-cols-12 px-5 gap-y-4">
          <div className="col-span-1 md:col-span-6 space-y-4">
            <div className="text-sm uppercase col-span-1 md:col-span-12">
              Creative Design & Web Development for Culture, Technology, and
              Commerce.
            </div>
            <div className="text-4xl md:text-5xl font-semibold col-span-1 md:col-span-12">
              Building the next generation of brands, experiences && growth.
            </div>
          </div>
          <div className="col-span-1 md:col-span-2 md:col-start-9 md:row-start-1 md:row-span-2 uppercase text-sm">
            Servicing Canmore, Banff, Bow Valley, Alberta, and clients globally.
          </div>
        </section>
      </main>
    </>
  );
}
