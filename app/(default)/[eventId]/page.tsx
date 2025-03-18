import Carousel from "@/components/ui/carousel"
import EventoMap from "@/components/ui/evento-map"
import SocialShare from "@/components/ui/social-share"
import TTS from "@/components/ui/tts"
import { fetchEvent } from "@/lib/api"
import { getStrapiImage } from "@/lib/api-helpers"
import { Link as LinkIcon } from "lucide-react"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import Markdown from "react-markdown"

type Props = {
  params: {
    eventId: number
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { eventId } = params
  const event = await fetchEvent(eventId)
  return {
    title: `Imperio Español - ${event.Titulo}`,
  }
}

export default async function Evento({ params }: Props) {
  const { eventId } = params
  const event = await fetchEvent(eventId)
  const { Imagen: img } = event
  const options = {
    dateStyle: "long",
  } as const
  const eventDate = new Date(`${event.Fecha}T12:00Z`)
  const date = new Intl.DateTimeFormat("es-ES", options)
    .format(eventDate)
    .split(" ")
    .slice(0, -2)
    .filter((item) => item !== "de")
    .join(" ")
  const year = new Intl.DateTimeFormat("es-ES", { year: "numeric" }).format(eventDate)
  const day = new Intl.DateTimeFormat("es-ES", { weekday: "long" }).format(eventDate)

  const hasLinks = [event.Wikipedia, event.Link, event.RAH].some((link) => link)

  const mainImage = getStrapiImage(img[0])

  return (
    <>
      <section>
        <div className="max-w-screen-xl mx-auto p-8">
          <Link href="/">
            <h2 className="text-3xl mb-2">Tal día como hoy...</h2>
          </Link>
          <div className="flex w-full justify-between">
            <p className="text-center mb-2 text-xl text-primary font-bold tracking-tight">{year}</p>
            <p className="text-center mb-2 text-xl tracking-tight">{date}</p>
            <p className="text-center mb-2 text-xl tracking-tight">
              {`${day[0].toUpperCase()}${day.substring(1)}`}
            </p>
          </div>
        </div>
        <div className="max-w-screen-xl mx-auto p-8">
          {img.length > 0 && (
            <div className="relative lg:w-1/2 lg:float-left lg:mr-8 mb-8 w-full max-w-screen-xl mx-auto">
              <Image
                className="w-full"
                width={mainImage.width}
                height={mainImage.height}
                src={mainImage.url}
                alt={mainImage.alt}
                priority={true}
              />
              <span className="absolute bottom-2 left-3 md:bottom-8 md:left-8 text-white font-bold text-sm md:text-xl text-shadow">
                {img[0].alternativeText}
              </span>
            </div>
          )}
          <h1 className="mb-4 text-2xl font-bold tracking-tight">{event.Titulo}</h1>
          <Markdown className="space-y-6 mb-10">{event.Descripcion}</Markdown>
          {event.Autores && (
            <div className="mt-2 mb-2 flex items-center gap-2">
              <p>
                Autor:{" "}
                <a
                  className="hover:text-primary font-bold"
                  aria-label={event.Autores.Nombre}
                  href={event.Autores.Web}
                >
                  {event.Autores.Nombre}
                </a>
              </p>
              {event.Autores.Twitter && (
                <a aria-label="X del autor" href={`https://twitter.com/${event.Autores.Twitter}`}>
                  <svg
                    className="hover:fill-primary w-8 h-8"
                    xmlns="http://www.w3.org/2000/svg"
                    height="1.2rem"
                    viewBox="0 0 512 512"
                  >
                    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                  </svg>
                </a>
              )}
              {event.Autores.Web && (
                <a aria-label="Web del autor" href={event.Autores.Web}>
                  <svg
                    className="hover:fill-primary w-8 h-8"
                    xmlns="http://www.w3.org/2000/svg"
                    height="1.2rem"
                    viewBox="0 0 512 512"
                  >
                    <path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z" />
                  </svg>
                </a>
              )}
            </div>
          )}
          {hasLinks && (
            <div className="flex gap-2 items-center">
              {event.RAH && (
                <a href={event.RAH} target="_blank" rel="noreferrer">
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    x="0px"
                    y="0px"
                    viewBox="207 335 137.9 100"
                    xmlSpace="preserve"
                  >
                    <g id="XMLID_30430_">
                      <path
                        id="XMLID_8_"
                        className="st0"
                        d="M230.5,366.5h-21.1v1.2l1.5,0.3c5.6,1.1,5.5,1.8,5.5,5.8v31.6c0,4,0,4.6-5.5,5.8l-1.5,0.3v0.8 h21.8c13.1,0,26.7-7.2,26.7-22.7C257.9,374.6,246.9,366.5,230.5,366.5z M231.2,410.5h-1.3c-3.8,0-4.5-1.7-4.5-5.2v-36.8h5.5 c11.8,1,17.6,9.7,17.6,21.3C248.4,401.6,243.2,409.5,231.2,410.5z"
                      />
                      <g id="XMLID_30459_">
                        <g id="XMLID_43_">
                          <path
                            id="XMLID_44_"
                            className="st0"
                            d="M310.2,382.8c-0.1,0.1-0.3,0.3-0.6,0.7c-0.3,0.4-0.6,0.9-0.9,1.3c-0.3,0.4-0.8,0.8-1.4,1.2 s-1.3,0.5-2,0.5c-0.6,0-1.3-0.2-2.3-0.7s-1.9-1-2.8-1.6c0,0-0.2-0.1-0.4-0.3c-0.3-0.2-0.4-0.3-0.5-0.3s-0.2-0.1-0.5-0.3 c-0.2-0.2-0.4-0.3-0.5-0.3c-0.1-0.1-0.2-0.1-0.5-0.3c-0.2-0.1-0.4-0.2-0.5-0.2s-0.3-0.1-0.5-0.2c-0.2-0.1-0.4-0.1-0.6-0.2 c-0.2,0-0.4-0.1-0.6-0.1s-0.4,0-0.6,0c-2.1,0-3.9,1.2-5.3,3.5c-0.7,1.3-1.1,2.5-1.1,3.6c0,0.2,0.1,0.5,0.2,0.7 c0.1,0.2,0.3,0.4,0.5,0.4c0.1,0,0.2-0.2,0.4-0.5c0.2-0.3,0.3-0.6,0.5-1s0.5-0.7,0.8-1.1s0.7-0.6,1.2-0.9c0.5-0.2,1-0.4,1.6-0.4 c1.2,0,2.9,0.8,5,2.4c0,0,0.2,0.1,0.4,0.3c0.3,0.2,0.4,0.3,0.5,0.3s0.2,0.1,0.5,0.3c0.2,0.2,0.4,0.3,0.5,0.3s0.2,0.1,0.5,0.2 c0.2,0.1,0.4,0.2,0.5,0.2s0.3,0.1,0.5,0.2s0.4,0.1,0.6,0.2c0.2,0,0.3,0,0.6,0.1c0.2,0,0.4,0,0.6,0c2,0,3.8-1.2,5.3-3.6 c0.8-1.5,1.2-2.7,1.2-3.8C310.8,383,310.6,382.8,310.2,382.8z"
                          />
                        </g>
                      </g>
                      <g id="XMLID_2_">
                        <path
                          id="XMLID_6_"
                          className="st0"
                          d="M331,381.4c-0.5-1.3-1.8-1.6-3.2-1c-2.5,1-3.5,4.2-3.1,6.9C328.9,385.7,331.9,383.8,331,381.4z "
                        />
                        <path
                          id="XMLID_17_"
                          className="st0"
                          d="M329,372.5c-8.1,0-14.7,6.6-14.7,14.7s6.6,14.7,14.7,14.7s14.7-6.6,14.7-14.7 C343.8,379.1,337.2,372.5,329,372.5z M331.2,395.4c-4.1,1.6-7-0.4-8.4-3.9c-1.9-4.7-0.5-11.4,4.5-13.4c3-1.2,5.3-0.1,6.2,2.2 c1.6,4.1-2.5,7-8.3,9.2c0.1,0.7,0.8,2.1,1.5,2.8c1.2,1.1,2.7,1.3,4.3,0.7c1.8-0.7,3-1.9,3.7-2.8l1.2,1.8 C335,393.2,333.3,394.5,331.2,395.4z"
                        />
                      </g>
                      <path
                        id="XMLID_12_"
                        className="st0"
                        d="M273.2,386.5c5.5-1.2,11.3-4.3,11.3-10c0-3.2-0.1-11-14.8-11h-23.3v1.4l2,0.3 c5.6,1.1,6,1.8,6,5.8v32.3c0,3.5-0.8,4.1-6,5.1l-2,0.3v0.6h23.9c10.5,0,17.8-5.9,17.8-12.6C288.1,390.2,279.2,387.2,273.2,386.5z  M262.4,368.5h3.6c3.9,0,9.2,2.1,9.2,8.3c0,6.2-4.8,8.7-8.3,8.7h-4.5L262.4,368.5L262.4,368.5z M266.5,409.7 c-4.2,0-4.1-1.2-4.1-4.9v-17.3h4c8.2,0,10.9,7.9,10.9,10.4C277.3,407.5,270.3,409.7,266.5,409.7z"
                      />
                    </g>
                  </svg>
                </a>
              )}
              {event.Link && (
                <a href={event.Link} target="_blank" rel="noreferrer">
                  <LinkIcon />
                </a>
              )}
              {event.Wikipedia && (
                <a href={event.Wikipedia} target="_blank" rel="noreferrer">
                  <svg
                    className="hover:fill-primary w-8 h-8"
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 640 512"
                    height="200px"
                    width="200px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M640 51.2l-.3 12.2c-28.1.8-45 15.8-55.8 40.3-25 57.8-103.3 240-155.3 358.6H415l-81.9-193.1c-32.5 63.6-68.3 130-99.2 193.1-.3.3-15 0-15-.3C172 352.3 122.8 243.4 75.8 133.4 64.4 106.7 26.4 63.4.2 63.7c0-3.1-.3-10-.3-14.2h161.9v13.9c-19.2 1.1-52.8 13.3-43.3 34.2 21.9 49.7 103.6 240.3 125.6 288.6 15-29.7 57.8-109.2 75.3-142.8-13.9-28.3-58.6-133.9-72.8-160-9.7-17.8-36.1-19.4-55.8-19.7V49.8l142.5.3v13.1c-19.4.6-38.1 7.8-29.4 26.1 18.9 40 30.6 68.1 48.1 104.7 5.6-10.8 34.7-69.4 48.1-100.8 8.9-20.6-3.9-28.6-38.6-29.4.3-3.6 0-10.3.3-13.6 44.4-.3 111.1-.3 123.1-.6v13.6c-22.5.8-45.8 12.8-58.1 31.7l-59.2 122.8c6.4 16.1 63.3 142.8 69.2 156.7L559.2 91.8c-8.6-23.1-36.4-28.1-47.2-28.3V49.6l127.8 1.1.2.5z"></path>
                  </svg>
                </a>
              )}
            </div>
          )}
          <div className="mt-2 mb-2">
            <p className="text-primary">
              Categorías:{" "}
              {event.Categorias.map((value: Categoria, index: number, array: Categoria[]) => (
                <span key={value.id}>
                  {value.Nombre}
                  {index < array.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
          </div>
          <TTS className="flex text-primary mb-8" text={event.Descripcion} />
          <SocialShare title={`Imperio Español - ${event.Titulo}`} />

          {event.Imagen.length > 1 && <Carousel slides={event.Imagen} />}
        </div>
      </section>
      <section>
        {event.Latitud !== 0 && event.Longitud !== 0 && <EventoMap positions={[event]} zoom={7} />}
      </section>
    </>
  )
}
