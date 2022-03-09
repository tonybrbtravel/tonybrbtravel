import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { Auth } from "aws-amplify";

const apiUrl = process.env.REACT_APP_TRIP_URL  + '/trip/trip-ops/';

async function deleteTripApi(id) {
  const session = await Auth.currentSession();
  const token = session.idToken.jwtToken;
    return axios({
        url: apiUrl+id,
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }).then((response) => {
        return response;
      });
}

function* deleteTripDetails(action) {

    try {
        const deletetrip = yield call(deleteTripApi,action.payload);
        yield put({ type: 'DELETE_TRIPS_SUCCESS', deletetrip : deletetrip })
    } catch (e) {
        yield put({ type: 'DELETE_TRIPS_FAILED', message: e.message })
    }
}

function* deleteTripDetailsSaga(){
    yield takeEvery('DELETE_TRIPS_REQUESTED', deleteTripDetails)
}

export default deleteTripDetailsSaga;