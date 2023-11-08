import capitalise from './capitalise'

export default (types: string[]) => {
  return types
    .map((word: string) => capitalise(word))
    .join(', ')
    .split('_')
    .join(' ')
}
