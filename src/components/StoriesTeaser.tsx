import Link from "next/link";
import { featuredIds, privacyNote, testimonials } from "@/content/testimonials";
import Slider from "./Slider";
import SplitWords from "./SplitWords";
import StoryCard from "./StoryCard";
import styles from "./Stories.module.css";

/** A handful of client words on the home page; the rest live on /stories. */
export default function StoriesTeaser() {
  const featured = featuredIds.map((id) => testimonials.find((t) => t.id === id)!).filter(Boolean);
  return (
    <section id="stories" className={`section ${styles.teaser}`} aria-labelledby="stories-heading">
      <div className="container">
        <header className={styles.head}>
          <div>
            <p className="eyebrow" data-reveal>In their words</p>
            <h2 id="stories-heading" data-reveal="words">
              <SplitWords text="What people carry in, and what they take with them." />
            </h2>
            <p className={styles.note} data-reveal>{privacyNote}</p>
          </div>
          <Link className="link-quiet" href="/stories" data-reveal>
            Read all {testimonials.length} stories <span aria-hidden="true">→</span>
          </Link>
        </header>

        <Slider label="Client stories" perView={3}>
          {featured.map((t) => (
            <StoryCard key={t.id} t={t} />
          ))}
        </Slider>
      </div>
    </section>
  );
}
