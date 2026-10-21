import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/marea/Header";
import { Hero } from "@/components/marea/Hero";
import { Highlights } from "@/components/marea/Highlights";
import { Services } from "@/components/marea/Services";
import { Booking } from "@/components/marea/Booking";
import { FloatingWhatsApp, Footer } from "@/components/marea/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MAREA Estética & Uñas · Fuengirola | Reserva tu cita" },
      {
        name: "description",
        content:
          "Manicura, pedicura, depilación, cejas, lifting de pestañas y tratamientos capilares en Calle Mallorca nº1, Fuengirola. Reserva tu cita por WhatsApp.",
      },
      { property: "og:title", content: "MAREA Estética & Uñas · Fuengirola" },
      {
        property: "og:description",
        content: "Belleza que te hace sentir única. Reserva tu cita en Fuengirola por WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Highlights />
        <Services />
        <Booking />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
