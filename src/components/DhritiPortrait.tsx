"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./DhritiPortrait.module.css";

export type PortraitVariant = "hero" | "about" | "mobile" | "editorial";

/** A single CSS object-position, or separate values for small and large screens. */
export type PortraitPosition = string | { mobile?: string; desktop?: string };

export interface DhritiPortraitProps {
  variant?: PortraitVariant;
  /** Image path. When null/undefined, or while the file is missing, the placeholder shows. */
  src?: string | null;
  alt?: string;
  tone?: "color" | "grayscale";
  objectPosition?: PortraitPosition;
  /** Load eagerly — use for the above-the-fold hero only. */
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Secondary line on the placeholder. */
  placeholderCaption?: string;
}

const defaultSizes: Record<PortraitVariant, string> = {
  hero: "(max-width: 900px) 80vw, 40vw",
  about: "(max-width: 900px) 90vw, 36vw",
  mobile: "80vw",
  editorial: "(max-width: 900px) 70vw, 28vw",
};

const defaultPosition: Record<PortraitVariant, PortraitPosition> = {
  hero: { mobile: "50% 20%", desktop: "50% 25%" },
  about: { mobile: "50% 30%", desktop: "45% 35%" },
  mobile: "50% 20%",
  editorial: "50% 30%",
};

type Status = "loading" | "loaded" | "missing";

export default function DhritiPortrait({
  variant = "hero",
  src,
  alt = "Dhriti Singh, RCI Licensed Psychologist",
  tone = "color",
  objectPosition,
  priority = false,
  sizes,
  className,
  placeholderCaption = "Professional Portrait",
}: DhritiPortraitProps) {
  const [status, setStatus] = useState<Status>(src ? "loading" : "missing");
  const imgRef = useRef<HTMLImageElement>(null);

  // The image may finish (or fail) before hydration, in which case React never
  // sees the load/error events — check the element directly once mounted.
  useEffect(() => {
    if (!src) {
      setStatus("missing");
      return;
    }
    const img = imgRef.current;
    if (img?.complete) setStatus(img.naturalWidth > 0 ? "loaded" : "missing");
  }, [src]);

  const pos = objectPosition ?? defaultPosition[variant];
  const posVars = {
    "--pos-mobile": typeof pos === "string" ? pos : pos.mobile ?? "50% 25%",
    "--pos-desktop": typeof pos === "string" ? pos : pos.desktop ?? pos.mobile ?? "50% 25%",
  } as CSSProperties;

  const showImage = src && status !== "missing";

  return (
    <figure
      className={[styles.frame, styles[variant], tone === "grayscale" && styles.grayscale, className]
        .filter(Boolean)
        .join(" ")}
      style={posVars}
      data-status={status}
    >
      <div className={styles.inner}>
        <PortraitPlaceholder caption={placeholderCaption} hidden={status === "loaded"} />

        {showImage && (
          <Image
            ref={imgRef}
            src={src}
            alt={alt}
            fill
            sizes={sizes ?? defaultSizes[variant]}
            priority={priority}
            className={styles.image}
            data-visible={status === "loaded"}
            onLoad={() => setStatus("loaded")}
            onError={() => setStatus("missing")}
          />
        )}
        <span className={styles.grain} aria-hidden="true" />
      </div>
      {status !== "loaded" && <figcaption className="sr-only">{alt} — photograph coming soon</figcaption>}
    </figure>
  );
}

function PortraitPlaceholder({ caption, hidden }: { caption: string; hidden: boolean }) {
  return (
    <div className={styles.placeholder} aria-hidden="true" data-hidden={hidden}>
      <svg className={styles.sprig} viewBox="0 0 120 200" fill="none">
        <path d="M62 196C60 150 58 112 66 70C70 50 78 30 88 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        {[
          [64, 160, -1],
          [62, 132, 1],
          [63, 104, -1],
          [68, 78, 1],
          [75, 54, -1],
          [82, 34, 1],
        ].map(([x, y, side], i) => (
          <path
            key={i}
            d={`M${x} ${y}C${x + side * 10} ${y - 6} ${x + side * 26} ${y - 8} ${x + side * 34} ${y - 22}C${x + side * 20} ${y - 22} ${x + side * 8} ${y - 14} ${x} ${y}Z`}
            fill="currentColor"
            fillOpacity={0.16 + (i % 3) * 0.05}
            stroke="currentColor"
            strokeWidth="0.9"
          />
        ))}
      </svg>

      <svg className={styles.vessel} viewBox="0 0 90 90" fill="none">
        <ellipse cx="45" cy="84" rx="30" ry="4" fill="currentColor" fillOpacity="0.12" />
        <path
          d="M34 16C34 13 56 13 56 16C56 22 52 24 53 30C55 38 72 44 70 62C68 78 56 84 45 84C34 84 22 78 20 62C18 44 35 38 37 30C38 24 34 22 34 16Z"
          fill="currentColor"
          fillOpacity="0.22"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path d="M28 52C38 56 52 56 62 52" stroke="currentColor" strokeOpacity="0.45" strokeWidth="0.8" />
      </svg>

      <div className={styles.label}>
        <span className={styles.labelName}>Dhriti Singh</span>
        <span className={styles.labelRule} />
        <span className={styles.labelCaption}>{caption}</span>
      </div>
    </div>
  );
}
