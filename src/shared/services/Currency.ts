const addStartingZero = (value: string): string => {
  if (value . length <= 2){
    return addStartingZero(`0${value}`)
  }
  return value;
} 

const addCentsComma = (value: string) => {
  const valueWithZeros = addStartingZero(value);
  const cents = valueWithZeros.substring(valueWithZeros.length - 2);
  const reais = Number(valueWithZeros.substring(0, valueWithZeros.length - 2));
  return `${reais},${cents}`
}

const removeSpecialCharacters = (value: string) => value.replace(',', '').replace('.', '')

const format = (value: number | string): string => {
  const valueString = value.toString();
  return addCentsComma(removeSpecialCharacters(valueString));
} 

const formatTrailing = (value: number | string): string => {
  const valueString = value.toString();
  if (!value) return '0,00'
  return addCentsComma(removeSpecialCharacters(valueString))
}

const convertToCents = (value: string | number): number => {
  const numberAsString = value.toString();
  return Number(numberAsString.replace(',', ''));
}

export const Currency = {
  format,
  convertToCents,
  formatTrailing
}
