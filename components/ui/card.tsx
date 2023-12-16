import { getStrapiURL } from '@/lib/api-helpers'
import CardTextSkeleton from './card-text-skeleton'
import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createSlug } from '@/lib/helpers'

/* eslint-disable @next/next/no-img-element */
type Props = {
  id: number
  img?: StrapiImage
  fecha: string
  title: string
  description: string
  relevancia: 0 | 1
}
export default function Card({
  id,
  img,
  fecha,
  title,
  description,
  relevancia
}: Props) {
  const descriptionMaxLength = 200
  return (
    <Link href={`${id}-${createSlug(title)}`}>
      <div
        className={`rounded-lg shadow h-full ${
          relevancia > 0 ? 'bg-primary' : 'bg-white'
        }`}
      >
        {img && (
          <Image
            className="rounded-t-lg"
            width={img.formats.medium.width}
            height={img.formats.medium.height}
            src={getStrapiURL(img.formats.medium.url)}
            alt={img.alternativeText}
          />
        )}
        {!img && (
          <Image className="rounded-t-lg" src="/imperio.png" alt="Imperio" />
        )}
        <div
          className={`p-5 inline-flex flex-col ${
            relevancia > 0 ? 'text-white' : ''
          }`}
        >
          <div>
            <p className={relevancia > 0 ? 'text-white' : 'text-primary'}>
              {fecha.substring(0, 4)}
            </p>
            <h2 className="mb-2 text-2xl font-bold tracking-tight">{title}</h2>
            <p className="mb-3 font-normal">
              {description.slice(0, descriptionMaxLength) + '...'}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
