'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

export default function MobileMenu() {
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false)

  const trigger = useRef<HTMLButtonElement>(null)
  const mobileNav = useRef<HTMLDivElement>(null)

  // close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }): void => {
      if (!mobileNav.current || !trigger.current) return
      if (
        !mobileNavOpen ||
        mobileNav.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return
      setMobileNavOpen(false)
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })

  // close the mobile menu if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }): void => {
      if (!mobileNavOpen || keyCode !== 27) return
      setMobileNavOpen(false)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  })

  return (
    <div className="md:hidden">
      {/* Hamburger button */}
      <button
        ref={trigger}
        className={`hamburger ${mobileNavOpen && 'active'}`}
        aria-controls="mobile-nav"
        aria-expanded={mobileNavOpen}
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
      >
        <span className="sr-only">Menu</span>
        <svg
          className="w-6 h-6 fill-current transition duration-150 ease-in-out"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="4" width="24" height="2" rx="1" />
          <rect y="11" width="24" height="2" rx="1" />
          <rect y="18" width="24" height="2" rx="1" />
        </svg>
      </button>

      {/*Mobile navigation */}
      <nav
        id="mobile-nav"
        ref={mobileNav}
        className="absolute top-full z-20 left-0 w-full px-4 bg-primary sm:px-6 overflow-hidden transition-all duration-300 ease-in-out"
        style={
          mobileNavOpen
            ? { maxHeight: mobileNav.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0.8 }
        }
      >
        <ul className="bg-primary text-white px-4 py-2 text-lg">
          <li>
            <Link
              href="/"
              className="flex hover:text-primary py-2"
              onClick={() => setMobileNavOpen(false)}
            >
              Eventos
            </Link>
          </li>
          <li>
            <Link
              href="/hitos"
              className="flex hover:text-primary py-2"
              onClick={() => setMobileNavOpen(false)}
            >
              Hitos
            </Link>
          </li>
          <li>
            <Link
              href="/lecturas"
              className="flex hover:text-primary py-2"
              onClick={() => setMobileNavOpen(false)}
            >
              Lecturas
            </Link>
          </li>
          <li>
            <Link
              href="/frases"
              className="flex hover:text-primary py-2"
              onClick={() => setMobileNavOpen(false)}
            >
              Frases
            </Link>
          </li>
          <li>
            <Link
              href="/sabiasque"
              className="flex hover:text-primary py-2"
              onClick={() => setMobileNavOpen(false)}
            >
              ¿Sabías que...?
            </Link>
          </li>
          <li>
            <a
              href="https://tienda.imperio-espanol.com/"
              className="flex hover:text-primary py-2"
              onClick={() => setMobileNavOpen(false)}
            >
              Tienda
            </a>
          </li>
          <li>
            <a
              href="https://tienda.imperio-espanol.com/contacto/"
              className="flex hover:text-primary py-2"
              onClick={() => setMobileNavOpen(false)}
            >
              Contacto
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
