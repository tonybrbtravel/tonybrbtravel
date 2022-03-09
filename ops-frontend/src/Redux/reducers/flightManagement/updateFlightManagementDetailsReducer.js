import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import * as type from '../../types';

const initialState = {
    updateflights: {"data":''},
    loading: false,
    error: null
}

export default function updateFlightDetails(state = initialState, action) {
    switch (action.type) {
        case type.UPDATE_FLIGHTS_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.UPDATE_FLIGHTS_SUCCESS:
            return {
                ...state,
                loading: false,
                updateflights: action.updateflights,
                error:null
            }
        case type.UPDATE_FLIGHTS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message
            }
        default:
            return state;
    }
}