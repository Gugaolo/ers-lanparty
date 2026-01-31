'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient } from '@/lib/supabaseServerClient';
import { supabaseServer } from '@/lib/supabaseServer';

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
  const logo_file = formData.get('logo_file');

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
        'Tabela groups ne pozna stolpca owner_id. Dodaj stolpce owner_id uuid, owner_email text in logo_path text, nato poskusi znova.',
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

  // Upload logo file (optional)
  let logo_path: string | null = null;
  if (logo_file instanceof File && logo_file.size > 0) {
    try {
      const arrayBuffer = await logo_file.arrayBuffer();
      const fileBytes = new Uint8Array(arrayBuffer);
      const ext = (logo_file.name.split('.').pop() || 'png').toLowerCase();
      const fileName = `logo_${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabaseServer.storage
        .from('logos')
        .upload(filePath, fileBytes, {
          cacheControl: '3600',
          upsert: true,
          contentType: logo_file.type || 'image/png',
        });

      if (uploadError) {
        return { success: false, error: 'Nalaganje logotipa ni uspelo. Poskusi znova.' };
      }

      logo_path = filePath;
    } catch (_e) {
      return { success: false, error: 'Pri nalaganju logotipa je prišlo do napake.' };
    }
  }

  const payload: Record<string, string | null> = {
    group_name,
    members,
    games,
    owner_id: user.id,
    owner_email: user.email ?? null,
  };

  if (logo_path) payload.logo_path = logo_path;

  const { error: insertError } = await supabase.from('groups').insert([payload]);

  if (insertError) {
    if (insertError.code === '42703') {
      return {
        success: false,
        error:
          'Tabela groups ne pozna stolpcev owner_id/logo_path. Dodaj stolpce owner_id uuid, owner_email text in logo_path text, nato poskusi znova.',
      };
    }
    return { success: false, error: 'Napaka pri shranjevanju ekipe. Poskusi znova.' };
  }

  revalidatePath('/teams');
  return { success: true, error: null };
}
