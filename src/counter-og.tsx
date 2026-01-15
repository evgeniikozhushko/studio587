"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  target: number; // Reverted to single target number
  duration?: number; // Duration in milliseconds
  className?: string;
}

export function AnimatedCounter({
  target,
  duration = 5000,
  className = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0); // Back to single count state
  //   const [isAnimating, setIsAnimating] = useState(false)
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isActiveRef = useRef(true);
  const directionRef = useRef<1 | -1>(1); // Count backwards

  // Ease-in-out function
  //   const easeInOut = (t: number): number => {
  //     return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  //   };

  // Ease-in-out sine: smoother acceleration/deceleration
  const easeInOut = (t: number): number => {
    return -(Math.cos(Math.PI * t) - 1) / 2;
  };

  useEffect(() => {
    isActiveRef.current = true;
    const animate = (currentTime: number) => {
      //   if (!isAnimating) {
      //     setIsAnimating(true)
      //   }

      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Apply easing to progress
      const easedProgress = easeInOut(progress);

      //   const currentCount = Math.floor(easedProgress * target); // Single count calculation
      const currentCount =
        directionRef.current === 1
          ? Math.floor(easedProgress * target)
          : Math.floor((1 - easedProgress) * target);

      setCount(currentCount);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Animation complete, wait a moment then reset
        // setIsAnimating(false)
        timeoutRef.current = setTimeout(() => {
          if (!isActiveRef.current) {
            return;
          }
          //   setCount(0);
          directionRef.current *= -1;
          setCount(directionRef.current === 1 ? 0 : target);
          startTimeRef.current = null;
          animationRef.current = requestAnimationFrame(animate);
        }, 4000); // Brief pause before reset
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      isActiveRef.current = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [target, duration]);

  const formattedCount = count.toString().padStart(3, "0");

  return (
    <div className={className}>
      <div className="font-inter text-8xl tracking-wider md:text-9xl lg:text-[12rem]">
        {formattedCount}
      </div>
      {/* <div
        className="font-inter text-8xl tracking-wider transition-[filter] duration-200 md:text-9xl lg:text-[12rem]"
        style={{ filter: isAnimating ? "blur(2px)" : "blur(0px)" }}
      >
        {formattedCount}
      </div> */}
    </div>
  );
}
