import type { Metadata } from "next";
import Approaches from "@/components/Approaches";
import Booking from "@/components/Booking";
import Offerings from "@/components/Offerings";
import PageIntro from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "Therapy Services — Art Therapy, CBT, DBT, Mindfulness & Play Therapy",
  description:
    "Therapy for children, adolescents and adults with Dhriti Singh: art therapy, mindfulness-based therapy, DBT, CBT, play therapy and child & adolescent psychotherapy.",
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
