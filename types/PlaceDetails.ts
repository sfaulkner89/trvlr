export type PlaceDetails = {
  placeId: string
  name: string
  address?: string
  note?: string
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
  googlePlaceId?: string
}
