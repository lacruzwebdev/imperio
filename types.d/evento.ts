type Evento = {
   id: number,
   Fecha: string,
   Titulo: string,
   Descripcion: string,
   Imagen: StrapiImage[],
   Relevancia: 0 | 1
   Categorias: Categoria[]
}

type Categoria = {
   id: number,
   Nombre: string
}