"use client";

import { useState } from "react";

// ponytail: in-page dropdown so phones show our list, not the OS popup/picker wheel.
// The invisible text input carries name + required, so FormData and form validation work unchanged.
export function Dropdown({ name, opts, required, placeholder = "Select", accent = "#ff7701", className = "" }: {
  name: string;
  opts: string[];
  required?: boolean;
  placeholder?: string;
  accent?: string;
  className?: string;
}) {
  const [val, setVal] = useState("");
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative mt-1.5"
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false); }}
    >
      <input
        name={name}
        value={val}
        required={required}
        onChange={() => {}}
        onFocus={() => setOpen(true)}
        tabIndex={-1}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px opacity-0"
      />
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className={`flex w-full items-center justify-between gap-2 text-left ${className}`}
        style={open ? { borderColor: accent } : undefined}
      >
        <span className={val ? "" : "text-ink-3"}>{val || placeholder}</span>
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <ul role="listbox" className="absolute inset-x-0 top-full z-20 mt-1.5 overflow-hidden rounded-xl bg-white py-1 shadow-xl ring-1 ring-black/10">
          {opts.map((o) => (
            <li key={o}>
              <button
                type="button"
                role="option"
                aria-selected={o === val}
                onClick={() => { setVal(o); setOpen(false); }}
                className="flex w-full items-center justify-between gap-2 px-3.5 py-3 text-left text-base font-medium text-ink hover:bg-black/[0.04]"
              >
                {o}
                {o === val && (
                  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden className="shrink-0" style={{ color: accent }}>
                    <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
