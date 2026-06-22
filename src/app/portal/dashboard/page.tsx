import Link from "next/link";
import { FileText, Bell, GraduationCap, Info } from "lucide-react";

export default function PortalDashboard() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-primary">Dashboard</h1>
      <p className="mt-1 text-muted">
        Welcome to the JCET student portal.
      </p>

      <div className="mt-4 flex items-start gap-3 rounded-xl bg-accent/10 p-4 text-sm text-accent-dark">
        <Info className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
        <p>
          This portal is auth-protected. Connect it to the backend NextAuth
          credentials login (<code>/api/auth</code>) to enable certificate
          requests and personalised notifications.
        </p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {[
          { Icon: GraduationCap, label: "Programme", value: "B.Tech CSE" },
          { Icon: FileText, label: "Certificate requests", value: "0 pending" },
          { Icon: Bell, label: "Notifications", value: "View all" },
        ].map(({ Icon, label, value }) => (
          <div
            key={label}
            className="rounded-xl bg-white p-6 shadow-card ring-1 ring-border/60"
          >
            <Icon className="h-6 w-6 text-secondary" aria-hidden />
            <p className="mt-3 text-sm text-muted">{label}</p>
            <p className="font-display text-lg font-bold text-primary">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/portal/certificates" className="btn-primary">
          Request a certificate
        </Link>
        <Link href="/portal/notifications" className="btn-outline">
          View notifications
        </Link>
      </div>
    </div>
  );
}
