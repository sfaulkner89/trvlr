import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Pressable
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../types/colors'
import GroupList from './GroupList'
import ContactHeader from './ContactHeader'
import ProfilePage from '../profilePage/ProfilePage'
import { Member } from '../../types/Member'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { RootState } from '../../redux/store'
import { GroupInfo } from '../../types/GroupInfo'
import { GETUSERS } from '../../handlers/gql/users/getUsers'
import { useMutation, useQuery } from '@apollo/client'
import MemberListItem from './MemberListItem'
import { GETCONTACTS } from '../../handlers/gql/users/getContacts'
import sortContactsIntoGroups, {
  Group
} from '../../assets/tools/sortContactsIntoGroups'
import capitalise from '../../assets/tools/capitalise'
import { setUser } from '../../redux/slices/userSlice'
import { FontAwesome } from '@expo/vector-icons'
import { PUTCONTACT } from '../../handlers/gql/users/putContact'

const winHeight = Dimensions.get('window').height
const winWidth = Dimensions.get('window').width

type Props = {
  colors: Colors
}

export default function ContactScreen ({ colors }: Props) {
  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const { data, refetch } = useQuery<{ getContacts: { contacts: Member[] } }>(
    GETCONTACTS,
    {
      variables: { userId: user.id }
    }
  )
  const [putContact] = useMutation(PUTCONTACT)

  useEffect(() => {
    refetch()
    dispatch(
      setUser({
        ...user,
        contacts: data?.getContacts.contacts || []
      })
    )
  }, [data])

  const visibilityHandler = (ids: string[], visible: boolean) => {
    const newContacts = user.contacts.map(c => {
      if (ids.includes(c.id)) {
        return { ...c, visible: !c.visible }
      } else {
        return c
      }
    })
    dispatch(setUser({ ...user, contacts: newContacts }))
    putContact({
      variables: {
        userId: user.id,
        contactIds: ids,
        visible
      }
    })
  }

  return (
    <View style={{ ...styles.container, backgroundColor: colors.darkColor }}>
      <ContactHeader colors={colors} title='Contacts' />
      <ScrollView>
        {sortContactsIntoGroups(user?.contacts || []).map(
          (group: Group, i: number) => {
            const allVisible = group.users.every(u => u.visible)
            return (
              <View key={i}>
                <View style={styles.groupHeader}>
                  <Text style={{ ...styles.groupNameText }}>
                    {capitalise(group.group)}
                  </Text>
                  <Pressable
                    style={styles.visibilityIcon}
                    onPress={() =>
                      visibilityHandler(
                        [...group.users.map(u => u.id)],
                        !allVisible
                      )
                    }
                  >
                    {
                      <FontAwesome
                        name={allVisible ? 'eye' : 'eye-slash'}
                        size={24}
                        color={colors.lightColor}
                      />
                    }
                  </Pressable>
                </View>
                {group.users.map((user: Member, i: number) => (
                  <MemberListItem
                    member={user}
                    optionsNeeded={true}
                    key={i}
                    visibilityHandler={() =>
                      visibilityHandler([user.id], !user.visible)
                    }
                  />
                ))}
              </View>
            )
          }
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: winWidth
  },
  groupNameText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10
  },
  groupHeader: {
    width: winWidth,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  visibilityIcon: {
    marginRight: 10
  }
})
