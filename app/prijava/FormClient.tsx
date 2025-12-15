// app/prijava/FormClient.tsx
'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createGroup, type FormState } from './actions';

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

export default function FormClient({ gameOptions }: { gameOptions: Game[] }) {
  const router = useRouter();

  const initialState: FormState = { error: null, success: false };
  const [state, formAction] = useActionState(createGroup, initialState);

  // ✅ ko server action uspe, preusmeri
  useEffect(() => {
    if (state.success) router.push('/teams');
  }, [state.success, router]);

  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 p-6 shadow-xl backdrop-blur sm:p-8">
      <h2 className="text-xl font-semibold">Podatki o ekipi</h2>
      <p className="mt-1 text-sm text-white/70">Polja označena z * so obvezna.</p>

      {/* ✅ Lep error message */}
      {state.error && (
        <div
          className="mt-4 rounded-md px-4 py-3 text-sm font-semibold"
          style={{
            backgroundColor: 'rgba(255, 80, 80, 0.15)',
            border: '1px solid rgba(255, 80, 80, 0.45)',
            color: '#FFD6D6',
          }}
        >
          ⚠️ {state.error}
        </div>
      )}

      <form action={formAction} className="mt-6 space-y-5">
        {/* Ime ekipe */}
        <div>
          <label htmlFor="group_name" className="block text-sm font-medium text-white/90">
            Ime ekipe *
          </label>
          <input
            id="group_name"
            name="group_name"
            type="text"
            required
            className="mt-2 w-full rounded-md border border-white/20 bg-black/20 px-3 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/60"
            placeholder="npr. ERŠ Destroyers"
          />
        </div>

        {/* Člani */}
        <div>
          <label htmlFor="members" className="block text-sm font-medium text-white/90">
            Člani ekipe *
          </label>
          <textarea
            id="members"
            name="members"
            required
            rows={3}
            className="mt-2 w-full rounded-md border border-white/20 bg-black/20 px-3 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/60"
            placeholder="Vpiši imena, ločena z vejico (npr. Luka, Anja, Marko...)"
          />
        </div>

        {/* Igre – MULTI SELECT */}
        <div>
          <label htmlFor="games" className="block text-sm font-medium text-white/90">
            Igre *
          </label>
          <p className="mt-1 text-xs text-white/60">
            Drži <strong>Ctrl</strong> (ali <strong>Cmd</strong>) za izbiro več iger.
          </p>

          <select
            id="games"
            name="games"
            multiple
            required
            className="mt-2 h-32 w-full rounded-md border border-white/20 bg-black/20 px-3 py-2 text-sm text-white outline-none focus:border-white/60"
          >
            {gameOptions.map((g) => (
              <option key={g.id} value={g.game_name ?? ''} className="bg-black text-white">
                {g.game_name}
              </option>
            ))}
          </select>

          {gameOptions.length === 0 && (
            <p className="mt-2 text-xs text-red-200">
              Trenutno v bazi ni dodanih iger. Dodaj jih v Supabase tabelo <strong>games</strong>.
            </p>
          )}
        </div>

        {/* Gumb */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="submit"
            className="rounded-md px-5 py-2.5 text-sm font-semibold text-white shadow"
            style={{ backgroundColor: COLORS.accent }}
          >
            Pošlji prijavo
          </button>
        </div>
      </form>
    </div>
  );
}
