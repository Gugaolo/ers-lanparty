// app/prijava/page.tsx
import { supabaseServer } from '@/lib/supabaseServer';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const COLORS = {
  primary: '#005AA7',
  accent: '#78BE20',
  dark: '#0B132B',
};

async function createGroup(formData: FormData) {
  'use server';

  const group_name = (formData.get('group_name') || '').toString().trim();
  const members = (formData.get('members') || '').toString().trim();
  const games = (formData.get('games') || '').toString().trim();

  if (!group_name || !members || !games) {
    // minimalna validacija na serverju
    console.error('Manjkajoča polja pri prijavi ekipe.');
    return;
  }

  const { error } = await supabaseServer.from('groups').insert([
    {
      group_name,
      members,
      games,
    },
  ]);

  if (error) {
    console.error('Napaka pri vnosu ekipe:', error);
    return;
  }

  // osveži seznam ekip in preusmeri na /teams
  revalidatePath('/teams');
  redirect('/teams');
}

export default async function PrijavaPage() {
  return (
    <main
      className="min-h-screen text-white"
      style={{
        background: `linear-gradient(180deg, ${COLORS.primary} 0%, ${COLORS.dark} 100%)`,
      }}
    >
      {/* Header v istem stilu kot druge strani */}
      <section className="mx-auto max-w-6xl px-6 pb-6 pt-10">
        <h1 className="text-4xl font-extrabold leading-tight">
          Prijava ekipe <span style={{ color: COLORS.accent }}>ERŠ ŠCV</span>
        </h1>
        <p className="mt-2 text-white/80">
          Izpolni podatke in prijavi svojo ekipo na LAN Party.
        </p>
      </section>

      {/* Obrazec */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <div className="rounded-2xl border border-white/15 bg-white/5 p-6 shadow-xl backdrop-blur sm:p-8">
          <h2 className="text-xl font-semibold">Podatki o ekipi</h2>
          <p className="mt-1 text-sm text-white/70">
            Polja označena z * so obvezna.
          </p>

          <form action={createGroup} className="mt-6 space-y-5">
            {/* Ime ekipe */}
            <div>
              <label
                htmlFor="group_name"
                className="block text-sm font-medium text-white/90"
              >
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
              <label
                htmlFor="members"
                className="block text-sm font-medium text-white/90"
              >
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

            {/* Igre */}
            <div>
              <label
                htmlFor="games"
                className="block text-sm font-medium text-white/90"
              >
                Igre, ki jih ekipa igra *
              </label>
              <input
                id="games"
                name="games"
                type="text"
                required
                className="mt-2 w-full rounded-md border border-white/20 bg-black/20 px-3 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/60"
                placeholder="npr. CS2, Valorant, Rocket League..."
              />
            </div>

            {/* Gumbi */}
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

        {/* accent črta */}
        <div
          className="mt-6 h-1 w-24 rounded-full"
          style={{ backgroundColor: COLORS.accent }}
        />
      </section>
    </main>
  );
}
