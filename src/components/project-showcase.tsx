import Image from "next/image";
import { CLIENTS, PROJECTS, clientLogo } from "@/lib/content";

// ponytail: the "scrolling screen" is a native overflow-y container holding a
// tall SVG. No carousel library, no JS — the user scrolls the phone screen the
// same way they scroll anything else.

// Device lineup: centre phone full size, tapering outward. Width and height
// scale together so every frame keeps a real handset aspect ratio (~9:19.5).
const BASE_W = 208;
const BASE_H = 450;
const SCALES = [0.8, 0.9, 1, 0.9, 0.8];
const OFFSETS = ["lg:mt-20", "lg:mt-10", "lg:mt-0", "lg:mt-10", "lg:mt-20"];

export function ProjectShowcase() {
  return (
    <section
      aria-labelledby="featured-projects"
      className="bg-white py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <h2
          id="featured-projects"
          className="text-center text-3xl font-bold tracking-tight text-brand sm:text-4xl"
        >
          Our Featured Projects
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center leading-relaxed text-ink-muted">
          Scroll any screen to move through the real app. Each product below was
          designed, built, and is still supported by our team.
        </p>

        {/* Client logos */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {CLIENTS.map((c) => (
            <Image
              key={c}
              src={clientLogo(c)}
              alt={c}
              width={120}
              height={100}
              className="h-[74px] w-[90px] opacity-45 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
            />
          ))}
        </div>

        {/* Device lineup */}
        <div className="mt-14 flex flex-wrap items-end justify-center gap-x-4 gap-y-12 lg:flex-nowrap">
          {PROJECTS.map((p, i) => {
            const scale = SCALES[i % SCALES.length];
            const w = Math.round(BASE_W * scale);
            const h = Math.round(BASE_H * scale);
            return (
              <figure
                key={p.slug}
                className={`flex shrink-0 flex-col items-center ${OFFSETS[i % OFFSETS.length]}`}
              >
                <div
                  className="relative rounded-[2rem] bg-gradient-to-b from-[#39424f] to-[#0e1319] p-[6px] shadow-2xl shadow-brand/25 transition-transform duration-300 hover:-translate-y-2"
                  style={{ width: w, height: h }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-2.5 z-10 h-4 w-[38%] -translate-x-1/2 rounded-full bg-[#0e1319]"
                  />
                  <div
                    className="phone-screen size-full overflow-y-auto overscroll-contain rounded-[1.6rem] bg-white"
                    tabIndex={0}
                    role="group"
                    aria-label={`${p.name} app screen, scrollable`}
                  >
                    <Image
                      src={`/assets/screen-${p.slug}.svg`}
                      alt={`${p.name} app interface`}
                      width={260}
                      height={1180}
                      className="w-full"
                    />
                  </div>
                </div>
                <figcaption className="mt-5 max-w-[13rem] text-center">
                  <p className="text-sm font-semibold text-brand">{p.name}</p>
                  <p className="mt-0.5 text-xs leading-snug text-ink-muted">
                    {p.sector}
                  </p>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
