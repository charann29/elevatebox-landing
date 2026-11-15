"use client";

import { useEffect, useRef, useState } from "react";

/** Counts from 0 to `value` (e.g. "21,000") once it scrolls into view.
 * Renders the final number on the server, so crawlers and no-JS visitors see it. */
export function CountUp({ value, ms = 1600 }: { value: string; ms?: number }) {
  const target = Number(value.replace(/,/g, ""));
  const [shown, setShown] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !target || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / ms);
          const eased = 1 - Math.pow(1 - p, 3);
          setShown(Math.round(target * eased).toLocaleString("en-US"));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        setShown("0");
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, ms]);

  return (
    <span ref={ref} className="tabular-nums">
      {shown}
    </span>
  );
}
