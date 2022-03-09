import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import * as type from '../../types';

const initialState = {
    deleteCustomer:{"data":''},
    loading: false,
    error: null
}

export default function deleteCustomerDetails(state = initialState, action) {
    switch (action.type) {
        case type.DELETE_CUSTOMERSDETAILS_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.DELETE_CUSTOMERSDETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                deleteCustomer: action.deleteCustomer
            }
        case type.DELETE_CUSTOMERSDETAILS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message
            }
        default:
            return state;
    }
}