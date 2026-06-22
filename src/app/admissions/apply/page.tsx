import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { AdmissionForm } from "@/components/forms/AdmissionForm";

export const metadata: Metadata = {
  title: "Apply Online",
  description:
    "Submit your application to JCET for B.Tech, M.Tech or MBA programmes — quick 3-step admission enquiry form.",
};

export default function ApplyPage() {
  return (
    <>
      <PageHero
        title="Admission Enquiry"
        subtitle="Complete the form in 3 simple steps — it only takes a few minutes"
        breadcrumbs={[
          { label: "Admissions", href: "/admissions" },
          { label: "Apply" },
        ]}
      />
      <section className="section-py">
        <div className="container-px max-w-3xl">
          <AdmissionForm />
        </div>
      </section>
    </>
  );
}
