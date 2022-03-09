import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import * as type from '../../types';

const initialState = {
    updatetrip: {"data":''},
    loading: false,
    error: null
}

export default function updateTripDetails(state = initialState, action) {
    switch (action.type) {
        case type.UPDATE_TRIPS_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.UPDATE_TRIPS_REQUESTED_FULFILL:
            return {
                ...state,
                loading: true,
            }
        case type.UPDATE_TRIPS_SUCCESS:
            return {
                ...state,
                loading: false,
                updatetrip: action.updatetrip,
                error:null
            }
        case type.UPDATE_TRIPS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message,
                updatetrip:''
            }
        default:
            return state;
    }
}