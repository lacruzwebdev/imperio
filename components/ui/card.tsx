import { getStrapiURL } from '@/lib/api-helpers'
import CardTextSkeleton from './card-text-skeleton'
import { Suspense } from 'react'

/* eslint-disable @next/next/no-img-element */
type Props = {
  id: number
  img?: StrapiImage
  fecha: string
  title: string
  description: string
}
export default function Card({ id, img, fecha, title, description }: Props) {
  const descriptionMaxLength = 200
  return (
    <div className={`rounded-lg shadow`}>
      {img && (
        <a href={`/${id}`}>
          <img
            className="rounded-t-lg"
            width={img.formats.medium.width}
            height={img.formats.medium.height}
            src={getStrapiURL(img.formats.medium.url)}
            alt={img.alternativeText}
          />
        </a>
      )}
      {!img && (
        <a href={`/${id}`}>
          <img className="rounded-t-lg" src="/imperio.png" alt="Imperio" />
        </a>
      )}
      <div className="p-5 inline-flex flex-col">
        <div>
          <a href={`/${id}`}>
            <p className="text-primary">{fecha.substring(0, 4)}</p>
            <h3 className="mb-2 text-2xl font-bold tracking-tight">{title}</h3>
          </a>
          <p className="mb-3 font-normal">
            {description.slice(0, descriptionMaxLength) + '...'}
          </p>
        </div>
        <div>
          <a
            href={`/${id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center rounded-lg bg-primary text-primary-foreground transition-transform ease-in-out hover:-translate-y-1"
          >
            Leer más
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
