import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import * as type from '../../types';

const initialState = {
    tripbyid : {},
    loading: false,
    error: null
}

export default function getTripDetailsById(state = initialState, action) {
    switch (action.type) {
        case type.GET_TRIP_DETAILSBYID_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.GET_TRIP_DETAILSBYID_SUCCESS:
            return {
                ...state,
                loading: false,
                tripbyid: action.tripbyid
            }
        case type.GET_TRIP_DETAILSBYID_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message
            }
        default:
            return state;
    }
}