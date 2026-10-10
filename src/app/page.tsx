import AboutTeaser from "@/components/AboutTeaser";
import Areas from "@/components/Areas";
import Booking from "@/components/Booking";
import Hero from "@/components/Hero";
import InstagramSection from "@/components/InstagramSection";
import Sessions from "@/components/Sessions";
import StoriesTeaser from "@/components/StoriesTeaser";
import Welcome from "@/components/Welcome";

export default function Home() {
  return (
    <>
      <Hero />
      <Welcome />
      <AboutTeaser />
      <Areas />
      <Sessions />
      <StoriesTeaser />
      <InstagramSection />
      <Booking />
    </>
  );
}
