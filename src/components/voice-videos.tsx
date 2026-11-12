"use client";

import { useState } from "react";

type Lang = "te" | "en";

/** Each video exists in Telugu and English: /videos/<file>-<lang>.mp4 with poster /videos/<file>-<lang>.webp. */
const VIDEOS = [
  { file: "roopa-guide", title: { te: "Roopa ఎలా పని చేస్తుంది", en: "How it works" } },
  { file: "roopa-realestate", title: { te: "Real estate call", en: "A real estate call" } },
] as const;

/** The two product videos, played in place. preload="none": nothing downloads until the visitor presses play. */
export function VoiceVideos() {
  const [lang, setLang] = useState<Lang>("en");
  return (
    <div className="mx-auto mt-10 max-w-xl sm:mt-14">
      <div className="flex items-center justify-center gap-3">
        <span className="text-sm text-white/55">Watch in</span>
        <div role="radiogroup" aria-label="Video language" className="flex rounded-full bg-white/[0.06] p-1 ring-1 ring-white/10">
          {(["en", "te"] as const).map((l) => (
            <button
              key={l}
              type="button"
              role="radio"
              aria-checked={lang === l}
              onClick={() => setLang(l)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                lang === l ? "bg-[#22c55e] text-night" : "text-white/75 hover:text-white"
              }`}
            >
              {l === "te" ? "తెలుగు" : "English"}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-6">
        {VIDEOS.map((v) => (
          <figure key={v.file}>
            <video
              key={`${v.file}-${lang}`}
              src={`/videos/${v.file}-${lang}.mp4`}
              poster={`/videos/${v.file}-${lang}.webp`}
              controls
              playsInline
              preload="none"
              className="aspect-[9/16] w-full rounded-2xl bg-black object-cover ring-1 ring-white/10"
            />
            <figcaption className="mt-2 text-center text-xs font-semibold text-white/75 sm:text-sm">{v.title[lang]}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
