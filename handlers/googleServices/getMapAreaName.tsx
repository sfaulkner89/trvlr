import { LatLng } from 'react-native-maps'

export default async (center: LatLng) => {
  const url = `${process.env.host || 'http://localhost'}:${process.env.port ||
    8080}/get-map-area-name?latitude=${center.latitude}&longitude=${
    center.longitude
  }`
  const placeInfo = await fetch(url).then(place => place.json())

  return placeInfo
}
