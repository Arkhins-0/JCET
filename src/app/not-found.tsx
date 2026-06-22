import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-24">
      <div className="text-center">
        <p className="font-display text-7xl font-extrabold text-secondary">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-primary">
          Page not found
        </h1>
        <p className="mt-2 max-w-md text-muted">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            <Home className="h-4 w-4" /> Go home
          </Link>
          <Link href="/departments" className="btn-outline">
            <Search className="h-4 w-4" /> Browse departments
          </Link>
        </div>
      </div>
    </div>
  );
}
