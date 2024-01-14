import RefreshButton from "@/components/ui/refresh";
import { fetchFrase } from "@/lib/api";

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
    <section className="max-w-screen-xl mx-auto p-8 min-h-[70vh] flex items-center">
      <div className="text-center w-full">
        <svg className="w-8 h-8 mb-4 mx-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
        </svg>
        <span className={`font-bold leading-snug ${fontSize()}`}>{data.Frase}</span>
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