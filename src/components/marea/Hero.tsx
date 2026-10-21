import { Heart, MapPin, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BUSINESS } from "@/lib/booking";
import wave from "@/assets/marea-wave.png";
import fondo from "@/assets/fondo-acuarela.jpg";
import manicura from "@/assets/manicura.jpg";
import pestanas from "@/assets/pestanas.jpg";
import cejas from "@/assets/cejas.jpg";
import cabello from "@/assets/cabello.jpg";

const bubbles = [
  { src: pestanas, label: "Pestañas perfectas" },
  { src: cejas, label: "Cejas impecables" },
  { src: cabello, label: "Cabello sano y brillante" },
];

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      <img
        src={fondo}
        alt=""
        width={1600}
        height={1008}
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-90"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/30 via-background/50 to-background" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-10 md:grid-cols-[1.1fr_1fr] md:pb-24 md:pt-16">
        {/* Brand block */}
        <div className="animate-rise text-center md:text-left">
          <div className="mx-auto mb-6 inline-flex -rotate-2 flex-col items-center rounded-sm bg-gradient-navy px-4 py-2 text-navy-foreground shadow-soft md:mx-0">
            <span className="font-script text-2xl leading-none">Realza</span>
            <span className="text-[0.6rem] uppercase tracking-[0.25em]">tu belleza · siéntete tú</span>
          </div>

          <img
            src={wave}
            alt="Logotipo de MAREA, una ola azul con un sol dorado"
            width={500}
            height={469}
            className="mx-auto h-24 w-auto md:mx-0 md:h-28"
          />
          <h1 className="mt-2 font-brand text-6xl font-semibold tracking-brand text-navy sm:text-7xl md:text-8xl">
            MAREA
          </h1>
          <div className="mt-2 flex items-center justify-center gap-3 md:justify-start">
            <span className="h-px w-10 bg-gold" />
            <span className="font-display text-sm font-semibold uppercase tracking-[0.35em] text-gold">
              Estética &amp; Uñas
            </span>
            <span className="h-px w-10 bg-gold" />
          </div>

          <p className="mt-8 font-display text-2xl text-navy sm:text-3xl">
            Belleza que te hace sentir
            <span className="ml-2 inline-flex items-baseline gap-1 font-script text-5xl text-sky sm:text-6xl">
              única
              <Heart className="h-5 w-5 text-sky" strokeWidth={1.5} />
            </span>
          </p>

          <a
            href={BUSINESS.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-sm text-navy backdrop-blur transition-colors hover:bg-card"
          >
            <MapPin className="h-4 w-4 text-gold" />
            Calle Mallorca nº1 · Fuengirola
          </a>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:justify-start">
            <Button asChild variant="hero" size="xl">
              <a href="#reserva">
                <Sparkles /> Agenda tu cita
              </a>
            </Button>
            <Button asChild variant="soft" size="xl">
              <a href="#servicios">Ver servicios</a>
            </Button>
          </div>
        </div>

        {/* Photo collage */}
        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -right-2 -top-4 z-10 hidden h-32 w-32 flex-col items-center justify-center rounded-full border-2 border-sky bg-card/90 text-center shadow-card backdrop-blur sm:flex">
            <span className="font-display text-xs uppercase leading-tight tracking-wider text-navy">
              Tu momento,
              <br />
              tu espacio,
              <br />
              <strong className="font-semibold">tu marea</strong>
            </span>
            <Heart className="mt-1 h-3 w-3 fill-gold text-gold" />
          </div>

          <div className="animate-float overflow-hidden rounded-full border-[6px] border-card shadow-soft">
            <img
              src={manicura}
              alt="Manicura en tono nude sobre flores azules"
              width={1024}
              height={1024}
              className="aspect-square w-full object-cover"
            />
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
            {bubbles.map((b) => (
              <figure key={b.label} className="flex flex-col items-center gap-2">
                <div className="overflow-hidden rounded-full border-4 border-card shadow-card">
                  <img
                    src={b.src}
                    alt={b.label}
                    width={1024}
                    height={1024}
                    loading="lazy"
                    className="aspect-square w-full object-cover"
                  />
                </div>
                <figcaption className="rounded-sm bg-gradient-navy px-2 py-1 text-center text-[0.6rem] font-medium uppercase tracking-wider text-navy-foreground sm:text-[0.65rem]">
                  {b.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
