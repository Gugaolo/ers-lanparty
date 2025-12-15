// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import NavUser from "./components/NavUser";

const COLORS = {
  primary: "#00F6FF",  // neon modra — glavni poudarek
  accent:  "#1A8CFF",  // turkizna neonska
  secondary: "#7BCBFF", // mehka svetla modra (za prelive, hoverje)
  dark:    "#02040A",  // ozadje strani
  darkSoft: "#0A0F1A", // kartice / sekcije
  light:   "#E6F7FF",  // svetla modra za kontrastne elemente
};


export default function Home() {
  return (
    <main
      className="min-h-screen text-gray-900 dark:text-white"
      style={{
        background: `radial-gradient(circle at center,
  rgba(0, 183, 255, 0.25),
  rgba(2, 4, 10, 1) 70%
)`
,
      }}
    >
      {/* NAV */}
      <nav className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/ERSLogotip.png" // <- dodaj logo v /public
            alt="ERŠ ŠCV"
            width={40}
            height={40}
            priority
          />
          <span className="text-lg font-semibold tracking-tight">
            ERŠ ŠCV LAN PARTY
          </span>
        </div>
        <div className="hidden gap-3 sm:flex">
          <Link href="#igre" className="rounded-md px-3 py-2 text-sm hover:bg-white/10">
            Igre
          </Link>
          <Link href="/teams" className="rounded-md px-3 py-2 text-sm hover:bg-white/10">
            Ekipe
          </Link>
          <Link href="#urnik" className="rounded-md px-3 py-2 text-sm hover:bg-white/10">
            Urnik
          </Link>
          <Link href="#pravila" className="rounded-md px-3 py-2 text-sm hover:bg-white/10">
            Pravila
          </Link>
          <NavUser />
        </div>
        {/* Mobile quick links */}
        <div className="flex gap-2 overflow-x-auto sm:hidden">
          <Link href="/prijava" className="rounded-md bg-white/10 px-3 py-2 text-xs font-semibold text-white">
            Prijava ekipe
          </Link>
          <Link href="/teams" className="rounded-md bg-white/10 px-3 py-2 text-xs font-semibold text-white">
            Ekipe
          </Link>
          <Link href="/login" className="rounded-md bg-white/10 px-3 py-2 text-xs font-semibold text-white">
            Prijava
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 pb-16 pt-10 sm:grid-cols-2 sm:pt-16">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
            LAN Party <span style={{ color: COLORS.accent }}>ERŠ ŠCV</span>
          </h1>
          <p className="mt-4 max-w-xl text-white/80">
            Turnirji, nagrade, ekipe in dobra družba. Prinesi svoj računalnik ali
            se pridruži kot gledalec. Povezujemo elektro in računalniške navdušence
            v srcu Velenja.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/prijava"
              className="rounded-md px-5 py-3 text-sm font-semibold text-white shadow"
              style={{ backgroundColor: COLORS.accent }}
            >
              Prijavi ekipo
            </Link>
            <Link
              href="#pravila"
              className="rounded-md border border-white/30 px-5 py-3 text-sm font-semibold text-white/90 hover:bg-white/10"
            >
              Preberi pravila
            </Link>
          </div>

          {/* Info trak */}
          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-white/80">
            <div className="rounded-md bg-white/10 px-3 py-2">Lokacija: Gaudeamus</div>
            <div className="rounded-md bg-white/10 px-3 py-2">Datum: 13. - 15. Marec</div>
            <div className="rounded-md bg-white/10 px-3 py-2">Vstop: brezplačno</div>
          </div>
        </div>

        {/* Hero ilustracija */}
        <div className="relative h-64 w-full sm:h-96">
          <Image
            src="/ERS-LanParty.png"  // dodaj poljubno ilustracijo v /public
            alt="LAN party illustration"
            fill
            className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
            priority
          />
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: "Ekipe in solo", desc: "Prijavi ekipo ali igraj samostojno." },
            { title: "Več iger", desc: "CS2, Rocket League, Fortnite …" },
            { title: "Hitro omrežje", desc: "Stabilna povezava in tehnična podpora." },
          ].map((c) => (
            <div
              key={c.title}
              className="rounded-xl border border-white/15 bg-white/10 p-5 backdrop-blur"
            >
              <h3 className="text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-white/80">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* IGRE */}
      <section id="igre" className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="text-2xl font-bold">Igre na dogodku</h2>
        <p className="mt-2 text-white/80">
          Izbor aktualnih naslovov. Končni seznam objavimo po zaključku prijav.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {["CS2🔫", "Fortnite🎯", "Rocket League🚗⚽", "Clash Royale🃏", "Fifa⚽"].map((g) => (
            <span
              key={g}
              className="rounded-full bg-white/10 px-4 py-2 text-sm"
            >
              {g}
            </span>
          ))}
        </div>
      </section>

            {/* URNIK (teaser) */}
            <section id="urnik" className="mx-auto max-w-6xl px-6 pb-16">
        <div
          className="rounded-2xl p-6 shadow-2xl sm:p-8"
          style={{
            backgroundColor: "#0A0F1A", // darkSoft
            border: "1px solid rgba(0, 224, 255, 0.3)", // primary neon outline
            boxShadow: "0 0 20px rgba(0, 224, 255, 0.15)",
          }}
        >
          <h2
            className="text-xl font-bold"
            style={{ color: "#1A8CFF" }} // neon naslov
          >
            Predviden urnik
          </h2>

          {/* 1. DAN */}
          <h3 className="mt-4 text-sm" style={{ color: "#7BCBFF" }}>
            1. dan
          </h3>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div
              className="rounded-md p-4"
              style={{
                backgroundColor: "#02040A",
                border: "1px solid rgba(0, 224, 255, 0.15)",
              }}
            >
              <p className="text-sm font-semibold text-white">Registracija</p>
              <p className="text-xs text-gray-300">09:00 – 10:00</p>
            </div>

            <div
              className="rounded-md p-4"
              style={{
                backgroundColor: "#02040A",
                border: "1px solid rgba(0, 224, 255, 0.15)",
              }}
            >
              <p className="text-sm font-semibold text-white">Skupinski del</p>
              <p className="text-xs text-gray-300">10:00 – 16:00</p>
            </div>

            <div
              className="rounded-md p-4"
              style={{
                backgroundColor: "#02040A",
                border: "1px solid rgba(0, 224, 255, 0.15)",
              }}
            >
              <p className="text-sm font-semibold text-white">Finala & podelitev</p>
              <p className="text-xs text-gray-300">16:30 – 18:00</p>
            </div>
          </div>

          {/* 2. DAN */}
          <h3 className="mt-6 text-sm" style={{ color: "#7BCBFF" }}>
            2. dan
          </h3>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div
              className="rounded-md p-4"
              style={{
                backgroundColor: "#02040A",
                border: "1px solid rgba(0, 224, 255, 0.15)",
              }}
            >
              <p className="text-sm font-semibold text-white">Registracija</p>
              <p className="text-xs text-gray-300">09:00 – 10:00</p>
            </div>

            <div
              className="rounded-md p-4"
              style={{
                backgroundColor: "#02040A",
                border: "1px solid rgba(0, 224, 255, 0.15)",
              }}
            >
              <p className="text-sm font-semibold text-white">Skupinski del</p>
              <p className="text-xs text-gray-300">10:00 – 16:00</p>
            </div>

            <div
              className="rounded-md p-4"
              style={{
                backgroundColor: "#02040A",
                border: "1px solid rgba(0, 224, 255, 0.15)",
              }}
            >
              <p className="text-sm font-semibold text-white">Finala & podelitev</p>
              <p className="text-xs text-gray-300">16:30 – 18:00</p>
            </div>
          </div>

          {/* GUMB */}
          <a
            href="/urnik"
            className="mt-6 inline-block rounded-md px-4 py-2 text-sm font-semibold shadow transition"
            style={{
              backgroundColor: "#1A8CFF",
              color: "#ffffffff",
              boxShadow: "0 0 10px rgba(0, 224, 255, 0.5)",
            }}
          >
            Celoten urnik →
          </a>
        </div>
      </section>


      {/* PRAVILA (teaser) */}
      <section id="pravila" className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
          <h2 className="text-xl font-bold">Pravila & oprema</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-white/85">
            <li>Prinesi lasten računalnik/konzolo, periferijo in razdelilec.</li>
            <li>Spoštuj fair-play in navodila organizatorja.</li>
            <li>Alkohol in vandalizem nista dovoljena.</li>
          </ul>
          <Link
            href="/pravila"
            className="mt-4 inline-block rounded-md border border-white/30 px-4 py-2 text-sm hover:bg-white/10"
          >
            Poglej celotna pravila
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black/30">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 sm:flex-row">
          <p className="text-sm text-white/70">
            © {new Date().getFullYear()} ERŠ ŠCV • LAN Party
          </p>
          <div className="flex items-center gap-3 text-sm">
            <Link href="/kontakt" className="hover:underline">Kontakt</Link>
            <span className="opacity-40">•</span>
            <Link href="/organizatorji" className="hover:underline">Organizatorji</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
