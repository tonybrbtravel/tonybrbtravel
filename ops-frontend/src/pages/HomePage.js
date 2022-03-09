
import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";
import { Auth } from "aws-amplify";
import { useDispatch, useSelector } from "react-redux";

// pages
import Dashboard from "./Dashboard";
import ForgotPassword from "../pages/ForgotPassword" ;
import NewPassword from "../pages/NewPassword";
import ResetPassword from "./customerManagement/ResetPassword";
import UpdateCustomerDetails from "./customerManagement/UpdateCustomerDetails";
import CustomerManagementDetails from "./customerManagement/CustomerManagementDetails";
import HotelManagementDetails from "./hotelManagement/HotelManagementDetails";
import AddHotelDetails from "./hotelManagement/AddHotelDetails";
import UpdateHotelDetails from "./hotelManagement/UpdateHotelDetails";
import TripManagementDetails from "./tripManagement/TripManagementDetails";
import UpdateTripManagementDetails from "./tripManagement/UpdateTripManagementDetails";
import FlightManagementDetails from "./flightManagement/FlightManagementDetails";
import AddFlightDetails from "./flightManagement/AddFlightDetails";
import UpdateFlightDetails from "./flightManagement/UpdateFlightDetails";
import DropManagementDetails from "./dropMangement/DropManagementDetails";
import UpdateDropManagementDetails from "./dropMangement/UpdateDropManagementDetails";
import SignIn from "./Sign-in/SignIn";
import ServerError from "./Sign-in/ServerError";
import AddDropManagementDetails from "./dropMangement/AddDropManagementDetails";
import Sidebar from "../components/Sidebar";
import Preloader from "../components/Preloader";
import Navbar from "../components/Navbar";

const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          {" "}
          <Preloader show={loaded ? false : true} /> <Component {...props} />{" "}
        </>
      )}
    />
  );
};
const PrivateRoute = ({ component: Component, ...rest }) => {
  const signin = useSelector(state => state.signInReducer)
  // const [token, setToken] = useState("");
  // const getToken = async () => {
  //   try {
  //     const session = await Auth.currentSession();
  //     return session.idToken.jwtToken;
  //   } catch (error) {
  //     return;
  //   }
  // };
  // getToken().then((x) => {
  //   setToken(x);
  // });
return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem('token') ? 
        <Component {...props} /> 
        :
         <Redirect to={Routes.Signin.path} />
      }
    />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem("settingsVisible") === "false" ? false : true;
  };

  const [showSettings, setShowSettings] = useState(
    localStorageIsSettingsVisible
  );

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem("settingsVisible", !showSettings);
  };
  const signin = useSelector(state => state.signInReducer)
  return (
    <Route
      {...rest}
      render={(props) => (
         localStorage.getItem('token') ?
        <>
          <Preloader show={loaded ? false : true} />
          <Sidebar />

          <main className="content">
            <Navbar />
            <Component {...props} /> 
          </main>
        </>
         : <Redirect to={Routes.Signin.path} />
      )}
    />
  );
};

export default () => (
  <Switch>
    <RouteWithLoader exact path={Routes.Signin.path} component={SignIn} />
    <PrivateRoute exact path={Routes.Dashboard.path} component={Dashboard} />
    <RouteWithLoader exact path={Routes.ForgotPassword.path} component={ForgotPassword} />
    <RouteWithLoader exact path={Routes.NewPassword.path} component={NewPassword} />
    <RouteWithLoader
      exact
      path={Routes.ResetPassword.path}
      component={ResetPassword}
    />
    <RouteWithLoader
      exact
      path={Routes.ServerError.path}
      component={ServerError}
    />

    <RouteWithSidebar
      exact
      path={Routes.UpdateCustomerDetails.path}
      component={UpdateCustomerDetails}
    />
    <RouteWithSidebar
      exact
      path={Routes.CustomerManagementDetails.path}
      component={CustomerManagementDetails}
    />
    <RouteWithSidebar
      exact
      path={Routes.HotelManagementDetails.path}
      component={HotelManagementDetails}
    />
    <RouteWithSidebar
      exact
      path={Routes.AddHotelDetails.path}
      component={AddHotelDetails}
    />
    <RouteWithSidebar
      exact
      path={Routes.UpdateHotelDetails.path}
      component={UpdateHotelDetails}
    />
    <RouteWithSidebar
      exact
      path={Routes.TripManagementDetails.path}
      component={TripManagementDetails}
    />
    <RouteWithSidebar
      exact
      path={Routes.UpdateTripManagementDetails.path}
      component={UpdateTripManagementDetails}
    />
    <RouteWithSidebar
      exact
      path={Routes.FlightManagementDetails.path}
      component={FlightManagementDetails}
    />
    <RouteWithSidebar
      exact
      path={Routes.AddFlightDetails.path}
      component={AddFlightDetails}
    />
    <RouteWithSidebar
      exact
      path={Routes.UpdateFlightDetails.path}
      component={UpdateFlightDetails}
    />
    <RouteWithSidebar
      exact
      path={Routes.DropManagementDetails.path}
      component={DropManagementDetails}
    />
    <RouteWithSidebar
      exact
      path={Routes.UpdateDropManagementDetails.path}
      component={UpdateDropManagementDetails}
    />
    <RouteWithSidebar
      exact
      path={Routes.AddDropManagementDetails.path}
      component={AddDropManagementDetails}
    />
  </Switch>
);