"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const COLORS = {
  accent: "#1A8CFF",
};

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState("Zaključujem prijavo...");

  useEffect(() => {
    const runExchange = async () => {
      // Če je seja že vzpostavljena (npr. po povratku), takoj preusmeri
      const { data: existing } = await supabase.auth.getSession();
      if (existing?.session) {
        router.replace("/profile");
        return;
      }

      const code = new URLSearchParams(window.location.search).get("code");
      if (!code) {
        setStatus("Manjka koda za prijavo.");
        return;
      }

      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        setStatus("Prijava uspešna, preusmerjam na profil...");
        router.replace("/profile");
      } else {
        const { data: retry } = await supabase.auth.getSession();
        if (retry?.session) {
          router.replace("/profile");
        } else {
          setStatus(`Napaka pri prijavi: ${error.message}`);
        }
      }
    };

    runExchange();
  }, [router]);

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
        <h1 className="text-2xl font-bold">Prijava</h1>
        <p className="mt-4 rounded-lg bg-white/5 px-4 py-3 text-sm text-white/90">
          {status}
        </p>
        <Link
          href="/"
          className="mt-4 inline-block rounded-md px-4 py-2 text-sm font-semibold text-white shadow"
          style={{ backgroundColor: COLORS.accent }}
        >
          Domov
        </Link>
      </section>
    </main>
  );
}
