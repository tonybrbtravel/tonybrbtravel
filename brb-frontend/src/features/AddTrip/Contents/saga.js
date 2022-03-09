import {
  call, put, select, takeLatest, takeEvery,
} from 'redux-saga/effects';

import { push } from 'connected-react-router';
import { Auth } from 'aws-amplify';
import { format } from 'date-fns';
import { Truenas } from '@styled-icons/simple-icons';
import history from '../../../app/history';
import { request } from '../../../app/request';

import {
  createTripFormUpdate,
  selectTrips,
  ResetTrip,
  tripCreateErrorUpdate,
  createTripTopupFormUpdate,
  selectTripCost,
  selectIsLockTripInfoFromMyTrips,
  selectIsLockFromMyTrips,
} from './contentSlice';
import { selectUser } from '../../dashboard/dashboardSlice';

const getTripInfo = (tripDetails, user, tripCostDetails, stripeCustomerId) => {
  const tripDate = tripDetails.travelDates;
  const tripRoomType = tripDetails?.roomTypes;
  const tripCities = tripDate?.noOfCities ?? tripDetails?.numberOfCities;
  const tripReturn = tripDate?.lateReturn ?? tripDetails?.lateReturn;
  const tripTravellers = tripDetails.addedTravellers ?? tripDetails.additionalTravellers;

  const tripStartDate = tripDate?.selectedDates?.startDate ?? tripDetails.startDate;

  const tripEndDate = tripDate?.selectedDates?.endDate ?? tripDetails.endDate;

  const tripParams = {
    activities: null,
    additionalTravellers: JSON.parse(JSON.stringify(tripTravellers)).map(
      (x) => {
        delete x.id;
        delete x.trip;
        x.dob = format(new Date(x.dob), 'yyyy-MM-dd');
        return x;
      },
    ),
    airports: tripDetails.airports,
    atolURL: null,
    bookingId: null,
    bookingRef: '234',
    cancellationStatus: 1,
    cancelledBy: null,
    customerEmail: null,
    customerId: null,
    customerNotes: null,
    departureAirport: 'TestDepartureAirport',
    departurePreference: tripDate?.departurePreference,
    destinations: tripDetails.top10Destinations,
    endDate: tripEndDate
      ? format(new Date(tripEndDate), 'yyyy-MM-dd')
      : null,
    exclusions: tripDetails.excludedDestinations,
    extraTravllersPrice: tripCostDetails?.additionalTravellerPrice ?? 0,
    hotels: null,
    lateReturn: tripReturn,
    legacyTrip: false,
    netGMCalculated: null,
    netGMPercentage: null,
    netTripCostCalculated: null,
    notes: tripRoomType?.roomNotes ?? tripDetails?.roomNotes,
    numberOfCities: tripCities,
    packageRef: null,
    passportCountry: null,
    preferredDepartureTime: null,
    refundAmount: 0,
    revealed: null,
    revealedOnDate: null,
    rewards: 'rewards1',
    roomType: tripRoomType?.roomType ?? tripDetails.roomType,
    startDate: tripStartDate
      ? format(new Date(tripStartDate), 'yyyy-MM-dd')
      : null,
    status: 'active',
    subscriptionType: null,
    topUp: tripCostDetails?.topUp ?? 0,
    travelDate: tripStartDate
      ? format(new Date(tripStartDate), 'yyyy-MM-dd')
      : null,
    tripCostCalculated: null,
    tripPreference: 'MORNING',
    tripPrice: tripCostDetails?.tripPrice ?? 0,
    tripStatus: 'Created',
    tripTheme: 'CustomerTheme',
    tripTypes: tripDetails.travelPreferences,
    tripType: 0,
    userId: user.id,
    stripeCustomerId,
    userRewards: null,
  };

  if (tripDetails.id) {
    tripParams.id = tripDetails.id;
  }

  return tripParams;
};

export function* createTrip() {
  try {
    const user = yield select(selectUser());
    const baseURL = process.env.REACT_APP_TRIP_URL;
    const session = yield Auth.currentSession();
    const stripeCustomerId = session.idToken.payload['custom:stripe_customer'];
    const token = session.idToken.jwtToken;
    const tripDetails = yield select(selectTrips());

    console.log(JSON.stringify(tripDetails));
    const tripCostDetails = yield select(selectTripCost());
    const tripParams = getTripInfo(tripDetails, user, tripCostDetails, stripeCustomerId);

    const response = yield call(
      request,
      baseURL,
      '/trip/',
      'PUT',
      token,
      tripParams,
    );

    if (response) {
      yield put(ResetTrip());
      yield put(history.push('/my-trips'));
    }
  } catch (err) {
    yield put(ResetTrip());
    yield put(tripCreateErrorUpdate({ error: 'Internal server error' }));
  }
}

