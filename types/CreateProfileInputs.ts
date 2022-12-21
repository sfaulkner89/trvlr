import { ImagePickerAsset } from 'expo-image-picker'
import { NewProfile } from './newProfile'

export type CreateProfileInputs = NewProfile & {
  confirmEmail: string
  confirmPassword: string
  profilePicture: ImagePickerAsset | undefined
}
