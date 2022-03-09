import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

export const socialSignupSlice = createSlice({
  name: 'socialSignup',
  initialState: {
    socialSignUpForm: {
      email: null,
    },
    cognitoSuccess: false, // customer created in Cognito
  },

  reducers: {
    socialSignUpFormUpdate: (state, action) => {
      state.socialSignUpForm = action.payload;
    },
    cognitoSuccessUpdate: (state, action) => {
      // alert("setting signed in status to true")
      state.cognitoSuccess = action.payload;
    },
  },
});

export const { socialSignUpFormUpdate, cognitoSuccessUpdate } = socialSignupSlice.actions;

/* create selectors */
const socialSignUpFormSelector = (state) => state.socialSignup;
export const socialSelectSignUpForm = () => createSelector(socialSignUpFormSelector, (socialSignup) => socialSignup.socialSignUpForm);

export default socialSignupSlice.reducer;
