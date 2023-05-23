import Hero from "../components/Hero";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import Email from "../components/Email";
import RichText from "../components/RichText";
import LargeVideoSection from "../components/LargeVideoSection";
import StartSection from "../components/StartSection";
import ServicesBlock from "../components/ServicesBlock";

export function sectionRenderer(section: any, index: number) {
  switch (section.__component) {
    case "sections.hero":
      return <Hero key={index} data={section} />;
    case "sections.features":
      return <Features key={index} data={section} />;
    case "sections.testimonials-group":
      return <Testimonials key={index} data={section} />;
    case "sections.pricing":
      return <Pricing key={index} data={section} />;
    case "sections.lead-form":
      return <Email key={index} data={section} />;
    case "sections.rich-text":
      return <RichText key={index} data={section} />;
    case "sections.large-video":
      return <LargeVideoSection key={index} data={section} />;
    case "sections.start-section":
      return <StartSection key={index} data={section} />;
    case "sections.services-block":
      return <ServicesBlock key={index} data={section} />;
    default:
      return null;
  }
}
