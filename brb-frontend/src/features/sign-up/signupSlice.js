import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

export const signupSlice = createSlice({
  name: 'signup',
  initialState: {
    signUpForm: {
      email: null,
    },
    signUpError: null,
    code: null, // verification code
    verifyActive: false, // display verify UI or not?
    cognitoSuccess: false, // customer created in Cognito
    userExists: false,
    codeUpdateStatus: null,
  },

  reducers: {
    signUpFormUpdate: (state, action) => {
      // action.payload.email = action.payload.email.toLowerCase();
      state.signUpForm = action.payload;
      state.signUpForm.email = action.payload.email.toLowerCase();
    },
    signUpErrorUpdate: (state, action) => {
      state.signUpError = action.payload;
    },
    verifyActiveUpdate: (state, action) => {
      state.verifyActive = action.payload;
    },
    codeUpdate: (state, action) => {
      state.code = action.payload;
    },
    cognitoSuccessUpdate: (state, action) => {
      state.cognitoSuccess = action.payload;
    },
    resendCode: (state) => {
      state.code = null;
    },
    userExists: (state, action) => {
      state.signUpForm = action.payload;
    },
    signUpCodeUpdateStatus: (state, action) => {
      state.codeUpdateStatus = action.payload;
    },
  },
});

export const {
  userExists,
  signUpFormUpdate,
  signUpErrorUpdate,
  verifyActiveUpdate,
  codeUpdate,
  cognitoSuccessUpdate,
  resendCode,
  signUpCodeUpdateStatus,
} = signupSlice.actions;

/* create selectors */
const signUpFormSelector = (state) => state.signup;
export const selectSignUpForm = () => createSelector(signUpFormSelector, (signup) => signup.signUpForm);
export const selectSignUpError = () => createSelector(signUpFormSelector, (signup) => signup.signUpError);
export const selectVerifyActive = () => createSelector(signUpFormSelector, (signup) => signup.verifyActive);
export const selectCode = () => createSelector(signUpFormSelector, (signup) => signup.code);

export default signupSlice.reducer;
