'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import NavUser from './NavUser'

type HeaderProps = {
  NavUserComponent?: React.ComponentType
}

const baseLinkClass = 'rounded-md px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10'

export default function Header({ NavUserComponent = NavUser }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/75 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-3">
          <Link href="/" className="flex min-w-0 items-center gap-3" onClick={closeMenu}>
            <Image src="/ERSLogotip.png" alt="ERŠ ŠCV" width={36} height={36} priority />
            <span className="truncate text-sm font-semibold tracking-tight text-white sm:text-lg">
              ERŠ ŠCV LAN PARTY
            </span>
          </Link>

          <button
            type="button"
            className="rounded-md border border-white/20 px-3 py-2 text-xs font-semibold text-white sm:hidden"
            aria-expanded={isOpen}
            aria-label="Odpri navigacijo"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? 'Zapri' : 'Meni'}
          </button>

          <div className="hidden items-center gap-2 sm:flex">
            <Link href="/#igre" className={baseLinkClass}>
              Igre
            </Link>
            <Link href="/teams" className={baseLinkClass}>
              Ekipe
            </Link>
            <Link href="/urnik" className={baseLinkClass}>
              Urnik
            </Link>
            <Link href="/#pravila" className={baseLinkClass}>
              Pravila
            </Link>
            <NavUserComponent />
          </div>
        </div>

        {isOpen && (
          <div className="border-t border-white/10 py-3 sm:hidden">
            <div className="grid gap-2">
              <Link href="/#igre" className={baseLinkClass} onClick={closeMenu}>
                Igre
              </Link>
              <Link href="/teams" className={baseLinkClass} onClick={closeMenu}>
                Ekipe
              </Link>
              <Link href="/urnik" className={baseLinkClass} onClick={closeMenu}>
                Urnik
              </Link>
              <Link href="/#pravila" className={baseLinkClass} onClick={closeMenu}>
                Pravila
              </Link>
              <div className="pt-1 [&>div]:flex-wrap [&>div]:gap-2">
                <NavUserComponent />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
