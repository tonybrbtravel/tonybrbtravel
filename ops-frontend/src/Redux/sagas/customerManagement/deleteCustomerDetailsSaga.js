import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { Auth } from "aws-amplify";

const apiUrl = process.env.REACT_APP_OPS_URL + '/ops/customers/';

async function deleteCustomerApi(id) {
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

function* deleteCustomerDetails(action) {

    try {
        const deleteCustomer = yield call(deleteCustomerApi,action.payload);
        yield put({ type: 'DELETE_CUSTOMERSDETAILS_SUCCESS',deleteCustomer : deleteCustomer })
    } catch (e) {
        yield put({ type: 'DELETE_CUSTOMERSDETAILS_FAILED', message: e.message })
    }
}

function* deleteCustomerDetailsSaga(){
    yield takeEvery('DELETE_CUSTOMERSDETAILS_REQUESTED', deleteCustomerDetails)
}

export default deleteCustomerDetailsSaga;