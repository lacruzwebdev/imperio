import Grid from '@/components/ui/grid'
import SkeletonCard from '@/components/ui/skeleton-card'
import Spinner from '@/components/ui/spinner'

type Props = {}
export default function Loading({}: Props) {
  const numOfCards = 3
  const options = {
    month: 'long',
    day: 'numeric'
  } as const
  const date = new Intl.DateTimeFormat('es-ES', options).format(new Date())
  return (
    <section className="max-w-screen-xl mx-auto p-8">
      {/* <Spinner /> */}
      <h1 className="text-3xl mb-2">Tal día como hoy...</h1>
      <h2 className="text-primary text-xl mb-4">{date}</h2>
      <Grid>
        {Array.from(Array(numOfCards).keys()).map((item) => (
          <SkeletonCard key={crypto.randomUUID()} />
        ))}
      </Grid>
    </section>
  )
}
