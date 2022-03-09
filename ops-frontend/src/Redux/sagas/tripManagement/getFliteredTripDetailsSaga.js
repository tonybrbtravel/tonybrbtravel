import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { Auth } from "aws-amplify";

const apiUrl = process.env.REACT_APP_TRIP_URL + '/trip/trip-ops/by-status/';
const pagequery = '?size=200&page='

async function filterTripsApi(filteritem) {
  const session = await Auth.currentSession();
  const token = session.idToken.jwtToken;
    return axios({
        url: apiUrl+filteritem.filtetKey+ pagequery+filteritem.pageNumber,
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }).then((response) => {
        return response;
      });
}

function* filterTripsDetails(action) {
  console.log('filter trip....action...',action)
    try {
        const filtertrips = yield call(filterTripsApi,action.payload);
        console.log('deeee......',filtertrips)
        yield put({ type: 'FILTER_TRIP_DETAILS_SUCCESS', filtertrips : filtertrips.data })
    } catch (e) {
        yield put({ type: 'FILTER_DETAILS_FAILED', message: e.message })
    }
}

function* filterTripsDetailsSaga(){
    yield takeEvery('FILTER_TRIP_DETAILS_REQUESTED', filterTripsDetails)
}

export default filterTripsDetailsSaga;