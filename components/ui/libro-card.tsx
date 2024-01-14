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
  title: string
  autor: string
}
export default function LibroCard({
  id,
  img,
  title,
  autor,
}: Props) {
  const descriptionMaxLength = 200
  const url = `lecturas/${id}-${createSlug(title)}`;
  return (
    <Link href={url}>
      <div
        className='rounded-lg shadow h-full bg-white'
      >
        {img && (
          <Image
            className="rounded-t-lg w-full object-contain h-[350px]"
            width={img.formats.medium.width}
            height={img.formats.medium.height}
            src={getStrapiURL(img.formats.medium.url)}
            alt={img.alternativeText}
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
          className='p-5 inline-flex flex-col w-full text-center'
        >
          <h3 className="mb-2 text-2xl font-bold tracking-tight">{title}</h3>
          <p className="mb-3 font-normal">
            {autor}
          </p>
        </div>
      </div>
    </Link>
  )
}
