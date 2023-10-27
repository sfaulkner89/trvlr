import { Entypo } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { winWidth } from './height-width'
import { Colors } from '../../types/colors'
import { userCache } from '../caches/userCache'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'

const iconSize = winWidth * 0.1

//const dispatch = useAppDispatch()
//const contact = useAppSelector(state => state.contact)

const deleteHandler = async () => {
  await userCache.remove('primary')
}

const logInAsUser = async () => {}

export default (colors: Colors) => [
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
  },
  {
    title: 'Delete Profile',
    icon: (
      <FontAwesome name='share' size={iconSize} color={colors.lightColor} />
    ),
    onPress: deleteHandler
  },
  {
    title: 'Log In As User',
    icon: (
      <FontAwesome name='share' size={iconSize} color={colors.lightColor} />
    ),
    onPress: () => console.log('poo')
  }
]
