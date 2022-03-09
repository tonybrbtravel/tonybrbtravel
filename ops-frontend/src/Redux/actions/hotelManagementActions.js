import * as type from '../types';

export function  getHotelsDetails (hotels) {
    return{
        type: type.GET_HOTELS_REQUESTED,
        payload: hotels
    }
}

export function  addHotelDetails (addhotel) {
    return{
        type: type.ADD_HOTEL_REQUESTED,
        payload: addhotel
    }
}

export function  getHotelDetailsById (hotelbyid) {
    return{
        type: type.GET_HOTELDETAILSBYID_REQUESTED,
        payload: hotelbyid
    }
}

export function  updateHotelDetails (updatehotel) {
    return{
        type: type.UPDATE_HOTEL_REQUESTED,
        payload: updatehotel
    }
}

export function  deleteHotelDetails (deletehotel) {
    return{
        type: type.DELETE_HOTEL_REQUESTED,
        payload: deletehotel
    }
}

export function  searchHotelsDetails (searchhotels) {
    return{
        type: type.SEARCH_HOTEL_DETAILS_REQUESTED,
        payload: searchhotels
    }
}
