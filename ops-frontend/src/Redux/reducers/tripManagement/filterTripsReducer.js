import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import * as type from '../../types';

const initialState = {
    filtertrips: {"currentPage": 0,"totalPages": 0,"elements": []},
    loading: false,
    error: null
}

export default function filterTripsDetails(state = initialState, action) {
    switch (action.type) {
        case type.FILTER_TRIP_DETAILS_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.FILTER_TRIP_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                filtertrips: action.filtertrips
            }
        case type.FILTER_DETAILS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message
            }
        default:
            return state;
    }
}