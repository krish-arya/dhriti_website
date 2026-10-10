import type { Testimonial } from "@/content/testimonials";
import styles from "./Stories.module.css";

export default function StoryCard({ t, clamp = false }: { t: Testimonial; clamp?: boolean }) {
  return (
    <li className={`${styles.card} ${clamp ? styles.clamp : ""}`} data-topic={t.topic}>
      <figure>
        <span className={styles.mark} aria-hidden="true">
          “
        </span>
        <blockquote>
          <p>{t.quote}</p>
        </blockquote>
        <figcaption>
          {t.who} · {t.age}
        </figcaption>
      </figure>
    </li>
  );
}
