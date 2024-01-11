export function hasCategory(event: Evento | Lectura, category: string) {
   return event.Categorias.some((item:Categoria) => item.Nombre === category)
}

export function createSlug(title: string): string {
   const tildes: {[key:string]: string} = {
    'á': 'a',
    'é': 'e',
    'í': 'i',
    'ó': 'o',
    'ú': 'u',
    'ü': 'u',
    'ñ': 'n'
  };

  return title
    .toLowerCase() 
    .trim() 
    .replace(/[áéíóúüñ]/g, (match) => {
      return tildes[match];
    })
    .replace(/\s+/g, '-') 
    .replace(/[^\w\-]+/g, '') 
    .replace(/\-\-+/g, '-'); 
}

export function getCategories(data: []) {
  let categorias: string[] = ['Todas']
  let categoriasSet = data.reduce((set: Set<string>, item: Evento) => {
    item.Categorias.forEach(({ Nombre }: Categoria) => set.add(Nombre))
    return set
  }, new Set(categorias))

  return Array.from(categoriasSet)
}