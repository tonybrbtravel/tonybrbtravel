export const rgba = (hexString, opacity) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexString);
  const red = parseInt(result[1], 16);
  const green = parseInt(result[2], 16);
  const blue = parseInt(result[3], 16);
  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
};

const Colors = {
  // red: '#FF0053',
  red: '#E94560',
  redDark: '#B00D0D',
  redHover: '#FF0000',
  blue: '#466CFF',
  darkBlue: '#1A1A2E',
  orange: '#FF6100',
  green: '#4EEC6C',
  shadow: 'rgba(100, 100, 150, 0.3)',
  lightShadow: '#E7E7F0',
  yellow: '#FFEB34',
  darkGrey: '#707070',
  lightGrey: '#C2C5D0',
  lightText: '#8F8F8F',
  // offWhite: '#f3f6f7',
  offWhite: '#EEF1F6',
  white: '#ffffff',
  black: '#000000',
};

export default Colors;
