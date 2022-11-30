import { ImagePickerAsset, ImagePickerResult } from 'expo-image-picker'

export type NewProfile = {
  email: string
  confirmEmail: string
  password: string
  confirmPassword: string
  username: string
  displayName: string
  dob: Date
  profilePicture: ImagePickerAsset | undefined
}
