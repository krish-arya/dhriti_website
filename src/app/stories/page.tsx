import type { Metadata } from "next";
import Booking from "@/components/Booking";
import PageIntro from "@/components/PageIntro";
import StoriesBrowser from "@/components/StoriesBrowser";
import { privacyNote } from "@/content/testimonials";

export const metadata: Metadata = {
  alternates: { canonical: "/stories" },
  title: "Client Stories — Experiences of Therapy with Dhriti Singh",
  description:
    "Anonymous client experiences of therapy with Delhi-based psychologist Dhriti Singh — students, adults, couples, parents and caregivers, in their own words.",
};

export default function StoriesPage() {
  return (
    <>
      <PageIntro eyebrow="Client stories" title="In their own words." lead={privacyNote} />
      <StoriesBrowser />
      <Booking />
    </>
  );
}
