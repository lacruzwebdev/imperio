'use client'
import { Map, Marker, Popup, useControl } from 'react-map-gl'
import {
	MapboxStyleDefinition,
	MapboxStyleSwitcherControl
} from 'mapbox-gl-style-switcher'
import 'mapbox-gl/dist/mapbox-gl.css'
import 'mapbox-gl-style-switcher/styles.css'

import Pin from './pin'
import { useState } from 'react'
import { buttonVariants } from './button'
import Link from 'next/link'
import { createSlug } from '@/lib/helpers'
import { getStrapiURL } from '@/lib/api-helpers'
import MapboxLanguage from '@mapbox/mapbox-gl-language'

const styles: MapboxStyleDefinition[] = [
	{
		title: 'Imperio',
		uri: 'mapbox://styles/mapbox/dark-v11'
	},
	{
		title: 'Estándar',
		uri: 'mapbox://styles/mapbox/outdoors-v12'
	},
	{
		title: 'Satélite',
		uri: 'mapbox://styles/mapbox/satellite-v9'
	}
]

function DrawControl() {
	useControl(() => new MapboxStyleSwitcherControl(styles))
	useControl(
		() =>
			new MapboxLanguage({
				defaultLanguage: 'es'
			})
	)
	return null
}

type Props = {
	positions: Evento[]
	zoom?: number
	height?: number
}
export default function EventoMap({ positions, zoom = 7, height }: Props) {
	const initialPos = positions.find(
		(evento: Evento) => evento.Latitud !== 0 || evento.Longitud !== 0
	)
	const [popupInfo, setPopupInfo] = useState<Evento | null>(null)
	if (initialPos) {
		return (
			<div>
				<Map
					mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
					mapStyle="mapbox://styles/mapbox/dark-v11"
					initialViewState={{
						latitude: initialPos.Latitud,
						longitude: initialPos.Longitud,
						zoom: zoom
					}}
					style={{
						height:
							height && window.screen.height > 991 ? `${height}svh` : '75svh'
					}}
					maxZoom={10}
					minZoom={0}
				>
					<DrawControl />
					{positions.map((evento, i) => (
						<Marker
							key={i}
							latitude={evento.Latitud}
							longitude={evento.Longitud}
							anchor="bottom"
							onClick={(e) => {
								e.originalEvent.stopPropagation()
								setPopupInfo(evento)
							}}
						>
							<Pin size={30} />
						</Marker>
					))}
					{popupInfo && positions.length > 1 && (
						<Popup
							anchor="top"
							offset={0}
							latitude={popupInfo.Latitud}
							longitude={popupInfo.Longitud}
							closeButton={false}
							onClose={() => setPopupInfo(null)}
						>
							<div className="bg-white w-[200px] p-2 flex flex-col gap-2">
								{popupInfo.Imagen[0] && (
									<img
										src={getStrapiURL(popupInfo.Imagen[0].formats.medium.url)}
									/>
								)}
								<span>{popupInfo.Titulo}</span>
								<Link
									href={`${popupInfo.id}-${createSlug(popupInfo.Titulo)}`}
									className={buttonVariants({ size: 'sm' })}
								>
									Ver evento
								</Link>
							</div>
						</Popup>
					)}
				</Map>
			</div>
		)
	}
}
