"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
// import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// const components: { title: string; href: string; description: string }[] = [
//   {
//     title: "Alert Dialog",
//     href: "/docs/primitives/alert-dialog",
//     description:
//       "A modal dialog that interrupts the user with important content and expects a response.",
//   },
//   {
//     title: "Hover Card",
//     href: "/docs/primitives/hover-card",
//     description:
//       "For sighted users to preview content available behind a link.",
//   },
//   {
//     title: "Progress",
//     href: "/docs/primitives/progress",
//     description:
//       "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
//   },
//   {
//     title: "Scroll-area",
//     href: "/docs/primitives/scroll-area",
//     description: "Visually or semantically separates content.",
//   },
//   {
//     title: "Tabs",
//     href: "/docs/primitives/tabs",
//     description:
//       "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
//   },
//   {
//     title: "Tooltip",
//     href: "/docs/primitives/tooltip",
//     description:
//       "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
//   },
// ];

export function NavMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Navigation (≥768px) */}
      {/* <div className="hidden md:block sticky top-0 z-50 py-2"> */}
      <div
        // className={`hidden md:block sticky top-0 z-50 py-2 ${pathname === "/studio" ? "dark" : "" }`}
        className={'hidden md:block sticky top-0 z-50 py-2'}
      >
        <NavigationMenu viewport={false} className="my-2 mx-2">
          <NavigationMenuList className="gap-4 md:gap-14">
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={`font-semibold uppercase ${pathname === "/process" ? "bg-backgroundTertiary" :
                  ""} ${pathname === "/studio" ? "dark" : ""}`}
              >
                Studio 587
              </NavigationMenuTrigger>

              <NavigationMenuContent>
                <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-2">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full flex-col justify-center items-center rounded-sm p-6 no-underline outline-hidden select-none 
  focus:shadow-md bg-linear-to-b from-muted/100 to-muted/40 hover:bg-linear-to-r"
                        href="/"
                      >
                        {/* <div className="mt-4 mb-2 text-md font-medium text-foreground">
                          Bring it home
                        </div> */}
                        <Image
                          src="/Studio587.svg"
                          alt="Studio 587"
                          width={100}  
                          height={100}
                          className=""
                        />
                        {/* <p className="text-muted-foreground text-sm leading-tight">
                          Bring it home
                        </p> */}
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem
                    href="/process"
                    title="Process"
                    linkClassName="bg-backgroundTertiary hover:bg-backgroundTertiary/90"
                    titleClassName="text-white"
                    textClassName="text-neutral-300"
                  >
                    A structured, collaborative approach to every project.
                  </ListItem>
                  <ListItem
                    href="/studio"
                    title="Studio"
                    // linkClassName="bg-foreground hover:bg-foreground/80"
                    linkClassName="bg-foreground hover:bg-foreground/90"
                    titleClassName="text-white"
                    textClassName="text-neutral-400"
                  >
                    A design-led studio for modern websites and digital systems.
                  </ListItem>

                  {/* <ListItem href="/contact" title="Contact">
                  Because great projects deserve attention.
                </ListItem> */}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* <NavigationMenuItem>
            <NavigationMenuTrigger className="font-light uppercase">
              Components
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem> */}

            {/* <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={`${navigationMenuTriggerStyle()} font-light uppercase`}
            >
              <Link href="/docs">Docs</Link>
            </NavigationMenuLink>
          </NavigationMenuItem> */}

            {/* <NavigationMenuItem>
            <NavigationMenuTrigger className="font-light uppercase">
              List
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[300px] gap-4">
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="#">
                      <div className="font-medium">Components</div>
                      <div className="text-muted-foreground">
                        Browse all components in the library.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="#">
                      <div className="font-medium">Documentation</div>
                      <div className="text-muted-foreground">
                        Learn how to use the library.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="#">
                      <div className="font-medium">Blog</div>
                      <div className="text-muted-foreground">
                        Read our latest blog posts.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem> */}

            {/* <NavigationMenuItem>
            <NavigationMenuTrigger className="font-light uppercase">
              Simple
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-4">
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="#">Components</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="#">Documentation</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="#">Blocks</Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem> */}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="grid grid-cols-12 px-5 pt-4 md:hidden">
        <div className="col-span-6">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="md:hidden text-sm uppercase font-bold"
          >
            Studio 587
          </Link>
        </div>
        <div className="col-start-12 flex justify-end">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="md:hidden text-sm uppercase">
              Menu
            </SheetTrigger>
            <SheetContent className="w-full">
              <SheetHeader className="items-center m-auto gap-6">
                <SheetTitle className="mb-8">Menu</SheetTitle>
                <Link
                  className="uppercase"
                  href="/"
                  onClick={() => setOpen(false)}
                >
                  Home
                </Link>
                <Link
                  className="uppercase"
                  href="/process"
                  onClick={() => setOpen(false)}
                >
                  Process
                </Link>
                <Link
                  className="uppercase"
                  href="/studio"
                  onClick={() => setOpen(false)}
                >
                  Studio
                </Link>
              </SheetHeader>
              <SheetFooter className="flex items-center">
                <SheetDescription className="mb-10 text-4xl font-bold uppercase text-center">
                  587 reasons to work together
                </SheetDescription>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}

function ListItem({
  title,
  children,
  href,
  linkClassName,
  titleClassName,
  textClassName,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & {
  href: string;
  linkClassName?: string;
  titleClassName?: string;
  textClassName?: string;
}) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href} className={linkClassName}>
          <div className={`text-sm leading-none font-medium
${titleClassName ?? ""}`}>
            {title}
          </div>
          <p className={`line-clamp-2 text-sm leading-snug ${textClassName ??
            "text-muted-foreground"}`}>
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
