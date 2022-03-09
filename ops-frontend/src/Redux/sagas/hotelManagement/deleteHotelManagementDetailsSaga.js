import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { Auth } from "aws-amplify";

const apiUrl = process.env.REACT_APP_OPS_URL + '/ops/hotels/';

async function deleteHotelApi(id) {
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

function* deleteHotelDetails(action) {
    try {
        const deletehotel = yield call(deleteHotelApi,action.payload);
        yield put({ type: 'DELETE_HOTEL_SUCCESS', deletehotel : deletehotel })
    } catch (e) {
        yield put({ type: 'DELETE_HOTEL_FAILED', message: e.message })
    }
}

function* deleteHotelDetailsSaga(){
    yield takeEvery('DELETE_HOTEL_REQUESTED', deleteHotelDetails)
}

export default deleteHotelDetailsSaga;