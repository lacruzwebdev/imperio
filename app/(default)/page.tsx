import Eventos from "@/components/eventos"
import { fetchTodayEvents } from "@/lib/api"
import { getCategories } from "@/lib/helpers"

type Props = {}
export default async function Home({}: Props) {
  const data = await fetchTodayEvents()
  const options = {
    month: "long",
    day: "numeric",
  } as const

  return <Eventos data={data} />
}
