import { LatLng } from 'react-native-maps'
import { Deltas } from 'types/Deltas'
import {
  REACT_APP_PROD_HOST,
  REACT_APP_DEV_HOST,
  REACT_APP_DEV_PORT
} from '@env'

export default async (query: string, location: LatLng & Deltas) => {
  const nodeEnv = process.env.NODE_ENV
  const hostUrl =
    nodeEnv === 'production'
      ? process.env.REACT_APP_PROD_HOST
      : `${REACT_APP_DEV_HOST}:${REACT_APP_DEV_PORT}`

  if (query.length > 2) {
    const radius = String(location.latitudeDelta + location.longitudeDelta)
    const url = `${hostUrl}/place-search?search=${query}&latitude=${location.latitude}&longitude=${location.longitude}&radius=${radius}`
    console.log(url)
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
