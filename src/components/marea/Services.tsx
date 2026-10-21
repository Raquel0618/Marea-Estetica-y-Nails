import { Droplets, Eye, Feather, Hand, PenTool, Sparkles, type LucideIcon } from "lucide-react";

import manicura from "@/assets/manicura.jpg";
import pedicura from "@/assets/pedicura.jpg";
import depilacion from "@/assets/depilacion.jpg";
import cejas from "@/assets/cejas.jpg";
import pestanas from "@/assets/pestanas.jpg";
import cabello from "@/assets/cabello.jpg";

interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
}

const services: Service[] = [
  {
    title: "Spa de manos y pies",
    description: "Exfoliación, hidratación y masaje para unas manos y pies suaves y relajados.",
    icon: Sparkles,
    image: pedicura,
  },
  {
    title: "Manicura y Pedicura",
    description: "Uñas cuidadas y perfectas, con acabados naturales o el color que más te guste.",
    icon: Hand,
    image: manicura,
  },
  {
    title: "Depilación",
    description: "Piel suave y cuidada con técnicas delicadas adaptadas a cada zona.",
    icon: Feather,
    image: depilacion,
  },
  {
    title: "Diseño de cejas y Micropigmentación",
    description: "Cejas impecables que enmarcan tu mirada, con un resultado natural y duradero.",
    icon: PenTool,
    image: cejas,
  },
  {
    title: "Lifting de pestañas",
    description: "Pestañas perfectas, curvadas y con volumen, sin necesidad de extensiones.",
    icon: Eye,
    image: pestanas,
  },
  {
    title: "Tratamientos capilares",
    description: "Keratina de aminoácidos y Olaplex para un cabello fuerte, sano y brillante.",
    icon: Droplets,
    image: cabello,
  },
];

export function Services() {
  return (
    <section id="servicios" className="scroll-mt-20 bg-gradient-sky py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.35em] text-gold">
            ✦ Nuestros ✦
          </p>
          <h2 className="mt-1 font-brand text-4xl font-semibold tracking-brand text-navy sm:text-5xl">
            Servicios
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            Tratamientos pensados para que salgas sintiéndote tú, pero en tu mejor versión.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ title, description, icon: Icon, image }) => (
            <article
              key={title}
              className="group flex items-center gap-4 rounded-3xl border border-border bg-card p-4 shadow-card transition-all hover:-translate-y-1 hover:shadow-soft sm:flex-col sm:items-stretch sm:p-5"
            >
              <div className="relative shrink-0">
                <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-sky-soft sm:h-auto sm:w-full sm:rounded-2xl">
                  <img
                    src={image}
                    alt={title}
                    width={1024}
                    height={1024}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:aspect-[4/3]"
                  />
                </div>
                <span className="absolute -bottom-1 -right-1 grid h-10 w-10 place-items-center rounded-full bg-gradient-navy text-navy-foreground shadow-card sm:-bottom-4 sm:right-4 sm:h-12 sm:w-12">
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
              </div>
              <div className="min-w-0 sm:pt-3">
                <h3 className="font-display text-xl font-semibold leading-tight text-navy sm:text-2xl">
                  {title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
