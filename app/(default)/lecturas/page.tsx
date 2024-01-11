import Lecturas from "@/components/lecturas";
import { fetchLecturas } from "@/lib/api"
import { getCategories } from "@/lib/helpers";

export default async function Hitos() {
   const data = await fetchLecturas();

   const categorias = getCategories(data);
   console.log(categorias)
   
  return (
    <div>
      <Lecturas data={data} categorias={categorias}/>
    </div>
  )
}