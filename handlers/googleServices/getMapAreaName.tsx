import { LatLng } from 'react-native-maps'
import { hostUrl } from '../../assets/variables/hostUrl'

export default async (center: LatLng) => {
  const url = `${hostUrl}/get-map-area-name?latitude=${center.latitude}&longitude=${center.longitude}`
  console.log(url)
  const placeInfo = await fetch(url).then(place => place.json())

  return placeInfo
}
