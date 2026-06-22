import { Bell } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-primary">
        Notifications
      </h1>
      <p className="mt-1 text-muted">
        Role-targeted notifications from <code>GET /api/notifications</code>.
      </p>

      <div className="mt-8 rounded-xl bg-white p-8 text-center shadow-card ring-1 ring-border/60">
        <Bell className="mx-auto h-10 w-10 text-secondary/40" aria-hidden />
        <p className="mt-3 text-muted">
          Sign in to view your notifications.
        </p>
      </div>
    </div>
  );
}
