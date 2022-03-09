import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import * as type from '../../types';

const initialState = {
    addflights: [ {data: "", status:''}],
    loading: false,
    error: null
}

export default function addFlightDetails(state = initialState, action) {
    switch (action.type) {
        case type.ADD_FLIGHTS_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.ADD_FLIGHTS_SUCCESS:
            return {
                ...state,
                loading: false,
                addflights: action.addflights
            }
        case type.ADD_FLIGHTS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message
            }
        default:
            return state;
    }
}