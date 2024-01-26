import { fetchSabias } from "@/lib/api";
import Link from "next/link";
import SabiasQue from "./sabiasque";

type Props = {}
export default async function Frases({}: Props) {
   const data = await fetchSabias();
   const length = data.Descripcion.length;
   
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
      <Link href="/sabias-que">
        <h2 className="text-3xl mb-2">Sabías que...</h2>
      </Link>
      <div className="mt-12 text-center w-full flex flex-col">
        <SabiasQue />
      </div>
    </section>
  )
}

