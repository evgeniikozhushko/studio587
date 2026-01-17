"use client"

import { useEffect, useRef, useState } from "react"

interface AnimatedTextProps {
  text: string
  duration?: number // Duration in milliseconds
  className?: string
}

export function AnimatedText({ text, duration = 2000, className = "" }: AnimatedTextProps) {
  const [displayText, setDisplayText] = useState("")
  const animationRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)

  // Ease-in-out function
//   const easeInOut = (t: number): number => {
//     return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
//   }

  // Ease-in-out sine: smoother acceleration/deceleration
  const easeInOut = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  }

  // Generate random character for animation effect
  const getRandomChar = (): string => {
    // const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
    const chars = "0123456789!@#$%^&*"
    return chars[Math.floor(Math.random() * chars.length)]
  }

  useEffect(() => {
    const animate = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime
      }

      const elapsed = currentTime - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)

      // Apply easing to progress
      const easedProgress = easeInOut(progress)

      // Calculate how many characters should be revealed
      const charsToShow = Math.floor(easedProgress * text.length)

      // Build the display string
      let newDisplayText = ""
      for (let i = 0; i < text.length; i++) {
        if (i < charsToShow) {
          // Character is fully revealed
          newDisplayText += text[i]
        } else if (i === charsToShow) {
          // Current character being animated - show random char
          newDisplayText += getRandomChar()
        } else {
          // Future characters - show space or placeholder
          newDisplayText += text[i] === " " ? " " : getRandomChar()
        }
      }

      setDisplayText(newDisplayText)

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        // Animation complete, show final text
        setDisplayText(text)
        // Wait a moment then reset
        setTimeout(() => {
          setDisplayText("")
          startTimeRef.current = null
          animationRef.current = requestAnimationFrame(animate)
        }, 5000) // Brief pause before reset
      }
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [text, duration])

  return (
    <div className={className}>
      <div className="font-semibold text-sm tracking-wide md:text-base lg:text-lg xl:text-xl uppercase">
        {displayText || "\u00A0"} {/* Non-breaking space to maintain height */}
      </div>
    </div>
  )
}
