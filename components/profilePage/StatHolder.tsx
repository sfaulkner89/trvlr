import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { winHeight, winWidth } from '../../assets/variables/height-width'
import { Colors } from '../../types/colors'
import { Member } from '../../types/Member'

type Props = {
  stat: {
    key: string
    stat: string
  }
  profile: Member
  colors: Colors
}

export default function StatHolder ({ stat, profile, colors }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.valueHolder}>
        <Text style={{ ...styles.value, color: colors.lightColor }}>
          {typeof profile[stat.key] === 'object'
            ? profile[stat.key].length
            : profile[stat.key]}
          {stat.key === 'worldCovered' ? '%' : ''}
        </Text>
      </View>
      <View style={styles.statHolder}>
        <Text
          style={{
            ...styles.stat,
            color: colors.lightColor,
            fontSize: (winWidth * 0.08) / Math.sqrt(stat.stat.length)
          }}
        >
          {stat.stat}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: winHeight * 0.045,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  valueHolder: {},
  value: {
    fontSize: winWidth * 0.045,
    textAlign: 'center'
  },
  statHolder: {},
  stat: {
    textAlign: 'center'
  }
})
