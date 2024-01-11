import Eventos from "@/components/eventos";
import { fetchHitos } from "@/lib/api"
import { getCategories } from "@/lib/helpers";

export default async function Hitos() {
   const data = await fetchHitos();
   const options = {
    month: 'long',
    day: 'numeric'
  } as const
   const date = new Intl.DateTimeFormat('es-ES', options).format(new Date())

   const categorias = getCategories(data);
   
  return (
    <div>
      <Eventos type={'hitos'} data={data} date={date} categorias={categorias}/>
    </div>
  )
}