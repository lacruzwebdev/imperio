import EventoMap from '@/components/ui/evento-map'
import { fetchEvent } from '@/lib/api'
import { getStrapiURL } from '@/lib/api-helpers'

type Props = {
  params: {
    eventId: number
  }
}
export default async function Evento({ params }: Props) {
  const { eventId } = params
  const event = await fetchEvent(eventId)
  const { Imagen: img } = event
  const options = {
    dateStyle: 'long'
  } as const
  const date = new Intl.DateTimeFormat('es-ES', options).format(
    new Date(event.Fecha)
  )
  return (
    <section className="max-w-screen-xl mx-auto p-8">
      <h2 className="text-center mb-2 text-xl text-primary font-bold tracking-tight">
        {date}
      </h2>
      {img && (
        <img
          className="rounded-t-lg mx-auto"
          width={img[0].formats.large.width}
          height={img[0].formats.large.height}
          src={getStrapiURL(img[0].formats.large.url)}
          alt={img[0].alternativeText}
        />
      )}
      <h1 className="mt-8 text-2xl font-bold tracking-tight">{event.Titulo}</h1>
      <p>{event.Descripcion}</p>
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
      <EventoMap lat={event.Latitud} long={event.Longitud} zoom={7} />
    </section>
  )
}
