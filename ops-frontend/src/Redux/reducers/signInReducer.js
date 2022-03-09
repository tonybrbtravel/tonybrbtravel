import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import * as type from '../types';

const initialState = {
    signinresponse: false,
    loading: false,
    error: null,
    isAuthonicated: false,
    token: null
}

export default function signinresponseDetails(state = initialState, action) {
    switch (action.type) {
        case type.GET_SINGIN_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.GET_SINGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                signinresponse: action.signinresponse
            }
        case type.GET_SINGIN_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message,
                signinresponse: false
            }
            case type.SET_TOKEN:
            return{
                isAuthonicated: action.isAuthonicated,
                token: action.token
            }
        default:
            return state;
    }
}