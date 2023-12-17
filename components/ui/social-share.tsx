'use client'
import { useUrl } from '@/lib/hooks'
import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon
} from 'react-share'

type Props = {
  title: string
}
export default function SocialShare({ title }: Props) {
  const url = useUrl()
  if (!url) return
  const currentUrl = url.href

  return (
    <>
      <span>
        ¡Difunde nuestra <b className="text-primary">HISTORIA</b>!
      </span>
      <div className="mt-4 mb-12 flex gap-2">
        <FacebookShareButton title={title} url={currentUrl}>
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
        <TwitterShareButton title={title} url={currentUrl}>
          <XIcon size={32} round={true} />
        </TwitterShareButton>
        <TelegramShareButton title={title} url={currentUrl}>
          <TelegramIcon size={32} round={true} />
        </TelegramShareButton>
        <WhatsappShareButton title={title} url={currentUrl}>
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>
      </div>
    </>
  )
}
