import { call, put, takeEvery ,takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import { Auth } from "aws-amplify";

const apiUrl = process.env.REACT_APP_OPS_URL + '/ops/flightCarrier/';
async function updateFlightsApi(data) {
  const session = await Auth.currentSession();
  const token = session.idToken.jwtToken;
  const id = data.id;
  delete data["id"];
    return axios({
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

function* updateFlightsDetails(action) {
    try {
        const updateflights = yield call(updateFlightsApi,action.payload);
        yield put({ type: 'UPDATE_FLIGHTS_SUCCESS', updateflights: updateflights })
    } catch (e) {
        yield put({ type: 'UPDATE_FLIGHTS_FAILED', message: e.message })
    }
}

function* updateFlightsDetailsSaga(){
    yield takeLatest('UPDATE_FLIGHTS_REQUESTED', updateFlightsDetails)
}

export default updateFlightsDetailsSaga;