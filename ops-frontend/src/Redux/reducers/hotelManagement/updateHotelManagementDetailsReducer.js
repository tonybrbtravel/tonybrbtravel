import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import * as type from '../../types';

const initialState = {
    updatehotel: {"data":''},
    loading: false,
    error: null
}

export default function updateHotelDetails(state = initialState, action) {
    switch (action.type) {
        case type.UPDATE_HOTEL_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.UPDATE_HOTEL_SUCCESS:
            return {
                ...state,
                loading: false,
                updatehotel: action.updatehotel,
                error:null
            }
        case type.UPDATE_HOTEL_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message
            }
        default:
            return state;
    }
}