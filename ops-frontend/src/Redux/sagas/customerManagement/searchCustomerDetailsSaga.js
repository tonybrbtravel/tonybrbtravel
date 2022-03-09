import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { Auth } from "aws-amplify";

const apiUrl = process.env.REACT_APP_OPS_URL + '/ops/customers?searchKey=';
const pagequery = '&size=10&page='
//const apiUrl= 'http://apistaging.berightback.travel/ops/customers?searchKey=chinnamvamsikrishna@gmail.com&page=1&size=10'
async function searchCustomersApi(searchitem) {
  const session = await Auth.currentSession();
  const token = session.idToken.jwtToken;
    return axios({
        url: apiUrl+searchitem.key+pagequery+searchitem.pageNumber,
        //url: apiUrl,
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }).then((response) => {
        return response;
      });
}

function* searchCustomersDetails(action) {

    try {
        const searchcustomers = yield call(searchCustomersApi,action.payload);
        yield put({ type: 'SEARCH_CUSTOMER_DETAILS_SUCCESS', searchcustomers : searchcustomers.data })
    } catch (e) {
        yield put({ type: 'SEARCH_CUSTOMER_DETAILS_FAILED', message: e.message })
    }
}

function* searchCustomersDetailsSaga(){
    yield takeEvery('SEARCH_CUSTOMER_DETAILS_REQUESTED', searchCustomersDetails)
}

export default searchCustomersDetailsSaga;