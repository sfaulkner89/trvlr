import { Entypo } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { winWidth } from './height-width'
import { Colors } from '../../types/colors'

export const iconSize = winWidth * 0.1

export default (colors: Colors) => [
  {
    title: 'Share List',
    icon: (
      <FontAwesome name='share' size={iconSize} color={colors.lightColor} />
    ),
    onPress: () => console.log('Share')
  },
  {
    title: 'Get Directions',
    icon: (
      <MaterialCommunityIcons
        name='directions'
        size={iconSize}
        color={colors.lightColor}
      />
    ),
    onPress: () => console.log('Directions')
  },
  {
    title: 'Add To List',
    icon: (
      <Entypo name='add-to-list' size={iconSize} color={colors.lightColor} />
    ),
    onPress: () => console.log('Add to list')
  }
]
