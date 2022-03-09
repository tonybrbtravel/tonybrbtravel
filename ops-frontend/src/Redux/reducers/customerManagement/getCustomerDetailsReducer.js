import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import * as type from '../../types';

const initialState = {
    customers: {'currentPage':0, 'totalPages':0,'elements':[]},
    loading: false,
    error: null
}

export default function customersDetails(state = initialState, action) {
    switch (action.type) {
        case type.GET_CUSTOMERS_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.GET_CUSTOMERS_SUCCESS:
            return {
                ...state,
                loading: false,
                customers: action.customers
            }
        case type.GET_CUSTOMERS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message
            }
        default:
            return state;
    }
}