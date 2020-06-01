
let timing:number



export const debounce = (funk: (filterField: string) => void, delay: number) => {
  clearTimeout(timing);


  timing = setTimeout(funk, delay)
}

