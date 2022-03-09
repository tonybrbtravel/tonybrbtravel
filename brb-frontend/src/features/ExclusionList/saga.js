import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';

import { Auth } from 'aws-amplify';
import { request } from '../../app/request';

import { exclusionsFormUpdate, selectExclusions } from './exclusionListSlice';
import {
  dashboardUserUpdate,
  selectUser,
} from '../dashboard/dashboardSlice';
import { errorMessage } from '../../utils/helper';

export function* saveExclusions() {
  try {
    const form = yield select(selectExclusions());
    const baseURL = process.env.REACT_APP_USER_URL;
    const session = yield Auth.currentSession();
    const token = session.idToken.jwtToken;
    const response = yield call(
      request,
      baseURL,
      '/user/profile/top10-destinations',
      'PUT',
      token,
      JSON.stringify(form),
    );
    yield put(dashboardUserUpdate(response.data));
  } catch (err) {
    errorMessage(err);
  }
}

export function* exclusionListWatcher() {
  yield takeLatest(exclusionsFormUpdate().type, saveExclusions);
}
