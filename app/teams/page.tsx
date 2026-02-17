import Link from 'next/link';
import { createSupabaseServerClient } from '@/lib/supabaseServerClient';
import React from 'react';
import Header from '../components/header';

const COLORS = {
  primary: '#00F6FF',
  accent: '#1A8CFF',
  secondary: '#7BCBFF',
  dark: '#02040A',
  darkSoft: '#0A0F1A',
  light: '#E6F7FF',
};

type GroupRow = {
  id: number;
  created_at: string | null;
  group_name: string | null;
  members: string | null;
  games: string | null;
  logo_path?: string | null;
  owner_id?: string | null;
  owner_email?: string | null;
};

export const dynamic = 'force-dynamic';

function logoUrlFromPath(path?: string | null) {
  if (!path) return null;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return null;
  return `${base}/storage/v1/object/public/logos/${path}`;
}

export default async function TeamsPage() {
  const supabase = await createSupabaseServerClient();

  const [{ data: authData }, { data, error }, { data: profileData }] = await Promise.all([
    supabase.auth.getUser(),
    supabase
      .from('groups')
      .select('id, created_at, group_name, members, games, logo_path, owner_id, owner_email')
      .order('created_at', { ascending: false }),
    supabase.from('profiles').select('role').maybeSingle(),
  ]);

  if (error) {
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
  const userId = authData?.user?.id ?? null;
  const userEmail = authData?.user?.email ?? null;
  const isAdmin = profileData?.role === 'admin';

  const myGroup =
    groups.find(
      (g) =>
        (userId && g.owner_id === userId) ||
        (userEmail && g.owner_email && g.owner_email.toLowerCase() === userEmail.toLowerCase())
    ) ?? null;

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
        <h1 className="text-4xl font-extrabold leading-tight">
          LAN Party <span style={{ color: COLORS.accent }}>ERS SCV</span>
        </h1>
        <p className="mt-2 text-white/80">Seznam prijavljenih ekip in clanov.</p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="overflow-x-auto rounded-2xl border border-white/15 bg-white/5 backdrop-blur">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-white/10">
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-white/90">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Logo</th>
                <th className="px-4 py-3">Ime ekipe</th>
                <th className="px-4 py-3">Clani</th>
                <th className="px-4 py-3">Igre</th>
                <th className="px-4 py-3">Ustvarjeno</th>
                <th className="px-4 py-3">Uredi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {groups.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-white/80" colSpan={7}>
                    Trenutno ni vnesenih ekip.
                  </td>
                </tr>
              ) : (
                groups.map((g, i) => {
                  const logoUrl = logoUrlFromPath(g.logo_path);
                  const canEdit = isAdmin || (!!myGroup && g.id === myGroup.id);
                  const editHref = isAdmin ? `/teams/edit?id=${g.id}` : '/teams/edit';

                  return (
                    <tr key={g.id} className="hover:bg-white/5">
                      <td className="whitespace-nowrap px-4 py-4 text-sm">{i + 1}</td>
                      <td className="whitespace-nowrap px-4 py-4">
                        <img
                          src={logoUrl || '/group_icon.jpg'}
                          alt="Logo ekipe"
                          className="h-10 w-10 rounded-md border border-white/10 bg-black/40 object-cover"
                        />
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold">
                        {g.group_name ?? '-'}
                      </td>
                      <td className="px-4 py-4 text-sm text-white/90">
                        {g.members && g.members.trim().length > 0 ? g.members : '-'}
                      </td>
                      <td className="px-4 py-4 text-sm text-white/90">
                        {g.games && g.games.trim().length > 0 ? g.games : '-'}
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
                          : '-'}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-white/90">
                        {canEdit ? (
                          <Link
                            href={editHref}
                            className="rounded-md border border-white/25 px-3 py-1 text-xs font-semibold text-white hover:bg-white/10"
                          >
                            Uredi
                          </Link>
                        ) : (
                          <span className="text-white/40">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

          <Link
            href="/"
            className="m-[10px] inline-block rounded-md px-4 py-2 text-sm font-semibold text-white shadow"
            style={{ backgroundColor: COLORS.accent }}
          >
            Domov
          </Link>
        </div>

        {isAdmin && (
          <div className="mt-6 rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-4 py-4 text-sm text-emerald-100">
            Prijavljen si kot admin. Lahko urejas in brises vse ekipe.
          </div>
        )}

        {!isAdmin && myGroup && (
          <div className="mt-6 rounded-lg border border-white/15 bg-white/5 px-4 py-4 text-sm text-white/80">
            Urejas lahko samo svojo ekipo. Klikni{' '}
            <Link href="/teams/edit" className="font-semibold underline">
              Uredi ekipo
            </Link>{' '}
            za spremembe.
          </div>
        )}

        {!userId && (
          <div className="mt-6 rounded-lg border border-yellow-400/30 bg-yellow-400/10 px-4 py-4 text-sm text-yellow-50">
            Za urejanje ekipe se prijavi v profil (zgoraj desno).
          </div>
        )}

        {userId && !myGroup && !isAdmin && (
          <div className="mt-6 rounded-lg border border-white/15 bg-white/5 px-4 py-4 text-sm text-white/80">
            S tem profilom se ni prijavljene ekipe.{' '}
            <Link href="/prijava" className="font-semibold underline">
              Prijavi ekipo
            </Link>{' '}
            in jo bos lahko urejal na strani za urejanje.
          </div>
        )}

        <div className="mt-6 h-1 w-24 rounded-full" style={{ backgroundColor: COLORS.accent }} />
      </section>
    </main>
  );
}
