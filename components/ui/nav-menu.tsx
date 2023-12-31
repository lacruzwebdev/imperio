'use client'

import Link from 'next/link'
import Dropdown from './dropdown'
import MobileMenu from './mobile-menu'
import SocialLinks from './social-links'

type Props = {}
export default function NavMenu({}: Props) {
  return (
    <div className="mx-auto px-4 sm:px-6 text-xs">
      <div className="flex items-center justify-between">
        <nav className="hidden md:flex md:grow">
          <ul className="flex grow justify-end flex-wrap items-center">
            <li>
              <Link
                href="https://tienda.imperio-espanol.com/"
                className="px-4 py-2 flex items-center transition duration-150 ease-in-out"
              >
                Tienda
              </Link>
            </li>
            <li>
              <Link
                href="https://tienda.imperio-espanol.com/contacto"
                className="px-4 py-2 flex items-center transition duration-150 ease-in-out"
              >
                Contacto
              </Link>
            </li>
          </ul>
        </nav>
        <SocialLinks />
        <MobileMenu />
      </div>
    </div>
  )
}
