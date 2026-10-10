import SplitWords from "./SplitWords";
import styles from "./Sections.module.css";

/** Opening band for inner pages: the page's single h1. */
export default function PageIntro({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <section className={styles.pageIntro}>
      <div className="container">
        <p className="eyebrow" data-reveal>{eyebrow}</p>
        <h1 data-reveal="words">
          <SplitWords text={title} />
        </h1>
        {lead && <p className={styles.pageLead} data-reveal>{lead}</p>}
      </div>
    </section>
  );
}
