"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "@/lib/utils";

const separatorVariants = {
  default: "bg-gray-700",
  primary: "bg-white",
  secondary: "bg-gray-400",
  accent: "bg-purple-500",
  success: "bg-green-500",
  warning: "bg-yellow-500",
  error: "bg-red-500",
} as const;

type SeparatorVariant = keyof typeof separatorVariants;

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  variant = "default",
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root> & {
  variant?: SeparatorVariant;
}) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        separatorVariants[variant],
        "shrink-0 data-[orientation=horizontal]:h-[0.25px] data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  );
}

export { Separator };
