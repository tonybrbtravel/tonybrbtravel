import { call, put, takeEvery } from 'redux-saga/effects';
import { Auth } from "aws-amplify";
//const apiUrl = 'https://apistaging.berightback.travel/ops/hotels/';
const apiUrl = process.env.REACT_APP_OPS_URL + '/ops/hotels/?size=20&page='

async function getHotelApi(page) {
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

function* fetchHotelsDetails(action) {
    try {
        const payload = action.payload;
        const hotels = yield call(getHotelApi,payload);
        yield put({ type: 'GET_HOTELS_SUCCESS', hotels: hotels })
    } catch (e) {
        yield put({ type: 'GET_HOTELS_FAILED', message: e.message })
    }
}

function* fetchHotelsDetailsSaga(){
    yield takeEvery('GET_HOTELS_REQUESTED', fetchHotelsDetails)
}

export default fetchHotelsDetailsSaga;