import { initializeApp } from 'firebase/app'
import { getStorage, ref } from 'firebase/storage'
import { v4 } from 'uuid'
import { FIREBASE_API_KEY } from '@env'

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: 'hale-trilogy-369214.firebaseapp.com',
  projectId: 'hale-trilogy-369214',
  storageBucket: 'hale-trilogy-369214.appspot.com',
  messagingSenderId: '611386856103',
  appId: '1:611386856103:web:d18bb6f162961a73394182',
  measurementId: 'G-DRMMJEFZG7'
}

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)
export const profilePicRef = ref(storage, `profilepics/${v4()}`)
