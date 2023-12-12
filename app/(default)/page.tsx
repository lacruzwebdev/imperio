import Card from '@/components/ui/card'
import CardTextSkeleton from '@/components/ui/card-text-skeleton'
import Grid from '@/components/ui/grid'
import { fetchAPI, fetchTodayEvents } from '@/lib/api'
import { Suspense } from 'react'

type Props = {}
export default async function Home({}: Props) {
  const data = await fetchTodayEvents()
  const options = {
    month: 'long',
    day: 'numeric'
  } as const
  const date = new Intl.DateTimeFormat('es-ES', options).format(new Date())
  return (
    <section className="max-w-screen-xl mx-auto p-8">
      <h1 className="acc-h">Imperio Español</h1>
      <p className="text-3xl mb-2">Tal día como hoy...</p>
      <p className="text-primary text-xl mb-4">{date}</p>
      <Grid>
        {data.map((evento: Evento, index: number) => (
          <Card
            key={evento.id}
            id={evento.id}
            fecha={evento.Fecha}
            title={evento.Titulo}
            description={evento.Descripcion}
            img={evento.Imagen[0]}
            relevancia={evento.Relevancia}
          />
        ))}
      </Grid>
    </section>
  )
}
