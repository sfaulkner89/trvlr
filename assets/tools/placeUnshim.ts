import { PlaceDetails } from 'types/PlaceDetails'

export default (places: PlaceDetails[]) => {
  return places.map(place => {
    return {
      googlePlaceId: place.placeId,
      name: place.name,
      location: {
        latitude: place.location.latitude,
        longitude: place.location.longitude
      },
      city: place.location.locale,
      country: place.location.area || null,
      rating: place.establishment.rating || null,
      types: place.establishment.types || null,
      note: place.note
    }
  })
}
