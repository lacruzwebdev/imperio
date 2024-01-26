'use client'
import { useState } from 'react'
import Card from './ui/card'
import { Categorias } from './ui/categorias'
import Grid from './ui/grid'
import { hasCategory } from '@/lib/helpers'
import Link from 'next/link'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import EventoMap from './ui/evento-map'

type Props = {
  data: Evento[]
  date: string
  categorias: string[]
}
export default function Eventos({ data, date, categorias }: Props) {
  const [activeEvents, setActiveEvents] = useState(data)
  const [activeCategory, setActiveCategory] = useState('Todas')

  const posiciones = data.map(item => ({lat: item.Latitud, long: item.Longitud}))
  const hasMap = posiciones.some(item => item.lat !== 0 || item.long !== 0)
  
  return (
    <section className="max-w-screen-xl mx-auto p-8">
      <h1 className="acc-h">Imperio Español</h1>
      <Tabs defaultValue="eventos" className="grid place-items-center">
        <TabsList>
          <TabsTrigger value="eventos" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">Eventos</TabsTrigger>
          <TabsTrigger value="mapa" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">Mapa</TabsTrigger>
        </TabsList>
        {Array.isArray(data) && data.length > 0 ?
        <>
      <TabsContent className="w-full" value="eventos">
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
      <TabsContent className="w-full" value="mapa">
        {hasMap ?
          <EventoMap positions={data} zoom={2} />
          :  <p className="text-xl mt-8">No hay eventos con localización ¡Vuelve mañana para descubrir más!</p>
        }
      </TabsContent>
      </>
      : <p className="text-xl mt-8">No hay eventos ¡Vuelve mañana para descubrir más!</p>
  }
      </Tabs>
    </section>
    )
  }
  