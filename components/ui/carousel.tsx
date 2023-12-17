'use client'
import { getStrapiURL } from '@/lib/api-helpers'
import * as React from 'react'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import 'yet-another-react-lightbox/plugins/captions.css'

import Lightbox from 'yet-another-react-lightbox'
import Inline from 'yet-another-react-lightbox/plugins/inline'
import Thumbails from 'yet-another-react-lightbox/plugins/thumbnails'
import Captions from 'yet-another-react-lightbox/plugins/captions'

type Props = {
  slides: Image[]
}

export default function Carousel({ slides }: Props) {
  const [open, setOpen] = React.useState(false)
  const [index, setIndex] = React.useState(0)
  const thumbnailsRef = React.useRef(null)

  const toggleOpen = (state: boolean) => () => setOpen(state)

  const updateIndex = ({ index: current }: { index: number }) =>
    setIndex(current)

  const slidesArr = slides.map((image: Image) => ({
    src: getStrapiURL(image.formats.large.url),
    width: image.formats.large.width,
    height: image.formats.large.height,
    title: image.alternativeText
  }))

  return (
    <>
      <Lightbox
        index={index}
        slides={slidesArr}
        plugins={[Inline, Thumbails, Captions]}
        thumbnails={{
          ref: thumbnailsRef,
          vignette: false,
          border: 0,
          padding: 0,
          imageFit: 'cover',
          width: 200,
          height: 120
        }}
        on={{
          view: updateIndex,
          click: toggleOpen(true)
        }}
        carousel={{
          padding: 0,
          spacing: 0,
          imageFit: 'cover',
          finite: true
        }}
        inline={{
          style: {
            width: '100%',
            maxWidth: '900px',
            minHeight: '500px',
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
          },
          root: {
            '--yarl__thumbnails_container_background_color':
              'rgba(255, 255, 255, 1)'
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
