import { describe, expect, it } from "vitest";

import { buildWhatsAppUrl, clientSchema, isClosedDay, isSlotPast } from "./booking";

const booking = {
  services: ["Manicura", "Olaplex"],
  date: new Date(2026, 10, 3), // martes 3 de noviembre de 2026
  time: "17:00",
  name: "Lucía Pérez",
  phone: "+34 600 111 222",
};

describe("reserva por WhatsApp", () => {
  it("envía el mensaje al número de MAREA +34 671 80 39 99", () => {
    expect(buildWhatsAppUrl(booking).startsWith("https://wa.me/34671803999?text=")).toBe(true);
  });

  it("incluye servicio, fecha, hora y nombre en el mensaje", () => {
    const text = decodeURIComponent(buildWhatsAppUrl(booking).split("?text=")[1]);
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
});
