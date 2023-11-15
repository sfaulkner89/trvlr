import { Dispatch } from '@reduxjs/toolkit'
import { setMapToast } from '../../redux/slices/modalSlice'

export const mapToast = (
  dispatch: Dispatch,
  message: string,
  duration: number
) => {
  dispatch(setMapToast(message))
  setTimeout(() => {
    dispatch(setMapToast(null))
  }, duration)
}
