import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import ProfileListPage from '../profilePage/profileList/ProfileListPage'
import NewListPage from '../newList/NewListPage'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import NoteInputScreen from './NoteInputScreen'
import placeShim from '../../assets/tools/placeShim'
import createList from '../../handlers/api/createList'
import { selectList, setListEdit } from '../../redux/slices/listSlice'
import placeUnshim from '../../assets/tools/placeUnshim'
import { useMutation } from '@apollo/client'
import { ADDPLACETOLIST } from '../../handlers/gql/lists/addPlaceToList'
import { CREATELIST } from '../../handlers/gql/lists/createList'
import { resetListEditor } from '../../redux/slices/listEditorSlice'
import { List } from '../../types/List'
import { setMapToast } from '../../redux/slices/modalSlice'

export default function ListEditor () {
  const selectedPlace = useAppSelector(state => state.results.selectedPlace)
  const newListScreen = useAppSelector(state => state.listEditor.newListScreen)
  const newList = useAppSelector(state => state.listEditor.newList)
  const noteScreen = useAppSelector(state => state.listEditor.noteScreen)
  const user = useAppSelector(state => state.user)
  const listTitle = useAppSelector(state => state.listEditor.listName)
  const selectedList = useAppSelector(state => state.list.selectedList)
  const note = useAppSelector(state => state.listEditor.noteToAdd)
  const placeToAdd = useAppSelector(state => state.listEditor.placeToAdd)

  const [placeAdder] = useMutation(ADDPLACETOLIST)

  const [createNewList] = useMutation(CREATELIST)

  const dispatch = useAppDispatch()

  const submitHandler = async (list?: List) => {
    if (newList) {
      createHandler()
    } else {
      const placeWithNote = { ...selectedPlace, note }
      const placeToSend = placeUnshim([placeWithNote])[0]
      await placeAdder({
        variables: {
          listId: list ? list.id : selectedList.id,
          userId: user.id,
          place: placeToSend
        }
      }).catch(err => console.log(err))
    }
    if (placeToAdd) {
      dispatch(
        setMapToast(
          `${selectedPlace.name} added to ${
            listTitle
              ? listTitle
              : list
              ? list.displayName
              : selectedList
              ? selectedList.displayName
              : 'list'
          }`
        )
      )
      dispatch(selectList(null))
    }
    dispatch(resetListEditor())
    dispatch(setListEdit(false))
    setTimeout(() => {
      dispatch(setMapToast(null))
    }, 3000)
  }

  const createHandler = async () => {
    const placeWithNote = { ...selectedPlace, note }
    const createdList = await createList(
      user,
      listTitle,
      placeToAdd ? placeWithNote : null,
      createNewList
    ).catch(err => console.log(err))
    if (createdList) {
      const cleanedPlaces = placeShim(createdList.places)
      if (!placeToAdd) {
        dispatch(
          selectList({
            displayName: listTitle,
            photo: undefined,
            location: undefined, // get Coordinates of city if being created from a place.
            country: undefined,
            dateCreated: new Date(),
            dateModified: new Date(),
            places: cleanedPlaces
          })
        )
      }
    }
  }

  if (!placeToAdd) {
    return <NewListPage submitHandler={submitHandler} />
  }

  return (
    <View>
      {newListScreen ? (
        <NewListPage submitHandler={submitHandler} />
      ) : noteScreen ? (
        <NoteInputScreen submitHandler={submitHandler} />
      ) : (
        <ProfileListPage newListProvided={true} submitHandler={submitHandler} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({})
