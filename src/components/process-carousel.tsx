"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { PROCESS_STEPS } from "@/lib/content";

const STEP_MS = 4000;

// The reference layout's "Our Process" strip: one step in focus, its
// neighbours either side, arrows to move. Wraps at both ends and moves on
// by itself every STEP_MS, pausing while hovered or focused. With reduced
// motion it never moves on its own.
export function ProcessCarousel() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const n = PROCESS_STEPS.length;
  const at = (k: number) => PROCESS_STEPS[(k + n) % n];
  const step = at(i);
  const go = (d: number) => {
    setDir(d < 0 ? -1 : 1);
    setI((v) => (v + d + n) % n);
  };

  useEffect(() => {
    if (paused || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Keyed on i, so a manual move restarts the countdown.
    const t = setTimeout(() => go(1), STEP_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, paused]);

  const arrow =
    "grid size-10 shrink-0 place-items-center rounded-full bg-white text-[#0c1a38] transition-transform hover:scale-110 active:scale-95";

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      // Keyboard focus only: a mouse click on an arrow should not stop it for good.
      onFocus={(e) => e.target.matches(":focus-visible") && setPaused(true)}
      onBlur={() => setPaused(false)}
      style={{ "--dir": dir, "--step-ms": `${STEP_MS}ms` } as CSSProperties}
    >
      <h3
        key={`h${i}`}
        className="step-rise text-center text-2xl font-bold text-white sm:text-3xl"
        aria-live="polite"
      >
        {`Step ${i + 1}: ${step.t}`}
      </h3>
      <div className="mt-10 flex items-center justify-center gap-3 sm:gap-6">
        <button type="button" aria-label="Previous step" className={arrow} onClick={() => go(-1)}>
          ‹
        </button>
        <ol key={`o${i}`} className="flex items-center gap-3 sm:gap-5">
          {[-2, -1, 0, 1, 2].map((d) => {
            const s = at(i + d);
            const size =
              d === 0
                ? "h-40 w-36 sm:h-48 sm:w-44 bg-white text-[#0c1a38] shadow-2xl shadow-black/40"
                : Math.abs(d) === 1
                  ? "hidden h-32 w-28 bg-white/90 text-[#0c1a38] sm:flex"
                  : "hidden h-24 w-24 bg-white/75 text-[#0c1a38] md:flex";
            return (
              <li
                key={d}
                // Staggered from the side the strip is moving towards.
                style={{ animationDelay: `${(dir > 0 ? d + 2 : 2 - d) * 50}ms` }}
                className={`step-slide ${size} ${d === 0 ? "flex" : ""} flex-col items-center justify-center rounded-2xl p-3 text-center transition-transform hover:-translate-y-1`}
              >
                <button type="button" onClick={() => d && go(d)} className="flex flex-col items-center">
                  <span className={`font-bold text-brand ${d === 0 ? "text-4xl" : "text-2xl"}`}>{s.n}</span>
                  <span className={`mt-1 font-semibold ${d === 0 ? "text-base" : "text-xs"}`}>{s.t}</span>
                </button>
              </li>
            );
          })}
        </ol>
        <button type="button" aria-label="Next step" className={arrow} onClick={() => go(1)}>
          ›
        </button>
      </div>
      <p key={`p${i}`} className="step-rise mx-auto mt-10 max-w-3xl text-center leading-relaxed text-white/85" style={{ animationDelay: "120ms" }}>
        {step.d}
      </p>
      <div className="mx-auto mt-8 flex max-w-xs gap-1.5" aria-hidden>
        {PROCESS_STEPS.map((s, k) => (
          <span key={s.n} className="h-1 flex-1 overflow-hidden rounded-full bg-white/20">
            {k < i && <span className="block h-full bg-white" />}
            {k === i && (
              <span
                key={`b${i}`}
                className={`block h-full bg-white ${paused ? "" : "step-progress"}`}
              />
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
