import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { Auth } from "aws-amplify";

const apiUrl = process.env.REACT_APP_OPS_URL + '/trip/trip-ops/search?keyword=';
const pagequery = '&size=10&page='
async function searchTripsApi(searchitem) {
  const session = await Auth.currentSession();
  const token = session.idToken.jwtToken;
    return axios({
        url: apiUrl+searchitem.searchKey+pagequery+searchitem.pageNumber,
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }).then((response) => {
        return response;
      });
}

function* searchTripsDetails(action) {
  console.log('search trip....action...',action)
    try {
        const searchtrips = yield call(searchTripsApi,action.payload);
        console.log('deeee......',searchtrips)
        yield put({ type: 'SEARCH_TRIP_DETAILS_SUCCESS', searchtrips : searchtrips.data })
    } catch (e) {
        yield put({ type: 'SEARCH_TRIP_DETAILS_FAILED', message: e.message })
    }
}

function* searchTripsDetailsSaga(){
    yield takeEvery('SEARCH_TRIP_DETAILS_REQUESTED', searchTripsDetails)
}

export default searchTripsDetailsSaga;