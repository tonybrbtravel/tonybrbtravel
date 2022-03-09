import { call, put, takeEvery } from 'redux-saga/effects';
import { Auth } from "aws-amplify";
import { Routes } from '../../routes';
import { history } from "../store";
import { Link, useHistory, withRouter } from 'react-router-dom';



function* signInDetails(action) {
    try {
        
        var signinresponse;
        //const hotels = yield call(getHotelApi);
        //yield put({ type: 'GET_HOTELS_SUCCESS', hotels: hotels })
        signinresponse = yield Auth.signIn(action.payload.email, action.payload.password);
        const opsUserVerified = signinresponse.attributes['custom:ops_user']
        const session = yield Auth.currentSession();
        const token = session.idToken.jwtToken;
        localStorage.setItem('token',token)
        yield put({ type: 'SET_TOKEN', isAuthonicated:true,token:token})
        yield put({ type: 'GET_SINGIN_SUCCESS', signinresponse :opsUserVerified})
        

    } catch (e) {
        yield put({ type: 'GET_SINGIN_FAILED', message: e.message })
    }
}

function* signInDetailsSaga(){
    yield takeEvery('GET_SINGIN_REQUESTED', signInDetails)
}

export default signInDetailsSaga;