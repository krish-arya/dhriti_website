"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Adds `data-revealed` to elements marked `data-reveal` as they enter the
 * viewport. Re-scans on every page change. Content is fully visible without
 * JS; animation is CSS-only and disabled for reduced-motion visitors.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("js-reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute("data-revealed", "");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
