import * as type from '../types';



export function  getAllCustomersDetails (customers) {
    return{
        type: type.GET_CUSTOMERS_REQUESTED,
        payload: customers
    }
}

export function  searchCustomerDetails (searchcustomers) {
    return{
        type: type.SEARCH_CUSTOMER_DETAILS_REQUESTED,
        payload: searchcustomers
    }
}

export function  getCustomerDetailsById (customerbyid) {
    return{
        type: type.GET_CUSTOMERSDETAILSBYID_REQUESTED,
        payload: customerbyid
    }
}

export function  updateCustomerDetails (updateCustomers) {
    return{
        type: type.UPDATE_CUSTOMERSDETAILS_REQUESTED,
        payload: updateCustomers
    }
}

export function  deleteCustomerDetails (deleteCustomer) {
    return{
        type: type.DELETE_CUSTOMERSDETAILS_REQUESTED,
        payload: deleteCustomer
    }
}
