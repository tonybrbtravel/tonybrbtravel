import * as type from '../../types';

const initialState = {
    addDropDetailsResponse: {},
    loading: false,
    error: null
}

export default function addDropDetails(state = initialState, action) {
    switch (action.type) {
        case type.ADD_DROPS_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.ADD_DROPS_SUCCESS:
            return {
                ...state,
                loading: false,
                addDropDetailsResponse: action.addDropDetails
            }
        case type.ADD_DROPS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message
            }
        default:
            return state;
    }
}