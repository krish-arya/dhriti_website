/** Helpers shared by server and client components. */

export function external(href: string) {
  return href.startsWith("http") ? "_blank" : undefined;
}

/** A small arch — the "doorway" mark. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="26" viewBox="0 0 22 26" fill="none" aria-hidden="true">
      <path d="M2 25V11C2 5.5 6 1.5 11 1.5S20 5.5 20 11v14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M7 25V13c0-2.4 1.8-4.3 4-4.3s4 1.9 4 4.3v12" stroke="currentColor" strokeWidth="1.1" strokeOpacity="0.55" strokeLinecap="round" />
    </svg>
  );
}
