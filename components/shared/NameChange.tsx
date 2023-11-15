import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
  StyleSheet,
  TextInput
} from 'react-native'
import React, { useState } from 'react'
import { winHeight, winWidth } from '../../assets/variables/height-width'
import { useAppSelector } from '../../redux/hooks'
import { Entypo } from '@expo/vector-icons'

type Props = {
  exitHandler: () => void
  submitHandler: (name: string) => void
  nameChangeMessage: string
  defaultValue?: string
}

export default function NameChange ({
  exitHandler,
  submitHandler,
  nameChangeMessage,
  defaultValue = ''
}: Props) {
  const colors = useAppSelector(state => state.colors)

  const [name, setName] = useState(defaultValue)

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ ...styles.container, backgroundColor: colors.midColor }}>
        <Pressable style={styles.exitHolder} onPress={() => exitHandler()}>
          <Entypo
            name='cross'
            size={winWidth * 0.08}
            color={colors.lightColor}
          />
        </Pressable>
        <View style={{ ...styles.infoContainer }}>
          <Text style={{ ...styles.title, color: colors.lightColor }}>
            {nameChangeMessage}
          </Text>
          <View style={styles.inputHolder}>
            <View style={{ width: winWidth * 0.08 }} />
            <TextInput
              value={name}
              onChangeText={e => setName(e)}
              style={{ ...styles.input, backgroundColor: colors.lightColor }}
              autoFocus
            />

            {name.length !== 0 && (
              <Pressable style={styles.crossHolder} onPress={() => setName('')}>
                <Entypo
                  name='cross'
                  size={winWidth * 0.08}
                  color={colors.lightColor}
                />
              </Pressable>
            )}
          </View>

          <Pressable
            style={{ ...styles.button, backgroundColor: colors.selectedColor }}
            onPress={() => submitHandler(name)}
          >
            <Text style={{ ...styles.buttonText, color: colors.lightColor }}>
              Change
            </Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    width: winWidth,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    zIndex: 1
  },
  inputHolder: {
    flexDirection: 'row'
  },
  input: {
    width: winWidth * 0.8,
    height: winHeight * 0.05,
    fontSize: winWidth * 0.06,
    paddingLeft: winWidth * 0.02,
    borderRadius: winWidth * 0.02,
    marginBottom: winHeight * 0.02
  },
  title: {
    fontSize: winWidth * 0.06,
    width: winWidth * 0.8,
    marginBottom: winHeight * 0.02
  },
  infoContainer: {
    marginTop: winHeight * 0.27,
    height: winHeight * 0.2,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  button: {
    padding: winWidth * 0.04,
    borderRadius: winWidth * 0.05
  },
  buttonText: {
    fontSize: winWidth * 0.05
  },
  crossHolder: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  exitHolder: {
    marginTop: winHeight * 0.055,
    marginLeft: winWidth * 0.03
  }
})
