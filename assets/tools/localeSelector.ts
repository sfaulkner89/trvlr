import { AreaNames } from 'types/AreaNames'
import { Deltas } from 'types/Deltas'

export default (areaNames: AreaNames[], deltas: Deltas) => {
  const deltaSum = deltas.latitudeDelta + deltas.longitudeDelta
  const granularity =
    deltaSum > 40 ? 4 : deltaSum > 15 ? 3 : deltaSum > 8 ? 2 : 1
  return areaNames.length < 2
    ? "Can't check in here"
    : areaNames.length <= granularity
    ? areaNames[areaNames.length - 1].long_name
    : areaNames[granularity].long_name
}
