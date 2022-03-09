import { call, put, takeLatest } from "redux-saga/effects";
import axios from 'axios';
import * as type from '../../types';
import { Auth } from "aws-amplify";

const apiUrl = process.env.REACT_APP_OPS_URL + '/ops/dropService/';

async function addDropApi(data) {
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

function* addDropDetailsAsync(action) {
  try {
    const addDropDetailsResponse = yield call(addDropApi, action.payload);
    yield put({ type: type.ADD_DROPS_SUCCESS, addDropDetails: addDropDetailsResponse })
  } catch (error) {
    yield put({ type: type.ADD_DROPS_FAILED, message: error.message })
  }
}

function* addDropDetailsSaga() {
  yield takeLatest(type.ADD_DROPS_REQUESTED, addDropDetailsAsync)
}

export default addDropDetailsSaga;