import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import Workshops from "@/components/Workshops";

export const metadata: Metadata = {
  title: "Mental Health Workshops for Schools & Colleges",
  description:
    "Mental health workshops and talks by psychologist Dhriti Singh for schools, colleges and organisations — emotional well-being, stress and adjustment.",
};

export default function WorkshopsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Workshops"
        title="Mental health conversations, in the room."
        lead="Talks and workshops for schools, colleges and groups on emotional well-being, stress and adjustment."
      />
      <Workshops />
    </>
  );
}
