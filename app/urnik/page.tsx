// app/urnik/page.tsx

const COLORS = {
  primary: "#00E0FF",   // barva črk iz logotipa
  accent: "#1A8CFF",    // neon modra rob
  secondary: "#7BCBFF", // mehkejša modra
  dark: "#02040A",      // glavno ozadje
  darkSoft: "#0A0F1A",  // kartice / sekcije
  light: "#E6F7FF",
};

type Slot = {
  time: string;
  title: string;
  desc?: string;
};

const DAY_1: Slot[] = [
  { time: "09:00 – 10:00", title: "Registracija ekip", desc: "Prevzem mest, nastavitev opreme, test povezave." },
  { time: "10:00 – 10:30", title: "Otvoritev LAN partyja", desc: "Pozdrav organizatorjev, predstavitev pravil in iger." },
  { time: "10:30 – 13:00", title: "Skupinski del – prva runda", desc: "Prve tekme po razporedu za CS2, Fortnite, Rocket League ..." },
  { time: "13:00 – 14:00", title: "Pavza za kosilo", desc: "Čas za hrano, odmor za oči, tuning opreme." },
  { time: "14:00 – 17:00", title: "Skupinski del – nadaljevanje", desc: "Odločilne tekme v skupinah, boj za izločilne boje." },
  { time: "17:00 – 18:00", title: "Prosti gaming / free play", desc: "Odprte postaje za fun meče, mini turnirji, druženje." },
];

const DAY_2: Slot[] = [
  { time: "09:00 – 09:30", title: "Ponovna prijava in priprava", desc: "Preverjanje ekip, ogrevanje pred izločilnimi boji." },
  { time: "09:30 – 12:00", title: "Izločilni boji", desc: "Četrtfinala, polfinala – napeti meči za vse naslove." },
  { time: "12:00 – 13:00", title: "Pavza za kosilo", desc: "Odmor pred velikim finalom." },
  { time: "13:00 – 15:00", title: "Finala turnirjev", desc: "Finalne tekme za posamezne igre (CS2, Fortnite, RL, ...)." },
  { time: "15:00 – 16:00", title: "Podelitev nagrad", desc: "Razglasitev zmagovalcev, podelitev nagrad in priznanj." },
  { time: "16:00 – 17:00", title: "Zaključek & pospravljanje", desc: "Zaključni nagovor, pospravljanje opreme in prostora." },
];

export default function UrnikPage() {
  return (
    <main
      className="min-h-screen text-white"
      style={{
        background: `radial-gradient(circle at top, rgba(0, 224, 255, 0.25), ${COLORS.dark} 70%)`,
      }}
    >
      {/* Header */}
      <section className="mx-auto max-w-6xl px-6 pb-4 pt-10">
        <a
          href="/"
          className="inline-block m-[10px] rounded-md px-4 py-2 text-sm font-semibold text-white shadow"
          style={{
            backgroundColor: COLORS.accent,
            boxShadow: "0 0 15px rgba(0, 128, 255, 0.5)",
          }}
        >
          ← Domov
        </a>

        <h1 className="mt-4 text-4xl font-extrabold leading-tight">
          Celoten urnik{" "}
          <span style={{ color: COLORS.accent }}>LAN Party ERŠ LAN</span>
        </h1>
        <p className="mt-2 text-white/80">
          Podroben časovni plan dogodka. Urnik je okviren in se lahko po
          potrebi prilagodi.
        </p>
      </section>

      {/* Vsebina urnika */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div
          className="rounded-2xl p-6 sm:p-8"
          style={{
            backgroundColor: COLORS.darkSoft,
            border: `1px solid rgba(0, 224, 255, 0.3)`,
            boxShadow: "0 0 20px rgba(0, 224, 255, 0.15)",
          }}
        >
          {/* 1. dan */}
          <div>
            <h2
              className="text-2xl font-bold"
              style={{ color: COLORS.primary }}
            >
              1. dan
            </h2>
            <p className="mt-1 text-sm text-white/70">
              Tekmovalni začetek, skupinski del in ogrevanje ekipe.
            </p>

            <div className="mt-5 space-y-3">
              {DAY_1.map((slot) => (
                <div
                  key={slot.time + slot.title}
                  className="flex flex-col gap-2 rounded-lg px-4 py-3 sm:flex-row sm:items-start"
                  style={{
                    backgroundColor: "#02040A",
                    border: "1px solid rgba(0, 224, 255, 0.15)",
                  }}
                >
                  <div className="sm:w-40">
                    <p className="text-xs font-semibold text-[rgba(124,203,255,0.9)]">
                      {slot.time}
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">
                      {slot.title}
                    </p>
                    {slot.desc && (
                      <p className="text-xs text-white/70 mt-1">
                        {slot.desc}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ločilna črta */}
          <div
            className="my-8 h-px w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(0,224,255,0.7), transparent)",
            }}
          />

          {/* 2. dan */}
          <div>
            <h2
              className="text-2xl font-bold"
              style={{ color: COLORS.primary }}
            >
              2. dan
            </h2>
            <p className="mt-1 text-sm text-white/70">
              Izločilni boji, finala in podelitev nagrad.
            </p>

            <div className="mt-5 space-y-3">
              {DAY_2.map((slot) => (
                <div
                  key={slot.time + slot.title}
                  className="flex flex-col gap-2 rounded-lg px-4 py-3 sm:flex-row sm:items-start"
                  style={{
                    backgroundColor: "#02040A",
                    border: "1px solid rgba(0, 224, 255, 0.15)",
                  }}
                >
                  <div className="sm:w-40">
                    <p className="text-xs font-semibold text-[rgba(124,203,255,0.9)]">
                      {slot.time}
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">
                      {slot.title}
                    </p>
                    {slot.desc && (
                      <p className="text-xs text-white/70 mt-1">
                        {slot.desc}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Opomba */}
          <p className="mt-8 text-xs text-white/60">
            Opomba: urnik je orientacijski in se lahko spremeni glede na število
            prijavljenih ekip, tehnične pogoje in odločitev organizatorjev.
          </p>
        </div>

        {/* Accent črta spodaj */}
        <div
          className="mt-6 h-1 w-24 rounded-full"
          style={{ backgroundColor: COLORS.primary }}
        />
      </section>
    </main>
  );
}
