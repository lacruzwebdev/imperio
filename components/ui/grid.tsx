type Props = {
  rows?: number
  cols?: number
  children: React.ReactNode
}
export default function Grid({ cols, rows, children }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {children}
    </div>
  )
}
