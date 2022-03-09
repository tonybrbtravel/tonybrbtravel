import { call, put, takeEvery ,takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import { Auth } from "aws-amplify";

const apiUrl = process.env.REACT_APP_OPS_URL + '/ops/hotels/';

async function updateHotelApi(data) {
  const id = data.id;
  delete data["id"];
  const session = await Auth.currentSession();
  const token = session.idToken.jwtToken;
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

function* updateHotelDetails(action) {
    try {
        const updatehotel = yield call(updateHotelApi,action.payload);
        yield put({ type: 'UPDATE_HOTEL_SUCCESS', updatehotel: updatehotel })
    } catch (e) {
        yield put({ type: 'UPDATE_HOTEL_FAILED', message: e.message })
    }
}

function* updateHotelDetailsSaga(){
    yield takeLatest('UPDATE_HOTEL_REQUESTED', updateHotelDetails)
}

export default updateHotelDetailsSaga;