import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { Auth } from "aws-amplify";

const apiUrl = process.env.REACT_APP_OPS_URL + '/ops/hotels/search/?searchText=';
const pagequery = '&size=10&page='

async function searchHotelApi(searchitem) {
  const session = await Auth.currentSession();
  const token = session.idToken.jwtToken;
    return axios({
        url: apiUrl+searchitem.key+pagequery+searchitem.pageNumber,
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }).then((response) => {
        return response;
      });
}

function* searchHotelDetails(action) {
    try {
        const searchhotels = yield call(searchHotelApi,action.payload);
        yield put({ type: 'SEARCH_HOTEL_DETAILS_SUCCESS', searchhotels : searchhotels.data })
    } catch (e) {
        yield put({ type: 'SEARCH_HOTEL_DETAILS_FAILED', message: e.message })
    }
}

function* searchHotelDetailsSaga(){
    yield takeEvery('SEARCH_HOTEL_DETAILS_REQUESTED', searchHotelDetails)
}

export default searchHotelDetailsSaga;