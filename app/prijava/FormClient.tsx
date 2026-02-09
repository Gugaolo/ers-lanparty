'use client';

import { useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { createGroup, type FormState } from './actions';
import { MultiSelect } from '@/app/components/MultiSelect';

const COLORS = {
  primary: '#00F6FF',
  accent: '#1A8CFF',
  secondary: '#7BCBFF',
  dark: '#02040A',
  darkSoft: '#0A0F1A',
  light: '#E6F7FF',
};

type Game = {
  id: number;
  game_name: string | null;
};

export default function FormClient({ gameOptions }: { gameOptions: Game[] }) {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const initialState: FormState = { error: null, success: false };
  const [state, formAction] = useActionState(createGroup, initialState);

  // ko server action uspe, preusmeri
  useEffect(() => {
    if (state.success) router.push('/teams');
  }, [state.success, router]);

  // Preveri, ali je uporabnik prijavljen
  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUserEmail(data?.user?.email ?? null);
    };
    loadUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 p-6 shadow-xl backdrop-blur sm:p-8">
      
      <h2 className="text-xl font-semibold">Podatki o ekipi</h2>
      <p className="mt-1 text-sm text-white/70">Polja označena z * so obvezna.</p>

      {!userEmail && (
        <div className="mt-4 rounded-md border border-yellow-400/30 bg-yellow-400/10 px-4 py-3 text-sm text-yellow-50">
          Za oddajo prijave se najprej prijavi ali ustvariti profil.
          <div className="mt-3 flex gap-2">
            <Link
              href="/login"
              className="rounded-md bg-white/15 px-3 py-2 text-xs font-semibold text-white hover:bg-white/25"
            >
              Prijava
            </Link>
            <Link
              href="/signup"
              className="rounded-md border border-white/25 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10"
            >
              Ustvari profil
            </Link>
          </div>
        </div>
      )}

      {/* Lepo prikazan error */}
      {state.error && (
        <div
          className="mt-4 rounded-md px-4 py-3 text-sm font-semibold"
          style={{
            backgroundColor: 'rgba(255, 80, 80, 0.15)',
            border: '1px solid rgba(255, 80, 80, 0.45)',
            color: '#FFD6D6',
          }}
        >
          Napaka: {state.error}
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

        {/* Igre – multi-select */}
        <div data-testid="multi-select">
          <label htmlFor="games" className="block text-sm font-medium text-white/90">
            Igre *
          </label>
          <div className="mt-2">
            <MultiSelect
              name="games"
              options={gameOptions
                .map((g) => ({
                  value: g.game_name ?? '',
                  label: g.game_name ?? '',
                }))
                .filter((o) => o.value)}
              placeholder="Izberi igre"
            />
          </div>

          {gameOptions.length === 0 && (
            <p className="mt-2 text-xs text-red-200">
              Trenutno v bazi ni dodanih iger. Dodaj jih v Supabase tabelo <strong>games</strong>.
            </p>
          )}
        </div>

        {/* Logo datoteka */}
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
            Naloži sliko (PNG/JPG/WebP). Če ne izbereš datoteke, bo uporabljen privzeti logo.
          </p>
        </div>

        {/* Gumb */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={!userEmail}
            className="rounded-md px-5 py-2.5 text-sm font-semibold text-white shadow disabled:opacity-50"
            style={{ backgroundColor: COLORS.accent }}
          >
            Pošlji prijavo
          </button>
        </div>
      </form>
    </div>
  );
}
