import Carousel from '@/components/ui/carousel'
import EventoMap from '@/components/ui/evento-map'
import SocialShare from '@/components/ui/social-share'
import TTS from '@/components/ui/tts'
import { fetchHito } from '@/lib/api'
import { getStrapiURL } from '@/lib/api-helpers'
import { Metadata } from 'next'
import Markdown from 'react-markdown'

type Props = {
  params: {
    hitoId: number
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { hitoId } = params
  const event = await fetchHito(hitoId)
  return {
     title: `Imperio Español - ${event.Titulo}`
   }
}

export default async function Hito({ params }: Props) {
   const { hitoId } = params
  const event = await fetchHito(hitoId)
  const { Imagen: img } = event

  return (
    <section className="max-w-screen-xl mx-auto p-8">
      {img.length > 0 && img[0].formats.large ? (
        <div className="relative">
          <img
            className="rounded-t-lg mx-auto w-full"
            width={img[0].formats.large.width}
            height={img[0].formats.large.height}
            src={getStrapiURL(img[0].formats.large.url)}
            alt={img[0].alternativeText}
          />
          <span className="absolute bottom-8 left-8 text-white font-bold text-xl shadow-xl">
            {img[0].alternativeText}
          </span>
        </div>
      ) : (
        <div className="relative">
          <img
            className="rounded-t-lg mx-auto w-full"
            width={img[0].formats.medium.width}
            height={img[0].formats.medium.height}
            src={getStrapiURL(img[0].formats.medium.url)}
            alt={img[0].alternativeText}
          />
          <span className="absolute bottom-8 left-8 text-white font-bold text-xl shadow-xl">
            {img[0].alternativeText}
          </span>
        </div>
      )}

      <h1 className="mt-8 mb-4 text-2xl font-bold tracking-tight">
        {event.Titulo}
      </h1>
      <Markdown className="space-y-6 mb-10">{event.Descripcion}</Markdown>
      <div className="mt-2 mb-2 flex items-center gap-2">
        <p>
          Autor:{' '}
          <a className="hover:text-primary font-bold" href={event.Autores.Web}>
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
        <a href={event.Autores.Web}>
          <svg
            className="hover:fill-primary"
            xmlns="http://www.w3.org/2000/svg"
            height="1.2rem"
            viewBox="0 0 512 512"
          >
            <path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z" />
          </svg>
        </a>
      </div>
      <div className="mt-2 mb-2">
        <p className="text-primary">
          Categorías:{' '}
          {event.Categorias.map(
            (cat: Categoria, index: number, arr: string[]) => (
              <span key={cat.id}>
                {cat.Nombre}
                {index < arr.length - 1 ? ', ' : ''}
              </span>
            )
          )}
        </p>
      </div>
      <TTS className="flex text-primary mb-8" text={event.Descripcion} />
      <SocialShare title={`Imperio Español - ${event.Titulo}`} />
    </section>
  )
}
