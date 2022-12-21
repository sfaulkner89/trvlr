import { default as EnIcon } from 'react-native-vector-icons/Entypo'
import { default as FaIcon5 } from 'react-native-vector-icons/FontAwesome5'
import { default as FaIcon } from 'react-native-vector-icons/FontAwesome'
import { winWidth } from './height-width'
import { Colors } from '../../types/colors'
import { userCache } from '../caches/userCache'

const iconSize = winWidth * 0.1

const deleteHandler = async () => {
  await userCache.remove('primary')
}

export default (colors: Colors) => [
  {
    title: 'Get Directions',
    icon: (
      <FaIcon5 name='directions' size={iconSize} color={colors.lightColor} />
    ),
    onPress: () => console.log('Directions')
  },
  {
    title: 'Add To List',
    icon: (
      <EnIcon name='add-to-list' size={iconSize} color={colors.lightColor} />
    ),
    onPress: () => console.log('Add to list')
  },
  {
    title: 'Delete Profile',
    icon: <FaIcon name='share' size={iconSize} color={colors.lightColor} />,
    onPress: deleteHandler
  }
]
