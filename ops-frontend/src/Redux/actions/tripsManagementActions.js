import * as type from '../types';

export function  getTripsDetails (trips) {
    return{
        type: type.GET_TRIPS_REQUESTED,
        payload: trips
    }
}

export function  searchTripsDetails (searchtrips) {
    return{
        type: type.SEARCH_TRIP_DETAILS_REQUESTED,
        payload: searchtrips
    }
}

export function  getTripDetailsById (tripbyid) {
    return{
        type: type.GET_TRIP_DETAILSBYID_REQUESTED,
        payload: tripbyid
    }
}

export function  filterTripsDetails (filtertrips) {
    return{
        type: type.FILTER_TRIP_DETAILS_REQUESTED,
        payload: filtertrips
    }
}

export function  addTripsDetails (addtrip) {
    return{
        type: type.ADD_TRIPS_REQUESTED,
        payload: addtrip
    }
}

export function  deleteTripsDetails (deletetrip) {
    return{
        type: type.DELETE_TRIPS_REQUESTED,
        payload: deletetrip
    }
}

export function  updateTripsDetails (updatetrip) {
    return{
        type: type.UPDATE_TRIPS_REQUESTED,
        payload: updatetrip
    }
}

export function  updateTripsDetailsFulfill (updatetrip) {
    return{
        type: type.UPDATE_TRIPS_REQUESTED_FULFILL,
        payload: updatetrip
    }
}