// app/pravila/page.tsx

const COLORS = {
  primary: '#005AA7',
  accent: '#78BE20',
  dark: '#0B132B',
};

export default function PravilaPage() {
  return (
    <main
      className="min-h-screen text-white"
      style={{
        background: `linear-gradient(180deg, ${COLORS.primary} 0%, ${COLORS.dark} 100%)`,
      }}
    >
      {/* Header */}
      <section className="mx-auto max-w-6xl px-6 pb-4 pt-10">
        <a
          href="/"
          className="inline-block m-[10px] rounded-md px-4 py-2 text-sm font-semibold text-white shadow"
          style={{ backgroundColor: COLORS.accent }}
        >
          ← Domov
        </a>

        <h1 className="mt-4 text-4xl font-extrabold leading-tight">
          Pravila <span style={{ color: COLORS.accent }}>LAN Party ERŠ ŠCV</span>
        </h1>
        <p className="mt-2 text-white/80">
          Osnovna pravila in smernice za varno in fair-play igranje.
        </p>
      </section>

      {/* Vsebina pravil */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <div className="rounded-2xl border border-white/15 bg-white/5 p-6 shadow-xl backdrop-blur sm:p-8">
          <h2 className="text-xl font-semibold">1. Splošna pravila</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/85">
            <li>
              Udeležba na dogodku je na lastno odgovornost. Udeleženci se z
              udeležbo strinjajo s pravili dogodka.
            </li>
            <li>
              Upoštevanje navodil organizatorjev in tehnične ekipe je obvezno.
            </li>
            <li>
              Vse oblike nasilja, nadlegovanja, žaljenja ali diskriminacije niso
              dovoljene.
            </li>
          </ul>

          <h2 className="mt-6 text-xl font-semibold">
            2. Oprema in varnost
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/85">
            <li>
              Za svojo opremo (računalnik, slušalke, periferija ...) je odgovoren
              vsak udeleženec sam.
            </li>
            <li>
              Prepovedano je posegati v opremo drugih udeležencev ali šole brez
              dovoljenja.
            </li>
            <li>
              Kabli naj bodo urejeni tako, da ne predstavljajo nevarnosti za
              spotike ali poškodbe.
            </li>
          </ul>

          <h2 className="mt-6 text-xl font-semibold">
            3. Igre in potek turnirjev
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/85">
            <li>
              Igre, ki se igrajo na LAN partyju, določi organizator (npr. CS2,
              Fortnite, Rocket League ...).
            </li>
            <li>
              Čas začetka turnirjev in sistem igranja (skupinski del, izločilni
              boji ...) bo objavljen vnaprej. Zamujanja lahko pomenijo
              avtomatski poraz tekme.
            </li>
            <li>
              Kakršnokoli goljufanje (cheati, hacki, izkoriščanje bugov) pomeni
              takojšnjo diskvalifikacijo ekipe.
            </li>
          </ul>

          <h2 className="mt-6 text-xl font-semibold">
            4. Vedenje in fair play
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/85">
            <li>
              Spoštovanje nasprotnikov, soigralcev in organizatorjev je osnovno
              pravilo dogodka.
            </li>
            <li>
              Pretirano žaljenje, toksičen chat ali voice bodo sankcionirani
              (opomin, izključitev iz turnirja ali dogodka).
            </li>
            <li>
              Zmaga je cilj, ampak prioriteti sta zabava in dobra izkušnja za
              vse udeležence.
            </li>
          </ul>

          <h2 className="mt-6 text-xl font-semibold">
            5. Alkohol, prepovedane substance in red
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/85">
            <li>
              Na dogodku je strogo prepovedana uporaba alkohola in drugih
              prepovedanih substanc.
            </li>
            <li>
              Udeleženci morajo ohranjati red na svojem mestu in ob odhodu
              pospraviti za sabo.
            </li>
            <li>
              Organizator si pridržuje pravico, da udeleženca odstrani z
              dogodka v primeru kršitve pravil.
            </li>
          </ul>

          <h2 className="mt-6 text-xl font-semibold">
            6. Fotografiranje in mediji
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/85">
            <li>
              Na dogodku se lahko izvaja fotografiranje in snemanje za potrebe
              promocije šole in LAN partyja.
            </li>
            <li>
              Z udeležbo se udeleženci strinjajo z možnostjo, da so lahko
              vidni na fotografijah ali videu.
            </li>
          </ul>

          <p className="mt-6 text-sm text-white/70">
            Organizator si pridržuje pravico do spremembe pravil. Vsa vprašanja
            ali nejasnosti glede pravil se rešujejo pri organizatorjih dogodka.
          </p>
        </div>

        {/* accent črta */}
        <div
          className="mt-6 h-1 w-24 rounded-full"
          style={{ backgroundColor: COLORS.accent }}
        />
      </section>
    </main>
  );
}
