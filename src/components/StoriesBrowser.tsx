"use client";

import { useState } from "react";
import { featuredIds, testimonials, topics, type Topic } from "@/content/testimonials";
import StoryCard from "./StoryCard";
import styles from "./Stories.module.css";

/** All stories, filterable by topic. */
export default function StoriesBrowser() {
  const [topic, setTopic] = useState<Topic | "all">("all");
  const lead = testimonials.find((t) => t.id === featuredIds[0])!;
  const shown = topic === "all" ? testimonials : testimonials.filter((t) => t.topic === topic);

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
        </figure>

        <div className={styles.filters} role="group" aria-label="Filter stories by topic">
          <button type="button" aria-pressed={topic === "all"} onClick={() => setTopic("all")}>
            All <span>{testimonials.length}</span>
          </button>
          {topics.map((t) => (
            <button key={t.id} type="button" aria-pressed={topic === t.id} onClick={() => setTopic(t.id)}>
              {t.label} <span>{testimonials.filter((x) => x.topic === t.id).length}</span>
            </button>
          ))}
        </div>

        <p className="sr-only" aria-live="polite">
          Showing {shown.length} stories
        </p>

        <ul className={styles.grid} key={topic}>
          {shown.map((t) => (
            <StoryCard key={t.id} t={t} />
          ))}
        </ul>
      </div>
    </section>
  );
}
