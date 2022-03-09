import * as type from '../../types';

const initialState = {
    deleteDropDetails: [],
    loading: false,
    error: null
}

export default function deleteDropDetails(state = initialState, action) {
    switch (action.type) {
        case type.DELETE_DROPDETAILS_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.DELETE_DROPDETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                deleteDropDetails: action.deleteDropDetails
            }
        case type.DELETE_DROPDETAILS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message
            }
        default:
            return state;
    }
}