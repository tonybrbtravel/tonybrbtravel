import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import * as type from '../../types';

const initialState = {
    addhotel : [ {data: "", status:''}],
    loading: false,
    error: null
}

export default function addHotelDetails(state = initialState, action) {
    switch (action.type) {
        case type.ADD_HOTEL_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.ADD_HOTEL_SUCCESS:
            return {
                ...state,
                loading: false,
                addhotel: action.addhotel
            }
        case type.ADD_HOTEL_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message
            }
        default:
            return state;
    }
}