import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';

import { Auth } from 'aws-amplify';

import { brbBestHotelsUpdate, selectBestHotels, getBestHotelsInfo } from './BRBBestHotelsSlice';
import { selectUser } from '../../features/dashboard/dashboardSlice';
import { requestNoPayload } from '../../app/request';

export function* getBrbBestHotelsInfo() {
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
      {
        image: 'card1.png', place: 'Santi', city: 'Krakow', rating: '3',
      },
      {
        image: 'card2.png', place: 'Gat Point Charlie', city: 'Berlin', rating: '3',
      },
      {
        image: 'card3.png', place: 'Palazzo Paruta', city: 'Venice', rating: '3',
      },
    ];

    console.log('==== BRB Response =====', (response));
    if (response) {
      yield put(brbBestHotelsUpdate(response));
    }
  } catch (err) {
    console.log('===== BRB Best Hotels ERROR ==== ', err);
  }
}

export function* bestHotelsWatcher() {
  yield takeLatest(getBestHotelsInfo().type, getBrbBestHotelsInfo);
}
