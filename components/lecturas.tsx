'use client'
import { useState } from 'react'
import { Categorias } from './ui/categorias'
import Grid from './ui/grid'
import { hasCategory } from '@/lib/helpers'
import LibroCard from './ui/libro-card'

type Props = {
  data: Lectura[]
  categorias: string[]
}
export default function Lecturas({ data, categorias }: Props) {
  const [activeEvents, setActiveEvents] = useState(data)
  const [activeCategory, setActiveCategory] = useState('Todas')

  return (
    <section className="max-w-screen-xl mx-auto p-8">
      <h1 className="acc-h">Imperio Español</h1>
      <div className="flex justify-between flex-col md:flex-row mb-8 md:mb-0">
        <div>
          <p className="text-3xl mb-4">Lecturas</p>
        </div>
        <Categorias
          opciones={categorias}
          active={{ activeCategory, setActiveCategory }}
        />
      </div>
      <div className="grid grid-cols-auto-fit-200 gap-8">
        {activeEvents.map((evento: Lectura, index: number) => {
          if (
            hasCategory(evento, activeCategory) ||
            activeCategory === 'Todas'
          ) {
            return (
              <LibroCard
                key={evento.id}
                id={evento.id}
                title={evento.Titulo}
                autor={evento.Autor}
                img={evento.Imagen[0]}
              />
            )
          }
        })}
      </div>
    </section>
  )
}
