import { siteConfig } from "@/constants/siteConfig";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";

export function StatsBar() {
  return (
    <section className="bg-primary py-12">
      <div className="container-px grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
        {siteConfig.stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-display text-3xl font-extrabold text-accent sm:text-4xl">
              <AnimatedCounter
                value={stat.value}
                prefix={"prefix" in stat ? (stat.prefix as string) : ""}
                suffix={stat.suffix}
                display={"display" in stat ? (stat.display as string) : undefined}
              />
            </p>
            <p className="mt-2 text-sm text-white/70">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
