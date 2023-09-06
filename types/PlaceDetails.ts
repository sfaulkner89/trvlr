export type PlaceDetails = {
  placeId: string
  name: string
  location: {
    latitude: number
    longitude: number
    locale: string
    area?: string
  }
  establishment: {
    price: number
    rating: number
    types: string[]
  }
}
