import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from '../../../types/colors'
import { Member } from '../../../types/Member'
import ListMini from './ListMini'
import { List } from '../../../types/List'
import { useQuery } from '@apollo/client'
import { GETUSERLISTS } from '../../../handlers/gql/lists/getUserLists'
import { winHeight, winWidth } from '../../../assets/variables/height-width'
import OptionHolder from '../../../components/listPage/OptionHolder'
import { newListOption } from '../../../assets/variables/newListOption'
import { Entypo } from '@expo/vector-icons'

type Props = {
  colors: Colors
  member: Member
  setSelectedList: (list: List) => void
  selectedList: List
  isCurrentUser: boolean
  newListProvided: boolean
  setNewList: (set: boolean) => void
  setAddToList: (set: boolean) => void
  addToList: boolean
}

export default function ProfileListPage ({
  colors,
  member,
  setSelectedList,
  selectedList,
  newListProvided,
  setNewList,
  setAddToList,
  addToList
}: Props) {
  const { data, refetch } = useQuery(GETUSERLISTS, {
    variables: { id: member.id }
  })
  useEffect(() => {
    refetch()
  }, [])
  return (
    <View style={{ ...styles.container, backgroundColor: colors.midColor }}>
      {newListProvided && (
        <React.Fragment>
          <Pressable
            onPress={() => setAddToList(false)}
            style={styles.closeButton}
          >
            <Entypo
              name='cross'
              size={winWidth * 0.08}
              color={colors.lightColor}
            />
          </Pressable>
          <View style={styles.newList}>
            <OptionHolder
              colors={colors}
              option={newListOption(setNewList, setAddToList, colors)}
            />
          </View>
        </React.Fragment>
      )}
      <ScrollView>
        {data &&
          data.getUser.lists.map((list: List, i: number) => {
            return (
              <ListMini
                colors={colors}
                list={list}
                key={i}
                setSelectedList={setSelectedList}
                selectedList={selectedList}
                addToList={addToList}
                setAddToList={setAddToList}
              />
            )
          })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  newList: {
    marginTop: winHeight * 0.1,
    height: winHeight * 0.1,
    width: winWidth,
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row'
  },
  closeButton: {
    position: 'absolute',
    top: winHeight * 0.05,
    right: winWidth * 0.05
  },
  closeButtonText: {
    fontSize: winWidth * 0.05
  }
})
