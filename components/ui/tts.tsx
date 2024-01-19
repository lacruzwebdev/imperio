'use client'

import { ComponentPropsWithoutRef, useState } from 'react'

interface Props extends ComponentPropsWithoutRef<'button'> {
  text: string
}

export default function TTS({ text, ...rest }: Props) {
  const [isClicked, setIsClicked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const speak = async () => {
    setIsClicked(true);
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
    <button aria-label="Texto a Audio" onClick={speak} {...rest}>
      {isPlaying || !isClicked ?
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
        className="feather feather-volume-x">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <line x1="23" y1="9" x2="17" y2="15"></line>
          <line x1="17" y1="9" x2="23" y2="15"></line>
        </svg>
      }
    </button>
  )
}
