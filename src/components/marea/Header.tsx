import wave from "@/assets/marea-wave.png";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-gradient-navy text-navy-foreground shadow-soft">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 sm:px-5">
        <a href="#inicio" className="flex min-w-0 items-center gap-2 sm:gap-3">
          <img src={wave} alt="" width={500} height={469} className="h-8 w-8 shrink-0 sm:h-9 sm:w-9 object-contain" />
          <span className="flex min-w-0 flex-col leading-none">
            <span className="font-script text-2xl leading-none">Realza</span>
            <span className="whitespace-nowrap text-[0.55rem] sm:text-[0.6rem] uppercase tracking-[0.15em] sm:tracking-[0.25em]">
              tu belleza, siéntete tú
            </span>
          </span>
        </a>
        <nav className="flex items-center gap-3 text-[0.7rem] text-navy-foreground/85 sm:gap-8 sm:text-sm">
          <a href="#servicios" className="transition-colors hover:text-gold">Servicios</a>
          <a href="#reserva" className="transition-colors hover:text-gold">Reservar</a>
          <a href="#contacto" className="transition-colors hover:text-gold">Contacto</a>
        </nav>
      </div>
    </header>
  );
}
