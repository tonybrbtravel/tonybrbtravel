import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { Auth } from "aws-amplify";
import * as type from '../../types';

const apiUrl = process.env.REACT_APP_OPS_URL + '/ops/customers/';
async function updateCustomersApi(data) {
    const session = await Auth.currentSession();
    const token = session.idToken.jwtToken;
    const id = data.user.id;
    // delete data["id"];
    return axios({
        url: apiUrl + id,
        method: "POST",
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
        },
        data: data,
    }).then((response) => {
        return response;
    });
}

function* updateCustomerDetails(action) {
    console.log('action....', action)
    try {
        const updateCustomers = yield call(updateCustomersApi, action.payload);
        yield put({ type: type.UPDATE_CUSTOMERSDETAILS_SUCCESS, updateCustomers: updateCustomers })
    } catch (e) {
        yield put({ type: type.UPDATE_CUSTOMERSDETAILS_FAILED, message: e.message })
    }
}

function* updateCustomerDetailsSaga() {
    yield takeLatest(type.UPDATE_CUSTOMERSDETAILS_REQUESTED, updateCustomerDetails)
}

export default updateCustomerDetailsSaga;