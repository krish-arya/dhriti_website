import type { Testimonial } from "@/content/testimonials";
import styles from "./Stories.module.css";

export default function StoryCard({ t, as: Tag = "li" }: { t: Testimonial; as?: "li" | "div" }) {
  return (
    <Tag className={styles.card} data-topic={t.topic}>
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
    </Tag>
  );
}
