import { supabase } from '@/lib/supabase';
import Link from 'next/link';

type GroupRow = {
  id: number;
  created_at: string | null;
  group_name: string | null;
  members: string | string[] | null;
  games: string | null;
};

function parseMembers(m: GroupRow['members']): string[] {
  if (Array.isArray(m)) return m;
  if (typeof m === 'string') {
    return m
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

export default async function TeamsPage() {
  const { data, error } = await supabase
    .from('groups')
    .select('id, created_at, group_name, members, games')
    .order('created_at', { ascending: false });

  if (error) {
    // preprosto sporočilo o napaki
    return (
      <main className="mx-auto max-w-5xl p-6">
        <h1 className="text-2xl font-bold">Ekipe</h1>
        <p className="mt-4 rounded-md bg-red-50 p-4 text-red-700">
          Napaka pri branju podatkov: {error.message}
        </p>
      </main>
    );
  }

  const groups: GroupRow[] = data ?? [];

  return (
    <main className="mx-auto max-w-5xl p-6">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Ekipe</h1>
        <Link
          href="/admin/teams/new"
          className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Dodaj ekipo
        </Link>
      </header>

      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                #
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Ime ekipe
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Člani
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Igra / igre
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-600">
                Akcije
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {groups.length === 0 ? (
              <tr>
                <td className="px-4 py-5 text-sm text-gray-500" colSpan={5}>
                  Trenutno ni vnešenih ekip.
                </td>
              </tr>
            ) : (
              groups.map((g, i) => {
                const members = parseMembers(g.members);
                return (
                  <tr key={g.id}>
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                      {i + 1}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-900">
                      {g.group_name ?? '—'}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">
                      {members.length ? (
                        <ul className="list-inside list-disc space-y-1">
                          {members.map((m) => (
                            <li key={m}>{m}</li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                      {g.games ?? '—'}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-right text-sm">
                      <Link
                        href={`/teams/${g.id}`}
                        className="rounded-md border px-3 py-1 hover:bg-gray-50"
                      >
                        Odpri
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
