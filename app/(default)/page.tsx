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
  let categorias: string[] = ['Todas']
  let categoriasSet = data.reduce((set: Set<string>, item: Evento) => {
    item.Categorias.forEach(({ Nombre }: Categoria) => set.add(Nombre))
    return set
  }, new Set(categorias))

  categorias = Array.from(categoriasSet)
  return <Eventos data={data} date={date} categorias={categorias} />
}
