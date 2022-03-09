import * as type from '../../types';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { Auth } from "aws-amplify";

const apiUrl = process.env.REACT_APP_OPS_URL + '/ops/dropService/';

async function updateDropDetailsApi(data) {
    const session = await Auth.currentSession();
    const token = session.idToken.jwtToken;
    const id = data.dropId;
    console.log('id....',id)
    delete data["dropId"];
    return axios({
        url: apiUrl + id,
        method: "PUT",
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
        },
        data: data,
    }).then((response) => {
        return response;
    });
}

function* updateDropDetailsAsync(action) {
    try {
        console.log('action....',action)
        const updateDropDetails = yield call(updateDropDetailsApi, action.payload);
        yield put({ type: type.UPDATE_DROPDETAILS_SUCCESS, updateDropDetails: updateDropDetails })
    } catch (error) {
        yield put({ type: type.UPDATE_DROPDETAILS_FAILED, message: error.message })
    }
}

function* updateDropDetailsSaga() {
    yield takeLatest(type.UPDATE_DROPDETAILS_REQUESTED, updateDropDetailsAsync)
}

export default updateDropDetailsSaga;