import {
  User,
} from '../interfaces/user';

const calculateProfileCompletionPercentage = (user: User): number => {
  const percentage = (
    (
      (
        ((user.travelPreferences?.tripTypes ?? []).length ? 1 : 0)
        + (user.top10Destinations?.destinations.length ? 1 : 0)
        + (user.airports?.outboundAirports?.length ? 1 : 0)
        + 1 // excluded destinations are optional (user.excludedDestinations.destinations.length)
        + (user.hotelPreferences?.preferences?.length ? 1 : 0)
        + (user.preferredActivities?.activities?.length ? 1 : 0)
        + (user.travellers && user.travellers.filter((x) => x.brbUser).length ? 1 : 0)
        + 1 // additional travellers are optional (travellers.length minus brbUser)
      )
      / 8
    ) * 100
  );

  return percentage;
};

export {
  calculateProfileCompletionPercentage,
};
