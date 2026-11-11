"use client";
import { useEffect, useRef } from "react";

// Studio's body HTML, unchanged (blocks guide section 2); studio-blocks.js adds tap-to-play, maps and the FAQ accordion.
export function StudioBody({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const w = window as unknown as { StudioBlocks?: { enhance: (el: HTMLElement) => () => void } };
    if (!ref.current || !w.StudioBlocks) return;
    return w.StudioBlocks.enhance(ref.current);
  }, [html]);
  return <div ref={ref} className="studio-body leading-relaxed text-ink-muted" style={{ "--studio-accent": "#013186" } as React.CSSProperties} dangerouslySetInnerHTML={{ __html: html }} />;
}
