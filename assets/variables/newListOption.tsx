import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Colors } from 'types/colors'
import { iconSize } from './listOptions'

export const newListOption = (
  setNewList: (set: boolean) => void,
  setAddToList: (set: boolean) => void,
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
    setNewList(true)
    setAddToList(false)
  }
})
