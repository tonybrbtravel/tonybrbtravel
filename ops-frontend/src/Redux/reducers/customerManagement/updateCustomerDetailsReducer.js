import * as type from '../../types';

const initialState = {
    updateCustomers: {"data":''},
    loading: false,
    error: null
}

export default function updateCustomerDetails(state = initialState, action) {
    switch (action.type) {
        case type.UPDATE_CUSTOMERSDETAILS_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.UPDATE_CUSTOMERSDETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                updateCustomers: action.updateCustomers
            }
        case type.UPDATE_CUSTOMERSDETAILS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message
            }
        default:
            return state;
    }
}