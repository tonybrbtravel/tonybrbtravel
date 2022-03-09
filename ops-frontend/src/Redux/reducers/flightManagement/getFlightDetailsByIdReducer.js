import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import * as type from '../../types';

const initialState = {
    flightbyid: {},
    loading: false,
    error: null
}

export default function getflightDetailsById(state = initialState, action) {
    switch (action.type) {
        case type.GET_FLIGHTSDETAILSBYID_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.GET_FLIGHTSDETAILSBYID_SUCCESS:
            return {
                ...state,
                loading: false,
                flightbyid: action.flightbyid
            }
        case type.GET_FLIGHTSDETAILSBYID_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message
            }
        default:
            return state;
    }
}