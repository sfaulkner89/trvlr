import { Place } from '../types/Place'

export default (places: Place[]) => {
  const avglatitude =
    places.map(place => place.location.latitude).reduce((a, b) => a + b, 0) /
    places.length
  const avglongitude =
    places.map(place => place.location.longitude).reduce((a, b) => a + b, 0) /
    places.length
  return {
    latitude: avglatitude,
    longitude: avglongitude
  }
}
