import * as type from '../types';



export function  getFlightsDetails (flights) {
    return{
        type: type.GET_FLIGHTS_REQUESTED,
        payload: flights
    }
}

export function  addFlightsDetails (addflights) {
    return{
        type: type.ADD_FLIGHTS_REQUESTED,
        payload: addflights
    }
}

export function  getFlightsDetailsById (flightbyid) {
    return{
        type: type.GET_FLIGHTSDETAILSBYID_REQUESTED,
        payload: flightbyid
    }
}

export function  updateFlightsDetails (updateflights) {
    return{
        type: type.UPDATE_FLIGHTS_REQUESTED,
        payload: updateflights
    }
}

export function  deleteFlightsDetails (deleteflights) {
    return{
        type: type.DELETE_FLIGHTS_REQUESTED,
        payload: deleteflights
    }
}