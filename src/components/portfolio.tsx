"use client";

import { useState } from "react";
import { CATEGORIES, PRODUCTS, type Category } from "@/lib/content";

const chip = "rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors";

export function Portfolio() {
  const [active, setActive] = useState<Category | "All">("All");
  const shown = active === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === active);

  return (
    <>
      <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
        {(["All", ...CATEGORIES] as const).map((c) => {
          const on = c === active;
          const count = c === "All" ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === c).length;
          return (
            <button
              key={c}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(c)}
              className={`${chip} ${on ? "border-ink bg-ink text-white" : "border-line bg-surface text-ink-2 hover:border-ink-3"}`}
            >
              {c}
              <span className={`ml-1.5 font-mono text-[11px] ${on ? "text-white/60" : "text-ink-3"}`}>{count}</span>
            </button>
          );
        })}
      </div>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {shown.map((p) => {
          const live = p.status === "Live";
          const body = (
            <>
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-[#eef2fb] px-2.5 py-1 text-[11px] font-medium text-brand">{p.category}</span>
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-ink-3">
                  <span aria-hidden="true" className={`size-1.5 rounded-full ${live ? "bg-[#1f9d55]" : "bg-[#c08a1a]"}`} />
                  {p.status}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-ink">{p.name}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-3">{p.value}</p>
              <p className="mt-auto pt-6 font-mono text-[12px] text-ink-3">
                {p.url ? (
                  <span className="text-brand group-hover:underline">
                    {p.url.replace(/^https:\/\/(www\.)?/, "")} <span aria-hidden="true">↗</span>
                  </span>
                ) : (
                  "Not public yet"
                )}
              </p>
            </>
          );
          return (
            <li key={p.name} className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_1px_2px_rgb(11_18_32/0.04)] transition-shadow hover:shadow-[0_8px_30px_rgb(11_18_32/0.08)]">
              {p.url ? (
                <a href={p.url} target="_blank" rel="noopener" className="group flex h-full flex-col p-6 transition-colors hover:bg-surface-2 sm:p-7">
                  {body}
                </a>
              ) : (
                <div className="flex h-full flex-col p-6 sm:p-7">{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}
