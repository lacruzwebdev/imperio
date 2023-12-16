export function hasCategory(event: Evento, category: string) {
   return event.Categorias.some((item:any) => item.Nombre === category)
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