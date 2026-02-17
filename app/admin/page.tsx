import { getRole } from '@/lib/auth/getRole';

export default async function AdminPage() {
  const { role } = await getRole();

  return (
    <main className="mx-auto max-w-4xl px-6 py-10 text-white">
      <h1 className="text-3xl font-extrabold">Admin Panel</h1>
      <p className="mt-3 text-white/80">Dostop ima samo vloga admin.</p>
      <p className="mt-2 text-sm text-white/60">Tvoja vloga: {role}</p>
    </main>
  );
}
