import { default as FaIcon } from 'react-native-vector-icons/FontAwesome'
import { default as EnIcon } from 'react-native-vector-icons/Entypo'
import { winWidth } from '../assets/variables/height-width'
import { Colors } from '../types/colors'

const buttonSize = winWidth * 0.05

export default (colors: Colors, isCurrentUser: boolean) => {
  return isCurrentUser ? (
    <FaIcon name='user-edit' size={buttonSize} color={colors.lightColor} />
  ) : (
    <EnIcon
      name='dots-three-horizontal'
      size={buttonSize}
      color={colors.lightColor}
    />
  )
}
