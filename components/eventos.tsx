'use client'
import { useState } from 'react'
import Card from './ui/card'
import { Categorias } from './ui/categorias'
import Grid from './ui/grid'
import { hasCategory } from '@/lib/helpers'

type Props = {
  data: Evento[]
  date: string
  categorias: string[]
}
export default function Eventos({ data, date, categorias }: Props) {
  const [activeEvents, setActiveEvents] = useState(data)
  const [activeCategory, setActiveCategory] = useState('Todas')

  return (
    <section className="max-w-screen-xl mx-auto p-8">
      <h1 className="acc-h">Imperio Español</h1>
      <div className="flex justify-between flex-col md:flex-row mb-8 md:mb-0">
        <div>
          <p className="text-3xl mb-2">Tal día como hoy...</p>
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
                key={evento.id}
                id={evento.id}
                fecha={evento.Fecha}
                title={evento.Titulo}
                description={evento.Descripcion}
                img={evento.Imagen[0]}
                relevancia={evento.Relevancia}
              />
            )
          }
        })}
      </Grid>
    </section>
  )
}
