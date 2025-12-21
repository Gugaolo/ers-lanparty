"use client";

import Link from "next/link";
import { SCHEDULE } from "../data/schedule";

const COLORS = {
  accent: "#1A8CFF",
  glow: "#00E0FF",
  surface: "#0A0F1A",
  base: "#02040A",
};

export default function UrnikPage() {
  return (
    <main
      className="min-h-screen text-white"
      style={{
        background: `radial-gradient(circle at 20% 20%, rgba(0, 224, 255, 0.2), ${COLORS.base} 60%)`,
      }}
    >
      <section className="mx-auto max-w-6xl px-6 pb-14 pt-12">
        <Link
          href="/"
          className="inline-block rounded-md px-4 py-2 text-sm font-semibold text-white shadow"
          style={{
            backgroundColor: COLORS.accent,
            boxShadow: "0 0 18px rgba(0, 128, 255, 0.4)",
          }}
        >
          Domov
        </Link>

        <div className="mt-6">
          <p className="text-sm uppercase tracking-[0.25em] text-white/60">
            ERS SCV LAN PARTY
          </p>
          <h1 className="mt-2 text-4xl font-extrabold leading-tight sm:text-5xl">
            Urnik dogodka
          </h1>
          <p className="mt-3 text-white/80 text-lg">
            3-dnevni LAN Party - ERS SCV
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {SCHEDULE.map((day) => (
            <article
              key={day.name}
              className="flex flex-col gap-4 rounded-2xl p-6 shadow-lg"
              style={{
                backgroundColor: COLORS.surface,
                border: "1px solid rgba(0, 224, 255, 0.25)",
                boxShadow: "0 10px 30px rgba(0, 128, 255, 0.15)",
              }}
            >
              <header className="flex flex-col gap-1">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-white/70">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: COLORS.accent,
                      boxShadow: "0 0 12px rgba(0, 224, 255, 0.8)",
                    }}
                  />
                  {day.range}
                </div>
                <h2 className="text-2xl font-bold" style={{ color: COLORS.glow }}>
                  {day.name}
                </h2>
              </header>

              <div className="space-y-3">
                {day.slots.map((slot) => (
                  <div
                    key={slot.time + slot.title}
                    className="rounded-xl px-4 py-3"
                    style={{
                      backgroundColor: COLORS.base,
                      border: "1px solid rgba(0, 224, 255, 0.15)",
                    }}
                  >
                    <p className="text-xs font-semibold text-[rgba(124,203,255,0.9)]">
                      {slot.time}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {slot.title}
                    </p>
                    {slot.desc && (
                      <p className="mt-1 text-xs text-white/70">{slot.desc}</p>
                    )}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75 backdrop-blur">
          Urnik se lahko spremeni glede na stevilo prijavljenih ekip.
        </div>
      </section>
    </main>
  );
}
