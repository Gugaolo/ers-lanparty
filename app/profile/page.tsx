"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const COLORS = {
  accent: "#1A8CFF",
};

type UserInfo = {
  email: string | null;
  id: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        setError(error ? error.message : "Najprej se prijavi.");
        setLoading(false);
        return;
      }

      setUser({ id: data.user.id, email: data.user.email ?? null });
      setLoading(false);
    };

    loadUser();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  return (
    <main
      className="min-h-screen text-white"
      style={{
        background: `radial-gradient(circle at center,
          rgba(0, 183, 255, 0.25),
          rgba(2, 4, 10, 1) 70%
        )`,
      }}
    >
      <section className="mx-auto max-w-xl px-6 pb-16 pt-14">
        <Link
          href="/"
          className="inline-block rounded-md px-4 py-2 text-sm font-semibold text-white shadow"
          style={{ backgroundColor: COLORS.accent }}
        >
          ← Domov
        </Link>

        <h1 className="mt-6 text-3xl font-extrabold leading-tight">
          Moj profil
        </h1>
        <p className="mt-2 text-white/80">
          Podatki o prijavljenem uporabniku in odjava.
        </p>

        <div className="mt-8 space-y-4 rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur">
          {loading && <p>Nalaganje profila...</p>}
          {!loading && error && (
            <p className="text-red-200">Napaka: {error}</p>
          )}
          {!loading && user && (
            <>
              <div>
                <p className="text-sm text-white/70">E-mail</p>
                <p className="text-lg font-semibold">{user.email ?? "Neznano"}</p>
              </div>
              <div>
                <p className="text-sm text-white/70">ID</p>
                <p className="break-all text-sm text-white/80">{user.id}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="w-full rounded-md bg-white/10 px-4 py-3 text-sm font-semibold text-white hover:bg-white/15"
              >
                Odjava
              </button>
            </>
          )}
        </div>

        {!loading && !user && (
          <Link
            href="/login"
            className="mt-6 inline-block rounded-md px-4 py-2 text-sm font-semibold text-white shadow"
            style={{ backgroundColor: COLORS.accent }}
          >
            Pojdi na prijavo
          </Link>
        )}
      </section>
    </main>
  );
}
