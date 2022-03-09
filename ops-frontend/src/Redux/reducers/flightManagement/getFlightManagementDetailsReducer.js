import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import * as type from '../../types';

const initialState = {
    flights: {'number':0, 'totalPages':0,"content":[]},
    loading: false,
    error: null
}

export default function flightDetails(state = initialState, action) {
    switch (action.type) {
        case type.GET_FLIGHTS_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.GET_FLIGHTS_SUCCESS:
            return {
                ...state,
                loading: false,
                flights: action.flights
            }
        case type.GET_FLIGHTS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message
            }
        default:
            return state;
    }
}