import { Entypo, FontAwesome5 } from '@expo/vector-icons'
import { winWidth } from '../assets/variables/height-width'
import { Colors } from '../types/colors'

const buttonSize = winWidth * 0.05

export default (colors: Colors, isCurrentUser: boolean) => {
  return isCurrentUser ? (
    <FontAwesome5
      name='user-edit'
      size={buttonSize}
      color={colors.lightColor}
    />
  ) : (
    <Entypo
      name='dots-three-horizontal'
      size={buttonSize}
      color={colors.lightColor}
    />
  )
}
