import { LatLng } from 'react-native-maps'
import {
  REACT_APP_PROD_HOST,
  REACT_APP_DEV_HOST,
  REACT_APP_DEV_PORT
} from '@env'

export default async (center: LatLng) => {
  const hostUrl =
    process.env.API_URL || `${REACT_APP_DEV_HOST}:${REACT_APP_DEV_PORT}`
  const url = `${hostUrl}/get-map-area-name?latitude=${center.latitude}&longitude=${center.longitude}`
  console.log(url)
  const placeInfo = await fetch(url).then(place => place.json())

  return placeInfo
}
