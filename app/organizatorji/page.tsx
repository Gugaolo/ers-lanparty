// app/organizatorji/page.tsx

const COLORS = {
  primary: "#00E0FF",
  accent: "#1A8CFF",
  secondary: "#7BCBFF",
  dark: "#02040A",
  darkSoft: "#0A0F1A",
};

type Organizer = {
  role: string;
  name: string;
  className: string;
};

const ORGANIZERS: Organizer[] = [
  {
    role: "Organizator1",
    name: "Gal Štravs",
    className: "4. TRA",
  },
  {
    role: "Organizator2",
    name: "Tim Rednjak",
    className: "4. TRA",
  },
  {
    role: "Organizator3",
    name: "Andraž Dimec",
    className: "4. TRA",
  },
  {
    role: "Organizator4",
    name: "Tilen Zavolovšek",
    className: "4. TRA",
  },
  {
    role: "Organizator5",
    name: "Jon Zorko Kotnik",
    className: "4. TRA",
  },
];

export default function OrganizatorjiPage() {
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
          Organizatorji{" "}
          <span style={{ color: COLORS.accent }}>LAN Party ERŠ</span>
        </h1>
        <p className="mt-2 text-white/80">
          Ekipa dijakov in mentorjev, ki stoji za dogodkom.
        </p>
      </section>

      {/* Kartice organizatorjev */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div
          className="rounded-2xl p-6 sm:p-8"
          style={{
            backgroundColor: COLORS.darkSoft,
            border: `1px solid rgba(0, 224, 255, 0.3)`,
            boxShadow: "0 0 20px rgba(0, 224, 255, 0.15)",
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {ORGANIZERS.map((person) => (
              <div
                key={person.role}
                className="rounded-lg px-4 py-3"
                style={{
                  backgroundColor: "#02040A",
                  border: "1px solid rgba(0, 224, 255, 0.15)",
                }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-wide"
                  style={{ color: COLORS.secondary }}
                >
                  {person.role}
                </p>
                <p className="mt-2 text-sm font-semibold text-white">
                  {person.name}
                </p>
                <p className="text-xs text-white/70">{person.className}</p>
              </div>
            ))}
          </div>

        </div>

        {/* Accent črta */}
        <div
          className="mt-6 h-1 w-24 rounded-full"
          style={{ backgroundColor: COLORS.primary }}
        />
      </section>
    </main>
  );
}
