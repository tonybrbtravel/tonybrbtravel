import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';

import { Auth } from 'aws-amplify';
import history from '../../app/history';
import { requestNoPayload } from '../../app/request';

import {
  signInFormUpdate,
  signInErrorUpdate,
  signInAuthenticatedUpdate,
  selectSignInForm,
} from './signinSlice';
import {
  dashboardUserUpdate, dashboardUserImageUpdate, fetchSSOUserDetails, getSSOUserDetails,
} from '../dashboard/dashboardSlice';
import {
  createTripTypes, createAirports, createDestinations, selectTrips,
} from '../AddTrip/Contents/contentSlice';

export function* signIn() {
  try {
    const signInForm = yield select(selectSignInForm());
    /* sign-in user */
    const result = yield Auth.signIn(signInForm.email, signInForm.password);
    /* flag as authenticated */
    yield put(signInAuthenticatedUpdate(true));

    /* retrieve user details */
    // get user
    const baseURL = process.env.REACT_APP_USER_URL;
    const session = yield Auth.currentSession();
    const token = session.idToken.jwtToken;
    const user = yield call(
      requestNoPayload,
      baseURL,
      '/user/profile/',
      'GET',
      token,
    );
    if (user && user.status === 200) {
      // populate user details
      yield put(dashboardUserUpdate(user.data));
      if (user.data.profileStatus === 0
        && (user.data.travelPreferences && user.data.travelPreferences?.tripTypes?.length === 0)
        && (user.data.airports && user.data.airports?.outboundAirports?.length === 0)
        && (user.data.top10Destinations && user.data.top10Destinations?.destinations?.length === 0)) {
        yield put(history.push('/travel-preferences'));
      } else if (user.data.profileStatus === 0
        && user.data.travelPreferences?.tripTypes?.length > 0
        && (user.data.airports && user.data.airports?.outboundAirports?.length === 0)
        && (user.data.top10Destinations && user.data.top10Destinations?.destinations?.length === 0)) {
        yield put(history.push('/airport-preferences'));
      } else if (user.data.profileStatus === 0
        && user.data.travelPreferences?.tripTypes?.length > 0
        && user.data.airports?.outboundAirports?.length > 0
        && (user.data.top10Destinations && user.data.top10Destinations?.destinations?.length === 0)) {
        yield put(history.push('/city-preferences'));
      } else if (user.data.profileStatus === 0
        && (user.data.travelPreferences?.tripTypes !== null && user.data.travelPreferences?.tripTypes?.length > 0)
        && (user.data.airports?.outboundAirports !== null && user.data.airports?.outboundAirports?.length > 0)
        && (user.data.top10Destinations?.destinations !== null && user.data.top10Destinations?.destinations?.length > 0)) {
        yield put(history.push('/travel-profile'));
      }
      yield put(history.push('/dashboard'));
    } else {
      yield put(signInErrorUpdate({ message: 'Invalid Username and Password' }));
    }
  } catch (err) {
    console.log('sign errr', err);
    yield put(signInErrorUpdate({ message: 'We could not sign you in with this email account. Please contact us for support.' }));
  }
}

export function* getUserInfo() {
  try {
    const result = yield Auth.currentUserInfo();

    if (result) {
      const userName = result ? result.username : '';
      yield put(getSSOUserDetails(userName));
    }
  } catch (err) {

  }
}

export function* signInWatcher() {
  yield takeLatest(signInFormUpdate().type, signIn);
  yield takeLatest(fetchSSOUserDetails().type, getUserInfo);
}
