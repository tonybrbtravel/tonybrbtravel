import fallbackTripImage from '../../images/2021-refresh_Slovenia-Lake-Bled.jpg';
import imgRomance from '../../images/types/romance_new.jpg';
import imgCulture from '../../images/types/culture.jpg';
import imgNightlife from '../../images/types/nightlife-trip-type.jpg';
import imgChill from '../../images/types/chillout1.jpg';
import imgQuirkyAF from '../../images/types/quirky.jpg';
import imgGram from '../../images/types/gram.jpg';
import imgFoodie from '../../images/types/foodie.jpg';
import imgStaycation from '../../images/types/staycation.jpg';
import imgAction from '../../images/types/active.jpg';

// TODO: Move this Type somewhere more central/sensible
export type Trip = {
  id: number,
  startDate: Date,
  endDate: Date;
  image: string,
  tripType: string,
  tripTypeName: string,
  numberOfTravellers: number,
  details: string[],
  status: string,
  lockDate: Date;
  revealDate: Date;
  departDate: Date,
}

// Parses data returned form the API into an array of displayable trips.
// TODO: Properly type the `trips` argument
export const parseTripDetails = (trips: any[], excludePast = false, excludeFuture = false) => {
  console.log(trips);

  const now = new Date();

  const tripArray: Trip[] = [];

  trips.forEach((trip) => {
    const tripDate = new Date(trip.endDate); // to filter trips use the end date at midnight
    tripDate.setHours(24, 0, 0, 0); // set to midnight on last day
    const tripIsPast = tripDate < now;

    if (
      (!excludePast && !excludeFuture)
      || (excludePast && !tripIsPast)
      || (excludeFuture && tripIsPast)
    ) {
      const { roomType } = trip;

      const tripTypeName = trip.tripTypes.tripTypes[0].name
        || [
          'Holiday', // Zero-index, not used
          'Anything',
          'Chill Out',
          'Culture',
          'Good Eats',
          'Nightlife',
          'Picturesque',
          'Quirky',
          'Romance',
          'Staycation',
        ][trip.tripTypes.tripTypes[0].id];

      // What is this trash?
      // TODO: Replace with a getTripImage() function which picks up
      // hotel/city/type image as appropriate. Or just create a keyed
      // lookup object.
      let tripImage = fallbackTripImage;
      if (tripTypeName === 'Romance') {
        tripImage = imgRomance;
      } else if (tripTypeName === 'Culture') {
        tripImage = imgCulture;
      } else if (tripTypeName === 'Nightlife') {
        tripImage = imgNightlife;
      } else if (tripTypeName === 'Chill Out') {
        tripImage = imgChill;
      } else if (tripTypeName === 'Good Eats') {
        tripImage = imgFoodie;
      } else if (tripTypeName === 'Staycation') {
        tripImage = imgStaycation;
      } else if (tripTypeName === 'Quirky') {
        tripImage = imgQuirkyAF;
      } else if (tripTypeName === 'Picturesque') {
        tripImage = imgGram;
      } else if (tripTypeName === 'Anything') {
        tripImage = imgAction;
      }

      const numberOfTravellers = trip.additionalTravellers.length;

      const tripData: Trip = {
        id: trip.id,
        startDate: new Date(trip.startDate),
        endDate: new Date(trip.endDate),
        image: tripImage,
        tripType: trip.tripType,
        tripTypeName,
        numberOfTravellers,
        details: [
          `${numberOfTravellers} Traveller${numberOfTravellers === 1 ? '' : 's'}`,
          tripTypeName === 'Staycation' ? '3-5★ UK Hotel included' : 'Your Flights & Hotel included',
          roomType,
          'ATOL  protected',
        ],
        status: tripDate > now ? trip.tripStatus : 'Passed',
        lockDate: new Date(new Date(tripDate).setDate(tripDate.getDate() - 42)),
        revealDate: new Date(new Date(tripDate).setDate(tripDate.getDate() - 14)),
        departDate: tripDate,
      };

      tripArray.push(tripData);
    }
  });

  return tripArray;
};

export default parseTripDetails;
