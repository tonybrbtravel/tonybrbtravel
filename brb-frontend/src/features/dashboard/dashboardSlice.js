import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    user: {},
    userImage: '',
    ssoUserName: '',
  },

  reducers: {
    dashboardUserUpdate: (state, action) => {
      state.user = action.payload;
    },

    dashboardUserImageUpdate: (state, action) => {
      state.userImage = action.payload;
    },
    fetchUserImageDetails: () => {

    },
    fetchSSOUserDetails: () => {
    },
    getSSOUserDetails: (state, action) => {
      state.ssoUserName = action.payload;
    },
  },
});

export const {
  dashboardUserUpdate, dashboardUserImageUpdate, fetchUserImageDetails, fetchSSOUserDetails, getSSOUserDetails,
} = dashboardSlice.actions;

/* create selectors */
const dashboardSelector = (state) => state.dashboard;
export const selectUser = () => createSelector(dashboardSelector, (dashboard) => dashboard.user);

export const fetchUserImage = () => createSelector(dashboardSelector, (dashboard) => dashboard.userImage);

export default dashboardSlice.reducer;
