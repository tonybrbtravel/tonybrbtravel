import { call, put, takeEvery ,takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import { Auth } from "aws-amplify";

//const apiUrl = 'http://apistaging.berightback.travel/trip/trip-ops/';
//const apiUrl = 'http://localhost:8082/trip/trip-ops/';
const apiUrl = process.env.REACT_APP_TRIP_URL + '/trip/trip-ops/';
const apiUrlFulfill = process.env.REACT_APP_TRIP_URL + '/trip/trip-ops-fulfill/';
async function updateTripApi(data) {
  // const id = data.flightDestAccomDetails.tripId;
  // console.log('saga................',id)
  const session = await Auth.currentSession();
  const token = session.idToken.jwtToken;
  const id = data.id;
  delete data["id"];
    return axios({
        //url: apiUrl+id,
        url: apiUrl+id,
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

async function updateTripApiFulfill(data) {
  // const id = data.flightDestAccomDetails.tripId;
  // console.log('saga................',id)
  const session = await Auth.currentSession();
  const token = session.idToken.jwtToken;
  const id = data.id;
  delete data["id"];
    return axios({
        //url: apiUrl+id,
        url: apiUrlFulfill+id,
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

function* updateTripDetails(action) {
    console.log('action....',action)
    try {
        const updatetrip = yield call(updateTripApi,action.payload);
        yield put({ type: 'UPDATE_TRIPS_SUCCESS', updatetrip: updatetrip })
    } catch (e) {
        yield put({ type: 'UPDATE_TRIPS_FAILED', message: e.message })
    }
}

function* updateTripDetailsFulfill(action) {
    console.log('action....',action)
    try {
        const updatetrip = yield call(updateTripApiFulfill,action.payload);
        yield put({ type: 'UPDATE_TRIPS_SUCCESS', updatetrip: updatetrip })
    } catch (e) {
        yield put({ type: 'UPDATE_TRIPS_FAILED', message: e.message })
    }
}

function* updateTripDetailsSaga(){
    yield takeLatest('UPDATE_TRIPS_REQUESTED', updateTripDetails)
    yield takeLatest('UPDATE_TRIPS_REQUESTED_FULFILL', updateTripDetailsFulfill)
}

export default updateTripDetailsSaga;