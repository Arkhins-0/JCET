import { FileText, Upload, Users, GraduationCap, Download } from "lucide-react";
import { siteConfig } from "@/constants/siteConfig";
import { Reveal } from "@/components/shared/Reveal";

const steps = [
  { Icon: FileText, label: "Apply" },
  { Icon: Upload, label: "Documents" },
  { Icon: Users, label: "Counselling" },
  { Icon: GraduationCap, label: "Admission" },
];

export function AdmissionsStrip() {
  return (
    <section className="bg-gradient-to-r from-secondary-dark via-secondary to-secondary-dark py-14">
      <div className="container-px">
        <Reveal className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
          <div className="text-center lg:text-left">
            <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
              Admissions Open 2026–27
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
              Begin your engineering journey
            </h2>
            <p className="mt-2 text-white/85">
              B.Tech • M.Tech • MBA — Counselling Code {siteConfig.counsellingCode}
            </p>
          </div>

          {/* Step progress */}
          <div className="flex items-center">
            {steps.map((step, i) => (
              <div key={step.label} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-secondary-dark shadow-card">
                    <step.Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <span className="mt-2 text-xs font-medium text-white">
                    {step.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="mx-2 h-0.5 w-8 bg-white/40 sm:w-12" />
                )}
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-end">
          <a
            href={siteConfig.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-accent text-accent-foreground hover:bg-accent-light"
          >
            Apply Now
          </a>
          <a
            href="https://jawaharlalcolleges.com/downloads.php"
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-white text-secondary-dark hover:bg-surface"
          >
            <Download className="h-4 w-4" />
            Download Brochure
          </a>
        </div>
      </div>
    </section>
  );
}
