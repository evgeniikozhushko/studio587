"use client";

import { Separator } from "@/components/ui/separator";
import Footer from "@/components/layout/footer";
import { NavMenu } from "@/components/layout/nav-menu";
import Process from "@/components/home/process/Process";

export default function ProcessPage() {
  return (
    <>
      <div className="backgroundSecondary">
        <NavMenu />
        <Process />
        <Footer />
      </div>
    </>
  );
}
