import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import * as type from '../../types';

const initialState = {
    trips: {"currentPage":'',"totalPages":'', "elements":[]},
    loading: false,
    error: null
}

export default function tripsDetails(state = initialState, action) {
    switch (action.type) {
        case type.GET_TRIPS_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.GET_TRIPS_SUCCESS:
            return {
                ...state,
                loading: false,
                trips: action.trips
            }
        case type.GET_TRIPS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message
            }
        default:
            return state;
    }
}