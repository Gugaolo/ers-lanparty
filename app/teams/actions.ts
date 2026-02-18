'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient } from '@/lib/supabaseServerClient';
import { supabaseServer } from '@/lib/supabaseServer';

export type UpdateFormState = {
  error: string | null;
  success: boolean;
};

export type DeleteFormState = {
  error: string | null;
  success: boolean;
};

async function isAdminUser(supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>, userId: string) {
  const { data: profile } = await supabaseServer
    .from('profiles')
    .select('role')
    .eq('user_id', userId)
    .maybeSingle();

  return profile?.role === 'admin';
}

// Server action: validates and updates team data
export async function updateGroup(
  _prevState: UpdateFormState,
  formData: FormData
): Promise<UpdateFormState> {
  const supabase = await createSupabaseServerClient();
  // Verify user is authenticated
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData?.user) {
    return {
      success: false,
      error: 'Za urejanje ekipe se najprej prijavi (profil / Google).',
    };
  }

  const user = authData.user;
  const isAdmin = await isAdminUser(supabase, user.id);
  const groupId = Number(formData.get('id'));
  if (!groupId || Number.isNaN(groupId)) {
    return { success: false, error: 'Manjka ID ekipe za urejanje.' };
  }

  const group_name = (formData.get('group_name') || '').toString().trim();
  const members = (formData.get('members') || '').toString().trim();
  const leader_discord = (formData.get('leader_discord') || '').toString().trim();
  const logo_file = formData.get('logo_file');

  const gamesSelected = formData
    .getAll('games')
    .map((g) => g.toString().trim())
    .filter(Boolean);

  if (!group_name || !members || !leader_discord || gamesSelected.length === 0) {
    return {
      success: false,
      error: 'Izpolni ime ekipe, clane, Discord ime vodje in izberi vsaj eno igro.',
    };
  }

  const games = gamesSelected.join(', ');

  const { data: existingGroup, error: fetchError } = await supabase
    .from('groups')
    .select('id, owner_id, logo_path')
    .eq('id', groupId)
    .maybeSingle();

  if (fetchError?.code === '42703') {
    return {
      success: false,
      error:
        'Tabela groups ne pozna stolpcev owner_id/logo_path. Dodaj stolpce owner_id uuid, owner_email text in logo_path text, nato poskusi znova.',
    };
  }

  if (!existingGroup) {
    return { success: false, error: 'Ekipe ni bilo mogoče najti.' };
  }

  if (existingGroup.owner_id !== user.id && !isAdmin) {
    return { success: false, error: 'To ni tvoja ekipa, urejanje ni dovoljeno.' };
  }

  const { data: duplicate, error: dupError } = await supabase
    .from('groups')
    .select('id')
    .ilike('group_name', group_name)
    .neq('id', groupId)
    .maybeSingle();

  if (dupError) {
    return {
      success: false,
      error: 'Napaka pri preverjanju imena ekipe. Poskusi znova.',
    };
  }

  if (duplicate) {
    return { success: false, error: 'Ekipa s tem imenom že obstaja.' };
  }

  // Handle optional logo file upload to Supabase Storage
  let logo_path: string | null | undefined = existingGroup.logo_path ?? null;
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

  let updateQuery = supabase
    .from('groups')
    .update({
      group_name,
      members,
      leader_discord,
      games,
      logo_path,
    })
    .eq('id', groupId);

  if (!isAdmin) {
    updateQuery = updateQuery.eq('owner_id', user.id);
  }

  const { error: updateError } = await updateQuery;

  if (updateError) {
    return { success: false, error: 'Napaka pri shranjevanju sprememb. Poskusi znova.' };
  }

  revalidatePath('/teams');
  return { success: true, error: null };
}

export async function deleteGroup(
  _prevState: DeleteFormState,
  formData: FormData
): Promise<DeleteFormState> {
  const supabase = await createSupabaseServerClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData?.user) {
    return {
      success: false,
      error: 'Za brisanje ekipe se najprej prijavi (profil / Google).',
    };
  }

  const user = authData.user;
  const isAdmin = await isAdminUser(supabase, user.id);
  const groupId = Number(formData.get('id'));
  if (!groupId || Number.isNaN(groupId)) {
    return { success: false, error: 'Manjka ID ekipe za brisanje.' };
  }

  const { data: existingGroup, error: fetchError } = await supabase
    .from('groups')
    .select('id, owner_id, logo_path')
    .eq('id', groupId)
    .maybeSingle();

  if (fetchError?.code === '42703') {
    return {
      success: false,
      error:
        'Tabela groups ne pozna stolpcev owner_id/logo_path. Dodaj stolpce owner_id uuid, owner_email text in logo_path text, nato poskusi znova.',
    };
  }

  if (!existingGroup) {
    return { success: false, error: 'Ekipe ni bilo mogoče najti.' };
  }

  if (existingGroup.owner_id !== user.id && !isAdmin) {
    return { success: false, error: 'To ni tvoja ekipa, brisanje ni dovoljeno.' };
  }

  if (existingGroup.logo_path) {
    await supabaseServer.storage.from('logos').remove([existingGroup.logo_path]);
  }

  let deleteQuery = supabase.from('groups').delete().eq('id', groupId);
  if (!isAdmin) {
    deleteQuery = deleteQuery.eq('owner_id', user.id);
  }

  const { error: deleteError } = await deleteQuery;

  if (deleteError) {
    return { success: false, error: 'Napaka pri brisanju ekipe. Poskusi znova.' };
  }

  revalidatePath('/teams');
  revalidatePath('/teams/edit');
  return { success: true, error: null };
}
