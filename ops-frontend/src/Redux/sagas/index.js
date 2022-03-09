import { all } from "redux-saga/effects";
import fetchFlightsDetailsSaga from "./flightManagement/getFlightManagementDetailsSaga";
import addFlightsDetailsSaga from "./flightManagement/addFlightManagementDetailsSaga";
import deleteFlightDetailsSaga from "./flightManagement/deleteFlightManagementDetailsSaga";
import updateFlightsDetailsSaga from "./flightManagement/updateFlightManagementDetailsSaga";
import fetchHotelsDetailsSaga from "./hotelManagement/getHotelManagementDetailsSaga";
import addHotelDetailsSaga from "./hotelManagement/addHotelManagementDetailsSaga";
import fetchHotelDetailsByIdSaga from "./hotelManagement/getHotelDetailsByIdSaga";
import updateHotelDetailsSaga from "./hotelManagement/updateHotelManagementDetailsSaga";
import deleteHotelDetailsSaga from "./hotelManagement/deleteHotelManagementDetailsSaga";
import searchHotelDetailsSaga from "./hotelManagement/searchHotelDetailsSaga";
import fetchTripsDetailsSaga from "./tripManagement/getTripManagementDetailsSaga";
import searchTripsDetailsSaga from "./tripManagement/searchTripsDetailsSaga";
import fetchTripDetailsByIdSaga from "./tripManagement/getTripDetailsByIdSaga";
import filterTripsDetailsSaga from "./tripManagement/getFliteredTripDetailsSaga";
import signInDetailsSaga from "./signInSaga"
import signInwatcher from "../../pages/Sign-in/saga";
import deleteTripDetailsSaga from "./tripManagement/deleteTripDetailsSaga";
import fetchDropDetailsSaga from "./DropManagement/getDropManagementDetailsSaga";
import addDropDetailsSaga from "./DropManagement/addDropManagementDetailsSaga";
import deleteDropManagementDetailsSaga from "./DropManagement/deleteDropManagementDetailsSaga";
import updateDropDetailsSaga from './DropManagement/updateDropManagementDetailsSaga';
import updateTripDetailsSaga from './tripManagement/updateTripDetailsSaga';
import addTripDetailsSaga from './tripManagement/addTripDetailsSaga';
import fetchCustomersDetailsSaga from './customerManagement/getCustomerManagementDetailsSaga';
import searchCustomersDetailsSaga from './customerManagement/searchCustomerDetailsSaga';
import updateCustomerDetailsSaga from './customerManagement/UpdateCutomerDetailsSaga';
import deleteCustomerDetailsSaga from './customerManagement/deleteCustomerDetailsSaga';
import resetPasswordDetailsSaga from "./restPasswordSaga";

export default function* rootSaga() {
    yield all([
        fetchFlightsDetailsSaga(),
        addFlightsDetailsSaga(),
        deleteFlightDetailsSaga(),
        updateFlightsDetailsSaga(),
        fetchHotelsDetailsSaga(),
        addHotelDetailsSaga(),
        fetchHotelDetailsByIdSaga(),
        updateHotelDetailsSaga(),
        deleteHotelDetailsSaga(),
        searchHotelDetailsSaga(),
        fetchTripsDetailsSaga(),
        searchTripsDetailsSaga(),
        fetchTripDetailsByIdSaga(),
        filterTripsDetailsSaga(),
        signInwatcher(),
        signInDetailsSaga(),
        deleteTripDetailsSaga(),
        fetchDropDetailsSaga(),
        addDropDetailsSaga(),
        deleteDropManagementDetailsSaga(),
        updateDropDetailsSaga(),
        updateTripDetailsSaga(),
        addTripDetailsSaga(),
        fetchCustomersDetailsSaga(),
        searchCustomersDetailsSaga(),
        updateCustomerDetailsSaga(),
        deleteCustomerDetailsSaga(),
        resetPasswordDetailsSaga(),
    ])
}