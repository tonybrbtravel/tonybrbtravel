import { call, put, select, takeLatest } from 'redux-saga/effects';

import { Auth } from 'aws-amplify';

import history from '../../app/history';
import { request, requestNoPayload, unauthorisedRequest } from '../../app/request';

import {
  signUpFormUpdate,
  verifyActiveUpdate,
  codeUpdate,
  cognitoSuccessUpdate,
  selectSignUpForm,
  signUpErrorUpdate,
  selectVerifyActive,
  selectCode,
  resendCode,
  userExists,
  signUpCodeUpdateStatus,
} from './signupSlice';

import { signInAuthenticatedUpdate } from '../SignIn/signinSlice';
import { dashboardUserUpdate } from '../dashboard/dashboardSlice';
import { trackAccountCreation } from '../../screens/_utilities/tracking';
// import { showNotification } from '../../components/BRBNotification/ShowNotification';

export function* checkUserExists() {
  /* reset error conditions - state is persisted */
  yield put(signUpErrorUpdate(null));
  // showNotification.error({ content: "hello", title: "asfdsa" });
  /* check if user exists - (by email address) */
  const signUpForm = yield select(selectSignUpForm());
  /* validate form */
  if (
    !signUpForm.preferredName
    || signUpForm.preferredName === ''
    || !signUpForm.email
    || signUpForm.email === ''
    || !signUpForm.password
    || signUpForm.password === ''
  ) {
    yield put(signUpErrorUpdate('Please complete all fields'));
  }

  const baseURL = process.env.REACT_APP_USER_URL;
  const exists = yield call(
    unauthorisedRequest,
    baseURL,
    `/user/profile/email/${signUpForm.email.toLowerCase()}`,
    'GET',
  );
  if (exists.data === 'exists') {
    yield put(signUpErrorUpdate('User already exists with this email address'));
  } else {
    yield put(signUpErrorUpdate(null));
    yield put(signUpFormUpdate(signUpForm));
  }
}

export function* signUp() {
  try {
    const signUpForm = yield select(selectSignUpForm());
    // const verifyForm =
    yield select(selectVerifyActive());

    /* sign-up user */
    // const result =
    yield call([Auth, Auth.signUp], {
      username: signUpForm.email,
      password: signUpForm.password,
      attributes: {
        ...(signUpForm.preferred_name && { preferred_username: signUpForm.preferred_name }),
        email: signUpForm.email,
      },
      validationData: [],
    });

    try {
      yield put(verifyActiveUpdate(true));
      yield put(history.push('/verify-code'));
    } catch (err) {
      console.log('signUp generator error', err);
    }

    /* set active to true and return to component */
  } catch (err) {
    console.log(err);
    if (err.name === 'UsernameExistsException') {
      err.message = 'Email address is already registered';
      yield put(signUpErrorUpdate(err));
    }
    if (err.name === 'InvalidParameterException') {
      err.message = 'Your password does not meet the policy standards';
      yield put(signUpErrorUpdate(err));
    }
    if (err.name === 'InvalidPasswordException') {
      err.message = 'Your password must include an upper case letter, a lower case letter, a number, and be a minimum of 8 characters';
      yield put(signUpErrorUpdate(err));
    }
  }
}

export function* verify() {
  yield put(signUpErrorUpdate(null));
  const signUpForm = yield select(selectSignUpForm());
  const code = yield select(selectCode());
  try {
    // const result =
    yield call(
      [Auth, Auth.confirmSignUp],
      signUpForm.email,
      code,
    );

    /* sign-in user */
    // const signedIn =
    yield call(
      [Auth, Auth.signIn],
      signUpForm.email,
      signUpForm.password,
    );

    //  yield put(verifyActiveUpdate(false));

    /* create user in user-profile service */
    yield put(cognitoSuccessUpdate(true));
  } catch (err) {
    console.log('verify code', err);
    yield put(signUpErrorUpdate({ message: 'Incorrect validation key' }));
  }
}

export function* createUser() {
  /* reset error conditions - state is persisted */
  console.log("Creating User - Email Sign Up");
  yield put(signUpErrorUpdate(null));
  const baseURL = process.env.REACT_APP_USER_URL;
  try {
    const signUpForm = yield select(selectSignUpForm());

    let session = yield Auth.currentSession();
    let token = session.idToken.jwtToken;
    const loggedInUser = yield Auth.currentAuthenticatedUser();
    console.log(loggedInUser);

    // const cognitoUsername = session.idToken.payload['cognito:username'];

    // create user
    const newForm = {};
    newForm.email = signUpForm.email;
    newForm.preferredName = signUpForm.preferredName;
    newForm.dateJoined = Date.now();
    newForm.status = 0;
    newForm.profileStatus = 0;
    const response = yield call(
      request,
      baseURL,
      '/user/profile/',
      'PUT',
      token,
      JSON.stringify(newForm),
    );
    console.log(response);

    // Track profile creation event
    // TODO: Check actual response to make sure it was successful
    trackAccountCreation('email');

    // const result =
    yield call(
      [Auth, Auth.updateUserAttributes],
      loggedInUser,
      { 'custom:user_id': response.data.id.toString() },
    );

    /* flag as authenticated */
    yield put(signInAuthenticatedUpdate(true));

    yield put(signUpErrorUpdate(null));

    // save user for app
    /* sign-in user */
    yield call(
      [Auth, Auth.signIn],
      signUpForm.email,
      signUpForm.password,
    );
    session = yield Auth.currentSession();
    token = session.idToken.jwtToken;
    const user = yield call(
      requestNoPayload,
      baseURL,
      '/user/profile/',
      'GET',
      token,
    );
    yield put(dashboardUserUpdate(user.data));

    // yield put(cognitoSuccessUpdate(false)) //reset page to load sign-up form
    yield put(history.push('/travel-preferences'));
  } catch (err) {
    // showNotification.error({ content: "hello", title: "asfdsa" });
    yield put(signUpErrorUpdate(err));
  }

  const newSession = yield Auth.currentSession();
  const newToken = newSession.idToken.jwtToken;

  const rewardsForm = {};
  rewardsForm.name = 'signup';
  rewardsForm.flag = 'true';
  yield call(request, baseURL, '/rewards/event/', 'PUT', newToken, rewardsForm);
}

export function* resendValidationCode() {
  const signUpForm = yield select(selectSignUpForm());
  try {
    // const result =
    yield call([Auth, Auth.resendSignUp], signUpForm.email);
    yield put(signUpCodeUpdateStatus({ status: true }));
  } catch (err) {
    yield put(signUpErrorUpdate(err));
  }
}

export function* signUpWatcher() {
  yield takeLatest(signUpFormUpdate().type, signUp);
  yield takeLatest(codeUpdate().type, verify);
  yield takeLatest(cognitoSuccessUpdate().type, createUser);
  yield takeLatest(resendCode().type, resendValidationCode);
  yield takeLatest(userExists().type, checkUserExists);
}
