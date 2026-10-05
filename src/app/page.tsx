import AmbientSound from "@/components/AmbientSound";
import Areas from "@/components/Areas";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InstagramSection from "@/components/InstagramSection";
import Interlude from "@/components/Interlude";
import MeetDhriti from "@/components/MeetDhriti";
import RevealObserver from "@/components/RevealObserver";
import Sessions from "@/components/Sessions";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <MeetDhriti />
        <Areas />
        <Interlude />
        <Sessions />
        <InstagramSection />
        <Booking />
      </main>
      <Footer />
      <RevealObserver />
      <AmbientSound />
    </>
  );
}
