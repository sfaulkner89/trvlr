import { useLazyQuery } from '@apollo/client'
import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Image
} from 'react-native'
import { userCache } from '../../assets/caches/userCache'
import { winHeight, winWidth } from '../../assets/variables/height-width'
import { GETUSER } from '../../handlers/gql/users/getUser'
import { LOGINUSER } from '../../handlers/gql/users/loginUser'
import { useAppDispatch } from '../../redux/hooks'
import { setUser } from '../../redux/slices/userSlice'
import { Colors } from '../../types/colors'

type Props = {
  colors: Colors
  setNewUser: (fire: boolean) => void
  setLoggedIn: (fire: boolean) => void
}

export default function LoginPage ({ colors, setNewUser, setLoggedIn }: Props) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const dispatch = useAppDispatch()

  const [loginUser, { data: user }] = useLazyQuery(LOGINUSER)
  const loginHandler = () => {
    if (email && password) {
      loginUser({
        variables: {
          email,
          password
        }
      })
        .then(res => {
          const user = res.data.loginUser
          if (res.data.loginUser?.id) {
            console.log(user)
            dispatch(setUser(user))
            setLoggedIn(true)
            userCache.set('primary', JSON.stringify(user))
          } else {
            console.error('User not found')
          }
        })
        .catch(err => console.error(err))
    }
  }
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: colors.darkColor
      }}
    >
      {/* <Text style={{ ...styles.title, color: colors.lightColor }}>Log In</Text> */}

      <View style={{ ...styles.contentHolder }}>
        <Image
          source={require('../../assets/trvlr.png')}
          style={{ width: winWidth }}
        />
        <TextInput
          placeholder='Email'
          autoCapitalize='none'
          value={email}
          onChangeText={setEmail}
          placeholderTextColor={colors.lightColor}
          style={{ ...styles.emailInput, backgroundColor: colors.midColor }}
        />
        <TextInput
          placeholder='Password'
          autoCapitalize='none'
          value={password}
          onChangeText={setPassword}
          placeholderTextColor={colors.lightColor}
          style={{ ...styles.emailInput, backgroundColor: colors.midColor }}
        />
        <Pressable
          onPress={loginHandler}
          style={{
            ...styles.submitButton,
            backgroundColor: colors.selectedColor
          }}
        >
          <Text>Log In</Text>
        </Pressable>
        <Pressable>
          <Text
            style={{ ...styles.signUp, color: colors.lightColor }}
            onPress={() => setNewUser(true)}
          >
            Sign Up
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center'
  },
  contentHolder: {
    marginTop: winHeight * 0.25,
    flex: 1,
    width: winWidth,
    alignItems: 'center'
  },
  emailInput: {
    width: '80%',
    height: winHeight * 0.05,
    borderRadius: 10,
    marginTop: 20,
    paddingLeft: 10,
    fontSize: 20
  },
  submitButton: {
    width: '50%',
    height: winHeight * 0.05,
    borderRadius: 10,
    marginTop: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  signUp: {
    marginTop: 20,
    fontSize: 20
  }
})
