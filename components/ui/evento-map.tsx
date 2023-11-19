'use client'
import { Map, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import classes from './map.module.css'

type Props = {
  lat: number
  long: number
  zoom?: number
}
export default function EventoMap({ lat, long, zoom = 7 }: Props) {
  return (
    <div className={`${classes.mainStyle} my-12`}>
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        initialViewState={{
          latitude: lat,
          longitude: long,
          zoom: zoom
        }}
        maxZoom={10}
        minZoom={5}
      >
        <Popup
          offset={25}
          latitude={lat}
          longitude={long}
          closeButton={false}
        ></Popup>
      </Map>
    </div>
  )
}
