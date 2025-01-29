import {Hero, Features, HowItWorks, Testimonials, Security, FAQ, CTA} from "@/components/landingpage";

export default function Home() {
  return (
    <div className="m-2 p-1 ">
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Security />
      <FAQ />
      <CTA />
    </div>
  );
}
