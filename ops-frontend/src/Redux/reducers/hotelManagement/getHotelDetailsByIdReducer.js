import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import * as type from '../../types';

const initialState = {
    hotelbyid: {},
    loading: false,
    error: null
}

export default function gethotelDetailsById(state = initialState, action) {
    switch (action.type) {
        case type.GET_HOTELDETAILSBYID_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.GET_HOTELDETAILSBYID_SUCCESS:
            return {
                ...state,
                loading: false,
                hotelbyid: action.hotelbyid
            }
        case type.GET_HOTELDETAILSBYID_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message
            }
        default:
            return state;
    }
}