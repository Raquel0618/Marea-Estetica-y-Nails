import { format } from "date-fns";
import { es } from "date-fns/locale";
import { z } from "zod";

export const BUSINESS = {
  name: "MAREA Estética & Uñas",
  slogan: "Belleza que te hace sentir única",
  phoneDisplay: "+34 671 80 39 99",
  phoneDigits: "34671803999",
  instagram: "mareabeauty_studio",
  address: "Calle Mallorca nº1, Fuengirola",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Calle+Mallorca+1+Fuengirola",
} as const;

export const BOOKING_SERVICES = [
  { id: "spa", label: "Spa de manos y pies" },
  { id: "manicura", label: "Manicura" },
  { id: "pedicura", label: "Pedicura" },
  { id: "depilacion", label: "Depilación" },
  { id: "cejas", label: "Diseño de cejas" },
  { id: "micro", label: "Micropigmentación" },
  { id: "lifting", label: "Lifting de pestañas" },
  { id: "keratina", label: "Keratina de aminoácidos" },
  { id: "olaplex", label: "Olaplex" },
] as const;

export type ServiceId = (typeof BOOKING_SERVICES)[number]["id"];

export const TIME_SLOTS = {
  manana: ["10:00", "11:00", "12:00", "13:00"],
  tarde: ["16:00", "17:00", "18:00", "19:00"],
} as const;

/** Sundays are closed. */
export function isClosedDay(date: Date): boolean {
  return date.getDay() === 0;
}

/** A slot is in the past when the chosen day is today and the slot hour already passed. */
export function isSlotPast(date: Date, slot: string, now: Date = new Date()): boolean {
  const [h = 0, m = 0] = slot.split(":").map(Number);
  const slotDate = new Date(date);
  slotDate.setHours(h, m, 0, 0);
  return slotDate.getTime() <= now.getTime();
}

export const clientSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Escribe tu nombre completo" })
    .max(80, { message: "Máximo 80 caracteres" }),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s]{9,18}$/, { message: "Introduce un número de WhatsApp válido" }),
});

export interface BookingData {
  services: string[];
  date: Date;
  time: string;
  name: string;
  phone: string;
}

export function formatBookingDate(date: Date): string {
  const text = format(date, "EEEE d 'de' MMMM 'de' yyyy", { locale: es });
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function buildWhatsAppMessage(b: BookingData): string {
  return [
    "¡Hola MAREA! 🌊 Me gustaría reservar una cita:",
    "",
    `💅 Servicio: ${b.services.join(", ")}`,
    `📅 Fecha: ${formatBookingDate(b.date)}`,
    `🕐 Hora: ${b.time}`,
    `👤 Nombre: ${b.name.trim()}`,
    `📱 WhatsApp: ${b.phone.trim()}`,
    "",
    "¡Gracias!",
  ].join("\n");
}

export function buildWhatsAppUrl(b: BookingData): string {
  return `https://wa.me/${BUSINESS.phoneDigits}?text=${encodeURIComponent(buildWhatsAppMessage(b))}`;
}
