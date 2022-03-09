import * as type from '../../types';
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { Auth } from "aws-amplify";

const apiUrl = process.env.REACT_APP_OPS_URL + '/ops/dropService/';

async function deleteDropManagementDetailsApi(id) {
    const session = await Auth.currentSession();
    const token = session.idToken.jwtToken;
    return axios({
        url: apiUrl + id,
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
        },
    }).then((response) => {
        return response;
    });
}

function* deleteDropManagementDetailsAsync(action) {
    try {
        const response = yield call(deleteDropManagementDetailsApi, action.payload);
        console.log(response);
        //yield put({ type: type.GET_DROPS_REQUESTED });
        yield put({ type: type.DELETE_DROPDETAILS_SUCCESS, deleteDropDetails: response });
    } catch (error) {
        console.log(error);
        yield put({ type: type.DELETE_DROPDETAILS_FAILED, message: error.message })
    }
}

function* deleteDropManagementDetailsSaga() {
    yield takeEvery(type.DELETE_DROPDETAILS_REQUESTED, deleteDropManagementDetailsAsync)
}

export default deleteDropManagementDetailsSaga;