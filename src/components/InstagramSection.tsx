import { copy, instagramPosts, site, type InstagramPost } from "@/content/site";
import SplitWords from "./SplitWords";
import styles from "./Sections.module.css";

type TileKind = NonNullable<InstagramPost["kind"]>;

/** Designed stand-ins until real posts are supplied — one for each kind of content. */
const placeholders: { kind: TileKind; label: string }[] = [
  { kind: "quote", label: "Quote" },
  { kind: "photograph", label: "Photograph" },
  { kind: "educational", label: "Learning" },
  { kind: "reflection", label: "Reflection" },
  { kind: "post", label: "Post" },
  { kind: "quote", label: "Quote" },
];

/**
 * Pass `posts` (manually selected, or from a feed integration) to replace the
 * placeholders. Up to six are shown.
 */
export default function InstagramSection({ posts = instagramPosts }: { posts?: InstagramPost[] }) {
  return (
    <section id="instagram" className={`section ${styles.instagram}`} aria-labelledby="instagram-heading">
      <div className="container">
        <header className={styles.instagramHead}>
          <div>
            <p className="eyebrow" data-reveal>{copy.instagram.eyebrow}</p>
            <h2 id="instagram-heading" data-reveal="words">
              <SplitWords text={copy.instagram.heading} />
            </h2>
          </div>
          <a className="link-quiet" href={site.instagram.url} target="_blank" rel="noopener noreferrer" data-reveal>
            {copy.instagram.cta} <span aria-hidden="true">→</span>
          </a>
        </header>

        <ul className={styles.tiles}>
          {posts.length > 0
            ? posts.slice(0, 6).map((p) => (
                <li key={p.href} className={styles.tile} data-reveal>
                  <a href={p.href} target="_blank" rel="noopener noreferrer">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={p.alt} loading="lazy" decoding="async" />
                  </a>
                </li>
              ))
            : placeholders.map((p, i) => (
                <li
                  key={i}
                  className={`${styles.tile} ${styles[`tile_${p.kind}`] ?? ""}`}
                  data-reveal
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <a href={site.instagram.url} target="_blank" rel="noopener noreferrer">
                    <span className="sr-only">Inner Doorways on Instagram (opens in a new tab)</span>
                    <TileArt kind={p.kind} />
                    <span className={styles.tileLabel} aria-hidden="true">{p.label}</span>
                  </a>
                </li>
              ))}
        </ul>
      </div>
    </section>
  );
}

function TileArt({ kind }: { kind: TileKind }) {
  switch (kind) {
    case "quote":
      return <span className={styles.tileQuote} aria-hidden="true">&ldquo;</span>;
    case "photograph":
      return (
        <svg className={styles.tileSvg} viewBox="0 0 60 60" fill="none" aria-hidden="true">
          <path d="M8 46l14-16 10 10 8-7 12 13" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
          <circle cx="42" cy="18" r="5" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
    case "educational":
      return (
        <svg className={styles.tileSvg} viewBox="0 0 60 60" fill="none" aria-hidden="true">
          <path d="M12 16h36M12 26h28M12 36h32M12 46h18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "reflection":
      return (
        <svg className={styles.tileSvg} viewBox="0 0 60 60" fill="none" aria-hidden="true">
          <path d="M30 52C29 40 30 26 40 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M30 38c-8-2-13-8-14-16 8 1 13 7 14 16Z M33 26c6-4 12-4 16-11-8-1-14 3-16 11Z" stroke="currentColor" strokeWidth="1" />
        </svg>
      );
    default:
      return (
        <svg className={styles.tileSvg} viewBox="0 0 60 60" fill="none" aria-hidden="true">
          <path d="M14 52V26c0-9 7-16 16-16s16 7 16 16v26" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
  }
}
