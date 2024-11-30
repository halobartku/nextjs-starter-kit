import { AccordionComponent } from "@/components/homepage/accordion-component";
import HeroSection from "@/components/homepage/hero-section";
import MarketingCards from "@/components/homepage/marketing-cards";
import Pricing from "@/components/homepage/pricing";
import SideBySide from "@/components/homepage/side-by-side";
import Stats from "@/components/homepage/stats";
import PageWrapper from "@/components/wrapper/page-wrapper";
import config from "@/config";

export default function Home() {
  return (
    <PageWrapper>
      <div className="flex flex-col justify-center items-center w-full mt-[1rem] p-3">
        <HeroSection />
      </div>
      <div className="w-full bg-gray-50 dark:bg-gray-900/50 py-16">
        <Stats />
      </div>
      <div className="flex my-24 w-full justify-center items-center">
        <SideBySide />
      </div>
      <div className="flex flex-col p-2 w-full justify-center items-center bg-white dark:bg-black py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Powerful Features for Your Business</h2>
        <MarketingCards />
      </div>
      {(config.auth.enabled && config.payments.enabled) && 
        <div className="py-16 bg-gray-50 dark:bg-gray-900/50">
          <Pricing />
        </div>
      }
      <div className="flex justify-center items-center w-full py-16 bg-white dark:bg-black">
        <AccordionComponent />
      </div>
    </PageWrapper>
  );
}