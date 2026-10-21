import { Award, Gem, HeartHandshake } from "lucide-react";

const items = [
  { icon: Award, title: "Productos de alta calidad" },
  { icon: Gem, title: "Profesionales expertas" },
  { icon: HeartHandshake, title: "Atención personalizada" },
];

export function Highlights() {
  return (
    <section aria-label="Por qué elegirnos" className="border-y border-border bg-card">
      <div className="mx-auto grid max-w-5xl grid-cols-3 divide-x divide-gold/40 px-2 py-6">
        {items.map(({ icon: Icon, title }) => (
          <div key={title} className="flex flex-col items-center gap-2 px-2 text-center">
            <Icon className="h-7 w-7 text-gold" strokeWidth={1.4} />
            <p className="text-[0.65rem] font-medium uppercase leading-tight tracking-wider text-navy sm:text-xs">
              {title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
