// app/prijava/actions.ts
'use server';

import { supabaseServer } from '@/lib/supabaseServer';
import { revalidatePath } from 'next/cache';

export type FormState = {
  error: string | null;
  success: boolean;
};

export async function createGroup(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const group_name = (formData.get('group_name') || '').toString().trim();
  const members = (formData.get('members') || '').toString().trim();

  // ✅ multi-select (več iger)
  const gamesSelected = formData
    .getAll('games')
    .map((g) => g.toString().trim())
    .filter(Boolean);

  if (!group_name || !members || gamesSelected.length === 0) {
    return {
      success: false,
      error: 'Prosimo, izpolni vsa obvezna polja (ime ekipe, člani, vsaj 1 igra).',
    };
  }

  // 🔍 preveri, če ime ekipe že obstaja (case-insensitive)
  // ilike brez % je "enako", samo brez razlikovanja velikih/malih črk
  const { data: existing, error: checkError } = await supabaseServer
    .from('groups')
    .select('id')
    .ilike('group_name', group_name)
    .maybeSingle();

  if (checkError) {
    return { success: false, error: 'Napaka pri preverjanju imena ekipe. Poskusi znova.' };
  }

  if (existing) {
    return { success: false, error: 'Ekipa s tem imenom že obstaja. Izberi drugo ime.' };
  }

  const games = gamesSelected.join(', ');

  const { error: insertError } = await supabaseServer.from('groups').insert([
    { group_name, members, games },
  ]);

  if (insertError) {
    return { success: false, error: 'Napaka pri shranjevanju ekipe. Poskusi znova.' };
  }

  revalidatePath('/teams');
  return { success: true, error: null };
}
