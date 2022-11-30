import { Cache } from 'react-native-cache'
import AsyncStorage from 'react-native-async-storage'

export const userCache = new Cache({
  namespace: 'userProfile',
  policy: {
    maxEntries: 5,
    stdTTL: 0
  },
  backend: AsyncStorage
})
