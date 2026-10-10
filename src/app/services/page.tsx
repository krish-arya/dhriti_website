import type { Metadata } from "next";
import Approaches from "@/components/Approaches";
import Booking from "@/components/Booking";
import Offerings from "@/components/Offerings";
import PageIntro from "@/components/PageIntro";

export const metadata: Metadata = {
  alternates: { canonical: "/services" },
  title: "Online Therapy — Art Therapy, CBT, DBT, Mindfulness & Play Therapy",
  description:
    "Online therapy for children, adolescents and adults with Delhi-based psychologist Dhriti Singh: art therapy, mindfulness-based therapy, DBT, CBT, play therapy and child & adolescent psychotherapy.",
};

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Services"
        title="Therapy, shaped around you."
        lead="Support for children, adolescents and adults — evidence-based, gentle, and at a pace that feels right."
      />
      <Offerings showWorkshops={false} />
      <Approaches />
      <Booking />
    </>
  );
}
