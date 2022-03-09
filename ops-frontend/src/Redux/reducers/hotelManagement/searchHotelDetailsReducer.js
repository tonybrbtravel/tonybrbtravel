import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import * as type from '../../types';

const initialState = {
    searchhotels: {'number':0, 'totalPages':0,"content":[]},
    loading: false,
    error: null
}

export default function searchHotelsDetails(state = initialState, action) {
    switch (action.type) {
        case type.SEARCH_HOTEL_DETAILS_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.SEARCH_HOTEL_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                searchhotels: action.searchhotels
            }
        case type.SEARCH_HOTEL_DETAILS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message
            }
        default:
            return state;
    }
}