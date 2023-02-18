import { MaterialCommunityIcons } from '@expo/vector-icons'
import { colors } from '../../App'
import { iconSize } from './listOptions'

export const newListOption = (
  setNewList: (set: boolean) => void,
  setAddToList: (set: boolean) => void
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
