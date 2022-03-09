import { call, put, select, takeLatest } from 'redux-saga/effects';

import { Auth } from 'aws-amplify';

import { request, requestNoPayload } from '../../app/request';
import history from '../../app/history';
import { socialSelectSignUpForm, cognitoSuccessUpdate } from './socialSignupSlice';
import { dashboardUserUpdate } from '../dashboard/dashboardSlice';

/* This method facilitates the scenario where a user social signs up or signs in, you don’t know which
   This method will:-
   1. GET the user. If exists store details.
   2. ELSE, PUT new user
*/
export function* createUser() {
  try {
    console.log("checking what we hold for you in user-profile service");
    const signUpForm = yield select(socialSelectSignUpForm());
    const baseURL = process.env.REACT_APP_USER_URL;
    const session = yield Auth.currentSession();
    const token = session.idToken.jwtToken;
    let user = {};
    // get user
    try {
      user = yield call(
        requestNoPayload,
        baseURL,
        '/user/profile/',
        'GET',
        token,
      );
      console.log(JSON.stringify(user.data));
    } catch (err) {
      console.log(`createUser error: ${err}`);
    }
    // alert("The request to the user profile service returned http status code: " + JSON.stringify(user.status))
    if (user && user.status === 200) {
      // populate user preference data with empty array if comes back null
      /* user.data.travelPreferences = user.data.travelPreferences !== null ? user.data.travelPreferences : [];
      user.data.airports = user.data.airports !== null ? user.data.airports : [];
      user.data.top10Destinations = user.data.top10Destinations !== null ? user.data.top10Destinations : []; */

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
      } else {
        yield put(history.push('/dashboard'));
      }
    } else {
      // create new user
      console.log("We don’t know you, so we’re adding you to our database");
      const newForm = {};
      const loggedInUser = yield Auth.currentAuthenticatedUser();
      newForm.email = signUpForm.email;
      if (signUpForm.preferredName) {
        newForm.preferredName = signUpForm.preferredName;
      }
      newForm.profileStatus = 0;
      newForm.dateJoined = Date.now();
      newForm.status = 0;
      const response = yield call(
        request,
        baseURL,
        '/user/profile/',
        'PUT',
        token,
        JSON.stringify(newForm),
      );
      // alert(JSON.stringify(response))
      yield call(
        [Auth, Auth.updateUserAttributes],
        loggedInUser,
        { 'custom:user_id': response.data.id.toString(), 'custom:stripe_customer': response.data.stripeCustomer.toString() },
      );

      const newSession = yield Auth.currentSession();
      const newToken = newSession.idToken.jwtToken;
      const rewardsForm = {};
      rewardsForm.name = 'signup';
      rewardsForm.flag = 'true';
      // const rewardsUpdate =
      yield call(request, baseURL, '/rewards/event/', 'PUT', newToken, rewardsForm);

      newForm.id = response.data.id;
      yield put(dashboardUserUpdate(newForm));
      yield put(history.push('/travel-preferences'));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* socialsignUpWatcher() {
  yield takeLatest(cognitoSuccessUpdate().type, createUser);
}
