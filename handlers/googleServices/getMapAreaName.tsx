import { LatLng } from 'react-native-maps'
import hostUrl from '../../assets/variables/hostUrl'

export default async (center: LatLng) => {
  const url = `http://${hostUrl}/get-map-area-name?latitude=${center.latitude}&longitude=${center.longitude}`
  const placeInfo = await fetch(url).then(place => place.json())

  return placeInfo
}
