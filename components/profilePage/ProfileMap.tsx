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
  const contact = useAppSelector(state => state.contact.selectedContact)

  const profile = contact ? contact : user

  const [region, setRegion] = React.useState(
    profile.countries?.map(c => c.country) || []
  )

  const [putUser] = useMutation(PUT_USER)

  let throttleTimeout

  const handleMapPress = (country: string) => {
    clearThrottleTimeout()
    const changedRegions: { country: string; visited: boolean }[] = []
    if (region.includes(country)) {
      setRegion(region.filter((item: string) => item !== country))
      changedRegions.push({ country, visited: false })
    } else {
      setRegion((region: string[]) => [...region, country])
      changedRegions.push({ country, visited: true })
    }
    const variables = {
      variables: {
        userId: profile.id,
        countries: changedRegions
      }
    }
    putUser(variables)
      .then(res => {
        dispatch(setUser({ ...user, countries: res.data.putUser.countries }))
      })
      .catch(err => {
        console.log(err)
      })
  }

  const clearThrottleTimeout = () => {
    if (throttleTimeout) clearTimeout(throttleTimeout)
  }

  const memoisedMap = (
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
        geojson={useMemo(() => coloredGeojson(region), [region])}
        onPress={e =>
          handleMapPress(
            e.feature.properties.NAME
              ? e.feature.properties.NAME
              : e.feature.properties.name_en
          )
        }
      />
    </MapView>
  )

  return <View style={styles.container}>{memoisedMap}</View>
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
