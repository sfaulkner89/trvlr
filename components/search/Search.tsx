import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../types/colors'
import { FontAwesome } from '@expo/vector-icons'
import SearchSelector from './Selector'
import { searchCriteria } from '../../assets/variables/searchCriteria'
import { useLazyQuery, useQuery } from '@apollo/client'
import { USERSEARCH } from '../../handlers/gql/search/userSearch'
import MemberListItem from '../../components/contactScreen/MemberListItem'
import { Member } from 'types/Member'
import ProfilePage from '../../components/profilePage/ProfilePage'
import { useAppSelector } from '../../redux/hooks'
import { RootState } from '../../redux/store'
import { useDispatch } from 'react-redux'

const winHeight = Dimensions.get('window').height
const winWidth = Dimensions.get('window').width

const size = winWidth * 0.06

type Props = {
  colors: Colors
  currentUser: Member
  setPage: (set: number) => void
}

export default function Search ({ colors, currentUser, setPage }: Props) {
  const [searchType, setSearchType] = useState(0)
  const [query, setQuery] = useState('')
  const [profilePage, setProfilePage] = useState(false)
  const [contact, setContact] = useState<Member | undefined>()
  const [userSearch, { loading, data: users, error }] = useLazyQuery(USERSEARCH)

  useEffect(() => {
    console.log(users, loading)
  }, [users, loading])

  const searchHandler = async (query: string) => {
    setQuery(query)
    if (query.length >= 3) {
      await userSearch({
        variables: {
          query
        }
      })
    }
  }

  const profile = useAppSelector((store: RootState) => store.profile)
  const dispatch = useDispatch()

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ ...styles.container, backgroundColor: colors.darkColor }}>
        <View style={styles.inputContainer}>
          <View
            style={{ ...styles.inputBase, backgroundColor: colors.lightColor }}
          >
            <FontAwesome
              name='search'
              size={size}
              color={colors.darkColor}
              style={styles.searchIcon}
            />
            <TextInput
              style={{ ...styles.input }}
              selectionColor={colors.darkColor}
              onChangeText={q => searchHandler(q)}
              value={query}
            />
          </View>
          <SearchSelector
            colors={colors}
            buttonList={searchCriteria}
            selection={searchType}
            setSelection={setSearchType}
          />
        </View>
        {(users?.userSearch || [])
          .filter((user: Member) => user.id !== currentUser.id)
          .map((user: Member, i: number) => {
            return <MemberListItem key={i} member={user} colors={colors} />
          })}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: winWidth
  },
  input: {
    width: winWidth * 0.8,
    height: winHeight * 0.04,
    marginLeft: winWidth * 0.03,
    fontSize: winHeight * 0.02
  },
  inputContainer: {
    height: 0.17 * winHeight,
    paddingTop: winHeight * 0.06,
    width: winWidth,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputBase: {
    borderRadius: size,
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchIcon: {
    marginLeft: winWidth * 0.02
  }
})
