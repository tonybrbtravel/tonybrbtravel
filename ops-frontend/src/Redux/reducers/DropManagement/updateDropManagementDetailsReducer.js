import * as type from '../../types';

const initialState = {
    updateDropDetails: {"data":''},
    loading: false,
    error: null
}

export default function updateDropDetails(state = initialState, action) {
    switch (action.type) {
        case type.UPDATE_DROPDETAILS_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.UPDATE_DROPDETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                updateDropDetails: action.updateDropDetails
            }
        case type.UPDATE_DROPDETAILS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message
            }
        default:
            return state;
    }
}