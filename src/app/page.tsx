import Image from "next/image";
import { NavMenu } from "@/components/layout/nav-menu"
import Footer from "@/components/layout/footer"
import Hero from "@/components/home/hero/Hero"
import { CardsCarousel } from "@/components/home/cards-carousel/CardsCarousel"

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
