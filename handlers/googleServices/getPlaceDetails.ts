import { FIREBASE_API_KEY } from '@env'
import { PlaceDetails } from 'types/PlaceDetails'
import { PlaceSearchResult } from 'types/PlaceSearchResult'

export default async (results: PlaceSearchResult) => {
  const fields = 'geometry%2Cphoto%2Ctype%2Cprice_level%2Crating'
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${results.placeId}&fields=${fields}&key=${FIREBASE_API_KEY}`
  const details = (await fetch(url).then(async res => await res.json())).result
  const detailsShim: PlaceDetails = {
    location: {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng
    },
    establishment: {
      name: results.names.main_text,
      photos: details.photos,
      price: details.price_level,
      rating: details.rating,
      types: details.types
    }
  }
  return detailsShim
}
