import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import * as type from '../../types';

const initialState = {
    searchtrips:{"currentPage": 0,"totalPages": 0,"elements": []},
    loading: false,
    error: null
}

export default function searchTripsDetails(state = initialState, action) {
    switch (action.type) {
        case type.SEARCH_TRIP_DETAILS_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.SEARCH_TRIP_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                searchtrips: action.searchtrips
            }
        case type.SEARCH_TRIP_DETAILS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message
            }
        default:
            return state;
    }
}