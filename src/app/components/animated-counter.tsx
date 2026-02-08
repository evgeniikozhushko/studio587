"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  target: number; // Reverted to single target number
  duration?: number | number[]; // Duration in milliseconds - single value or array per digit
  spinCycles?: number | number[]; // Full 0-9 cycles per digit before landing
  pauseDuration?: number; // Pause duration in ms after reaching target
  className?: string;
}

export function AnimatedCounter({
  target,
  duration,
  spinCycles = 3,
  pauseDuration = 4000,
  className = "",
}: AnimatedCounterProps) {
  const finalDuration = duration ?? 5000;
  const [introDone, setIntroDone] = useState(false);
  const introTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Ease-in-out function
  //   const easeInOut = (t: number): number => {
  //     return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  //   };

  // Ease-in-out sine: smoother acceleration/deceleration
  const easeInOut = (t: number): number => {
    return -(Math.cos(Math.PI * t) - 1) / 2;
  };

  const formattedTarget = target.toString().padStart(3, "0");
  const introChars = formattedTarget.split("");
  const targetDigits = introChars.map((digit) => Number(digit));
  const introStaggerMs = 80;
  const introDigitMs = 300;
  const introTotalMs = (introChars.length - 1) * introStaggerMs + introDigitMs;

  useEffect(() => {
    if (introDone) {
      return;
    }

    introTimeoutRef.current = setTimeout(() => {
      setIntroDone(true);
    }, introTotalMs);

    return () => {
      if (introTimeoutRef.current) {
        clearTimeout(introTimeoutRef.current);
      }
    };
  }, [introDone, introTotalMs]);

  const getSpinCyclesForIndex = (index: number) => {
    if (Array.isArray(spinCycles)) {
      return spinCycles[index] ?? spinCycles[spinCycles.length - 1] ?? 0;
    }
    return spinCycles;
  };

  const getDurationForIndex = (index: number) => {
    if (Array.isArray(finalDuration)) {
      return finalDuration[index] ?? finalDuration[finalDuration.length - 1] ?? 5000;
    }
    return finalDuration;
  };

  const pauseMs = pauseDuration;

  return (
    <div className={className}>
      {!introDone ? (
        <div className="tracking-wider text-6xl md:text-6xl font-semibold">
          {introChars.map((ch, index) => (
            <div
              key={`${ch}-${index}`}
              className="digit-enter"
              style={{ animationDelay: `${index * introStaggerMs}ms` }}
            >
              {ch}
            </div>
          ))}
        </div>
      ) : (
        <div className="tracking-wider text-6xl md:text-6xl font-semibold">
          {targetDigits.map((digit, index) => (
            <AnimatedDigit
              key={`digit-${index}`}
              targetDigit={digit}
              duration={getDurationForIndex(index)}
              pauseMs={pauseMs}
              spinCycles={getSpinCyclesForIndex(index)}
            />
          ))}
        </div>
      )}
      {/* <div
        className="font-inter text-8xl tracking-wider transition-[filter] duration-200 md:text-9xl lg:text-9xl lg:text-[12rem]"
        style={{ filter: isAnimating ? "blur(2px)" : "blur(0px)" }}
      >
        {formattedCount}
      </div> */}
      <style jsx>{`
        .digit-enter {
          display: inline-block;
          opacity: 0;
          transform: translateY(8px);
          animation: digitIn ${introDigitMs}ms ease-out forwards;
        }

        @keyframes digitIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

interface AnimatedDigitProps {
  targetDigit: number;
  duration: number;
  pauseMs: number;
  spinCycles: number;
}

function AnimatedDigit({
  targetDigit,
  duration,
  pauseMs,
  spinCycles,
}: AnimatedDigitProps) {
  const [value, setValue] = useState(0);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isActiveRef = useRef(true);

  // Ease-in-out sine: smoother acceleration/deceleration
  // const easeInOut = (t: number): number => {
  //   return -(Math.cos(Math.PI * t) - 1) / 2;
  // };

  const easeInOut = (t: number): number => 1 - (1 - t) * (1 - t);

  useEffect(() => {
    isActiveRef.current = true;

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOut(progress);

      const totalSteps = spinCycles * 10 + targetDigit;
      const step = Math.floor(easedProgress * totalSteps);
      const nextValue = step >= totalSteps ? targetDigit : step % 10;
      setValue(nextValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        timeoutRef.current = setTimeout(() => {
          if (!isActiveRef.current) {
            return;
          }
          startTimeRef.current = null;
          animationRef.current = requestAnimationFrame(animate);
        }, pauseMs);
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
  }, [duration, pauseMs, spinCycles, targetDigit]);

  return <span className="inline-block w-[1ch] text-center">{value}</span>;
}
