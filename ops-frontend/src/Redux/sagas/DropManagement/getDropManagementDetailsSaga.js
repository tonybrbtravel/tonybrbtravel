import { call, put, takeLatest } from "redux-saga/effects";
import * as type from '../../types';
import { Auth } from "aws-amplify";

const apiUrl = process.env.REACT_APP_OPS_URL + '/ops/dropService/?size=10&page=';
// const apiUrl = 'https://apistaging.berightback.travel/ops/dropService/';

async function getDropsApi(pageNumber) {
    const session = await Auth.currentSession();
    const token = session.idToken.jwtToken;
    return fetch(apiUrl+pageNumber, {
        method: 'GET',
        headers: {
            Authorization: "Bearer " + token,
            'content-Type': 'application/json',
        }
    }).then(response => response.json())
        .catch((error) => { throw error })
}


function* getDropDetailsAsync(action) {
    console.log(action)
    try {
        const dropDetails = yield call(getDropsApi,action.payload);
        yield put({ type: type.GET_DROPS_SUCCESS, dropDetails: dropDetails })
    } catch (error) {
        yield put({ type: type.GET_DROPS_FAILED, message: error.message })
    }
}


function* fetchDropDetailsSaga() {
    yield takeLatest(type.GET_DROPS_REQUESTED, getDropDetailsAsync)
}


export default fetchDropDetailsSaga;