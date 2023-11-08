import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Colors } from 'types/colors'
import { iconSize } from './listOptions'

export const newListOption = (
  setNewListScreen: (set: boolean) => void,
  setNewList: (set: boolean) => void,
  colors: Colors
) => ({
  title: 'Create New List',
  icon: (
    <MaterialCommunityIcons
      name='playlist-plus'
      size={iconSize}
      color={colors.lightColor}
    />
  ),
  onPress: () => {
    setNewListScreen(true)
    setNewList(true)
  }
})
