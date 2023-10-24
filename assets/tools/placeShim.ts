import { PlaceDetails } from 'types/PlaceDetails'

export default (places): PlaceDetails[] => {
  return places.map(place => {
    return {
      placeId: place.googlePlaceId,
      name: place.name,
      comment: place.comment,
      location: {
        ...place.location,
        locale: place.city,
        area: place.country
      },
      establishment: {
        price: place.price,
        rating: place.rating,
        types: place.types
      }
    }
  })
}
