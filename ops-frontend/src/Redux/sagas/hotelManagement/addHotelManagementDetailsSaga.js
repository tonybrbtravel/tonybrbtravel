import { call, put, takeEvery ,takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import { Auth } from "aws-amplify";

const apiUrl = process.env.REACT_APP_OPS_URL + '/ops/hotels/';

async function addHotelApi(data) {
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

function* addHotelDetails(action) {
    try {
        const addhotel = yield call(addHotelApi,action.payload);
        yield put({ type: 'ADD_HOTEL_SUCCESS', addhotel: addhotel })
    } catch (e) {
        yield put({ type: 'ADD_HOTEL_FAILED', message: e.message })
    }
}

function* addHotelDetailsSaga(){
    yield takeLatest('ADD_HOTEL_REQUESTED', addHotelDetails)
}

export default addHotelDetailsSaga;