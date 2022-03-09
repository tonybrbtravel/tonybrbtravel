import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import * as type from '../../types';

const initialState = {
    hotels: {'number':0, 'totalPages':0,"content":[]},
    loading: false,
    error: null
}

export default function getHotelsDetails(state = initialState, action) {
    switch (action.type) {
        case type.GET_HOTELS_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.GET_HOTELS_SUCCESS:
            return {
                ...state,
                loading: false,
                hotels: action.hotels
            }
        case type.GET_HOTELS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message
            }
        default:
            return state;
    }
}