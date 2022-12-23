import { LatLng } from 'react-native-maps'
import { Deltas } from 'types/Deltas'
import hostUrl from '../../assets/variables/hostUrl'

export default async (query: string, location: LatLng & Deltas) => {
  if (query.length > 2) {
    const radius = String(location.latitudeDelta + location.longitudeDelta)
    const url = `http://${hostUrl}/place-search?search=${query}&latitude=${location.latitude}&longitude=${location.longitude}&radius=${radius}`
    const placeRes = await fetch(url)
      .then(res => res.json())
      .catch(err => console.error(err))
    if (placeRes) {
      return await placeRes
    }
    return null
  }
  return null
}
