import SocialLinks from './ui/social-links'

type Props = {}
export default function Footer({}: Props) {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-screen-xl mx-auto py-12 px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Descarga la App</h2>
            <a href="https://onelink.to/h597a5">
              <img
                className="rounded-t-lg"
                src="/app.webp"
                alt="Imperio"
                width={200}
                height={174}
              />
            </a>
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold mr-2 mb-4">Enlaces</h2>
            <ul className="list-none">
              <li className="py-2">
                <a href="https://tienda.imperio-espanol.com/blog/">Blog</a>
              </li>
              <li className="py-2">
                <a href="https://tienda.imperio-espanol.com/contacto/">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold ml-2 mb-4">Síguenos</h2>
            <SocialLinks />
          </div>
          <div></div>
        </div>
      </div>
    </footer>
  )
}
