import Eventos from "@/components/eventos"
import { fetchEventsFromDate } from "@/lib/api"
import { getCategories } from "@/lib/helpers"

type Props = {
  params: {
    date: string
  }
}
export default async function Home({ params }: Props) {
  const { date } = params
  const dateData = new Date(date)
  const data = await fetchEventsFromDate(dateData)
  const options = {
    month: "long",
    day: "numeric",
  } as const

  return <Eventos date={dateData} data={data} />
}
