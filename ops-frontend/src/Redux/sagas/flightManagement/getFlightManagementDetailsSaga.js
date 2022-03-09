import { call, put, takeEvery } from 'redux-saga/effects';
import { Auth } from "aws-amplify";

const apiUrl = process.env.REACT_APP_OPS_URL + '/ops/flightCarrier/?size=20&page=';


async function getApi(page) {
    const session = await Auth.currentSession();
    const token = session.idToken.jwtToken;
    return fetch(apiUrl+page, {
        method: 'GET',
        headers: {
            Authorization: "Bearer " + token,
            'content-Type': 'application/json',
        }
    }).then(response => response.json())
        .catch((error) => { throw error })
}

function* fetchFlightsDetails(action) {
    try {
        const payload = action.payload;
        const flights = yield call(getApi,payload);
        yield put({ type: 'GET_FLIGHTS_SUCCESS', flights: flights })
    } catch (e) {
        yield put({ type: 'GET_FLIGHTS_FAILED', message: e.message })
    }
}

function* fetchFlightsDetailsSaga(){
    yield takeEvery('GET_FLIGHTS_REQUESTED', fetchFlightsDetails)
}

export default fetchFlightsDetailsSaga;