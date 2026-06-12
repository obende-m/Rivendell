"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  duration?: number;
}

export function AnimatedCounter({ value, duration = 1.8 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    const cleanValue = value.replace(/[^\d]/g, "");
    const target = parseInt(cleanValue, 10);
    if (isNaN(target)) {
      return;
    }

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      
      // Ease out quad
      const easeProgress = progress * (2 - progress);
      
      setCount(Math.floor(easeProgress * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    window.requestAnimationFrame(step);
  }, [isInView, value, duration]);

  const isNumeric = !isNaN(parseInt(value.replace(/[^\d]/g, ""), 10));

  return (
    <span ref={ref} className="tabular-nums">
      {isNumeric ? count : value}
    </span>
  );
}
