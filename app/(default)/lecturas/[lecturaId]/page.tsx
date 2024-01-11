import { Button } from '@/components/ui/button'
import Carousel from '@/components/ui/carousel'
import EventoMap from '@/components/ui/evento-map'
import SocialShare from '@/components/ui/social-share'
import TTS from '@/components/ui/tts'
import { fetchLectura } from '@/lib/api'
import { getStrapiURL } from '@/lib/api-helpers'
import { Metadata } from 'next'
import Markdown from 'react-markdown'

type Props = {
  params: {
    lecturaId: number
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lecturaId } = params
  const event = await fetchLectura(lecturaId)
  return {
     title: `Imperio Español - ${event.Titulo}`
   }
}

export default async function Lectura({ params }: Props) {
   const { lecturaId } = params
  const event = await fetchLectura(lecturaId)
  const { Imagen: img } = event

  return (
    <section className="max-w-screen-xl mx-auto p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2">

      {img.length > 0 && img[0].formats.large ? (
         <div className="relative">
          <img
            className="rounded-t-lg mx-auto w-full max-h-[500px] object-contain"
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
            className="rounded-t-lg mx-auto w-full max-h-[500px] object-contain"
            width={img[0].formats.medium.width}
            height={img[0].formats.medium.height}
            src={getStrapiURL(img[0].formats.medium.url)}
            alt={img[0].alternativeText}
            />
        </div>
      )}
      <div className="pt-8">

      <div className="flex items-center w-full justify-between mb-4 flex-col sm:flex-row">
         <span className="text-primary font-bold">
          {event.Categorias.map(
             (cat: Categoria, index: number, arr: string[]) => (
                <span key={cat.id}>
                {cat.Nombre}
                {index < arr.length - 1 ? ', ' : ''}
              </span>
            )
            )}
        </span>
      <span className="font-bold">{event.ISBN}</span>
      </div>

      <h1 className="text-2xl font-bold tracking-tight mb-4">
        {event.Titulo}
      </h1>
      <span className="font-bold text-primary mb-4">{event.Autor}</span>
      <Button asChild className="w-full mt-4">
         <a href={event.Link}>
            Comprar
         </a>
      </Button>
      <h2 className="my-4 text-lg font-bold uppercase">Sinopsis</h2>
      <Markdown className="space-y-6 mb-10">{event.Descripcion}</Markdown>
      <div className="mt-2 mb-2 flex items-center gap-2">

      </div>
      </div>
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
