'use client'
import { Map, Marker, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import classes from './map.module.css'
import Pin from './pin'
import { useState } from 'react'
import { Button, buttonVariants } from './button'
import Link from 'next/link'
import { createSlug } from '@/lib/helpers'

type Props = {
  positions: Evento[]
  zoom?: number
}
export default function EventoMap({ positions, zoom = 7 }: Props) {
  const initialPos = positions.find((evento: Evento) => evento.Latitud !== 0 || evento.Longitud !== 0)
  const [popupInfo, setPopupInfo] = useState<Evento|null>(null);
  if (initialPos) {

    return (
      <div className={`${classes.mainStyle} my-12`}>
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        initialViewState={{
          latitude: initialPos.Latitud,
          longitude: initialPos.Longitud,
          zoom: zoom
        }}
        maxZoom={10}
        minZoom={0}
        >
        {positions.map((evento, i) => (
          <Marker key={i} latitude={evento.Latitud} longitude={evento.Longitud} anchor="bottom"
                    onClick={e => {
            e.originalEvent.stopPropagation();
            setPopupInfo(evento);
          }}>
            <Pin size={30}/>
          </Marker>
          ))
      }
      {popupInfo && positions.length > 1 && 
          <Popup
          anchor="top"
          offset={0}
          latitude={popupInfo.Latitud}
          longitude={popupInfo.Longitud}
          closeButton={false}
          onClose={() => setPopupInfo(null)}
          >
            <div className="bg-white w-[200px] p-2 flex flex-col gap-2">
            <span>
              {popupInfo.Titulo}
            </span>
            <Link href={`${popupInfo.id}-${createSlug(popupInfo.Titulo)}`} className={buttonVariants({size: 'sm'})}>Ver evento</Link>
            </div>
          </Popup>
          }
      </Map>
    </div>
  )
}
}
