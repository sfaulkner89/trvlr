import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import MapView, { Geojson } from 'react-native-maps'
import { winHeight, winWidth } from '../../assets/variables/height-width'

import { features } from 'process'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { PUT_USER } from '../../handlers/gql/users/putUser'
import { useMutation } from '@apollo/client'
import { coloredGeojson } from '../../assets/data/geoJsons'
import { clear } from 'console'
import { setUser } from '../../redux/slices/userSlice'

export default function ProfileMap () {
  const dispatch = useAppDispatch()

  const user = useAppSelector(state => state.user)

  const [region, setRegion] = React.useState(user.countries || [])

  const [putUser] = useMutation(PUT_USER)

  let throttleTimeout

  const handleMapPress = (country: string) => {
    clearThrottleTimeout()
    const changedRegions = []
    if (region.includes(country)) {
      setRegion(region.filter((item: string) => item !== country))
      changedRegions.push({ country, visited: false })
    } else {
      setRegion((region: string[]) => [...region, country])
      changedRegions.push({ country, visited: true })
    }
    throttleTimeout = setTimeout(() => {
      putUser({
        variables: {
          id: user.id,
          countries: changedRegions
        }
      })
        .then(res => {
          dispatch(setUser(res.data.putUser))
        })
        .catch(err => {
          console.log(err)
        })
    }, 3000)
  }

  const clearThrottleTimeout = () => {
    if (throttleTimeout) clearTimeout(throttleTimeout)
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 0,
          longitude: -60,
          latitudeDelta: 180,
          longitudeDelta: 180
        }}
      >
        <Geojson
          geojson={coloredGeojson(region)}
          onPress={e =>
            handleMapPress(
              e.feature.properties.NAME
                ? e.feature.properties.NAME
                : e.feature.properties.name_en
            )
          }
        />
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: winHeight,
    width: winWidth
  },
  map: {
    flex: 1
  }
})
