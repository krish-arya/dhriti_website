import { Fragment, type CSSProperties } from "react";

/**
 * Wraps each word in a span so headings can soften into view word by word.
 * Used inside an element marked `data-reveal="words"`; spaces stay as real
 * text so wrapping and screen readers behave normally.
 */
export default function SplitWords({ text, delay = 0, step = 70 }: { text: string; delay?: number; step?: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="word" style={{ "--wd": `${delay + i * step}ms` } as CSSProperties}>
            {w}
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </>
  );
}
