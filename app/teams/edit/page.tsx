import Link from 'next/link';
import TeamEditor from '../TeamEditor';
import { createSupabaseServerClient } from '@/lib/supabaseServerClient';

type GroupRow = {
  id: number;
  group_name: string | null;
  members: string | null;
  games: string | null;
  logo_path?: string | null;
  owner_id?: string | null;
  owner_email?: string | null;
};

type GameRow = {
  id: number;
  game_name: string | null;
};

export const dynamic = 'force-dynamic';

export default async function EditTeamPage() {
  const supabase = await createSupabaseServerClient();

  const [{ data: authData }, { data: groups }, { data: gamesData }] = await Promise.all([
    supabase.auth.getUser(),
    supabase
      .from('groups')
      .select('id, group_name, members, games, logo_path, owner_id, owner_email')
      .order('created_at', { ascending: false }),
    supabase.from('games').select('id, game_name').order('game_name', { ascending: true }),
  ]);

  const userId = authData?.user?.id ?? null;
  const userEmail = authData?.user?.email ?? null;

  const myGroup =
    (groups ?? []).find(
      (g) =>
        (userId && g.owner_id === userId) ||
        (userEmail && g.owner_email && g.owner_email.toLowerCase() === userEmail.toLowerCase())
    ) ?? null;

  const gameOptions: GameRow[] = gamesData ?? [];

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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight">Uredi ekipo</h1>
            <p className="mt-2 text-white/80">Spremeni ime, logo, člane in igre svoje ekipe.</p>
          </div>
          <Link
            href="/teams"
            className="rounded-md px-4 py-2 text-sm font-semibold text-white shadow"
            style={{ backgroundColor: '#1A8CFF' }}
          >
            Nazaj na ekipe
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-16">
        {!userId ? (
          <div className="rounded-lg border border-yellow-400/30 bg-yellow-400/10 px-4 py-4 text-sm text-yellow-50">
            Za urejanje ekipe se prijavi v profil (zgoraj desno).
          </div>
        ) : myGroup ? (
          <TeamEditor team={myGroup} games={gameOptions} />
        ) : (
          <div className="rounded-lg border border-white/15 bg-white/5 px-4 py-4 text-sm text-white/80">
            S tem profilom še ni prijavljene ekipe.{' '}
            <Link href="/prijava" className="font-semibold underline">
              Prijavi ekipo
            </Link>{' '}
            in se vrni na to stran za urejanje.
          </div>
        )}

        <div
          className="mt-6 h-1 w-24 rounded-full"
          style={{ backgroundColor: '#1A8CFF' }}
        />
      </section>
    </main>
  );
}
