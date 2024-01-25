import RefreshButton from "@/components/ui/refresh";
import { fetchFrase } from "@/lib/api";
import Link from "next/link";

type Props = {}
export default async function Frases({}: Props) {
   const data = await fetchFrase();
   const length = data.Frase.length;
   
   function fontSize() {
     if (length <= 200) return 'text-xl lg:text-6xl'
     if (length <= 300) return 'text-xl lg:text-5xl'
     if (length <= 400) return 'text-xl lg:text-4xl';
     if (length <= 600) return 'text-xl lg:text-3xl';
     else return ('lg:text-2xl')
   }
   
  return (
    <section className="max-w-screen-xl mx-auto p-8 min-h-[70vh]">
      <h1 className="acc-h">Imperio Español</h1>
      <Link href="/frases">
        <h2 className="text-3xl mb-2">Frases</h2>
      </Link>
      <div className="w-full mt-12">
        <span className={`font-bold leading-snug ${fontSize()}`}>«{data.Frase}»</span>
        <div className="my-8 font-bold text-primary">
          <p className="text-lg">{data.Autor}</p>
          <p className="text-sm">{data.Obra}</p>
          <p className="text-sm">{data.Fecha}</p>
        </div>
        <RefreshButton text="Ver más frases" />
      </div>
    </section>
  )
}