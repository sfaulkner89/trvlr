export type PlaceDetails = {
  location: {
    latitude: number
    longitude: number
  }
  establishment: {
    name: string
    photos: google.maps.places.Photo[]
    price: number
    rating: number
    types: string[]
  }
}
