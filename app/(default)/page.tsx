import Eventos from '@/components/eventos'
import { fetchTodayEvents } from '@/lib/api'

type Props = {}
export default async function Home({}: Props) {
  const data = await fetchTodayEvents()
  const options = {
    month: 'long',
    day: 'numeric'
  } as const
  const date = new Intl.DateTimeFormat('es-ES', options).format(new Date())
  let categorias: any[] = ['Todas']
  data.forEach((item: any) => {
    item.Categorias.forEach((cat: any) => {
      categorias.push(cat.Nombre)
    })
  })
  return <Eventos data={data} date={date} categorias={categorias} />
}
