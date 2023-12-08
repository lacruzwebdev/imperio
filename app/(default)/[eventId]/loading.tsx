import Spinner from '@/components/ui/spinner'

type Props = {}
export default function EventLoading({}: Props) {
  return (
    <section className="max-w-screen-xl mx-auto p-8 min-h-screen">
      <Spinner />
    </section>
  )
}
