import { LatLng } from 'react-native-maps'
import { Deltas } from 'types/Deltas'
import {
  REACT_APP_PROD_HOST,
  REACT_APP_DEV_HOST,
  REACT_APP_DEV_PORT
} from '@env'
import { PlaceSearchResult } from '../../types/PlaceSearchResult'

export default async (location: LatLng): Promise<PlaceSearchResult | null> => {
  const nodeEnv = process.env.NODE_ENV
  const hostUrl =
    nodeEnv === 'production'
      ? process.env.REACT_APP_PROD_HOST
      : `${REACT_APP_DEV_HOST}:${REACT_APP_DEV_PORT}`
  //const radius = String(location.latitudeDelta + location.longitudeDelta)
  const url = `${hostUrl}/nearby-search?latitude=${location.latitude}&longitude=${location.longitude}`
  console.log('URL', url)
  const placeRes: Response | void = await fetch(url).catch(err =>
    console.error(err)
  )
  if (placeRes) {
    return placeRes.json()
  }
  return null
}
