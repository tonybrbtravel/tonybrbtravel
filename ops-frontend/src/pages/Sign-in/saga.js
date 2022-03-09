import { call, put, select, takeLatest } from "redux-saga/effects";

//import { history } from "../../app/store";
//import { requestNoPayload } from "../../app/request";

import { Auth } from "aws-amplify";

import {
  signInFormUpdate,
  signInErrorUpdate,
  signInAuthenticatedUpdate,
  selectSignInForm,
} from "./signinSlice";
//import { dashboardUserUpdate } from "../dashboard/dashboardSlice";

export function* signIn() {
  try {
    const signInForm = yield select(selectSignInForm());

    /* sign-in user */
    const result = yield Auth.signIn(signInForm.email, signInForm.password);
    //const result = yield Auth.signIn("mahalakshmi.v@valuelabs.com", "M@halakshmi3");

    /* flag as authenticated */
    yield put(signInAuthenticatedUpdate(true));

    /* retrieve user details */
    //get user
    /*const baseURL = process.env.REACT_APP_USER_URL;
    const session = yield Auth.currentSession();
    const token = session.idToken.jwtToken;
    let user = yield call(
      requestNoPayload,
      baseURL,
      "/user/profile/",
      "GET",
      token
    );
    if (user) {
      //populate user details
      yield put(dashboardUserUpdate(user.data));
      if (user.data.profileStatus === 0) {
        yield put(history.push("/travel-preferences"));
      } else {
        yield put(history.push("/"));
      }
    }*/
  } catch (err) {
    console.log(err);
    yield put(signInErrorUpdate(err));
  }
}

export  default function* signInwatcher() {
  yield takeLatest(signInFormUpdate().type, signIn);
}
