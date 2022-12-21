import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import React, { useState } from 'react'
import { winHeight, winWidth } from '../../assets/variables/height-width'
import loginQuestions from '../../assets/variables/loginQuestions'
import { default as AnIcon } from 'react-native-vector-icons/AntDesign'
import { Colors } from '../../types/colors'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import * as ImagePicker from 'expo-image-picker'
import profileSubmitHandler from '../../handlers/api/profileSubmitHandler'
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../../handlers/gql/users/createUser'
import { CreateProfileInputs } from '../../types/CreateProfileInputs'
import capitalise from '../../assets/tools/capitalise'
import { useAppDispatch } from '../../redux/hooks'

const buttonSize: number = winWidth * 0.05

const today: Date = new Date()

const maxDob: Date = new Date(
  `${today.getFullYear() - 18}-${today.getMonth()}-0${today.getDay()}`
)

type Props = {
  colors: Colors
  setLoggedIn: (fire: boolean) => void
}

export default function SignUpPage ({ colors, setLoggedIn }: Props) {
  const [questionNumber, setQuestionNumber] = useState(0)
  const [createUser] = useMutation(CREATE_USER)
  const [userInfo, setUserInfo] = useState<CreateProfileInputs>({
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    username: '',
    displayName: '',
    dob: maxDob,
    profilePicture: undefined
  })
  const [error, setError] = useState<string | undefined>()
  const dispatch = useAppDispatch()

  const lastQuestion = questionNumber > loginQuestions.length - 2
  const currentQuestion = loginQuestions[questionNumber]

  const imageSelector = async () => {
    let profilePicture = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [1, 1],
      quality: 0
    }).then(data => data.assets[0])
    setUserInfo({ ...userInfo, profilePicture })
  }

  const backHandler = () => {
    setError(undefined)
    setQuestionNumber(qn => qn - 1)
  }

  const submitHandler = () => {
    profileSubmitHandler(
      {
        email: userInfo.email,
        password: userInfo.password,
        username: userInfo.username,
        displayName: userInfo.displayName,
        dob: userInfo.dob
      },
      userInfo.profilePicture,
      createUser,
      setLoggedIn,
      dispatch
    )
  }

  const validateAndMoveOn = () => {
    const currentAnswer = userInfo[currentQuestion.data]
    const validation = currentQuestion.validate.validate(currentAnswer)
    if (validation.error) {
      setError(validation.error.message)
      return
    }
    if (
      currentQuestion.confirm &&
      userInfo[currentQuestion.confirm] !== currentAnswer
    ) {
      setError(`${capitalise(currentQuestion.confirm)} does not match`)
      return
    }
    setError(undefined)
    setQuestionNumber(qn => qn + 1)
  }

  const compSelector = {
    text: (
      <TextInput
        style={{
          ...styles.input,
          backgroundColor: colors.midColor,
          color: colors.lightColor
        }}
        autoFocus
        secureTextEntry={typeof currentQuestion.hidden !== 'undefined'}
        value={userInfo[currentQuestion.data]}
        onChangeText={e =>
          setUserInfo({ ...userInfo, [currentQuestion.data]: e.toLowerCase() })
        }
      />
    ),
    date: (
      <View style={styles.dateHolder}>
        <RNDateTimePicker
          value={userInfo.dob}
          onChange={e =>
            setUserInfo({
              ...userInfo,
              [currentQuestion.data]: new Date(e.nativeEvent.timestamp)
            })
          }
          mode='date'
          style={styles.dateSelector}
        />
      </View>
    ),
    image: (
      <Pressable onPress={imageSelector}>
        {!userInfo.profilePicture ? (
          <View
            style={{
              ...styles.imageHolder,
              backgroundColor: colors.midColor
            }}
          >
            <Text
              style={{ ...styles.placeholderText, color: colors.lightColor }}
            >
              Click to select...
            </Text>
          </View>
        ) : (
          <Image
            source={{ uri: userInfo.profilePicture.uri }}
            style={{
              ...styles.imageHolder,
              borderWidth: winWidth * 0.01,
              borderColor: colors.lightColor
            }}
          />
        )}
      </Pressable>
    )
  }

  return (
    <View style={{ ...styles.container, backgroundColor: colors.darkColor }}>
      <View style={{ ...styles.header }}>
        <View style={{ ...styles.arrowHolder }}>
          <AnIcon name='left' size={buttonSize} color={colors.lightColor} />
        </View>
        <View style={{ ...styles.headerTitleHolder }}>
          <Text style={{ ...styles.titleText, color: colors.lightColor }}>
            Sign Up For Trvlr.
          </Text>
        </View>
        <View style={{ ...styles.rightButtonHolder }} />
      </View>

      <View style={{ ...styles.questionHolder }}>
        <Text style={{ ...styles.promptText, color: colors.lightColor }}>
          {loginQuestions[questionNumber].prompt}
        </Text>
        {compSelector[loginQuestions[questionNumber].dataType]}
        {error && (
          <View
            style={{
              ...styles.errorMessage,
              backgroundColor: colors.lightColor
            }}
          >
            <Text
              style={{
                color: colors.errorColor
              }}
            >
              {error}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.bottomButtonsHolder}>
        {questionNumber > 0 ? (
          <Pressable style={styles.backButton} onPress={backHandler}>
            <AnIcon name='left' size={buttonSize} color={colors.lightColor} />
            <Text style={{ color: colors.lightColor }}>Back</Text>
          </Pressable>
        ) : (
          <View style={styles.backButton} />
        )}
        <View style={styles.submitHolder}>
          <Pressable
            style={{
              ...styles.submitButton,
              backgroundColor: colors.selectedColor
            }}
            onPress={lastQuestion ? submitHandler : validateAndMoveOn}
          >
            <Text
              style={{
                ...styles.submitText,
                color: colors.darkColor
              }}
            >
              {lastQuestion ? 'Submit' : 'Next'}
            </Text>
          </Pressable>
        </View>
        <View style={{ ...styles.backButton }} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  header: {
    flexDirection: 'row',
    height: winHeight * 0.2,
    width: winWidth * 0.9,
    alignItems: 'center'
  },
  headerTitleHolder: { flex: 2, alignItems: 'center' },
  arrowHolder: { flex: 1 },
  rightButtonHolder: { flex: 1 },
  questionHolder: {
    alignItems: 'center',
    justifyContent: 'center',
    height: winHeight * 0.18
  },
  backButton: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center'
  },
  titleText: {
    fontSize: winWidth * 0.05
  },
  input: {
    width: winWidth * 0.8,
    height: winHeight * 0.06,
    margin: winHeight * 0.05,
    marginBottom: winHeight * 0.01,
    paddingLeft: winWidth * 0.02,
    fontSize: winWidth * 0.06,
    borderRadius: winWidth * 0.03
  },
  promptText: {
    fontSize: winWidth * 0.06,
    marginBottom: winHeight * 0.01
  },
  bottomButtonsHolder: {
    height: winHeight * 0.14,
    flexDirection: 'row',
    alignItems: 'center'
  },
  submitButton: {
    padding: winWidth * 0.04,
    borderRadius: winWidth * 0.03,
    height: winHeight * 0.07
  },
  submitHolder: {
    alignItems: 'center',
    flex: 1
  },
  submitText: {
    fontSize: winWidth * 0.05
  },
  dateSelector: {
    justifyContent: 'center'
  },
  dateHolder: {},
  imageHolder: {
    width: winWidth * 0.32,
    height: winWidth * 0.32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: winWidth * 0.16
  },
  placeholderText: {},
  errorMessage: {
    padding: winWidth * 0.01,
    borderRadius: winWidth * 0.01
  }
})
