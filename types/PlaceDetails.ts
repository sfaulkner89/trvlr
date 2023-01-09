export type PlaceDetails = {
  placeId: string
  location: {
    latitude: number
    longitude: number
    locale: string
    area?: string
  }
  establishment: {
    name: string
    photos: google.maps.places.Photo[]
    price: number
    rating: number
    types: string[]
  }
}
