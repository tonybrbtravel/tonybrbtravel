import airports from '../../features/AirportPreferences/airports';

const airportsByCode: {
  [key: string]: string
} = {};

airports.forEach((region) => {
  region.airports.forEach((airport) => {
    airportsByCode[airport.code] = airport.label;
  });
});

export const getAirportNameByCode = (code: string) => airportsByCode[code] || code;

export default {
  getAirportNameByCode,
};
