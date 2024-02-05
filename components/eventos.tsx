'use client'
import { useEffect, useRef, useState } from 'react'
import Card from './ui/card'
import { Categorias } from './ui/categorias'
import Grid from './ui/grid'
import { hasCategory } from '@/lib/helpers'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import EventoMap from './ui/evento-map'
import { useParams } from 'next/navigation'

type Props = {
	data: Evento[]
	date: string
	categorias: string[]
}
export default function Eventos({ data, date, categorias }: Props) {
	const [activeEvents, setActiveEvents] = useState(data)
	const [activeCategory, setActiveCategory] = useState('Todas')
	const [activeTab, setActiveTab] = useState('eventos')

	useEffect(() => {
		if (window.location.hash === '#mapa') {
			setActiveTab('mapa')
		} else {
			setActiveTab('eventos')
		}
	}, [])

	const handleTab = (e: any) => {
		if (e.currentTarget.textContent === 'Mapa') {
			window.location.hash = `#${e.currentTarget.textContent.toLowerCase()}`
		} else {
			window.location.hash = ''
		}
		setActiveTab(`${e.currentTarget.textContent.toLowerCase()}`)
	}

	const posiciones = data.map((item) => ({
		lat: item.Latitud,
		long: item.Longitud
	}))
	const hasMap = posiciones.some((item) => item.lat !== 0 || item.long !== 0)

	return (
		<section>
			<h1 className="acc-h">Imperio Español</h1>
			<Tabs
				defaultValue="eventos"
				value={activeTab}
				className="grid place-items-center"
			>
				<TabsList>
					<TabsTrigger
						onClick={handleTab}
						value="eventos"
						className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
					>
						Eventos
					</TabsTrigger>
					<TabsTrigger
						onClick={handleTab}
						value="mapa"
						className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
					>
						Mapa
					</TabsTrigger>
				</TabsList>
				{Array.isArray(data) && data.length > 0 ? (
					<>
						<TabsContent
							className="max-w-screen-xl mx-auto p-8"
							value="eventos"
						>
							<div className="flex justify-between flex-col md:flex-row mb-8 md:mb-0">
								<div>
									<Link href="/">
										<h2 className="text-3xl mb-2">Tal día como hoy...</h2>
									</Link>
									<p className="text-primary text-xl mb-4">{date}</p>
								</div>
								<Categorias
									opciones={categorias}
									active={{ activeCategory, setActiveCategory }}
								/>
							</div>
							<Grid>
								{activeEvents.map((evento: Evento, index: number) => {
									if (
										hasCategory(evento, activeCategory) ||
										activeCategory === 'Todas'
									) {
										return (
											<Card
												type={'eventos'}
												key={evento.id}
												id={evento.id}
												fecha={evento.Fecha}
												title={evento.Titulo}
												description={evento.Descripcion}
												img={evento.Imagen[0]}
												relevancia={evento.Relevancia}
												priority={index < 2}
											/>
										)
									}
								})}
							</Grid>
						</TabsContent>
						<TabsContent className="w-full mapa-eventos" value="mapa">
							{hasMap ? (
								<EventoMap positions={data} zoom={2} height={100} />
							) : (
								<p className="text-xl mt-8">
									No hay eventos con localización ¡Vuelve mañana para descubrir
									más!
								</p>
							)}
						</TabsContent>
					</>
				) : (
					<p className="text-xl mt-8">
						No hay eventos ¡Vuelve mañana para descubrir más!
					</p>
				)}
			</Tabs>
		</section>
	)
}
