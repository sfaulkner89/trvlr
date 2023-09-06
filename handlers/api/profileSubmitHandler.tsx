import { NewProfile } from '../../types/newProfile'
import { profilePicRef } from '../../assets/config/firebaseConfig'
import { getDownloadURL, uploadBytes } from 'firebase/storage'
import { userCache } from '../../assets/caches/userCache'
import { ImagePickerAsset } from 'expo-image-picker'
import { MutationFunction } from '@apollo/client'
import { Dispatch } from '@reduxjs/toolkit'
import { setUser } from '../../redux/slices/userSlice'

export default async (
  payload: NewProfile,
  profilePicture: ImagePickerAsset | undefined,
  createUser: MutationFunction,
  setLoggedIn: (fire: boolean) => void,
  dispatch: Dispatch
) => {
  const image = await fetch(profilePicture.uri)
    .then(res => res.blob())
    .catch(err => console.error(err))
  const blob = image ? new Blob([image]) : new Blob()
  await uploadBytes(profilePicRef, blob).catch(err => console.error(err))
  const imageUrl = await getDownloadURL(profilePicRef)
  const newProfile: NewProfile = {
    ...payload,
    profileLocation: imageUrl
  }
  const fullyInitialisedUser = await createUser({
    variables: { ...newProfile, dob: JSON.stringify(payload.dob) }
  })
  if (fullyInitialisedUser.errors) {
    console.error(fullyInitialisedUser.errors)
  }
  userCache
    .set('primary', JSON.stringify(fullyInitialisedUser.data.createUser))
    .then(() => setLoggedIn(true))
  dispatch(setUser(fullyInitialisedUser.data.createUser))
}
