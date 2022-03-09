import { call, put, takeEvery } from 'redux-saga/effects';
import { Auth } from "aws-amplify";

const apiUrl = process.env.REACT_APP_OPS_URL + '/ops/customers?size=10&page=';


async function getCustomersApi(page) {
  const session = await Auth.currentSession();
  const token = session.idToken.jwtToken;
    return fetch(apiUrl+page, {
        method: 'GET',
        headers: {
            Authorization: "Bearer " + token,
            'content-Type': 'application/json',
        }
    }).then(response => response.json())
        .catch((error) => { throw error })
}

function* fetchCustomersDetails(action) {

    const payload = action.payload;

    try {
        const customers = yield call(getCustomersApi,payload);

        yield put({ type: 'GET_CUSTOMERS_SUCCESS', customers: customers })
    } catch (e) {
        yield put({ type: 'GET_CUSTOMERS_FAILED', message: e.message })
    }
}

function* fetchCustomersDetailsSaga(){
    yield takeEvery('GET_CUSTOMERS_REQUESTED', fetchCustomersDetails)
}

export default fetchCustomersDetailsSaga;