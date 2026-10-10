import type { Metadata } from "next";
import Booking from "@/components/Booking";

export const metadata: Metadata = {
  title: "Book a Session — Contact Dhriti Singh",
  description: "Book a therapy session with Dhriti Singh on WhatsApp, by email or on Instagram.",
};

export default function ContactPage() {
  return <Booking />;
}
