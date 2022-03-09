import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_OPS_URL + '/ops/hotels/';

function getHotelDetailbyIdApi(id) {
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

function* fetchHotelDetailsById(action) {
    try {
        const hotelbyid = yield call(getHotelDetailbyIdApi,action.payload);
        //console.log('idsdata.........',flightbyid)
        yield put({ type: 'GET_HOTELDETAILSBYID_SUCCESS', hotelbyid: hotelbyid.data })
    } catch (e) {
        yield put({ type: 'GET_HOTELDETAILSBYID_FAILED', message: e.message })
    }
}

function* fetchHotelDetailsByIdSaga(){
    yield takeEvery('GET_HOTELDETAILSBYID_REQUESTED', fetchHotelDetailsById)
}

export default fetchHotelDetailsByIdSaga;