import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import signupReducer from '../features/sign-up/signupSlice';
import socialSignupReducer from '../features/social-sign-up/socialSignupSlice';
import signinReducer from '../features/SignIn/signinSlice';
import dashboardReducer from '../features/dashboard/dashboardSlice';
import loaderReducer from '../features/dashboard/loader';
import exclusionsListReducer from '../features/ExclusionList/exclusionListSlice';
import subscriptionReducer from '../screens/_panels/SubscriptionCalculatorPanel/subscriptionCalculatorSlice';
import contentfulReducer from '../Contentful/contentfulSlice';
import mytripsReducer from '../features/MyTrips/mytripsSlice';
import contentReducer from '../features/AddTrip/Contents/contentSlice';
import brbBestHotelsReducer from '../components/BRBBestHotels/BRBBestHotelsSlice';
import bestReviewsReducer from '../components/BRBReviews/BRBReviewsSlice';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  signup: signupReducer,
  socialSignup: socialSignupReducer,
  loader: loaderReducer,
  signin: signinReducer,
  dashboard: dashboardReducer,
  contentful: contentfulReducer,
  exclusionList: exclusionsListReducer,
  subscription: subscriptionReducer,
  mytrips: mytripsReducer,
  content: contentReducer,
  brbBestHotels: brbBestHotelsReducer,
  bestReviews: bestReviewsReducer,
});

export default createRootReducer;
