import * as React from "react"
  import { cva, type VariantProps } from "class-variance-authority"
  import { cn } from "@/lib/utils"

  const inputVariants = cva(
    "flex w-full rounded-md border bg-background text-foreground px-3 py-2 text-sm transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
    {
      variants: {
        variant: {
          default: "border-input",
          error: "border-destructive ring-destructive/20 aria-invalid:ring-destructive/20",
        },
      },
      defaultVariants: {
        variant: "default",
      },
    }
  )

  export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement>,
      VariantProps<typeof inputVariants> {
    error?: boolean
  }

  const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, variant, error, type = "text", ...props }, ref) => {
      return (
        <input
          type={type}
          className={cn(
            inputVariants({
              variant: error ? "error" : variant,
              className
            })
          )}
          aria-invalid={error || undefined}
          ref={ref}
          {...props}
        />
      )
    }
  )
  Input.displayName = "Input"
  export { Input, inputVariants }