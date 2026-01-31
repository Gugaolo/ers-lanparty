import Link from 'next/link';

export default function Footer() {
  return (
<footer className="border-t border-white/10 bg-black/30">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 sm:flex-row">
          <p className="text-sm text-white/70">
            © {new Date().getFullYear()} ERŠ ŠCV LAN Party
          </p>
          <div className="flex items-center gap-3 text-sm">
            <Link href="/kontakt" className="hover:underline">Kontakt</Link>
            <span className="opacity-40">•</span>
            <Link href="/organizatorji" className="hover:underline">Organizatorji</Link>
          </div>
        </div>
      </footer>
    );
}