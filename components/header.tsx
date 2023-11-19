import Link from 'next/link'
import NavMenu from './ui/nav-menu'

export default function Header() {
  return (
    <header className="w-full z-30 grid items-center">
      <div className="bg-primary text-primary-foreground relative">
        <div className="max-w-screen-xl mx-auto p-1 md:px-0">
          <NavMenu />
        </div>
      </div>
      <nav className="bg-white border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div
            className="items-center justify-between hidden w-full md:flex md:w-1/3"
            id="navbar-cta"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white"></ul>
          </div>
          <Link href="/" className="flex items-center md:w-1/3">
            <img src="/logo.webp" className="h-8 mr-3" alt="Imperio" />
          </Link>
          <div className="flex md:w-1/3"></div>
        </div>
      </nav>
    </header>
  )
}
