import Grid from '@/components/ui/grid'
import SkeletonLecturas from '@/components/ui/skeleton-lectura'

type Props = {}
export default function Loading({}: Props) {
  const numOfCards = 3
  return (
    <section className="max-w-screen-xl mx-auto p-8">
      {/* <Spinner /> */}
      <h2 className="text-3xl mb-4">Lecturas</h2>
      <Grid>
        {Array.from(Array(numOfCards).keys()).map((item) => (
          <SkeletonLecturas key={crypto.randomUUID()} />
        ))}
      </Grid>
    </section>
  )
}
