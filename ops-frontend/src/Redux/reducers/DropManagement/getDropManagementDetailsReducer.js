import * as type from '../../types';

const initialState = {
    drops: {'number':0, 'totalPages':0,"content":[]},
    loading: false,
    error: null
}

export default function dropDetails(state = initialState, action) {
    switch (action.type) {
        case type.GET_DROPS_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.GET_DROPS_SUCCESS:
            return {
                ...state,
                loading: false,
                drops: action.dropDetails
            }
        case type.GET_DROPS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message
            }
        default:
            return state;
    }
}