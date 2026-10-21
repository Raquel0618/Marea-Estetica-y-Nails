import { Clock, Heart, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BUSINESS, OPENING_HOURS } from "@/lib/booking";
import { InstagramIcon, WhatsAppIcon } from "./icons";

export function Footer() {
  return (
    <footer id="contacto" className="scroll-mt-20 bg-gradient-ocean text-navy-foreground">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="text-center md:text-left">
            <p className="font-brand text-3xl font-semibold tracking-brand">MAREA</p>
            <p className="mt-1 text-xs uppercase tracking-[0.35em] text-gold">Estética &amp; Uñas</p>
            <p className="mt-6 font-script text-5xl leading-tight text-sky">
              Tu belleza, nuestra marea
              <Heart className="ml-2 inline h-5 w-5 align-middle" strokeWidth={1.5} />
            </p>
            <div className="mt-8">
              <p className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] text-gold md:justify-start">
                <Clock className="h-4 w-4" /> Horario
              </p>
              <ul className="mt-3 space-y-1 text-sm">
                {OPENING_HOURS.map((o) => (
                  <li key={o.days} className="flex justify-center gap-3 md:justify-start">
                    <span className="text-navy-foreground/80">{o.days}</span>
                    <span className="font-medium">{o.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button asChild variant="gold" size="xl" className="w-full">
              <a href={`tel:+${BUSINESS.phoneDigits}`}>
                <Phone /> Llamar al {BUSINESS.phoneDisplay}
              </a>
            </Button>
            <Button asChild variant="whatsapp" size="xl" className="w-full">
              <a href={`https://wa.me/${BUSINESS.phoneDigits}`} target="_blank" rel="noreferrer">
                <WhatsAppIcon /> Escríbenos por WhatsApp
              </a>
            </Button>
            <Button asChild variant="on-navy" size="xl" className="w-full">
              <a
                href={`https://instagram.com/${BUSINESS.instagram}`}
                target="_blank"
                rel="noreferrer"
              >
                <InstagramIcon /> @{BUSINESS.instagram}
              </a>
            </Button>
            <a
              href={BUSINESS.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 text-sm text-navy-foreground/80 transition-colors hover:text-navy-foreground"
            >
              <MapPin className="h-4 w-4 text-gold" /> {BUSINESS.address}
            </a>
          </div>
        </div>

        <div className="mt-14 border-t border-navy-foreground/15 pt-6 text-center text-xs text-navy-foreground/60">
          © {new Date().getFullYear()} {BUSINESS.name} · Fuengirola
        </div>
      </div>
    </footer>
  );
}

export function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/${BUSINESS.phoneDigits}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Escribir por WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-navy-foreground shadow-soft transition-transform hover:scale-110"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
