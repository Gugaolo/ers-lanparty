import { createSupabaseServer } from '@/lib/supabase/server';

export type UserRole = 'user' | 'admin';

export type RoleResult = {
  userId: string | null;
  role: UserRole | null;
  isAdmin: boolean;
};

export async function getRole(): Promise<RoleResult> {
  const supabase = await createSupabaseServer();
  const { data: authData } = await supabase.auth.getUser();

  const userId = authData.user?.id ?? null;
  if (!userId) {
    return { userId: null, role: null, isAdmin: false };
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('user_id', userId)
    .maybeSingle();

  const role = (profile?.role as UserRole | undefined) ?? 'user';

  return {
    userId,
    role,
    isAdmin: role === 'admin',
  };
}
