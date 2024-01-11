'use client'

import { ComponentPropsWithoutRef, useState } from 'react'

interface Props extends ComponentPropsWithoutRef<'button'> {
  text: string
}

export default function TTS({ text, ...rest }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);

  const speak = async () => {
    if (text.length <= 0) return;
    if (!isPlaying) {
      await new Promise((resolve, reject) => {
        setIsPlaying(true);
        let msg = new SpeechSynthesisUtterance(text)
        window.speechSynthesis.speak(msg)
        msg.onend = resolve;
      });
      setIsPlaying(false);
    } else {
      window.speechSynthesis.cancel();
      setIsPlaying(false)
    }
  }

  return (
    <button onClick={speak} {...rest}>
      {isPlaying ?
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-volume-2"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>  
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg> :
        <svg 
        xmlns="http://www.w3.org/2000/svg"
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="feather feather-volume">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        </svg>
      }
    </button>
  )
}
