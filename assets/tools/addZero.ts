export default (number: number) =>
  String(number).length === 1 ? `0${number}` : `${number}`
