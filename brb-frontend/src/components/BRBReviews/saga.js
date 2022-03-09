import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';

import { Auth } from 'aws-amplify';

import { brbBestReviewsUpdate, selectBestReviews, getBestReviewsInfo } from './BRBReviewsSlice';
import { selectUser } from '../../features/dashboard/dashboardSlice';
import { requestNoPayload } from '../../app/request';

export function* getBrbBestReviewsInfo() {
  try {
    // const user = yield select(selectUser());
    // const baseURL = process.env.REACT_API_TRIP_URL;
    // const session = yield Auth.currentSession();
    // const token = session.id.jwtToken;

    // const response = yield call(
    //     requestNoPayload,
    //     baseURL,
    //     "/hotels/",
    //     "GET",
    //     token
    // );

    const response = [
      { name: 'Kate', message: 'So much fun!', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque eu rhoncus fames amet pretium nulla vel. ' },
      { name: 'Kate', message: 'So much fun!', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque eu rhoncus fames amet pretium nulla vel. ' },
      { name: 'Kate', message: 'So much fun!', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque eu rhoncus fames amet pretium nulla vel. ' },
    ];

    console.log('==== BRB Best Reviews Response =====', (response));
    if (response) {
      yield put(brbBestReviewsUpdate(response));
    }
  } catch (err) {
    console.log('===== BRB Best Reviews ERROR ==== ', err);
  }
}

export function* bestReviewsWatcher() {
  yield takeLatest(getBestReviewsInfo().type, getBrbBestReviewsInfo);
}
