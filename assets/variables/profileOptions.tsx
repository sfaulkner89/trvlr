import { Entypo } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { winWidth } from './height-width'
import { Colors } from '../../types/colors'
import { userCache } from '../caches/userCache'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setUser } from '../../redux/slices/userSlice'
import { Member } from '../../types/Member'
import { Dispatch } from '@reduxjs/toolkit'
import { hideOptions } from '../../redux/slices/optionsSlice'
import { setCheckInLocation } from '../../redux/slices/locationSlice'
import { changePageNumber } from '../../redux/slices/contactSlice'
import { setMessagingGroups } from '../../redux/slices/messagingGroupSlice'

const iconSize = winWidth * 0.1

// const dispatch = useAppDispatch()
//const contact = useAppSelector(state => state.contact)

const deleteHandler = async (dispatch: Dispatch) => {
  await userCache.remove('primary')
  dispatch(setUser(null))
  dispatch(setMessagingGroups([]))
}

const logInAsUser = async (dispatch: Dispatch, contact: Member) => {
  dispatch(setUser({ ...contact, admin: true }))
  dispatch(setCheckInLocation(contact.checkInLocation))
  dispatch(hideOptions())
}

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
    onPress: (dispatch: Dispatch) => deleteHandler(dispatch)
  },
  {
    title: 'Log In As User',
    icon: (
      <FontAwesome name='share' size={iconSize} color={colors.lightColor} />
    ),
    onPress: (dispatch: Dispatch, contact: Member) =>
      logInAsUser(dispatch, contact)
  }
]
