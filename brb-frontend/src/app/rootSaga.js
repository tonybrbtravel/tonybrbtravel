import { all } from 'redux-saga/effects';

import { signUpWatcher } from '../features/sign-up/saga';
import { socialsignUpWatcher } from '../features/social-sign-up/saga';
import { signInWatcher } from '../features/SignIn/saga';
import { contentfulWatcher } from '../Contentful/saga';
import { exclusionListWatcher } from '../features/ExclusionList/saga';
import { subscriptionWatcher } from '../screens/_panels/SubscriptionCalculatorPanel/saga';
import { getUserTripDetailsWatcher } from '../features/MyTrips/saga';
import { createTripWatcher } from '../features/AddTrip/Contents/saga';
import { bestHotelsWatcher } from '../components/BRBBestHotels/saga';
import { bestReviewsWatcher } from '../components/BRBReviews/saga';

export default function* rootSaga() {
  yield all([
    signUpWatcher(),
    socialsignUpWatcher(),
    signInWatcher(),
    contentfulWatcher(),
    exclusionListWatcher(),
    subscriptionWatcher(),
    getUserTripDetailsWatcher(),
    createTripWatcher(),
    bestHotelsWatcher(),
    bestReviewsWatcher(),
  ]);
}
