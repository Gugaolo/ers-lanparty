// app/prijava/page.tsx
import FormClient from './FormClient';
import { supabaseServer } from '@/lib/supabaseServer';

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
  const { data: games, error } = await supabaseServer
    .from('games')
    .select('id, game_name')
    .order('created_at', { ascending: true });

  if (error) console.error('Napaka pri branju iger:', error);

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
      <section className="mx-auto max-w-6xl px-6 pb-6 pt-10">
        <a
          href="/"
          className="inline-block m-[10px] rounded-md px-4 py-2 text-sm font-semibold text-white shadow"
          style={{ backgroundColor: COLORS.accent }}
        >
          Domov
        </a>

        <h1 className="mt-4 text-4xl font-extrabold leading-tight">
          Prijava ekipe <span style={{ color: COLORS.accent }}>ERŠ RŠCV</span>
        </h1>
        <p className="mt-2 text-white/80">
          Izpolni podatke in prijavi svojo ekipo na LAN Party.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-16">
        <FormClient gameOptions={gameOptions} />

        <div
          className="mt-6 h-1 w-24 rounded-full"
          style={{ backgroundColor: COLORS.accent }}
        />
      </section>
    </main>
  );
}
