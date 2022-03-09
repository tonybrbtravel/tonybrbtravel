import { call, put, takeEvery ,takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import { Auth } from "aws-amplify";

const apiUrl = process.env.REACT_APP_OPS_URL + '/ops/flightCarrier/';

async function addApi(data) {
  const session = await Auth.currentSession();
  const token = session.idToken.jwtToken;
    return axios({
        url: apiUrl,
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

function* addFlightsDetails(action) {

    try {
        const addflights = yield call(addApi,action.payload);
        yield put({ type: 'ADD_FLIGHTS_SUCCESS', addflights: addflights })
    } catch (e) {
        yield put({ type: 'ADD_FLIGHTS_FAILED', message: e.message })
    }
}

function* addFlightsDetailsSaga(){
    yield takeLatest('ADD_FLIGHTS_REQUESTED', addFlightsDetails)
}

export default addFlightsDetailsSaga;