import {
  Plane,
  Building2,
  Cpu,
  Radio,
  Cog,
  Sprout,
  Shield,
  BarChart3,
  FlaskConical,
  Briefcase,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  plane: Plane,
  "building-2": Building2,
  cpu: Cpu,
  radio: Radio,
  cog: Cog,
  sprout: Sprout,
  shield: Shield,
  "bar-chart-3": BarChart3,
  "flask-conical": FlaskConical,
  briefcase: Briefcase,
};

export function DepartmentIcon({
  icon,
  className,
}: {
  icon?: string | null;
  className?: string;
}) {
  const Icon = (icon && ICONS[icon]) || GraduationCap;
  return <Icon className={cn("h-6 w-6", className)} aria-hidden />;
}
