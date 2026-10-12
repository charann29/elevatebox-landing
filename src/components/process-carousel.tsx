"use client";

import { useState } from "react";
import { PROCESS_STEPS } from "@/lib/content";

// The reference layout's "Our Process" strip: one step in focus, its
// neighbours either side, arrows to move. Wraps at both ends.
export function ProcessCarousel() {
  const [i, setI] = useState(0);
  const n = PROCESS_STEPS.length;
  const at = (k: number) => PROCESS_STEPS[(k + n) % n];
  const step = at(i);
  const arrow =
    "grid size-10 shrink-0 place-items-center rounded-full bg-white text-[#0c1a38] transition-transform hover:scale-110";

  return (
    <div>
      <h3 className="text-center text-2xl font-bold text-white sm:text-3xl" aria-live="polite">
        {`Step ${i + 1}: ${step.t}`}
      </h3>
      <div className="mt-10 flex items-center justify-center gap-3 sm:gap-6">
        <button type="button" aria-label="Previous step" className={arrow} onClick={() => setI((i - 1 + n) % n)}>
          ‹
        </button>
        <ol className="flex items-center gap-3 sm:gap-5">
          {[-2, -1, 0, 1, 2].map((d) => {
            const s = at(i + d);
            const size =
              d === 0
                ? "h-40 w-36 sm:h-48 sm:w-44 bg-white text-[#0c1a38] shadow-2xl shadow-black/40"
                : Math.abs(d) === 1
                  ? "hidden h-32 w-28 bg-white/90 text-[#0c1a38] sm:flex"
                  : "hidden h-24 w-20 bg-white/75 text-[#0c1a38] md:flex";
            return (
              <li key={d} className={`${size} ${d === 0 ? "flex" : ""} flex-col items-center justify-center rounded-2xl p-3 text-center transition-all`}>
                <button type="button" onClick={() => setI((i + d + n) % n)} className="flex flex-col items-center">
                  <span className={`font-bold text-brand ${d === 0 ? "text-4xl" : "text-2xl"}`}>{s.n}</span>
                  <span className={`mt-1 font-semibold ${d === 0 ? "text-base" : "text-xs"}`}>{s.t}</span>
                </button>
              </li>
            );
          })}
        </ol>
        <button type="button" aria-label="Next step" className={arrow} onClick={() => setI((i + 1) % n)}>
          ›
        </button>
      </div>
      <p className="mx-auto mt-10 max-w-3xl text-center leading-relaxed text-white/85">{step.d}</p>
    </div>
  );
}
