import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { Auth } from "aws-amplify";

const apiUrl = process.env.REACT_APP_OPS_URL + '/ops/flightCarrier/';

function getFlightDetailbyIdApi(data) {
    return axios({
        url: apiUrl+id,
        method: "get",
        headers: {
          Authorization: "Bearer " + Token,
          "Content-Type": "application/json",
        },
        //data: data,
      }).then((response) => {
        return response;
      });
}

function* fetchFlightsDetailsById(action) {
    try {
      const session = yield Auth.currentSession();
      const Token = session.idToken.jwtToken;
        const flightbyid = yield call(getFlightDetailbyIdApi,[action.payload]);
        //console.log('idsdata.........',flightbyid)
        yield put({ type: 'GET_FLIGHTSDETAILSBYID_SUCCESS', flightbyid: flightbyid.data })
    } catch (e) {
        yield put({ type: 'GET_FLIGHTSDETAILSBYID_FAILED', message: e.message })
    }
}

function* fetchFlightsDetailsByIdSaga(){
    yield takeEvery('GET_FLIGHTSDETAILSBYID_REQUESTED', fetchFlightsDetailsById)
}

export default fetchFlightsDetailsByIdSaga;