import type { Metadata } from "next";
import Booking from "@/components/Booking";
import Interlude from "@/components/Interlude";
import MeetDhriti from "@/components/MeetDhriti";
import PageIntro from "@/components/PageIntro";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About Dhriti Singh — RCI Licensed Psychologist & Certified Art Therapist",
  description:
    "Dhriti Singh is an RCI licensed psychologist (CRR No. B129294), certified art therapist and PhD scholar, based in Delhi and practising since 2022 with children, adolescents and adults.",
};

export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="About" title="The person behind Inner Doorways." />
      <MeetDhriti />
      <Interlude />
      <Booking />
    </>
  );
}
