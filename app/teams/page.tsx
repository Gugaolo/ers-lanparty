// app/teams/page.tsx
import { createClient } from '@supabase/supabase-js';

const COLORS = {
  primary: '#005AA7', // ERŠ modra (usklajeno z domačo stranjo)
  accent:  '#78BE20', // ŠCV zelena
  dark:    '#0B132B',
};

type GroupRow = {
  id: number;
  created_at: string | null;
  group_name: string | null; // TEXT
  members: string | null;    // TEXT (npr. "Ana, Miha, Gal")
  games: string | null;      // TEXT (npr. "CS2, Valorant")
};

export default async function TeamsPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from('groups')
    .select('id, created_at, group_name, members, games')
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <main
        className="min-h-screen text-white"
        style={{ background: `linear-gradient(180deg, ${COLORS.primary} 0%, ${COLORS.dark} 100%)` }}
      >
        <div className="mx-auto max-w-6xl px-6 py-10">
          <h1 className="text-3xl font-extrabold">Ekipe</h1>
          <p className="mt-6 rounded-lg bg-red-500/15 p-4 text-red-200">
            Napaka pri branju podatkov: {error.message}
          </p>
        </div>
      </main>
    );
  }

  const groups: GroupRow[] = data ?? [];

  return (
    <main
      className="min-h-screen text-white"
      style={{ background: `linear-gradient(180deg, ${COLORS.primary} 0%, ${COLORS.dark} 100%)` }}
    >
      {/* Naslovni trak v stilu domače strani */}
      <section className="mx-auto max-w-6xl px-6 pb-6 pt-10">
        <h1 className="text-4xl font-extrabold leading-tight">
          LAN Party <span style={{ color: COLORS.accent }}>ERŠ ŠCV</span>
        </h1>
        <p className="mt-2 text-white/80">Seznam prijavljenih ekip in članov.</p>
      </section>

      {/* Tabela ekip */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="overflow-x-auto rounded-2xl border border-white/15 bg-white/5 backdrop-blur">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-white/10">
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-white/90">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Ime ekipe</th>
                <th className="px-4 py-3">Člani</th>
                <th className="px-4 py-3">Igre</th>
                <th className="px-4 py-3">Ustvarjeno</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {groups.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-white/80" colSpan={5}>
                    Trenutno ni vnešenih ekip.
                  </td>
                </tr>
              ) : (
                groups.map((g, i) => (
                  <tr key={g.id} className="hover:bg-white/5">
                    <td className="whitespace-nowrap px-4 py-4 text-sm">{i + 1}</td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold">
                      {g.group_name ?? '—'}
                    </td>
                    {/* Člani in igre sta TEXT v bazi – prikažemo kot en sam stolpec (brez parsanja) */}
                    <td className="px-4 py-4 text-sm text-white/90">
                      {g.members && g.members.trim().length > 0 ? g.members : '—'}
                    </td>
                    <td className="px-4 py-4 text-sm text-white/90">
                      {g.games && g.games.trim().length > 0 ? g.games : '—'}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-white/70">
                      {g.created_at
                        ? new Date(g.created_at).toLocaleString('sl-SI', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Accent trak */}
        <div
          className="mt-6 h-1 w-24 rounded-full"
          style={{ backgroundColor: COLORS.accent }}
        />
      </section>
    </main>
  );
}
