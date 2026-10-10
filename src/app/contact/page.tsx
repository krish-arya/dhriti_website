import type { Metadata } from "next";
import Booking from "@/components/Booking";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Book a Session — Contact Dhriti Singh",
  description: "Book an online therapy session with Delhi-based psychologist Dhriti Singh on WhatsApp, by email or on Instagram.",
};

export default function ContactPage() {
  return <Booking />;
}
