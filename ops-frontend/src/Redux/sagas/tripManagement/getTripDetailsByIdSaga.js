import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//const apiUrl = 'http://apistaging.berightback.travel/trip/trip-ops/';
//const apiUrl = 'http://localhost:8082/trip/trip-ops/';
const apiUrl = process.env.REACT_APP_TRIP_URL + '/trip/trip-ops/';

function getTripDetailbyIdApi(id) {
    return axios({
        url: apiUrl+id,
        method: "get",
        headers: {
          Authorization: "Bearer " ,
          "Content-Type": "application/json",
        },
        //data: data,
      }).then((response) => {
        return response;
      });
}

function* fetchTripDetailsById(action) {
  console.log('action...',action)
    try {
        const tripbyid = yield call(getTripDetailbyIdApi,action.payload);
        //console.log('idsdata.........',flightbyid)
        yield put({ type: 'GET_TRIP_DETAILSBYID_SUCCESS', tripbyid: tripbyid.data })
    } catch (e) {
        yield put({ type: 'GET_TRIP_DETAILSBYID_FAILED', message: e.message })
    }
}

function* fetchTripDetailsByIdSaga(){
    yield takeEvery('GET_TRIP_DETAILSBYID_REQUESTED', fetchTripDetailsById)
}

export default fetchTripDetailsByIdSaga;