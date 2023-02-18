import { FIREBASE_API_KEY } from '@env'
import { PlaceDetails } from 'types/PlaceDetails'
import { PlaceSearchResult } from 'types/PlaceSearchResult'

export default async (results: PlaceSearchResult) => {
  const fields =
    'geometry%2Cphoto%2Ctype%2Cprice_level%2Crating%2Cformatted_address%2Ctype'
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${results.placeId}&fields=${fields}&key=${FIREBASE_API_KEY}`
  const details = (await fetch(url).then(async res => await res.json())).result
  const localeSplit = results.names.secondary_text.split(',')
  const detailsShim: PlaceDetails = {
    placeId: '',
    name: results.names.main_text,
    location: {
      latitude: details.geometry?.location.lat,
      longitude: details.geometry?.location.lng,
      locale: localeSplit[0],
      area: localeSplit.length > 1 ? localeSplit[1].slice(1) : undefined
    },
    establishment: {
      price: details.price_level,
      rating: details.rating,
      types: details.types
    }
  }
  return detailsShim
}
