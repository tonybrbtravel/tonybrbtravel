import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import * as type from '../../types';

const initialState = {
    addtrip: [ {data: "", status:''}],
    loading: false,
    error: null
}

export default function addTripDetails(state = initialState, action) {
    switch (action.type) {
        case type.ADD_TRIPS_REQUESTED:
        console.log(JSON.stringify(action.payload));
            return {
                ...state,
                loading: true,
            }
        case type.ADD_TRIPS_SUCCESS:
            return {
                ...state,
                loading: false,
                addtrip: action.addtrip
            }
        case type.ADD_TRIPS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message
            }
        default:
            return state;
    }
}