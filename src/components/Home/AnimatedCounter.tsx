"use client";
import React, { useState, useEffect } from "react";
import { PointerHighlight } from "@/components/ui/pointer-highlight";

interface AnimatedCounterProps {
  value: number;
  format?: string;
  duration?: number;
  decimals?: number;
  usePointer?: boolean;
  locale?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  format = "+",
  duration = 2000,
  decimals = 0,
  usePointer = false,
  locale = 'en-IN'
}) => {
  const formatFunc = (val: number) => {
    // Use toLocaleString for proper number formatting with decimals
    const formattedNumber = val.toLocaleString(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
    return `${formattedNumber}${format}`;
  };
  const [count, setCount] = useState(Number(value.toFixed(decimals)));
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    setAnimationDone(false);
    setCount(0); // Start animation from 0
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const next = Number((value * progress).toFixed(decimals));
      setCount(next);
      if (currentStep >= steps) {
        clearInterval(timer);
        setCount(Number(value.toFixed(decimals)));
        setAnimationDone(true);
      }
    }, stepDuration);
    return () => clearInterval(timer);
  }, [value, duration, decimals]);

  // If JS is disabled, the fallback will be rendered
  return (
    <>
      {animationDone && usePointer ? (
        <PointerHighlight
          rectangleClassName="bg-secondary-200 border-secondary-300"
          pointerClassName="text-primary"
        >
          <span className="relative z-10">
            {formatFunc(count)}
          </span>
        </PointerHighlight>
      ) : (
        formatFunc(count)
      )}
    </>
  );
};

export default AnimatedCounter;