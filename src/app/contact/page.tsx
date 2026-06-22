import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { siteConfig } from "@/constants/siteConfig";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Jawaharlal College of Engineering and Technology, Lakkidi, Ottapalam, Palakkad, Kerala.",
};

export default function ContactPage() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    siteConfig.contact.mapQuery
  )}&output=embed`;

  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="We'd love to hear from you — reach out for admissions and enquiries"
        breadcrumbs={[{ label: "Contact" }]}
      />

      <section className="section-py">
        <div className="container-px grid gap-10 lg:grid-cols-2">
          {/* Info + map */}
          <div>
            <h2 className="font-display text-2xl font-bold text-primary">
              Get in touch
            </h2>
            <ul className="mt-6 space-y-5">
              <InfoRow Icon={MapPin} title="Address">
                {siteConfig.contact.address}
              </InfoRow>
              <InfoRow Icon={Phone} title="Phone">
                {siteConfig.contact.phones.map((p) => (
                  <a
                    key={p}
                    href={`tel:${p.replace(/\s/g, "")}`}
                    className="block hover:text-secondary-dark"
                  >
                    {p}
                  </a>
                ))}
                <span className="block">Landline: {siteConfig.contact.landline}</span>
              </InfoRow>
              <InfoRow Icon={Mail} title="Email">
                {siteConfig.contact.emails.map((e) => (
                  <a
                    key={e}
                    href={`mailto:${e}`}
                    className="block hover:text-secondary-dark"
                  >
                    {e}
                  </a>
                ))}
              </InfoRow>
              <InfoRow Icon={Clock} title="Office Hours">
                Monday – Saturday, 9:00 AM – 5:00 PM
              </InfoRow>
            </ul>

            <div className="mt-8 overflow-hidden rounded-2xl shadow-card ring-1 ring-border/60">
              <iframe
                title="JCET location map"
                src={mapSrc}
                width="100%"
                height="280"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="border-0"
              />
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-border/60 sm:p-8">
            <h2 className="font-display text-2xl font-bold text-primary">
              Send us a message
            </h2>
            <p className="mt-1 text-sm text-muted">
              Fill in the form and our team will get back to you.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function InfoRow({
  Icon,
  title,
  children,
}: {
  Icon: typeof MapPin;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary-dark">
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <div>
        <p className="font-display font-semibold text-primary">{title}</p>
        <div className="mt-0.5 text-sm text-muted">{children}</div>
      </div>
    </li>
  );
}
