type StrapiImage = {
   id: number,
   alternativeText: string,
   caption?: string,
   formats: {
      thumbnail: {
         width: number,
         height: number,
         url: string
      },
      large: {
         width: number,
         height: number,
         url: string
      },
      medium: {
         width: number,
         height: number,
         url: string
      }
      small: {
         width: number,
         height: number,
         url: string
      }
   }
}