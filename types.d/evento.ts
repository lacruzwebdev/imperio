type Evento = {
   id: number
   Fecha: string
   Titulo: string
   Descripcion: string
   Imagen: StrapiImage[]
   Relevancia: 0 | 1
   Categorias: Categoria[]
   Latitud: number,
   Longitud: number
}

type Categoria = {
   id: number
   Nombre: string
}

type Image = {
   id: number
   alternativeText: string
   width: number
   height: number
   formats: ImageFormat
}

type ImageFormat = {
   [name:string]: {
      url: string
      width: number
      height: number
   }
}

type Frase = {
   id: number,
   Frase: string,
   Autor: string,
   Obra: string,
   Fecha: string
}

type SabiasQue = {
   id: string,
   Titulo: string,
   Descripcion: string,
   Autor: Autor
}

type Autor = {
   Nombre: string
   Twitter: string
   Web: string
}

type Lectura = {
   id: number
   Titulo: string
   Descripcion: string
   Autor: string
   Imagen: StrapiImage[]
   Categorias: Categoria[]
}