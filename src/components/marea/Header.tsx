import { Button } from "@/components/ui/button";
import wave from "@/assets/marea-wave.png";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3 md:flex md:justify-between">
        <a href="#inicio" className="flex min-w-0 items-center gap-2">
          <img src={wave} alt="" width={500} height={469} className="h-9 w-9 shrink-0 object-contain" />
          <span className="truncate font-brand text-xl font-semibold tracking-brand text-navy">MAREA</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#servicios" className="transition-colors hover:text-navy">Servicios</a>
          <a href="#reserva" className="transition-colors hover:text-navy">Reservar</a>
          <a href="#contacto" className="transition-colors hover:text-navy">Contacto</a>
        </nav>
        <Button asChild variant="hero" size="sm" className="h-9 px-5">
          <a href="#reserva">Reservar</a>
        </Button>
      </div>
    </header>
  );
}
