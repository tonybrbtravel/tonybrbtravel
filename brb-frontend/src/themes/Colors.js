export const rgba = (hexString, opacity) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexString);
  const red = parseInt(result[1], 16);
  const green = parseInt(result[2], 16);
  const blue = parseInt(result[3], 16);
  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
};

const Colors = {
  red: '#FF0053',
  redDark: '#B00D0D',
  redHover: '#FF0000',
  blue: '#1577F2',
  lightBlue: '#DFECFD',
  orange: '#FF6100',
  lightOrange: '#FFBE78',
  green: '#4EEC6C',
  shadow: 'rgba(100, 100, 150, 0.3)',
  lightShadow: '#E7E7F0',
  yellow: '#FFEB34',
  darkGrey: '#707070',
  lightGrey: '#C2C5D0',
  offWhite: '#fafafa',
  lightRed: '#FFF6F9',

  brbPink: '#e94560',
  brbBlue: '#1a1a2e',
  brbOffwhite: '#eef1f6',
  brbWhite: '#fff9f8',
  brbLightGrey: '#e0e0eb',
};

export default Colors;
