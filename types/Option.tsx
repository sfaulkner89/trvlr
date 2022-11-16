import { ReactComponentElement } from 'react'
import { Icon, IconProps } from 'react-native-vector-icons/Icon'

export type Option = {
  title: string
  icon: JSX.Element
  onPress: () => void
}