export function* createTopupTrip() {
  try {
    const user = yield select(selectUser());
    const baseURL = process.env.REACT_APP_TRIP_URL;
    const session = yield Auth.currentSession();
    const stripeCustomerId = session.idToken.payload['custom:stripe_customer'];
    const token = session.idToken.jwtToken;
    const tripDetails = yield select(selectTrips());
    const tripCostDetails = yield select(selectTripCost());

    const isLockFromMyTrips = yield select(selectIsLockFromMyTrips());
    const lockTripInfoFromMyTrips = yield select(selectIsLockTripInfoFromMyTrips());

    console.log('isLockFromMyTrips', isLockFromMyTrips);
    console.log('lockTripInfoFromMyTrips', lockTripInfoFromMyTrips);
    let tripTopUpInfo = {};

    if (isLockFromMyTrips) {
      tripTopUpInfo = {
        startDate: lockTripInfoFromMyTrips.startDate,
        endDate: lockTripInfoFromMyTrips.endDate,
        additionalTravellers: lockTripInfoFromMyTrips.additionalTravellers.map((x) => ({
          firstName: x.firstName,
          lastName: x.lastName,
          nationality: x.nationality,
          brbUser: x.brbUser,
          dob: new Date(x.dob).toISOString().slice(0, 10),
        })),
      };
    } else {
      const tripDateInfo = tripDetails.travelDates;
      const travellersData = tripDetails?.addedTravellers ?? tripDetails.additionalTravellers;
      tripTopUpInfo = {
        startDate: tripDateInfo?.selectedDates?.startDate,
        endDate: tripDateInfo?.selectedDates?.endDate,
        additionalTravellers: travellersData.map((x) => ({
          firstName: x.firstName,
          lastName: x.lastName,
          nationality: x.nationality,
          brbUser: x.brbUser,
          dob: new Date(x.dob).toISOString().slice(0, 10),
        })),
      };
    }

    // console.log('topupDetails',tripTopUpInfo);

    const topupDetails = yield call(request, baseURL, '/trip/top-up', 'POST', token, tripTopUpInfo);

    if (!isLockFromMyTrips) {
      const tripParams = getTripInfo(tripDetails, user, tripCostDetails, stripeCustomerId);
      if (topupDetails) {
        const tripTopUpInfo = topupDetails.data.pricing;
        tripParams.topUp = tripTopUpInfo.topUp;
        tripParams.extraTravllersPrice = tripTopUpInfo.additionalTravellerPrice;
        tripParams.tripPrice = tripTopUpInfo.tripPrice;
      }
      // console.log('tripParams === BEFORE CREATE TRIP ==== ',tripParams);
      const response = yield call(request, baseURL, '/trip/', 'PUT', token, tripParams); // Create or Update

      if (response.data) {
        // console.log('response',response.data);
        const createdTripId = response.data.split(':')[1];

        if (createdTripId > 0) {
          const fetchTripDetails = yield call(request, baseURL, `/trip/${createdTripId}`, 'GET', token);
          if (fetchTripDetails) {
            const tripResponseObject = fetchTripDetails.data;
            const lockRequest = {};
            lockRequest.id = tripResponseObject.id;
            lockRequest.topUp = tripCostDetails?.topUp ?? 0;
            lockRequest.extraTravllersPrice = tripCostDetails?.additionalTravellerPrice ?? 0;
            console.log(`********1: ${JSON.stringify(lockRequest)}`);
            // Lock Trip
            yield call(request, baseURL, '/trip/lock-trip/', 'PUT', token, lockRequest);
          }
        }
      }
    } else {
      // console.log("LOCK TRIP SAGA")
      const lockTripId = lockTripInfoFromMyTrips.id;
      // console.log("LOCK TRIP SAGA ID",lockTripId)
      if (lockTripId > 0) {
        const lockTripDetails = yield call(request, baseURL, `/trip/${lockTripId}`, 'GET', token);
        if (lockTripDetails) {
          const lockTripDetailsUpdate = lockTripDetails.data;
          const lockRequest = {};
          lockRequest.id = lockTripDetailsUpdate.id;
          lockRequest.topUp = tripCostDetails?.topUp ?? 0;
          lockRequest.extraTravllersPrice = tripCostDetails?.additionalTravellerPrice ?? 0;
          if (topupDetails) {
            // const tripTopUpInfo = topupDetails.data.pricing;
            // lockTripDetailsUpdate.topUp = tripTopUpInfo.topUp;
            // lockTripDetailsUpdate.extraTravllersPrice = tripTopUpInfo.additionalTravellerPrice;
            // lockTripDetailsUpdate.tripPrice = tripTopUpInfo.tripPrice;
          }
          console.log(`*******2: ${JSON.stringify(lockRequest)}`);
          yield call(request, baseURL, '/trip/lock-trip/', 'PUT', token, lockRequest);
        }
      }
    }

    yield put(ResetTrip());
    yield put(push('/my-trips'));
  } catch (err) {
    // console.log('exception topup',err);
    yield put(ResetTrip());
    yield put(tripCreateErrorUpdate({ error: 'Internal server error' }));
    yield put(push('/my-trips'));
  }
}

export function* createTripWatcher() {
  yield takeLatest(createTripFormUpdate().type, createTrip);
  yield takeEvery(createTripTopupFormUpdate().type, createTopupTrip);
}
