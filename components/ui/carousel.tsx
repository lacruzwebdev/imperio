'use client'
import { getStrapiURL } from '@/lib/api-helpers'
import * as React from 'react'
import 'yet-another-react-lightbox/styles.css'

import Lightbox from 'yet-another-react-lightbox'
import Inline from 'yet-another-react-lightbox/plugins/inline'

type Props = {
  slides: any
}

export default function Carousel({ slides }: Props) {
  const [open, setOpen] = React.useState(false)
  const [index, setIndex] = React.useState(0)

  const toggleOpen = (state: boolean) => () => setOpen(state)

  const updateIndex = ({ index: current }: { index: number }) =>
    setIndex(current)

  const slidesArr = slides.map((image: any) => ({
    src: getStrapiURL(image.formats.large.url),
    width: image.formats.large.width,
    height: image.formats.large.height
  }))

  return (
    <>
      <Lightbox
        index={index}
        slides={slidesArr}
        plugins={[Inline]}
        on={{
          view: updateIndex,
          click: toggleOpen(true)
        }}
        carousel={{
          padding: 0,
          spacing: 0,
          imageFit: 'cover'
        }}
        inline={{
          style: {
            width: '100%',
            maxWidth: '900px',
            aspectRatio: '3 / 2',
            margin: '0 auto'
          }
        }}
        styles={{
          navigationPrev: {
            color: 'red'
          },
          navigationNext: {
            color: 'red'
          }
        }}
      />
      <Lightbox
        open={open}
        close={toggleOpen(false)}
        index={index}
        slides={slidesArr}
        on={{ view: updateIndex }}
        animation={{ fade: 0 }}
        controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
      />
    </>
  )
}
