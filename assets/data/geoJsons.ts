import world110 from '../../assets/world-110m.json'
import usa20 from '../../assets/usa-20m.json'

const usStates: GeojsonType = usa20 as GeojsonType

type GeojsonType = {
  type: string
  features: {
    name: string
    properties: {
      NAME: string
      name_en: string
    }
  }[]
  geometry: {
    type: string
    coordinates: number[][][]
  }
}

const getColor = (country: string, region: string[]) => {
  if (region.includes(country)) {
    return 'darkgreen'
  } else {
    return 'grey'
  }
}

const usStateNames = usStates.features.map(feature => feature.properties.NAME)

const cleanedWorld = {
  ...world110,
  features: world110.features.map(feature => ({
    ...feature,
    properties: {
      ...feature.properties,
      NAME: feature.properties.name_en
    }
  }))
}

export const coloredGeojson = (region: string[]) =>
  ({
    ...cleanedWorld,
    features: [...cleanedWorld.features, ...usStates.features].map(feature => ({
      ...feature,
      properties: {
        ...feature.properties,
        fill: getColor(
          feature.properties.NAME
            ? feature.properties.NAME
            : feature.properties.name_en,
          region
        )
      }
    }))
  } as any)
