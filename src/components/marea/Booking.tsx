import { useMemo, useState } from "react";
import { startOfToday } from "date-fns";
import { es } from "date-fns/locale";
import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  BOOKING_SERVICES,
  TIME_SLOTS,
  buildWhatsAppUrl,
  clientSchema,
  formatBookingDate,
  isClosedDay,
  isSlotPast,
} from "@/lib/booking";
import { WhatsAppIcon } from "./icons";

const steps = [
  { n: 1, label: "Servicios", icon: Check },
  { n: 2, label: "Fecha y hora", icon: CalendarDays },
  { n: 3, label: "Tus datos", icon: User },
] as const;

export function Booking() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [services, setServices] = useState<string[]>([]);
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string | undefined>();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  const today = useMemo(() => startOfToday(), []);

  const toggleService = (label: string) =>
    setServices((prev) => (prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]));

  const canNext = step === 1 ? services.length > 0 : step === 2 ? Boolean(date && time) : true;

  const confirm = () => {
    const parsed = clientSchema.safeParse({ name, phone });
    if (!parsed.success) {
      const fe = parsed.error.flatten().fieldErrors;
      setErrors({ name: fe.name?.[0], phone: fe.phone?.[0] });
      return;
    }
    setErrors({});
    if (!date || !time) return;
    const url = buildWhatsAppUrl({ services, date, time, ...parsed.data });
    setSentUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const reset = () => {
    setStep(1);
    setServices([]);
    setDate(undefined);
    setTime(undefined);
    setName("");
    setPhone("");
    setSentUrl(null);
  };

  return (
    <section id="reserva" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-3xl px-5">
        <div className="text-center">
          <p className="font-script text-5xl text-navy sm:text-6xl">Agenda tu cita</p>
          <span className="mt-3 inline-block -rotate-1 bg-gradient-navy px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-navy-foreground">
            ¡Te esperamos!
          </span>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            En tres pasos. Al confirmar se abrirá WhatsApp con tu reserva lista para enviar.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft">
          {/* Stepper */}
          <ol className="grid grid-cols-3 border-b border-border bg-sky-soft/60">
            {steps.map(({ n, label }) => {
              const done = step > n || (sentUrl !== null && n <= 3);
              const active = step === n && !sentUrl;
              return (
                <li
                  key={n}
                  className={cn(
                    "flex flex-col items-center gap-1 px-2 py-4 text-center text-[0.7rem] font-medium uppercase tracking-wider sm:flex-row sm:justify-center sm:gap-2 sm:text-xs",
                    active ? "text-navy" : "text-muted-foreground",
                  )}
                >
                  <span
                    className={cn(
                      "grid h-8 w-8 shrink-0 place-items-center rounded-full border text-sm transition-all",
                      done && "border-transparent bg-gold text-navy",
                      active && "border-transparent bg-gradient-navy text-navy-foreground shadow-glow",
                      !done && !active && "border-border bg-card",
                    )}
                  >
                    {done ? <Check className="h-4 w-4" /> : n}
                  </span>
                  {label}
                </li>
              );
            })}
          </ol>

          <div className="p-5 sm:p-8">
            {sentUrl ? (
              <div className="animate-rise py-6 text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-whatsapp text-navy-foreground shadow-card">
                  <WhatsAppIcon className="h-8 w-8" />
                </div>
                <h3 className="mt-5 font-display text-3xl font-semibold text-navy">¡Casi lista!</h3>
                <p className="mx-auto mt-2 max-w-sm text-muted-foreground">
                  Hemos abierto WhatsApp con tu reserva. Solo tienes que pulsar enviar y te
                  confirmaremos la cita.
                </p>
                <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                  <Button asChild variant="whatsapp" size="lg" className="h-12">
                    <a href={sentUrl} target="_blank" rel="noreferrer">
                      <WhatsAppIcon /> Abrir WhatsApp de nuevo
                    </a>
                  </Button>
                  <Button variant="soft" size="lg" className="h-12" onClick={reset}>
                    Hacer otra reserva
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {step === 1 && (
                  <div className="animate-rise">
                    <h3 className="font-display text-2xl font-semibold text-navy">
                      ¿Qué te apetece hoy?
                    </h3>
                    <p className="text-sm text-muted-foreground">Puedes elegir uno o varios servicios.</p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {BOOKING_SERVICES.map((s) => {
                        const checked = services.includes(s.label);
                        return (
                          <button
                            key={s.id}
                            type="button"
                            role="checkbox"
                            aria-checked={checked}
                            onClick={() => toggleService(s.label)}
                            className={cn(
                              "flex items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 text-left text-sm transition-all",
                              checked
                                ? "border-navy bg-sky-soft text-navy shadow-card"
                                : "border-border bg-card text-foreground hover:border-sky hover:bg-sky-soft/50",
                            )}
                          >
                            <span className="font-medium">{s.label}</span>
                            <span
                              className={cn(
                                "grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-all",
                                checked ? "border-transparent bg-gradient-navy text-navy-foreground" : "border-gold text-gold",
                              )}
                            >
                              {checked ? <Check className="h-3.5 w-3.5" /> : <span className="text-base leading-none">+</span>}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="animate-rise">
                    <h3 className="font-display text-2xl font-semibold text-navy">Elige día y hora</h3>
                    <p className="text-sm text-muted-foreground">De lunes a sábado.</p>
                    <div className="mt-5 grid gap-6 md:grid-cols-[auto_1fr]">
                      <div className="flex justify-center">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(d) => {
                            setDate(d);
                            setTime(undefined);
                          }}
                          locale={es}
                          weekStartsOn={1}
                          disabled={[{ before: today }, isClosedDay]}
                          className="pointer-events-auto rounded-2xl border border-border p-3 [--cell-size:2.4rem]"
                        />
                      </div>
                      <div>
                        {date ? (
                          <>
                            <p className="flex items-center gap-2 text-sm font-medium text-navy">
                              <Clock className="h-4 w-4 text-gold" /> {formatBookingDate(date)}
                            </p>
                            {(Object.entries(TIME_SLOTS) as [string, readonly string[]][]).map(
                              ([period, slots]) => (
                                <div key={period} className="mt-4">
                                  <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
                                    {period === "manana" ? "Mañana" : "Tarde"}
                                  </p>
                                  <div className="grid grid-cols-4 gap-2">
                                    {slots.map((slot) => {
                                      const past = isSlotPast(date, slot);
                                      const selected = time === slot;
                                      return (
                                        <button
                                          key={slot}
                                          type="button"
                                          disabled={past}
                                          onClick={() => setTime(slot)}
                                          aria-pressed={selected}
                                          className={cn(
                                            "rounded-xl border py-2.5 text-sm font-medium transition-all disabled:cursor-not-allowed disabled:opacity-35",
                                            selected
                                              ? "border-transparent bg-gradient-navy text-navy-foreground shadow-card"
                                              : "border-border bg-card text-navy hover:border-sky hover:bg-sky-soft",
                                          )}
                                        >
                                          {slot}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              ),
                            )}
                          </>
                        ) : (
                          <div className="grid h-full min-h-40 place-items-center rounded-2xl border border-dashed border-border bg-sky-soft/40 p-6 text-center text-sm text-muted-foreground">
                            Selecciona un día en el calendario para ver las horas disponibles.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="animate-rise">
                    <h3 className="font-display text-2xl font-semibold text-navy">Tus datos</h3>
                    <p className="text-sm text-muted-foreground">Para confirmarte la cita por WhatsApp.</p>
                    <div className="mt-5 grid gap-4">
                      <div className="grid gap-1.5">
                        <Label htmlFor="nombre">Nombre completo</Label>
                        <Input
                          id="nombre"
                          value={name}
                          maxLength={80}
                          autoComplete="name"
                          placeholder="Ej. Lucía Pérez"
                          onChange={(e) => setName(e.target.value)}
                          className="h-12 rounded-xl"
                        />
                        {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                      </div>
                      <div className="grid gap-1.5">
                        <Label htmlFor="whatsapp">Número de WhatsApp</Label>
                        <Input
                          id="whatsapp"
                          type="tel"
                          inputMode="tel"
                          value={phone}
                          maxLength={18}
                          autoComplete="tel"
                          placeholder="+34 600 000 000"
                          onChange={(e) => setPhone(e.target.value)}
                          className="h-12 rounded-xl"
                        />
                        {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                      </div>
                    </div>

                    <div className="mt-6 rounded-2xl border border-gold/40 bg-gold-soft/40 p-4 text-sm">
                      <p className="mb-2 font-display text-lg font-semibold text-navy">Resumen</p>
                      <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-1.5">
                        <dt className="text-muted-foreground">Servicio</dt>
                        <dd className="font-medium text-navy">{services.join(", ")}</dd>
                        <dt className="text-muted-foreground">Fecha</dt>
                        <dd className="font-medium text-navy">{date && formatBookingDate(date)}</dd>
                        <dt className="text-muted-foreground">Hora</dt>
                        <dd className="font-medium text-navy">{time}</dd>
                      </dl>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="mt-8 flex items-center justify-between gap-3">
                  {step > 1 ? (
                    <Button
                      variant="ghost"
                      className="rounded-full text-navy"
                      onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
                    >
                      <ArrowLeft /> Atrás
                    </Button>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      {services.length > 0 ? `${services.length} seleccionado(s)` : ""}
                    </span>
                  )}
                  {step < 3 ? (
                    <Button
                      variant="hero"
                      size="lg"
                      className="h-12"
                      disabled={!canNext}
                      onClick={() => setStep((s) => (s + 1) as 1 | 2 | 3)}
                    >
                      Continuar <ArrowRight />
                    </Button>
                  ) : (
                    <Button variant="whatsapp" size="lg" className="h-12" onClick={confirm}>
                      <WhatsAppIcon /> Confirmar por WhatsApp
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
