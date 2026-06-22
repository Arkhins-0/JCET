import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/shared/SectionHeading";

const faqs = [
  {
    q: "Is JCET an autonomous college?",
    a: "Yes. JCET is an autonomous institution affiliated to APJ Abdul Kalam Technological University (KTU) and approved by AICTE. Autonomy lets us run an outcome-based curriculum and publish results quickly.",
  },
  {
    q: "What accreditations does JCET hold?",
    a: "JCET is accredited with NAAC A+ (CGPA 3.38/4 in the first cycle), has NBA-accredited programmes, and is ISO 9001:2015 certified.",
  },
  {
    q: "Which B.Tech programmes are offered?",
    a: "Aeronautical, Civil (with Computer Application), Computer Science & Engineering (including Cyber Security and Data Science), Electronics & Communication, Mechanical (Industry Integrated) and Agricultural Engineering. We also offer M.Tech and MBA.",
  },
  {
    q: "How do I apply for admission?",
    a: "Apply online through the Nehru Group admissions portal or submit forms to the Principal. Admission is through KEAM (Government), Management, NRI and Lateral Entry quotas. Counselling code: JCE.",
  },
  {
    q: "What is the eligibility for B.Tech?",
    a: "A pass in +2 with Physics, Chemistry and Mathematics (minimum 50%) and a valid KEAM/JEE score. NRI quota requires 50% in +2 with PCM.",
  },
  {
    q: "Are scholarships available?",
    a: "Yes — merit, need-based and sports scholarships are available, along with the Nehru Group's wider scholarship programmes worth over ₹10 crore.",
  },
  {
    q: "Does JCET provide hostel and transport?",
    a: "Yes. Separate hostels for boys and girls and a transport fleet covering major routes are available on the 200+ acre campus.",
  },
  {
    q: "How strong are placements at JCET?",
    a: "A dedicated Training & Placement Cell, industry MoUs and the Noble Training programme prepare students for careers with leading IT and core companies.",
  },
];

export function FAQSection() {
  return (
    <section className="section-py">
      <div className="container-px">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Quick answers to what prospective students and parents ask most."
        />
        <div className="mx-auto mt-10 max-w-3xl rounded-2xl bg-white p-2 shadow-card ring-1 ring-border/60 sm:p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
