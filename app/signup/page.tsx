"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const COLORS = {
  accent: "#1A8CFF",
};

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setOauthLoading(true);
    setMessage("Preusmerjam na Google prijavo...");

    const redirectTo = `${window.location.origin}/auth/callback`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });

    if (error) {
      setMessage(`Napaka: ${error.message}`);
    }

    setOauthLoading(false);
  };

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(`Napaka: ${error.message}`);
    } else {
      setMessage("Profil ustvarjen. Preveri e-mail (ce je zahtevana potrditev) in nato se prijavi.");
    }

    setLoading(false);
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
          Domov
        </Link>

        <h1 className="mt-6 text-3xl font-extrabold leading-tight">Ustvari profil</h1>
        <p className="mt-2 text-white/80">
          Vnesi e-mail in geslo za nov racun. Po ustvaritvi se prijavi na strani za prijavo.
        </p>

        <div className="mt-8 space-y-6">
          <button
            onClick={handleGoogleSignIn}
            disabled={oauthLoading}
            className="w-full rounded-lg bg-red-500 px-4 py-3 text-sm font-semibold text-white shadow hover:brightness-105 disabled:opacity-60"
          >
            {oauthLoading ? "Preusmerjam..." : "Prijava z Google racunom"}
          </button>

          <div className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur">
            <form className="space-y-4" onSubmit={handleSignUp}>
              <div>
                <label className="text-xs uppercase tracking-wide text-white/70">
                  E-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-2 w-full rounded-md bg-black/30 px-3 py-2 text-sm outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-blue-400"
                  placeholder="ime@primer.si"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wide text-white/70">
                  Geslo
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-2 w-full rounded-md bg-black/30 px-3 py-2 text-sm outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-blue-400"
                  placeholder="********"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-white/10 px-4 py-3 text-sm font-semibold text-white hover:bg-white/15 disabled:opacity-50"
              >
                {loading ? "Ustvarjam..." : "Ustvari profil"}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-4 text-sm text-white/80">
          Ce imas ze racun?{" "}
          <Link href="/login" className="font-semibold text-blue-300 hover:underline">
            Pojdi na prijavo
          </Link>
          .
        </div>

        {message && (
          <p className="mt-4 rounded-lg bg-white/5 px-4 py-3 text-sm text-white/90">
            {message}
          </p>
        )}
      </section>
    </main>
  );
}

