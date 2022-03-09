import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import * as type from '../../types';

const initialState = {
    deletetrip:[],
    loading: false,
    error: null
}

export default function deleteTripDetails(state = initialState, action) {
    switch (action.type) {
        case type.DELETE_TRIPS_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.DELETE_TRIPS_SUCCESS:
            return {
                ...state,
                loading: false,
                deletetrip: action.deletetrip
            }
        case type.DELETE_TRIPS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message
            }
        default:
            return state;
    }
}