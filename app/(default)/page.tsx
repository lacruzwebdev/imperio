import Eventos from '@/components/eventos'
import { fetchTodayEvents } from '@/lib/api'
import { getCategories } from '@/lib/helpers'

type Props = {}
export default async function Home({}: Props) {
  const data = await fetchTodayEvents()
  const options = {
    month: 'long',
    day: 'numeric'
  } as const
  const date = new Intl.DateTimeFormat('es-ES', options).format(new Date())
  
  const categorias = getCategories(data);

  	return (
      <Eventos data={data} categorias={categorias} />
		)
}
