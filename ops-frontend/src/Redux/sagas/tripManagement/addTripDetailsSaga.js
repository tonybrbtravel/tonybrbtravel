import { call, put, takeEvery ,takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import { Auth } from "aws-amplify";

//const apiUrl = 'http://apistaging.berightback.travel/trip/trip-ops/';
//const apiUrl = 'http://localhost:8082/trip/trip-ops/';
const apiUrl = process.env.REACT_APP_TRIP_URL  + '/trip/trip-ops/';

async function addTripApi(data) {
  const session = await Auth.currentSession();
  const token = session.idToken.jwtToken;
    return axios({
        url: apiUrl,
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

function* addTripDetails(action) {
    try {
        const addtrip = yield call(addTripApi,action.payload);
        yield put({ type: 'ADD_TRIPS_SUCCESS', addtrip: addtrip })
    } catch (e) {
        yield put({ type: 'ADD_TRIPS_FAILED', message: e.message })
    }
}

function* addTripDetailsSaga(){
    yield takeLatest('ADD_TRIPS_REQUESTED', addTripDetails)
}

export default addTripDetailsSaga;