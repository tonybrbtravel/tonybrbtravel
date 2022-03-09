import { call, put, takeEvery } from 'redux-saga/effects';
import { Auth } from "aws-amplify";
import { Routes } from '../../routes';
import { history } from "../store";
import { Link, useHistory, withRouter } from 'react-router-dom';



function* resetPasswordDetails(action) {
    try {
        const user = yield Auth.currentAuthenticatedUser();

        var resetpassword =  yield Auth.changePassword(user, action.payload.oldPassword, action.payload.newPassword)
        //var resetpassword =  yield Auth.changePassword(user, action.payload.oldPassword, action.payload.newPassword);
        yield put({ type: 'RESET_PASSWORD_SUCCESS', resetPasswordresponse :resetpassword})
        // var signinresponse;
        // //const hotels = yield call(getHotelApi);
        // //yield put({ type: 'GET_HOTELS_SUCCESS', hotels: hotels })
        // signinresponse = yield Auth.signIn(action.payload.email, action.payload.password);
        // const opsUserVerified = signinresponse.attributes['custom:ops_user']
        // const session = yield Auth.currentSession();
        // const token = session.idToken.jwtToken;
        // yield put({ type: 'SET_TOKEN', isAuthonicated:true,token:token})
        // yield put({ type: 'GET_SINGIN_SUCCESS', signinresponse :opsUserVerified})
        
        //console.log('session,token...........',session,token)
    } catch (e) {
        console.log('error',e)
        yield put({ type: 'RESET_PASSWORD_FAILED', message: e.message })
    }
}

function* resetPasswordDetailsSaga(){
    yield takeEvery('RESET_PASSWORD_REQUESTED', resetPasswordDetails)
}

export default resetPasswordDetailsSaga;