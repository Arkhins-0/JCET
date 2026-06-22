import { FileText } from "lucide-react";

const types = [
  { type: "BONAFIDE", label: "Bonafide Certificate" },
  { type: "NOC", label: "No Objection Certificate" },
  { type: "TRANSCRIPT", label: "Transcript" },
  { type: "MIGRATION", label: "Migration Certificate" },
];

export default function CertificatesPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-primary">
        Certificate Requests
      </h1>
      <p className="mt-1 text-muted">
        Request official certificates. Requests post to{" "}
        <code>POST /api/certificates</code> (student role required).
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {types.map((t) => (
          <div
            key={t.type}
            className="flex items-center justify-between rounded-xl bg-white p-5 shadow-card ring-1 ring-border/60"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary-dark">
                <FileText className="h-5 w-5" aria-hidden />
              </div>
              <span className="font-medium text-primary">{t.label}</span>
            </div>
            <button className="btn-outline btn" disabled>
              Request
            </button>
          </div>
        ))}
      </div>
      <p className="mt-6 text-xs text-muted">
        Buttons are enabled once a student session is connected.
      </p>
    </div>
  );
}
