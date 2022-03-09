import { Route, Switch } from 'react-router-dom';

import { PrivateRoute, VerifyCodeRoute } from './PrivateRoute';
import { SocialSignUp } from '../features/social-sign-up/SocialSignUp';
import { SignIn } from '../features/SignIn/SignIn';
import { SuccessRedirect } from '../screens/_panels/SubscriptionCalculatorPanel/SuccessRedirect';
import { HomePage } from '../features/AddTrip/HomePage';
import { MyTrips } from '../features/MyTrips/MyTrips';
import { SignUp } from '../features/sign-up/Signup';
import { TravelProfile } from '../features/TravelProfile/TravelProfile';
import { UserDashboard } from '../pages/Dashboard/Dashboard';
import { MyAccountComponent } from '../pages/MyAccount/MyAccount';
import { VerifyCode } from '../features/sign-up/components/VerifyCode/VerifyCode';
// import Subscribe from '../pages/Subscribe';
import PrivacyPolicy from '../components/Footer/PrivacyPolicy';
import BookingConditions from '../components/Footer/BookingConditions';
import MembershipConditions from '../components/Footer/MembershipConditions';
import { Trip } from '../features/Trip/Trip';
import { UserTravelPreferences } from '../features/travel-preferences/components/UserTravelPreferences/UserTravelPreferences';
import { UserAirportPreferences } from '../features/AirportPreferences/components/UserAirportPreferences/UserAirportPreferences';
import { UserDestinations } from '../features/ExclusionList/components/UserDestinations/UserDestinations';
import { ForgotPassword } from '../features/forgotPassword/forgotPassword';
import { UpdatePassword } from '../features/forgotPassword/UpdatePassword';
import { SuccessTopup } from '../features/AddTrip/Contents/Topup/SuccessTopup';

// import TermsAndConditions from '../features/t-and-c/Terms';
// import { CreateNewTraveller } from '../features/AddTrip/CreateNewTraveller/CreateNewTraveller';
// import { AdditionalTraveller } from '../features/AddTrip/AdditionalTraveller/AdditionalTraveller';
// import { TripLayout } from '../components/TripLayout/TripLayout';

import Error404 from '../screens/Error404';

const routes = (
  <Switch>

    {/* Core user routes */}
    <PrivateRoute exact path="/" component={UserDashboard} />
    <PrivateRoute exact path="/dashboard" component={UserDashboard} />
    {/* <PrivateRoute exact path="/subscribe" component={Subscribe} /> */}
    <PrivateRoute exact path="/travel-profile" component={TravelProfile} />
    <PrivateRoute exact path="/my-account" component={MyAccountComponent} />
    <PrivateRoute exact path="/add-trip" component={HomePage} />
    <PrivateRoute exact path="/my-trips" component={MyTrips} />

    <Route exact path="/privacy-policy" component={PrivacyPolicy} />
    <Route exact path="/terms-and-conditions" component={BookingConditions} />
    <Route exact path="/membership-conditions" component={MembershipConditions} />

    {/* Onboarding routes */}
    <PrivateRoute exact path="/travel-preferences" component={UserTravelPreferences} />
    <PrivateRoute exact path="/city-preferences" component={UserDestinations} />
    <PrivateRoute exact path="/airport-preferences" component={UserAirportPreferences} />

    {/* Account management routes (sign-up, sign-in) */}
    <Route exact path="/signin" component={SignIn} />
    <Route exact path="/signup" component={SignUp} />
    <Route exact path="/email-signup" component={SignUp} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/update-password" component={UpdatePassword} />

    <Route exact path="/social-signup" component={SocialSignUp} />
    <Route exact path="/social-signup/:provider" component={SocialSignUp} />
    <VerifyCodeRoute exact path="/verify-code" component={VerifyCode} />

    {/* Service routes */}
    <PrivateRoute exact path="/success-redirect" component={SuccessRedirect} />
    <PrivateRoute exact path="/success-trip-topup" component={SuccessTopup} />

    {/* Unknown routes, may not be needed? */}
    <PrivateRoute exact path="/trip/" component={Trip} />

    {/* Obsolete or incomplete routes */}
    {/* <PrivateRoute path="/termsandconditions" component={TermsAndConditions} /> */}
    {/* <Route path="/trip-airports" component={TripLayout} /> */}
    {/* <PrivateRoute exact path="/add-traveller" component={CreateNewTraveller} /> */}
    {/* <PrivateRoute exact path="/select-traveller" component={AdditionalTraveller} /> */}
    {/* <PrivateRoute exact path="/add-traveller/:id" component={CreateNewTraveller} /> */}

    {/* 404 Fallback Handler */}
    <Route component={Error404} />

  </Switch>
);

export default routes;
