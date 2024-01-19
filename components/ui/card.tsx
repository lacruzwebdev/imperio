import { getStrapiURL } from '@/lib/api-helpers'
import Link from 'next/link'
import Image from 'next/image'
import { createSlug } from '@/lib/helpers'

/* eslint-disable @next/next/no-img-element */
type Props = {
  type: 'eventos' | 'hitos' | 'lecturas'
  id: number
  img?: StrapiImage
  fecha: string
  title: string
  description: string
  relevancia: 0 | 1
  priority: boolean
}
export default function Card({
  type,
  id,
  img,
  fecha,
  title,
  description,
  relevancia,
  priority = false
}: Props) {
  const descriptionMaxLength = 200
  let url = `${id}-${createSlug(title)}`;
  if (type === 'hitos') {
    url = `hitos/${url}`
  } else if (type === 'lecturas') {
    url = `lecturas/${url}`
  }
  return (
    <Link href={url}>
      <div
        className={`rounded-lg shadow h-full ${
          relevancia > 0 ? 'bg-primary' : 'bg-white'
        }`}
      >
        {img && (
          <Image
            className="rounded-t-lg h-48 object-cover"
            width={img.formats.medium.width}
            height={img.formats.medium.height}
            src={getStrapiURL(img.formats.medium.url)}
            alt={img.alternativeText}
            priority={priority}
          />
        )}
        {!img && (
          <Image
            className="rounded-t-lg"
            src="/imperio.png"
            width={750}
            height={443}
            alt="Imperio"
          />
        )}
        <div
          className={`p-5 inline-flex flex-col ${
            relevancia > 0 ? 'text-white' : ''
          }`}
        >
          <div>
            <p className={relevancia > 0 ? 'text-white' : 'text-primary'}>
              {type === 'eventos' && fecha && fecha.substring(0, 4)}
            </p>
            <h3 className="mb-2 text-2xl font-bold tracking-tight">{title}</h3>
            <p className="mb-3 font-normal">
              {description.slice(0, descriptionMaxLength) + '...'}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
