import Hitos from "@/components/hitos";
import { fetchHitos } from "@/lib/api"
import { getCategories } from "@/lib/helpers";

export default async function HitosGrid() {
   const data = await fetchHitos();
   const options = {
    month: 'long',
    day: 'numeric'
  } as const
   const date = new Intl.DateTimeFormat('es-ES', options).format(new Date())

   const categorias = getCategories(data);
   
  return (
    <div>
      <Hitos data={data} categorias={categorias}/>
    </div>
  )
}