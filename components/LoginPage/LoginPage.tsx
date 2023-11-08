import { useLazyQuery } from '@apollo/client'
import React, { useEffect, useRef } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  Animated
} from 'react-native'
import pulse from '../../animations/pulse'
import startShakeAnimation from '../../animations/shake'
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
  const [incorrectDetails, setIncorrectDetails] = React.useState('')

  useEffect(() => {
    setIncorrectDetails('')
  }, [email, password])

  const shakeAnimation = useRef(new Animated.Value(0)).current
  const pulseAnimation = useRef(new Animated.Value(1)).current

  const dispatch = useAppDispatch()

  const [loginUser] = useLazyQuery(LOGINUSER)
  const loginHandler = () => {
    pulse(pulseAnimation).start()
    if (email && password) {
      loginUser({
        variables: {
          email,
          password
        }
      })
        .then(res => {
          const user = res?.data.loginUser
          if (user.id) {
            dispatch(setUser(user))
            setLoggedIn(true)
            userCache.set('primary', JSON.stringify(user))
          } else {
            pulse(pulseAnimation).stop()
            setIncorrectDetails('Incorrect username or password')
            startShakeAnimation(shakeAnimation).start()
          }
        })
        .catch(err => {
          setIncorrectDetails(
            "We're having trouble logging you in. Please try again later."
          )
          console.error(err)
        })
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
          source={require('../../assets/logo3.png')}
          style={{ width: winWidth * 0.5, height: winWidth * 0.5 }}
        />
        <TextInput
          placeholder='Email'
          autoCapitalize='none'
          value={email}
          onChangeText={setEmail}
          placeholderTextColor={colors.lightColor}
          style={{
            ...styles.emailInput,
            backgroundColor: colors.midColor,
            color: colors.lightColor
          }}
        />
        <TextInput
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize='none'
          value={password}
          onChangeText={setPassword}
          placeholderTextColor={colors.lightColor}
          style={{
            ...styles.emailInput,
            backgroundColor: colors.midColor,
            color: colors.lightColor
          }}
        />
        <View style={{ ...styles.errorHolder }}>
          {incorrectDetails && (
            <Text style={{ color: colors.errorColor }}>{incorrectDetails}</Text>
          )}
        </View>
        <Animated.View
          style={{
            ...styles.animatedButton,
            transform: [
              { translateX: shakeAnimation },
              { scale: pulseAnimation }
            ],
            width: '100%'
          }}
        >
          <Pressable
            onPress={loginHandler}
            style={{
              ...styles.submitButton,
              backgroundColor: incorrectDetails
                ? colors.errorColor
                : colors.selectedColor
            }}
          >
            <Text>Log In</Text>
          </Pressable>
        </Animated.View>
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
  },
  animatedButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  errorHolder: {
    height: 20,
    width: '80%',
    marginTop: 20,
    display: 'flex',
    alignItems: 'center'
  }
})
