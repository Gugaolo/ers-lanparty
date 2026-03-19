import FormClient from './FormClient';
import { supabaseServer } from '@/lib/supabaseServer';
import Header from '@/app/components/header';
import Link from 'next/link'; 
import { TEAM_REGISTRATION_OPEN, TEAM_REGISTRATION_STATUS } from '@/lib/teamRegistration';

const COLORS = {
  primary: "#00F6FF",
  accent:  "#1A8CFF",
  secondary: "#7BCBFF",
  dark:    "#02040A",
  darkSoft: "#0A0F1A",
  light:   "#E6F7FF",
};

type Game = {
  id: number;
  game_name: string | null;
};

export default async function PrijavaPage() {
  const { data: games } = await supabaseServer
    .from('games')
    .select('id, game_name')
    .order('created_at', { ascending: true });

  const gameOptions: Game[] = games ?? [];

  return (
    <main
      className="min-h-screen text-white"
      style={{
        background: `radial-gradient(circle at center,
          rgba(0, 183, 255, 0.25),
          rgba(2, 4, 10, 1) 70%
        )`,
      }}
    >
      <Header />
      <section className="mx-auto max-w-6xl px-6 pb-6 pt-10">
        <Link
          href="/"
          className="inline-block m-[10px] rounded-md px-4 py-2 text-sm font-semibold text-white shadow"
          style={{ backgroundColor: COLORS.accent }}
        >
          Domov
        </Link>

        <h1 className="mt-4 text-4xl font-extrabold leading-tight">
          Prijava ekipe <span style={{ color: COLORS.accent }}>ERŠ RŠCV</span>
        </h1>
        <p className="mt-2 text-white/80">
          {TEAM_REGISTRATION_OPEN
            ? 'Izpolni podatke in prijavi svojo ekipo na LAN Party.'
            : 'Nove prijave ekip so trenutno onemogočene.'}
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-16">
        {TEAM_REGISTRATION_OPEN ? (
          <FormClient gameOptions={gameOptions} />
        ) : (
          <div className="rounded-2xl border border-amber-300/30 bg-amber-300/10 p-6 shadow-xl backdrop-blur sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-100/80">
              Status prijav
            </p>
            <h2 className="mt-3 text-2xl font-bold text-amber-50">
              {TEAM_REGISTRATION_STATUS.title}
            </h2>
            <p className="mt-3 text-sm text-amber-50/90">
              {TEAM_REGISTRATION_STATUS.message}
            </p>
            <p className="mt-2 text-sm text-amber-50/80">
              {TEAM_REGISTRATION_STATUS.detail}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/teams"
                className="rounded-md bg-white/15 px-4 py-2 text-sm font-semibold text-white hover:bg-white/25"
              >
                Odpri ekipe
              </Link>
              <Link
                href="/teams/edit"
                className="rounded-md border border-white/25 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                Uredi svojo ekipo
              </Link>
            </div>
          </div>
        )}

        <div
          className="mt-6 h-1 w-24 rounded-full"
          style={{ backgroundColor: COLORS.accent }}
        />
      </section>
    </main>
  );
}
