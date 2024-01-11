type Evento = {
   id: number
   Fecha: string
   Titulo: string
   Descripcion: string
   Imagen: StrapiImage[]
   Relevancia: 0 | 1
   Categorias: Categoria[]
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

type Lectura = {
   id: number
   Titulo: string
   Descripcion: string
   Autor: string
   Imagen: StrapiImage[]
   Categorias: Categoria[]
}