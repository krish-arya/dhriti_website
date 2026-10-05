"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";

// three.js is only downloaded on capable, larger screens — and after the page is interactive.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false, loading: () => null });

export default function HeroAtmosphere() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [motion, setMotion] = useState(false);
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 901px)");
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;

    const update = () => {
      setMotion(!reduce.matches);
      setEnabled(wide.matches && !saveData);
    };
    update();
    reduce.addEventListener("change", update);
    wide.addEventListener("change", update);
    return () => {
      reduce.removeEventListener("change", update);
      wide.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled || !ref.current) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 });
    io.observe(ref.current);
    // Let the canvas fade in once the first frame has had a chance to draw.
    const t = window.setTimeout(() => setReady(true), 250);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, [enabled]);

  return (
    <div ref={ref} className={styles.atmosphere} data-ready={ready} aria-hidden="true">
      {enabled && <HeroScene active={visible} motion={motion} />}
    </div>
  );
}
