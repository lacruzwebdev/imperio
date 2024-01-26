import { fetchFrase } from "@/lib/api";
import Link from "next/link";
import Frase from "./frase";

type Props = {};
export default async function Frases({}: Props) {
  return (
    <section className="max-w-screen-xl mx-auto p-8 min-h-[70vh]">
      <h1 className="acc-h">Imperio Español</h1>
      <Link href="/frases">
        <h2 className="text-3xl mb-2">Frases</h2>
      </Link>
      <div className="w-full mt-12">
        <Frase />
      </div>
    </section>
  );
}
