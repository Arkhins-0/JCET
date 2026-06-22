import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";

const points = [
  "Autonomous institution affiliated to APJ Abdul Kalam Technological University",
  "NAAC A+ (3.38/4) and NBA accredited programmes",
  "First college in Kerala to offer B.Tech Aeronautical Engineering",
  "IoT Centre of Excellence & ₹20 Cr Technology Business Incubator",
];

export function AboutSection() {
  return (
    <section className="section-py">
      <div className="container-px grid items-center gap-12 lg:grid-cols-2">
        {/* Text */}
        <Reveal direction="left">
          <span className="mb-3 inline-block rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary-dark">
            About JCET
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            A legacy of quality education, a culture of innovation
          </h2>
          <p className="mt-4 leading-relaxed text-muted">
            Established in 2008 at Lakkidi, Ottapalam, Jawaharlal College of
            Engineering and Technology is part of the Nehru Group of Institutions
            — one of South India&apos;s largest education networks. As an
            autonomous, NAAC A+ accredited college, JCET combines academic rigour
            with industry-driven learning to produce high-quality engineers and
            entrepreneurs.
          </p>
          <ul className="mt-6 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-secondary-dark">
                  <Check className="h-3.5 w-3.5" aria-hidden />
                </span>
                <span className="text-sm text-primary/90">{p}</span>
              </li>
            ))}
          </ul>
          <Link href="/about" className="btn-primary mt-8">
            Learn more about us
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        {/* Image with floating accent card */}
        <Reveal direction="right">
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-hover">
              <Image
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1600"
                alt="Students at JCET campus"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-secondary p-6 text-secondary-foreground shadow-hover sm:block">
              <p className="font-display text-3xl font-extrabold">17+</p>
              <p className="text-sm font-medium">Years of JCET excellence</p>
            </div>
            <div className="absolute -right-4 -top-4 hidden rounded-2xl bg-accent p-5 text-accent-foreground shadow-hover sm:block">
              <p className="font-display text-2xl font-extrabold">A+</p>
              <p className="text-xs font-medium">NAAC Grade</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
