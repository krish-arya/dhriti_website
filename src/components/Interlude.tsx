import { copy } from "@/content/site";
import SplitWords from "./SplitWords";
import styles from "./Sections.module.css";

export default function Interlude() {
  return (
    <section className={styles.interlude} aria-label="Reflection" data-reveal="frame">
      <div className="container">
        <svg className={styles.interludeArch} viewBox="0 0 400 240" fill="none" preserveAspectRatio="none" aria-hidden="true">
          <path d="M2 240V200C2 90 90 2 200 2s198 88 198 198v40" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" pathLength={1} />
        </svg>
        <p className={styles.interludeText} data-reveal="words">
          <SplitWords text={copy.interlude} delay={500} step={110} />
        </p>
      </div>
    </section>
  );
}
