"use client";

import { useState } from "react";
import { featuredIds, testimonials, topics, type Topic } from "@/content/testimonials";
import PrivacyBadge from "./PrivacyBadge";
import StoryCard from "./StoryCard";
import styles from "./Stories.module.css";

const PAGE = 12;

/** All stories, filterable by topic, a dozen at a time. */
export default function StoriesBrowser() {
  const [topic, setTopic] = useState<Topic | "all">("all");
  const [limit, setLimit] = useState(PAGE);
  const lead = testimonials.find((t) => t.id === featuredIds[0])!;
  const matching = topic === "all" ? testimonials : testimonials.filter((t) => t.topic === topic);
  const shown = matching.slice(0, limit);
  const choose = (t: Topic | "all") => {
    setTopic(t);
    setLimit(PAGE);
  };

  return (
    <section className={`section ${styles.browser}`} aria-label="Client stories">
      <div className="container">
        <figure className={styles.featured} data-reveal>
          <blockquote>
            <p>{lead.quote}</p>
          </blockquote>
          <figcaption>
            {lead.who} · {lead.age}
          </figcaption>
          <PrivacyBadge className={styles.featuredBadge} />
        </figure>

        <div className={styles.filters} role="group" aria-label="Filter stories by topic">
          <button type="button" aria-pressed={topic === "all"} onClick={() => choose("all")}>
            All <span>{testimonials.length}</span>
          </button>
          {topics.map((t) => (
            <button key={t.id} type="button" aria-pressed={topic === t.id} onClick={() => choose(t.id)}>
              {t.label} <span>{testimonials.filter((x) => x.topic === t.id).length}</span>
            </button>
          ))}
        </div>

        <p className="sr-only" aria-live="polite">
          Showing {shown.length} of {matching.length} stories
        </p>

        <ul className={styles.grid} key={topic}>
          {shown.map((t) => (
            <StoryCard key={t.id} t={t} />
          ))}
        </ul>

        {matching.length > limit && (
          <div className={styles.more}>
            <button type="button" className="button" onClick={() => setLimit((l) => l + PAGE)}>
              Show more stories <span aria-hidden="true">↓</span>
            </button>
            <p>
              {shown.length} of {matching.length}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
