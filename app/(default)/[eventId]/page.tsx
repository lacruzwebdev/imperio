import Carousel from '@/components/ui/carousel'
import EventoMap from '@/components/ui/evento-map'
import { fetchEvent } from '@/lib/api'
import { getStrapiURL } from '@/lib/api-helpers'
import { Metadata } from 'next'

type Props = {
  params: {
    eventId: number
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { eventId } = params
  const event = await fetchEvent(eventId)
  return {
    title: `Imperio Español - ${event.Titulo}`
  }
}

export default async function Evento({ params }: Props) {
  const { eventId } = params
  const event = await fetchEvent(eventId)
  const { Imagen: img } = event
  const options = {
    dateStyle: 'long'
  } as const
  const eventDate = new Date(event.Fecha)
  const date = new Intl.DateTimeFormat('es-ES', options)
    .format(eventDate)
    .split(' ')
    .slice(0, -2)
    .join(' ')
  const year = new Intl.DateTimeFormat('es-ES', { year: 'numeric' }).format(
    eventDate
  )
  const day = new Intl.DateTimeFormat('es-ES', { weekday: 'long' }).format(
    eventDate
  )
  return (
    <section className="max-w-screen-xl mx-auto p-8">
      <div className="flex w-full justify-between">
        <p className="text-center mb-2 text-xl text-primary font-bold tracking-tight">
          {year}
        </p>
        <p className="text-center mb-2 text-xl text-primary font-bold tracking-tight">
          {date}
        </p>
        <p className="text-center mb-2 text-xl text-primary font-bold tracking-tight">
          {day}
        </p>
      </div>
      {img && (
        <img
          className="rounded-t-lg mx-auto w-full"
          width={img[0].formats.large.width}
          height={img[0].formats.large.height}
          src={getStrapiURL(img[0].formats.large.url)}
          alt={img[0].alternativeText}
        />
      )}
      <h1 className="mt-8 text-2xl font-bold tracking-tight">{event.Titulo}</h1>
      <p
        dangerouslySetInnerHTML={{
          __html: event.Descripcion.replace(/\n/g, '<br />')
        }}
      ></p>
      <div className="mt-2 mb-12 flex items-center gap-2">
        <p>
          Autor:{' '}
          <a className="hover:text-primary" href={event.Autores.Web}>
            {event.Autores.Nombre}
          </a>
        </p>
        <a href={`https://twitter.com/${event.Autores.Twitter}`}>
          <svg
            className="hover:fill-primary"
            xmlns="http://www.w3.org/2000/svg"
            height="1.2rem"
            viewBox="0 0 512 512"
          >
            <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
          </svg>
        </a>
      </div>
      {event.Imagen.length > 1 && <Carousel slides={event.Imagen} />}
      {event.Latitud !== 0 && event.Longitud !== 0 && (
        <EventoMap lat={event.Latitud} long={event.Longitud} zoom={7} />
      )}
    </section>
  )
}
