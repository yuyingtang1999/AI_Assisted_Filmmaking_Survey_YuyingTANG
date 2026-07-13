"use client";

import Image from "next/image";
import { useInView, useParallax } from "./hooks";

/**
 * A framed PDF figure that fades/scales in and drifts subtly on scroll.
 * Uses next/image with explicit intrinsic size (images are ~1400px wide).
 */
export default function Figure({
  src,
  alt,
  caption,
  ratio = 16 / 9,
  parallax = 0.06,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  caption?: string;
  ratio?: number;
  parallax?: number;
  priority?: boolean;
  className?: string;
}) {
  const [inRef, inView] = useInView<HTMLDivElement>(0.15);
  const [pRef, offset] = useParallax<HTMLDivElement>(parallax);

  return (
    <figure ref={inRef} className={className}>
      <div
        ref={pRef}
        className="figure card-hover"
        style={{
          transform: `translateY(${offset}px)`,
          opacity: inView ? 1 : 0,
          transition:
            "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.1s linear",
        }}
      >
        <div style={{ position: "relative", aspectRatio: String(ratio) }}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 900px"
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority={priority}
          />
        </div>
      </div>
      {caption && (
        <figcaption className="mt-3 text-xs leading-relaxed text-[var(--faint)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
