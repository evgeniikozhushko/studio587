"use client"

  import * as React from "react"
  import { useForm } from "@tanstack/react-form"
  import { motion } from "motion/react"
  import { Loader2 } from "lucide-react"
  import { Input } from "@/components/ui/input"
  import { Button } from "@/components/ui/button"
  import { cn } from "@/lib/utils"

  interface EmailCaptureCardProps {
    headline: string
    description: string
    successMessage: string
    privacyNote: string
    className?: string
  }

  type FormState = "idle" | "submitting" | "success" | "error"

  export default function EmailCaptureCard({
    headline,
    description,
    successMessage,
    privacyNote,
    className,
  }: EmailCaptureCardProps) {
    const [formState, setFormState] = React.useState<FormState>("idle")
    const [submissionError, setSubmissionError] = React.useState<string>("")
    const [honeypot, setHoneypot] = React.useState("")

    const form = useForm({
      defaultValues: {
        email: "",
      },
      onSubmit: async ({ value }) => {
        setFormState("submitting")
        setSubmissionError("")

        try {
          const response = await fetch("/api/subscribe", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: value.email,
              pageUri: window.location.href,
              website: honeypot,
              pageName: headline,
            }),
          })

          const data = await response.json()

          if (!response.ok) {
            throw new Error(data.error || "Subscription failed")
          }

          setFormState("success")
        } catch (error) {
          setFormState("error")
          setSubmissionError(
            error instanceof Error
              ? error.message
              : "Something went wrong. Please try again."
          )
        }
      },
    })

    if (formState === "success") {
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "border border-border rounded-lg p-4 md:p-6 space-y-4",
            className
          )}
          role="status"
          aria-live="polite"
        >
          <div className="text-xl md:text-2xl font-semibold">
            {successMessage}
          </div>
        </motion.div>
      )
    }

    return (
      <div
        className={cn(
          "p-4 md:p-6 space-y-4",
          className
        )}
        // "border border-border rounded-lg p-4 md:p-6 space-y-4",
      >
        <div className="space-y-2">
          <h3 className="text-xl md:text-3xl font-semibold">{headline}</h3>
          <p className="text-sm md:text-base text-muted-foreground">
            {description}
          </p>
        </div>

        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className="space-y-4"
        >
          {/* Honeypot field - hidden from users, catches bots */}
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            className="absolute -left-[9999px]"
            aria-hidden="true"
          />

          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) => {
                if (!value) return "Email is required"
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                  return "Please enter a valid email address"
                }
                return undefined
              },
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  error={!!field.state.meta.errors.length}
                  disabled={formState === "submitting"}
                />
                {field.state.meta.errors.length > 0 && (
                  <p
                    className="text-sm text-destructive"
                    role="alert"
                    aria-live="polite"
                  >
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {submissionError && (
            <div
              className="rounded-md bg-destructive/10 border border-destructive/20 p-3 text-sm 
  text-destructive"
              role="alert"
            >
              {submissionError}
            </div>
          )}

          <div className="space-y-3">
            <Button
              type="submit"
              className="w-full md:w-auto glow-on-hover px-18"
              disabled={formState === "submitting"}
            >
              {formState === "submitting" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Subscribing...
                </>
              ) : (
                "Subscribe"
              )}
            </Button>

            <p className="text-xs text-muted-foreground">{privacyNote}</p>
          </div>
        </form>
      </div>
    )
  }