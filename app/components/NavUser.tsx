"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type UserPreview = {
  email: string | null;
};

export default function NavUser() {
  const [user, setUser] = useState<UserPreview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) setUser({ email: data.user.email ?? null });
      setLoading(false);
    };
    load();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? { email: session.user.email ?? null } : null);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    window.location.href = "/login";
  };

  if (loading) return null;

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/prijava"
          className="rounded-md px-3 py-2 text-sm font-semibold text-white hover:bg-white/10"
        >
          Prijava ekipe
        </Link>
        <Link
          href="/profile"
          className="rounded-md border border-white/25 bg-white/10 px-3 py-2 text-sm font-semibold text-white/90 hover:bg-white/20"
          title={user.email ?? undefined}
        >
          {user.email ?? "Profil"}
        </Link>
        <button
          onClick={handleSignOut}
          className="rounded-md px-3 py-2 text-sm font-semibold text-white hover:bg-white/10"
        >
          Odjava
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/login"
        className="rounded-md border border-white/30 px-3 py-2 text-sm font-semibold text-white/90 hover:bg-white/10"
      >
        Prijava
      </Link>
      <Link
        href="/signup"
        className="rounded-md px-3 py-2 text-sm font-semibold text-white text-white/90 hover:bg-white/10"
        style={{ backgroundColor: "#1A8CFF" }}
      >
        Ustvari profil
      </Link>
    </div>
  );
}
