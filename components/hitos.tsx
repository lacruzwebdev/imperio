'use client'
import { useState } from 'react'
import Card from './ui/card'
import { Categorias } from './ui/categorias'
import Grid from './ui/grid'
import { hasCategory } from '@/lib/helpers'
import Link from 'next/link'

type Props = {
  data: Evento[]
  categorias: string[]
}
export default function HitosGrid({ data, categorias }: Props) {
  const [activeEvents, setActiveEvents] = useState(data)
  const [activeCategory, setActiveCategory] = useState('Todas')

  return (
    <section className="max-w-screen-xl mx-auto p-8">
      <h1 className="acc-h">Imperio Español</h1>
      <div className="flex justify-between flex-col md:flex-row mb-8 md:mb-0">
          <div>
          <Link href="/hitos">
            <h2 className="text-3xl mb-4">Grandes hitos</h2>
          </Link>
        </div>
        <Categorias
          opciones={categorias}
          active={{ activeCategory, setActiveCategory }}
        />
      </div>
      {Array.isArray(data) && data.length > 0 ?
      <Grid>
        {activeEvents.map((evento: Evento, index: number) => {
          if (
            hasCategory(evento, activeCategory) ||
            activeCategory === 'Todas'
            ) {
              return (
                <Card
                type={'hitos'}
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
      </Grid> :
      <p className="text-xl">No hay eventos ¡Vuelve mañana para descubrir más!</p>
  }
    </section>
    )
  }
  