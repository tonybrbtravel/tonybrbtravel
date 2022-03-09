import {
  take,
  call,
  all,
  put,
  cancel,
  select,
  takeLatest,
  apply,
  takeEvery,
} from 'redux-saga/effects';

import { push } from 'connected-react-router';
import { Auth } from 'aws-amplify';
import history from '../../../app/history';
import { request, unauthorisedRequest, requestNoPayload } from '../../../app/request';

import {
  getPrices, pricesFormUpdate, createStripeSession, createTripPaymentSession,
  selectSubscriptionForm, selectTripPaymentForm, createSubscription,
  createSubscriptionSuccess, selectCouponForm, reauthenticate,
  getTripBalanceInfo, updateSubscriptionRewards,
} from './subscriptionCalculatorSlice';

import { selectClient } from '../../../Contentful/contentfulSlice';
import { dashboardUserUpdate, selectUser } from '../../../features/dashboard/dashboardSlice';

export function* getSubscriptionPrices() {
  try {
    // save exclusions to userprofile
    const baseURL = process.env.REACT_APP_SUBSCRIPTION_URL;
    const session = yield Auth.currentSession();
    const token = session.idToken.jwtToken;

    const response = yield call(requestNoPayload, baseURL, '/subscription/prices/', 'GET', token);

    // convert to map type structure
    const arrayToObject = (array, keyField) => array.reduce((obj, item) => {
      obj[item[keyField]] = item;
      return obj;
    }, {});

    const prices = arrayToObject(response.data, 'nickname');

    yield put(pricesFormUpdate(prices));
  } catch (err) {
    // alert(err);
  }
}

export function* createSession() {
  const formUser = yield select(selectUser()); // current user
  const form = yield select(selectSubscriptionForm());
  const couponForm = yield select(selectCouponForm());

  const subscriptionURL = process.env.REACT_APP_SUBSCRIPTION_URL;
  const userURL = process.env.REACT_APP_USER_URL;

  const session = yield Auth.currentSession();
  const token = session.idToken.jwtToken;
  const loggedInUser = yield Auth.currentAuthenticatedUser();

  try {
    const obj = {};
    obj.customerEmail = formUser.email;
    obj.priceId = form.price;
    if (couponForm != null) {
      obj.couponId = couponForm.coupon;
      console.log(JSON.stringify(obj));
    }
    const jsonString = JSON.stringify(obj);
    const result = yield call(request, subscriptionURL, '/subscription/create-session/', 'POST', token, jsonString);

    subscriptionGetStripeSessionTokenSuccess(result.data);
  } catch (err) {
    // console.log('Sub ERR',err);
    yield console.log(err);
    // alert(err)
  }
}

export function* createPaymentSession() {
  try {
    const formUser = yield select(selectUser()); // current user
    const form = yield select(selectTripPaymentForm());
    const subscriptionURL = process.env.REACT_APP_SUBSCRIPTION_URL;
    const session = yield Auth.currentSession();
    const token = session.idToken.jwtToken;

    // console.log('forrm',form);
    const jsonString = JSON.stringify(form);
    const result = yield call(request, subscriptionURL, '/trip/create-payment-session', 'POST', token, jsonString);

    // console.log('session result',result.data);
    subscriptionGetStripeSessionTokenSuccess(result.data);
  } catch (err) {
    console.log('Payment Session Error', err);
    // yield console.log(err);
    // alert(err)
  }
}

/* used to update subscription info */
function subscriptionGetStripeSessionTokenSuccess(result) {
  // console.log('window stripe result',result);
  const stripe = window.Stripe(process.env.REACT_APP_STRIPE_API_KEY);
  stripe.redirectToCheckout({
    sessionId: result.sessionId,
  }).then((error) => {
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.error.message`.
  });
}

function* saveSubscription() {
  try {
    const formUser = yield select(selectUser()); // current user
    const form = yield select(selectSubscriptionForm());

    const subscriptionURL = process.env.REACT_APP_SUBSCRIPTION_URL;
    const userURL = process.env.REACT_APP_USER_URL;

    const session = yield Auth.currentSession();
    const token = session.idToken.jwtToken;

    const subscription = {};
    // subscription.userId = formUser.id
    subscription.stripeCustomerId = formUser.stripeCustomer;
    subscription.status = 1;
    subscription.startDate = Date.now();

    const jsonString = JSON.stringify(subscription);

    const result = yield call(request, subscriptionURL, '/subscription/', 'PUT', token, jsonString);

    yield put(createSubscriptionSuccess(subscription));

    // set user status = 1 (subscribed)
    const userObj = {};
    userObj.id = formUser.id;
    userObj.email = formUser.email;
    userObj.status = 1;
    const userObjString = JSON.stringify(userObj);
    const userUpdate = yield call(request, userURL, `/user/profile/${formUser.id}`, 'PUT', token, userObjString);

    yield put(dashboardUserUpdate(userUpdate.data));

    // redirect to Dashboard
    yield put(history.push('/'));
  } catch (err) {
    yield console.log(err);
    // alert(err)
  }
}

function* signOutSignIn() {
  try {
    const currentUserInfo = yield Auth.currentUserInfo();
    // let stripeCustomer = currentUserInfo.attributes['custom:stripe_customer']
    // alert(stripeCustomer);
    const newSession = yield Auth.currentAuthenticatedUser({ bypassCache: true });
  } catch (err) {
    console.log(err);
  }
}

function* fetchTripBalanceInfo() {
  try {
    const formUser = yield select(selectUser()); // current user
    const session = yield Auth.currentSession();
    const token = session.idToken.jwtToken;

    const baseURL = process.env.REACT_APP_TRIP_URL;

    const result = yield call(request, baseURL, '/trip/balance', 'GET', token);
  } catch (err) {
    console.log(err);
  }
}

function* updateRewardsSubscription() {
  try {
    const formUser = yield select(selectUser()); // current user
    const session = yield Auth.currentSession();
    const token = session.idToken.jwtToken;

    const baseURL = process.env.REACT_APP_USER_URL;

    const payload = { name: 'subscribe', flag: 'true' };

    const result = yield call(request, baseURL, '/rewards/event', 'PUT', token, payload);

    history.push('/my-account');
  } catch (err) {
    console.log('rewards subscription error', err);
  }
}

export function* subscriptionWatcher() {
  yield takeLatest(getPrices().type, getSubscriptionPrices);
  yield takeLatest(createStripeSession().type, createSession);
  yield takeLatest(createSubscription().type, saveSubscription);
  yield takeLatest(reauthenticate().type, signOutSignIn);
  yield takeLatest(getTripBalanceInfo().type, fetchTripBalanceInfo);
  yield takeLatest(createTripPaymentSession().type, createPaymentSession);
  yield takeLatest(updateSubscriptionRewards().type, updateRewardsSubscription);
}
