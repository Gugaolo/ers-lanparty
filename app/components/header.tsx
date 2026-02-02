import Image from 'next/image';
import Link from 'next/link';
import NavUser from './NavUser';

export default function Header() {
  return (
    <nav className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
      <Link href="/" className="absolute left-0 top-0 flex h-16 w-full items-center bg-black/70 px-6 backdrop-blur sm:static sm:w-auto sm:bg-transparent">
      <div className="flex items-center gap-3">
        <Image
          src="/ERSLogotip.png"
          alt="ERŠ ŠCV"
          width={40}
          height={40}
            priority
          />
          <span className="text-lg font-semibold tracking-tight">
            ERŠ ŠCV LAN PARTY
          </span>
        </div>
      </Link>
        <div className="hidden gap-3 sm:flex">
          <Link href="./#igre" className="rounded-md px-3 py-2 text-sm hover:bg-white/10">
            Igre
          </Link>
          <Link href="/teams" className="rounded-md px-3 py-2 text-sm hover:bg-white/10">
            Ekipe
          </Link>
          <Link href="/urnik" className="rounded-md px-3 py-2 text-sm hover:bg-white/10">
            Urnik
          </Link>
          <Link href="./#pravila" className="rounded-md px-3 py-2 text-sm hover:bg-white/10">
            Pravila
          </Link>
          <NavUser />
        </div>
        {/* Mobile quick links */}
        <div className="flex gap-2 overflow-x-auto sm:hidden">
          <Link href="/prijava" className="rounded-md bg-white/10 px-3 py-2 text-xs font-semibold text-white">
            Prijava ekipe
          </Link>
          <Link href="/teams" className="rounded-md bg-white/10 px-3 py-2 text-xs font-semibold text-white">
            Ekipe
          </Link>
          <Link href="/login" className="rounded-md bg-white/10 px-3 py-2 text-xs font-semibold text-white">
            Prijava
          </Link>
        </div>
      </nav>
);
}