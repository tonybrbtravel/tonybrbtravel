import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

export const signinSlice = createSlice({
  name: 'signin',
  initialState: {
    signInForm: {
      email: null,
    },
    signInError: null,
    authenticated: false,
  },

  reducers: {
    signInFormUpdate: (state, action) => {
      state.signInForm = action.payload;
      state.signInForm.email = action.payload.email.toLowerCase();
    },
    signInErrorUpdate: (state, action) => {
      state.signInError = action.payload;
    },
    signInAuthenticatedUpdate: (state, action) => {
      state.authenticated = action.payload;
    },
  },
});

export const {
  signInFormUpdate,
  signInErrorUpdate,
  signInAuthenticatedUpdate,
} = signinSlice.actions;

/* create selectors */
const signInFormSelector = (state) => state.signin;
export const selectSignInForm = () => createSelector(signInFormSelector, (signin) => signin.signInForm);
export const selectSignInError = () => createSelector(signInFormSelector, (signin) => signin.signInError);
export const selectSignInAuthenticated = () => createSelector(signInFormSelector, (signin) => signin.authenticated);

export default signinSlice.reducer;
