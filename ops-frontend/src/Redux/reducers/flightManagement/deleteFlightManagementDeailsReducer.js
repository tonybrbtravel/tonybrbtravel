import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import * as type from '../../types';

const initialState = {
    deleteflight:{'data':''},
    loading: false,
    error: null
}

export default function deleteFlightDetails(state = initialState, action) {
    switch (action.type) {
        case type.DELETE_FLIGHTS_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.DELETE_FLIGHTS_SUCCESS:
            return {
                ...state,
                loading: false,
                deleteflight: action.deleteflight
            }
        case type.DELETE_FLIGHTS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message
            }
        default:
            return state;
    }
}