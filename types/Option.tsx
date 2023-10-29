import { Dispatch } from '@reduxjs/toolkit'
import { Member } from './Member'

export type Option = {
  title: string
  icon: JSX.Element
  onPress: (dispatch?: Dispatch, contact?: Member) => void
}
