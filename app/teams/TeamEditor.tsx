'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { updateGroup, type UpdateFormState } from './actions';
import { MultiSelect } from '@/app/components/MultiSelect';

type TeamData = {
  id: number;
  group_name: string | null;
  members: string | null;
  games: string | null;
  logo_path?: string | null;
};

type GameOption = {
  id: number;
  game_name: string | null;
};

export default function TeamEditor({
  team,
  games,
}: {
  team: TeamData;
  games: GameOption[];
}) {
  const router = useRouter();
  const initialState: UpdateFormState = { error: null, success: false };
  const [state, formAction] = useActionState(updateGroup, initialState);

  const parsedGames =
    team.games
      ?.split(',')
      .map((g) => g.trim())
      .filter(Boolean) ?? [];

  useEffect(() => {
    if (state.success) router.push('/teams');
  }, [state.success, router]);

  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 p-6 shadow-xl backdrop-blur sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Uredi svojo ekipo</h2>
          <p className="text-sm text-white/70">Spremeni ime, logo, člane in igre.</p>
        </div>
        {state.success && (
          <span className="rounded-md bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-100">
            Shranjeno
          </span>
        )}
      </div>

      {state.error && (
        <div className="mt-4 rounded-md border border-red-400/40 bg-red-500/15 px-4 py-3 text-sm font-semibold text-red-50">
          Napaka: {state.error}
        </div>
      )}

      <form action={formAction} className="mt-6 space-y-5">
        <input type="hidden" name="id" value={team.id} />

        <div>
          <label htmlFor="group_name" className="block text-sm font-medium text-white/90">
            Ime ekipe *
          </label>
          <input
            id="group_name"
            name="group_name"
            type="text"
            required
            defaultValue={team.group_name ?? ''}
            className="mt-2 w-full rounded-md border border-white/20 bg-black/20 px-3 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/60"
          />
        </div>

        <div>
          <label htmlFor="members" className="block text-sm font-medium text-white/90">
            Člani ekipe *
          </label>
          <textarea
            id="members"
            name="members"
            required
            rows={3}
            defaultValue={team.members ?? ''}
            className="mt-2 w-full rounded-md border border-white/20 bg-black/20 px-3 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/60"
          />
        </div>

        <div>
          <label htmlFor="games" className="block text-sm font-medium text-white/90">
            Igre *
          </label>
          <div className="mt-2">
            <MultiSelect
              name="games"
              defaultSelected={parsedGames}
              options={games
                .map((g) => ({
                  value: g.game_name ?? '',
                  label: g.game_name ?? '',
                }))
                .filter((o) => o.value)}
              placeholder="Izberi igre"
            />
          </div>
          {games.length === 0 && (
            <p className="mt-2 text-xs text-red-200">
              Ni dodanih iger. Dodaj jih v Supabase tabelo <strong>games</strong>.
            </p>
          )}
        </div>

        <div>
          <label htmlFor="logo_file" className="block text-sm font-medium text-white/90">
            Logo ekipe (datoteka, opcijsko)
          </label>
          <input
            id="logo_file"
            name="logo_file"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="mt-2 w-full rounded-md border border-white/20 bg-black/20 px-3 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/60 file:mr-3 file:rounded-md file:border-0 file:bg-white/15 file:px-3 file:py-2 file:text-white file:text-sm"
          />
          <p className="mt-1 text-xs text-white/50">
            Naloži sliko (PNG/JPG/WebP). Trenutna pot: {team.logo_path ?? '—'}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="submit"
            className="rounded-md px-5 py-2.5 text-sm font-semibold text-white shadow"
            style={{ backgroundColor: '#1A8CFF' }}
          >
            Shrani spremembe
          </button>
          <button
            type="button"
            onClick={() => router.refresh()}
            className="rounded-md border border-white/25 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10"
          >
            Osveži
          </button>
        </div>
      </form>
    </div>
  );
}
