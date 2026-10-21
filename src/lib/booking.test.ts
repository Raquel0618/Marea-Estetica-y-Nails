import { describe, expect, it } from "vitest";

import { buildWhatsAppUrl, clientSchema, getSlotsForDay, isClosedDay, isSlotPast } from "./booking";

const booking = {
  services: ["Manicura", "Olaplex"],
  date: new Date(2026, 10, 3), // martes 3 de noviembre de 2026
  time: "17:00",
  name: "Lucía Pérez",
  phone: "+34 600 111 222",
};

describe("reserva por WhatsApp", () => {
  it("envía el mensaje al número de MAREA +34 671 80 39 99", () => {
    expect(buildWhatsAppUrl(booking).startsWith("https://api.whatsapp.com/send?phone=34671803999&text=")).toBe(true);
  });

  it("incluye servicio, fecha, hora y nombre en el mensaje", () => {
    const text = decodeURIComponent(buildWhatsAppUrl(booking).split("&text=")[1] ?? "");
    expect(text).toContain("Manicura, Olaplex");
    expect(text).toContain("3 de noviembre de 2026");
    expect(text).toContain("17:00");
    expect(text).toContain("Lucía Pérez");
  });

  it("rechaza un número de WhatsApp demasiado corto", () => {
    expect(clientSchema.safeParse({ name: "Ana López", phone: "1234" }).success).toBe(false);
  });

  it("cierra los domingos", () => {
    expect(isClosedDay(new Date(2026, 10, 1))).toBe(true);
    expect(isClosedDay(new Date(2026, 10, 2))).toBe(false);
  });

  it("bloquea horas ya pasadas del mismo día", () => {
    const now = new Date(2026, 10, 3, 12, 30);
    expect(isSlotPast(new Date(2026, 10, 3), "12:00", now)).toBe(true);
    expect(isSlotPast(new Date(2026, 10, 3), "16:00", now)).toBe(false);
  });

  it("lunes a viernes: última cita a las 19:00 (cierre 20:00)", () => {
    const s = getSlotsForDay(new Date(2026, 10, 2));
    expect(s.manana[0]).toBe("10:00");
    expect(s.tarde.at(-1)).toBe("19:00");
  });

  it("sábados: de 10:00 a 14:00, sin tarde", () => {
    const s = getSlotsForDay(new Date(2026, 10, 7));
    expect(s.manana.at(-1)).toBe("13:00");
    expect(s.tarde).toEqual([]);
  });
});
