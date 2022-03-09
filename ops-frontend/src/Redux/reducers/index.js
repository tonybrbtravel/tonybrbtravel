import { combineReducers } from 'redux';
import flightDetails from './flightManagement/getFlightManagementDetailsReducer';
import addFlightDetails from './flightManagement/addFlightManagementDetailsReducer';
import deleteFlightDetails from './flightManagement/deleteFlightManagementDeailsReducer';
import getFlightsDetailsById from './flightManagement/getFlightDetailsByIdReducer';
import updateFlightDetails from './flightManagement/updateFlightManagementDetailsReducer';
import getHotelsDetails from './hotelManagement/getHotelManagementDetailsReducer';
import addHotelDetails from './hotelManagement/addHotelManagementDetailsReducer';
import gethotelDetailsById from './hotelManagement/getHotelDetailsByIdReducer';
import updatehotelDetails from './hotelManagement/updateHotelManagementDetailsReducer';
import deleteHotelDetails from './hotelManagement/deleteHotelDetailsReducer';
import searchHotelsDetails from './hotelManagement/searchHotelDetailsReducer';
import tripsDetails from './tripManagement/tripManagementDetailsReducer';
import searchTripsDetails from './tripManagement/searchTripsDetailsReducer';
import getTripDetailsById from './tripManagement/getTripDetailsByIdReducer';
import filterTripsDetails from './tripManagement/filterTripsReducer';
import deleteTripDetails from './tripManagement/deleteTripDetailsReducer';
import signInReducer from './signInReducer';
import signinSlice from '../../pages/Sign-in/signinSlice'
import dropDetails from './DropManagement/getDropManagementDetailsReducer';
import addDropDetails from './DropManagement/addDropManagementDetailsReducer';
import deleteDropDetails from './DropManagement/deleteDropManagementDetailsReducer';
import updateDropDetails from './DropManagement/updateDropManagementDetailsReducer';
import updateTripDetails from './tripManagement/updateTripDetailsReducer';
import addTripDetails from './tripManagement/addTripDetailsReducer';
import customersDetails from './customerManagement/getCustomerDetailsReducer';
import searchCustomersDetails from './customerManagement/searchCustomerDetailsReducer';
import updateCustomerDetails from './customerManagement/updateCustomerDetailsReducer';
import deleteCustomerDetails from './customerManagement/deleteCustomerDetailsReducer';
import resetPasswordDetails from  './resetPasswordReducer';

const rootReducer = combineReducers({
    flightDetails: flightDetails,
    addFlightDetails: addFlightDetails,
    deleteFlightDetails: deleteFlightDetails,
    getFlightsDetailsById: getFlightsDetailsById,
    updateFlightDetails: updateFlightDetails,
    getHotelsDetails: getHotelsDetails,
    addHotelDetails: addHotelDetails,
    //getflightDetailsById:getflightDetailsById,
    gethotelDetailsById:gethotelDetailsById,
    updatehotelDetails:updatehotelDetails,
    deleteHotelDetails:deleteHotelDetails,
    searchHotelsDetails:searchHotelsDetails,
    tripsDetails:tripsDetails,
    searchTripsDetails:searchTripsDetails,
    getTripDetailsById:getTripDetailsById,
    filterTripsDetails:filterTripsDetails,
    deleteTripDetails:deleteTripDetails,
    signinSlice:signinSlice,
    signInReducer: signInReducer,
    dropDetails: dropDetails,
    addDropDetails: addDropDetails,
    deleteDropDetails: deleteDropDetails,
    updateDropDetails: updateDropDetails,
    updateTripDetails:updateTripDetails,
    addTripDetails:addTripDetails,
    customersDetails: customersDetails,
    searchCustomersDetails:searchCustomersDetails,
    updateCustomerDetails:updateCustomerDetails,
    deleteCustomerDetails:deleteCustomerDetails,
    resetPasswordDetails:resetPasswordDetails
});

export default rootReducer;