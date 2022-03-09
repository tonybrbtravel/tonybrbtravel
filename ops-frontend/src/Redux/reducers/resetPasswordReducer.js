import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import * as type from '../types';

const initialState = {
    resetPasswordresponse: null,
    loading: false,
    error: null
}

export default function resetPasswordDetails(state = initialState, action) {
    switch (action.type) {
        case type.RESET_PASSWORD_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                resetPasswordresponse: action.resetPasswordresponse
            }
        case type.RESET_PASSWORD_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message
            }
        default:
            return state;
    }
}