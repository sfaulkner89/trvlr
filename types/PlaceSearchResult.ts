import { LatLng } from 'react-native-maps'

export type PlaceSearchResult = {
  description?: string
  placeId: string
  names: {
    main_text: string
    secondary_text: string
  }
  name: string
  location?: LatLng
}
