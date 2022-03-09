import {
  take,
  call,
  all,
  put,
  cancel,
  select,
  takeLatest,
  takeEvery,
  apply,
} from 'redux-saga/effects';

import { push } from 'connected-react-router';
import { Auth } from 'aws-amplify';
import history from '../../app/history';
import {
  request,
  unauthorisedRequest,
  requestNoPayload,
} from '../../app/request';

import {
  userTripsUpdate,
  selectUserTrips,
  userTripsData,
  userDeleteTrip,
  userLockTrip,
  tripTimer,
} from './mytripsSlice';
import { selectUser } from '../dashboard/dashboardSlice';

export function* getUserTripDetails() {
  try {
    const user = yield select(selectUser());
    const baseURL = process.env.REACT_APP_TRIP_URL;
    const session = yield Auth.currentSession();
    const token = session.idToken.jwtToken;

    const response = yield call(
      requestNoPayload,
      baseURL,
      '/trip/',
      'GET',
      token,
    );
    if (response) {
      // get user trip details
      yield put(userTripsData(response.data));
    }
  } catch (err) {}
}

export function* deleteTrip(action) {
  const user = yield select(selectUser());
  const baseURL = process.env.REACT_APP_TRIP_URL;
  const session = yield Auth.currentSession();
  const token = session.idToken.jwtToken;

  try {
    const response = yield call(
      requestNoPayload,
      baseURL,
      `/trip/${action.payload?.id}`,
      'DELETE',
      token,
    );
    if (response) {
      const result = yield call(
        requestNoPayload,
        baseURL,
        '/trip/',
        'GET',
        token,
      );
      if (result) {
        yield put(userTripsData(result.data));
      }
    }
  } catch (error) {}
}

export function* lockTrip(action) {
  const user = yield select(selectUser());
  const baseURL = process.env.REACT_APP_TRIP_URL;
  const session = yield Auth.currentSession();
  const token = session.idToken.jwtToken;

  try {
    const response = yield call(
      requestNoPayload,
      baseURL,
      `/trip/lock-trip/${action.payload?.id}`,
      'GET',
      token,
    );

    if (response) {
      const result = yield call(
        requestNoPayload,
        baseURL,
        '/trip/',
        'GET',
        token,
      );
      if (result) {
        yield put(userTripsData(result.data));
      }
    }
  } catch (e) {
    console.log(e);
  }
}

export function* setTripTimer(action) {
  const user = yield select(selectUser());
  const baseURL = 'https://connect-staging.berightback.travel';
  const session = yield Auth.currentSession();
  const token = session.idToken.jwtToken;
  try {
    const response = yield call(
      requestNoPayload,
      baseURL,
      '/trip/',
      'GET',
      token,
    );
    if (response) {
      yield put(userTripsData(response.data));
    }
  } catch (error) {}
}

export function* getUserTripDetailsWatcher() {
  yield takeLatest(userTripsUpdate().type, getUserTripDetails);
  yield takeEvery(userDeleteTrip().type, deleteTrip);
  yield takeLatest(userLockTrip().type, lockTrip);
  yield takeLatest(tripTimer().type, setTripTimer);
}
