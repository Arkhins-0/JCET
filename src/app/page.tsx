import { HeroCarousel } from "@/components/home/HeroCarousel";
import { StatsBar } from "@/components/home/StatsBar";
import { AboutSection } from "@/components/home/AboutSection";
import { DepartmentsGrid } from "@/components/home/DepartmentsGrid";
import { WhyJCET } from "@/components/home/WhyJCET";
import { AdmissionsStrip } from "@/components/home/AdmissionsStrip";
import { PlacementsSection } from "@/components/home/PlacementsSection";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { NewsSection } from "@/components/home/NewsSection";
import { FAQSection } from "@/components/home/FAQSection";
import { siteConfig } from "@/constants/siteConfig";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollegeOrUniversity",
  name: siteConfig.name,
  alternateName: siteConfig.shortName,
  description: siteConfig.description,
  url: siteConfig.url,
  foundingDate: String(siteConfig.established),
  address: {
    "@type": "PostalAddress",
    streetAddress: "Lakkidi, Ottapalam",
    addressLocality: "Palakkad",
    addressRegion: "Kerala",
    postalCode: "679301",
    addressCountry: "IN",
  },
  telephone: siteConfig.contact.phones[0],
  email: siteConfig.contact.emails[0],
  sameAs: Object.values(siteConfig.social),
  parentOrganization: { "@type": "Organization", name: siteConfig.group },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroCarousel />
      <StatsBar />
      <AboutSection />
      <DepartmentsGrid />
      <WhyJCET />
      <AdmissionsStrip />
      <PlacementsSection />
      <TestimonialsCarousel />
      <NewsSection />
      <FAQSection />
    </>
  );
}
