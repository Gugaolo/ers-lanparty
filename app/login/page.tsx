"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const COLORS = {
  accent: "#1A8CFF",
  dark: "#02040A",
};

export default function LoginPage() {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleGoogleSignIn = async () => {
    setMessage("Preusmerjam na Google prijavo...");

    const redirectTo = `${window.location.origin}/auth/callback`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });

    if (error) {
      setMessage(`Napaka: ${error.message}`);
    }
  };

  const handleEmailLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setErrors({});

    // Basic validation
    if (!email || !password) {
      setErrors({
        email: !email ? "E-mail je obvezen" : undefined,
        password: !password ? "Geslo je obvezno" : undefined,
      });
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (data?.session) {
      setMessage("Prijava uspešna. Preusmerjam...");
      setTimeout(() => {
        router.push("/profile");
      }, 1500);
    } else if (error) {
      // Custom error messages in Slovene
      let errorMessage = "Prišlo je do napake pri prijavi.";
      
      switch (error.message) {
        case "Invalid login credentials":
        case "Invalid email or password":
          errorMessage = "Napačen e-mail ali geslo. Preverite svoje podatke.";
          setErrors({
            email: "Napačen e-mail ali geslo",
            password: "Napačen e-mail ali geslo"
          });
          break;
        case "Email not confirmed":
          errorMessage = "E-mail ni potrjen. Preverite svoj e-mail za potrditveno povezavo.";
          break;
        case "User not found":
          errorMessage = "Uporabnik s tem e-mailom ne obstaja. Preverite e-mail ali ustvarite nov račun.";
          setErrors({ email: "Uporabnik s tem e-mailom ne obstaja" });
          break;
        case "Too many requests":
          errorMessage = "Preveč poskusov prijave. Počakajte nekaj trenutkov pred ponovnim poskusom.";
          break;
        case "Network error":
          errorMessage = "Napaka omrežne povezave. Preverite svojo internetno povezavo.";
          break;
        default:
          if (error.message.includes("rate limit")) {
            errorMessage = "Preveč poskusov prijave. Počakajte nekaj minut.";
          } else {
            errorMessage = `Napaka: ${error.message}`;
          }
      }
      
      setMessage(errorMessage);
    } else {
      setMessage("Nepričakovano stanje pri prijavi. Poskusi znova.");
    }

    setLoading(false);
  };

  // Clear specific field error when user starts typing
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: undefined }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: undefined }));
    }
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

        <h1 className="mt-6 text-3xl font-extrabold leading-tight">Prijava v račun</h1>
        <p className="mt-2 text-white/80">Prijavi se z Google računom ali z e-mailom in geslom.</p>

        <div className="mt-8 space-y-6">
          <button
            onClick={handleGoogleSignIn}
            className="w-full rounded-lg bg-red-500 px-4 py-3 text-sm font-semibold text-white shadow hover:brightness-105"
          >
            Prijava z Google računom
          </button>

          <div className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur">
            <h2 className="text-lg font-semibold">Prijava z e-mailom</h2>
            <form className="mt-4 space-y-4" onSubmit={handleEmailLogin} noValidate>
              <div>
                <label className="text-xs uppercase tracking-wide text-white/70">E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  className={`mt-2 w-full rounded-md bg-black/30 px-3 py-2 text-sm outline-none ring-1 ${
                    errors.email ? "ring-red-500 focus:ring-red-500" : "ring-white/10 focus:ring-2 focus:ring-blue-400"
                  }`}
                  placeholder="ime@primer.si"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="text-xs uppercase tracking-wide text-white/70">Geslo</label>
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  className={`mt-2 w-full rounded-md bg-black/30 px-3 py-2 text-sm outline-none ring-1 ${
                    errors.password ? "ring-red-500 focus:ring-red-500" : "ring-white/10 focus:ring-2 focus:ring-blue-400"
                  }`}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-400">{errors.password}</p>
                )}
              </div>
              <div className="pt-2">
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-blue-300 hover:underline"
                >
                  Pozabljeno geslo?
                </Link>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-white/10 px-4 py-3 text-sm font-semibold text-white hover:bg-white/15 disabled:opacity-50"
              >
                {loading ? "Prijavljam..." : "Prijava"}
              </button>
            </form>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/90">
            Nimaš profila?{" "}
            <Link href="/signup" className="font-semibold text-blue-300 hover:underline">
              Ustvari profil
            </Link>
            .
          </div>

          {message && (
            <div className={`rounded-lg px-4 py-3 text-sm ${
              message.includes("uspešna") 
                ? "bg-green-500/20 text-green-300" 
                : "bg-red-500/20 text-red-300"
            }`}>
              {message}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}