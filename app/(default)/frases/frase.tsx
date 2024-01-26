"use client"
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { fetchFrase } from "@/lib/api";
import { useEffect, useState } from "react";


export default function Frase() {
   const [frase, setFrase] = useState<Frase|null>()
   const [newFrase, setNewFrase] = useState(false)
   useEffect(() => {
      const fetchData = async () => {
         const dataFrase = await fetchFrase();
         setFrase(dataFrase)
      } 

      fetchData()
   }, [])

   async function handleRefresh() {
    setFrase(null)
    setFrase(await fetchFrase())
   }


   const length = frase?.Frase.length;

   function fontSize() {
    if (!length) return 'lg:text-2xl'
     if (length <= 200) return 'text-xl lg:text-6xl'
     if (length <= 300) return 'text-xl lg:text-5xl'
     if (length <= 400) return 'text-xl lg:text-4xl';
     if (length <= 600) return 'text-xl lg:text-3xl';
     else return ('lg:text-2xl')
   }
  
   if (frase) { return (

     <>
          <span className={`font-bold leading-snug ${fontSize()}`}>«{frase.Frase}»</span>
        <div className="my-8 font-bold text-primary">
          <p className="text-lg">{frase.Autor}</p>
          <p className="text-sm">{frase.Obra}</p>
          <p className="text-sm">{frase.Fecha}</p>
      </div>
      <Button onClick={handleRefresh}>Ver más frases</Button>
      </> 
     )
   } else { return <Spinner />

   }
}