export interface BookData {
  name: string
  price: number
  category: string
  description: string
}

export interface Book extends BookData {
  id: string
}
