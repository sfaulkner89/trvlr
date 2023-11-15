import { Entypo } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { winWidth } from './height-width'
import { Colors } from '../../types/colors'
import { Dispatch } from '@reduxjs/toolkit'
import { setNameChange } from '../../redux/slices/optionsSlice'

export const iconSize = winWidth * 0.1

export default (colors: Colors, dispatch: Dispatch) => [
  {
    title: 'Share Contact',
    icon: (
      <FontAwesome name='share' size={iconSize} color={colors.lightColor} />
    ),
    onPress: () => console.log('Share')
  },
  {
    title: 'Change Contact Group',
    icon: <Entypo name='edit' size={iconSize} color={colors.lightColor} />,
    onPress: () => dispatch(setNameChange('contact'))
  },
  {
    title: 'Add To List',
    icon: (
      <Entypo name='add-to-list' size={iconSize} color={colors.lightColor} />
    ),
    onPress: () => console.log('Add to list')
  }
]
