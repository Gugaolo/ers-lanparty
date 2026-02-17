import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import { getRole } from '@/lib/auth/getRole';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const { userId, isAdmin } = await getRole();

  if (!userId) {
    redirect('/login');
  }

  if (!isAdmin) {
    redirect('/');
  }

  return <>{children}</>;
}
