// app/prijava/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient } from '@/lib/supabaseServerClient';

export type FormState = {
  error: string | null;
  success: boolean;
};

export async function createGroup(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = await createSupabaseServerClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData?.user) {
    return { success: false, error: 'Za prijavo ekipe se najprej prijavi (profil / Google).' };
  }

  const user = authData.user;
  const group_name = (formData.get('group_name') || '').toString().trim();
  const members = (formData.get('members') || '').toString().trim();
  const logo_url_input = (formData.get('logo_url') || '').toString().trim();

  // multi-select (več iger)
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

  // En profil -> ena ekipa
  const { data: existingByOwner, error: ownerCheckError } = await supabase
    .from('groups')
    .select('id')
    .eq('owner_id', user.id)
    .maybeSingle();

  if (ownerCheckError?.code === '42703') {
    return {
      success: false,
      error:
        'Tabela groups ne pozna stolpca owner_id. Dodaj stolpce owner_id uuid, owner_email text in logo_url text, nato poskusi znova.',
    };
  }

  if (existingByOwner) {
    return { success: false, error: 'Ta profil je že prijavil eno ekipo.' };
  }

  // preveri, če ime ekipe že obstaja (case-insensitive)
  const { data: existing, error: checkError } = await supabase
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

  // Logo URL (brez nalaganja datotek)
  let logo_url: string | null = null;
  if (logo_url_input) {
    if (!logo_url_input.startsWith('http://') && !logo_url_input.startsWith('https://')) {
      return { success: false, error: 'Logo URL mora biti veljaven http(s) naslov.' };
    }
    logo_url = logo_url_input;
  }

  const payload: Record<string, any> = {
    group_name,
    members,
    games,
    owner_id: user.id,
    owner_email: user.email ?? null,
  };

  if (logo_url) payload.logo_url = logo_url;

  const { error: insertError } = await supabase.from('groups').insert([payload]);

  if (insertError) {
    if (insertError.code === '42703') {
      return {
        success: false,
        error:
          'Tabela groups ne pozna stolpcev owner_id/logo_url. Dodaj stolpce owner_id uuid, owner_email text in logo_url text, nato poskusi znova.',
      };
    }
    return { success: false, error: 'Napaka pri shranjevanju ekipe. Poskusi znova.' };
  }

  revalidatePath('/teams');
  return { success: true, error: null };
}
