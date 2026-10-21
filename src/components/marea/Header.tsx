import wave from "@/assets/marea-wave.png";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-gradient-navy text-navy-foreground shadow-soft">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-2.5">
        <a href="#inicio" className="flex min-w-0 items-center gap-3">
          <img src={wave} alt="" width={500} height={469} className="h-9 w-9 shrink-0 object-contain" />
          <span className="flex min-w-0 flex-col leading-none">
            <span className="font-script text-2xl leading-none">Realza</span>
            <span className="truncate text-[0.6rem] uppercase tracking-[0.25em]">
              tu belleza, siéntete tú
            </span>
          </span>
        </a>
        <nav className="flex items-center gap-4 text-xs text-navy-foreground/85 sm:gap-8 sm:text-sm">
          <a href="#servicios" className="transition-colors hover:text-gold">Servicios</a>
          <a href="#reserva" className="transition-colors hover:text-gold">Reservar</a>
          <a href="#contacto" className="transition-colors hover:text-gold">Contacto</a>
        </nav>
      </div>
    </header>
  );
}
