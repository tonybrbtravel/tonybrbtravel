import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

export const MyAccountSlice = createSlice({
  name: 'myAccount',
  initialState: {
    userInfo: [],
    userEmailPreferences: [],
  },
  reducers: {
    updateUserAccountDetails: (state, action) => {
      state.userInfo = action.payload;
    },

    updateUserEmailPreferences: (state, action) => {
      state.userEmailPreferences = action.payload;
    },

    // updateUserInfo : () => {console.error("af")}
  },
});

export const { updateUserAccountDetails, updateUserEmailPreferences } = MyAccountSlice.actions;

/** Create Selector */
const myAccountInfo = (state: any) => state.myAccount;

export const getAccountFormData = () => createSelector(myAccountInfo, (myAccountData) => myAccountData.userInfo);

export const getUserEmailPrefFormData = () => createSelector(
  myAccountInfo,
  (myAccountData) => myAccountData.userEmailPreferences,
);

export default MyAccountSlice.reducer;
