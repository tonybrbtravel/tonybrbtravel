import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import * as type from '../../types';

const initialState = {
    deletehotel:[],
    loading: false,
    error: null
}

export default function deleteHotelDetails(state = initialState, action) {
    switch (action.type) {
        case type.DELETE_HOTEL_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.DELETE_HOTEL_SUCCESS:
            return {
                ...state,
                loading: false,
                deletehotel: action.deletehotel
            }
        case type.DELETE_HOTEL_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message
            }
        default:
            return state;
    }
}