"use client";

import { useEffect } from "react";

/**
 * Adds `data-revealed` to elements marked `data-reveal` as they enter the
 * viewport. Content is fully visible without JS; animation is CSS-only and
 * disabled for visitors who prefer reduced motion.
 */
export default function RevealObserver() {
  useEffect(() => {
    document.documentElement.classList.add("js-reveal");
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
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
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
