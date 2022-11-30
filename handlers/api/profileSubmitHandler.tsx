import { hostUrl } from '../../assets/variables/hostUrl'
import { NewProfile } from '../../types/newProfile'
import { profilePicRef } from '../../assets/variables/firebaseConfig'
import { getDownloadURL, uploadBytes } from 'firebase/storage'
import { userCache } from '../../assets/caches/userCache'

export default async (payload: NewProfile, createUser) => {
  const image = await fetch(payload.profilePicture.uri).then(res => res.blob())
  const blob = new Blob([image])
  await uploadBytes(profilePicRef, blob).catch(err => console.error(err))
  const imageUrl = await getDownloadURL(profilePicRef)
  const newProfile = { ...payload, profilePicture: imageUrl }
  const fullyInitialisedUser = await createUser({
    variables: newProfile
  })
  console.log(fullyInitialisedUser)
  await userCache.set('primary', JSON.stringify(newProfile))
}
