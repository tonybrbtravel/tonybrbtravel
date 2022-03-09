import { call, put, takeEvery } from 'redux-saga/effects';
import { Auth } from "aws-amplify";
//const apiUrl = 'http://apistaging.berightback.travel/trip/trip-ops/view-trips/?size=20&page=';
const apiUrl = process.env.REACT_APP_TRIP_URL  + '/trip/trip-ops/view-trips/?size=200&page=';

async function getTripsApi(page) {
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

function* fetchTripsDetails(action) {
    try {
        const trips = yield call(getTripsApi,action.payload);
        yield put({ type: 'GET_TRIPS_SUCCESS', trips: trips })
    } catch (e) {
        yield put({ type: 'GET_TRIPS_FAILED', message: e.message })
    }
}

function* fetchTripsDetailsSaga(){
    yield takeEvery('GET_TRIPS_REQUESTED', fetchTripsDetails)
}

export default fetchTripsDetailsSaga;