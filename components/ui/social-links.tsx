type Props = {}
export default function SocialLinks({}: Props) {
  return (
    <ul className="flex md:order-1">
      <li>
        <a
          href="https://www.facebook.com/ElMayorImperioDeTodos/"
          className="flex justify-center items-center"
          aria-label="Facebook"
        >
          <svg
            className="w-8 h-8 fill-current"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M14.023 24L14 17h-3v-3h3v-2c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V14H21l-1 3h-2.72v7h-3.257z" />
          </svg>
        </a>
      </li>
      <li>
        <a
          href="https://www.instagram.com/imperio_e/"
          className="flex justify-center items-center"
          aria-label="Instagram"
        >
          <svg
            className="w-8 h-8 fill-current"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="20.145" cy="11.892" r="1" />
            <path d="M16 20c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4zm0-6c-1.103 0-2 .897-2 2s.897 2 2 2 2-.897 2-2-.897-2-2-2z" />
            <path d="M20 24h-8c-2.056 0-4-1.944-4-4v-8c0-2.056 1.944-4 4-4h8c2.056 0 4 1.944 4 4v8c0 2.056-1.944 4-4 4zm-8-14c-.935 0-2 1.065-2 2v8c0 .953 1.047 2 2 2h8c.935 0 2-1.065 2-2v-8c0-.935-1.065-2-2-2h-8z" />
          </svg>
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/Imperio_e"
          className="flex justify-center items-center"
          aria-label="Twitter"
        >
          <svg
            className="w-8 h-8 fill-current"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m13.063 9 3.495 4.475L20.601 9h2.454l-5.359 5.931L24 23h-4.938l-3.866-4.893L10.771 23H8.316l5.735-6.342L8 9h5.063Zm-.74 1.347h-1.457l8.875 11.232h1.36l-8.778-11.232Z" />
          </svg>
        </a>
      </li>
      <li>
        <a
          href="mailto:tienda@imperio-espanol.com"
          className="flex justify-center items-center"
          aria-label="Mail"
        >
          <svg
            className="w-8 h-8 fill-current"
            viewBox="-256 0 1024 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
          </svg>
        </a>
      </li>
    </ul>
  )
}
