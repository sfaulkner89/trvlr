import { Place } from '../types/Place'

export default (places: Place[]) => {
  const orderedlatitudes = places
    .map(place => place.location.latitude)
    .sort((a, b) => b - a)
  const latitudeDelta =
    orderedlatitudes[0] - orderedlatitudes[orderedlatitudes.length - 1]
  const orderedlongitudes = places
    .map(place => place.location.longitude)
    .sort((a, b) => b - a)
  const longitudeDelta =
    orderedlongitudes[0] - orderedlongitudes[orderedlongitudes.length - 1]
  return {
    latitude: latitudeDelta,
    longitude: longitudeDelta
  }
}
