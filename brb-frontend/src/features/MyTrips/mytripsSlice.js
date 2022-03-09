import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

export const mytripsSlice = createSlice({
  name: 'mytrips',
  initialState: {
    userTrips: [],
    timerDate: null,
    tripOperations: { status: false, message: null },
    tripData: [],
  },
  reducers: {
    userTripsUpdate: (state, action) => {
      state.userTrips += action.payload;
    },
    userTripsData: (state, action) => {
      state.userTrips = action.payload;
    },
    userDeleteTrip: (state, action) => {},
    userLockTrip: (state, action) => {},
    userTimerDateSet: (state, action) => {
      state.timerDate = action.payload.date;
    },
    tripTimer: (state, action) => {},
  },
});

export const {
  userTripsUpdate,
  userTripsData,
  userDeleteTrip,
  userLockTrip,
  userTimerDateSet,
  tripTimer,
} = mytripsSlice.actions;

/* create selectors */
const userTripsSelector = (state) => state.mytrips;
export const selectUserTrips = () => createSelector(userTripsSelector, (mytrips) => mytrips.userTrips);
// export const selectUserTripsError= () => createSelector(userTripsSelector, mytrips => mytrips.userTripsError);

export default mytripsSlice.reducer;
