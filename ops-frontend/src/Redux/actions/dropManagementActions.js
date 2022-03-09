import * as type from '../types';

export const getDropDetailsRequest = (drops) => {
    return {
        type: type.GET_DROPS_REQUESTED,
        payload: drops
    }
}

export function addDropDetailsRequest(addDropDetails) {
    return {
        type: type.ADD_DROPS_REQUESTED,
        payload: addDropDetails
    }
}

export function deleteDropDetails(deleteDropDetails) {
    return {
        type: type.DELETE_DROPDETAILS_REQUESTED,
        payload: deleteDropDetails
    }
}

export function updateDropDetails(updateDropDetails) {
    return {
        type: type.UPDATE_DROPDETAILS_REQUESTED,
        payload: updateDropDetails
    }
}