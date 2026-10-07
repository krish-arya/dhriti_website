import Image from "next/image";

/** Helpers shared by server and client components. */

export function external(href: string) {
  return href.startsWith("http") ? "_blank" : undefined;
}

/** The Inner Doorways logo badge. Decorative here: it always sits beside the brand name. */
export function BrandMark({ size = 40, className }: { size?: number; className?: string }) {
  return <Image className={className} src="/images/logo.png" alt="" width={size} height={size} priority />;
}
