// app/kontakt/page.tsx

import React from "react";
import Footer from "../components/footer";
import Header from "../components/header";

const COLORS = {
  primary: "#00E0FF",
  accent: "#1A8CFF",
  secondary: "#7BCBFF",
  dark: "#02040A",
  darkSoft: "#0A0F1A",
};

export default function KontaktPage() {
  return (
    <main
      className="min-h-screen text-white"
      style={{
        background: `radial-gradient(circle at top, rgba(0, 224, 255, 0.25), ${COLORS.dark} 70%)`,
      }}
    >
      <Header />
      <section className="mx-auto max-w-6xl px-6 pb-4 pt-10">
        <h1 className="mt-4 text-4xl font-extrabold leading-tight">
          Kontakt{" "}
          <span style={{ color: COLORS.accent }}>organizatorjev</span>
        </h1>
        <p className="mt-2 text-white/80">
          Imaš vprašanje glede prijave, iger ali pravil? Piši nam ali se nam
          pridruži na Discordu.
        </p>
      </section>
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <div
          className="rounded-2xl p-6 sm:p-8"
          style={{
            backgroundColor: COLORS.darkSoft,
            border: `1px solid rgba(0, 224, 255, 0.3)`,
            boxShadow: "0 0 20px rgba(0, 224, 255, 0.15)",
          }}
        >
          {/* Glavni kontakt */}
          <div>
            <h2
              className="text-xl font-semibold"
              style={{ color: COLORS.primary }}
            >
              Glavni kontakt
            </h2>

            <div className="mt-4 space-y-1 text-sm text-white/85">
              <p>
                <span className="font-semibold">E-mail 1:</span>{" "}
                <span className="opacity-80">tim.rednjak@scv.si</span>
              </p>
              <p>
                <span className="font-semibold">E-mail 2 (mentor):</span>{" "}
                <span className="opacity-80">samo.zeleznik@scv.si</span>
              </p>
            </div>
          </div>

          {/* Discord */}
          <div className="mt-8">
            <h2
              className="text-xl font-semibold"
              style={{ color: COLORS.primary }}
            >
              Discord strežnik
            </h2>
            <p className="mt-2 text-sm text-white/80">
              Za hitra vprašanja, dogovor s soigralci in obvestila med dogodkom
              se pridruži na Discord strežnik LAN partyja.
            </p>

            <a
              href="https://discord.gg/Tr3TFd3XZe"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block rounded-md px-5 py-2.5 text-sm font-semibold text-white shadow transition"
              style={{
                backgroundColor: COLORS.accent,
                boxShadow: "0 0 15px rgba(0, 224, 255, 0.6)",
              }}
            >
              Pridruži se Discordu
            </a>

          </div>

          {/* Ostalo */}
          <div className="mt-8">
            <h2
              className="text-xl font-semibold"
              style={{ color: COLORS.primary }}
            >
              Ostale informacije
            </h2>
          </div>
        </div>
      </section>
    </main>
  );
}
