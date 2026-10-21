import {
  Brush,
  Droplets,
  Eye,
  Feather,
  Footprints,
  Hand,
  PenTool,
  Sparkles,
  Wind,
  type LucideIcon,
} from "lucide-react";

import manicura from "@/assets/manicura.jpg";
import pedicura from "@/assets/pedicura.jpg";
import pestanas from "@/assets/pestanas.jpg";
import cejas from "@/assets/cejas.jpg";
import cabello from "@/assets/cabello.jpg";

const services: { title: string; icon: LucideIcon }[] = [
  { title: "Spa de manos y pies", icon: Sparkles },
  { title: "Manicura", icon: Hand },
  { title: "Pedicura", icon: Footprints },
  { title: "Depilación", icon: Feather },
  { title: "Diseño de cejas", icon: Brush },
  { title: "Micropigmentación", icon: PenTool },
  { title: "Lifting de pestañas", icon: Eye },
  { title: "Keratina de aminoácidos", icon: Droplets },
  { title: "Olaplex · cabello", icon: Wind },
];

const photos = [
  { src: manicura, label: "Uñas perfectas" },
  { src: pedicura, label: "Pies cuidados" },
  { src: pestanas, label: "Pestañas perfectas" },
  { src: cejas, label: "Cejas impecables" },
  { src: cabello, label: "Cabello fuerte, sano y brillante" },
];

export function Services() {
  return (
    <section id="servicios" className="scroll-mt-20 bg-gradient-sky py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2">
        <div>
          <div className="text-center md:text-left">
            <p className="font-display text-lg font-bold uppercase tracking-[0.2em] text-navy">
              Nuestros
            </p>
            <h2 className="font-display text-4xl font-bold uppercase tracking-[0.15em] text-sky sm:text-5xl">
              Servicios
            </h2>
          </div>

          <ul className="mt-8 grid gap-3">
            {services.map(({ title, icon: Icon }) => (
              <li
                key={title}
                className="flex items-center gap-3 rounded-full bg-card/90 py-1.5 pl-1.5 pr-5 shadow-card transition-transform hover:translate-x-1"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-navy text-navy-foreground shadow-card">
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <span className="min-w-0 flex-1 truncate font-medium text-navy">{title}</span>
                <span className="shrink-0 text-xl leading-none text-gold">+</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {photos.map((p, i) => (
            <figure
              key={p.label}
              className={`flex flex-col items-center gap-2 ${i === 0 ? "col-span-2" : ""}`}
            >
              <div
                className={`overflow-hidden rounded-full border-4 border-card shadow-soft ${i === 0 ? "w-2/3" : "w-full"}`}
              >
                <img
                  src={p.src}
                  alt={p.label}
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="aspect-square w-full object-cover"
                />
              </div>
              <figcaption className="rounded-sm bg-gradient-navy px-3 py-1 text-center text-[0.65rem] font-medium uppercase tracking-wider text-navy-foreground">
                {p.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
