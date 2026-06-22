import Link from "next/link";
import { LayoutDashboard, FileText, Bell } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/portal/dashboard", Icon: LayoutDashboard },
  { label: "Certificates", href: "/portal/certificates", Icon: FileText },
  { label: "Notifications", href: "/portal/notifications", Icon: Bell },
];

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container-px grid gap-8 py-10 lg:grid-cols-[240px_1fr]">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl bg-white p-4 shadow-card ring-1 ring-border/60">
          <p className="px-3 py-2 font-display text-sm font-semibold uppercase tracking-wider text-muted">
            Student Portal
          </p>
          <nav className="mt-1 space-y-1">
            {navItems.map(({ label, href, Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-surface"
              >
                <Icon className="h-4 w-4 text-secondary" aria-hidden />
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
      <div>{children}</div>
    </div>
  );
}
