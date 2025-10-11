import Image from "next/image";
import { NavMenu } from "@/components/layout/nav-menu"
import Footer from "@/components/layout/footer"
import Hero from "@/components/home/hero/page"
import { CardsCarousel } from "@/components/cards-carousel/page"

export default function Home() {
  return (
    <>
     <NavMenu />
     <Hero />
     <CardsCarousel />
     <Footer />
    </>
  );
}
