import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

export const exclusionListSlice = createSlice({
  name: 'exclusionList',
  initialState: {
    exclusions: {},
  },

  reducers: {
    exclusionsFormUpdate: (state, action) => {
      state.exclusions = action.payload;
    },
  },
});

export const { exclusionsFormUpdate } = exclusionListSlice.actions;

/* create selectors */
const exclusionListSelector = (state) => state.exclusionList;
export const selectExclusions = () => createSelector(
  exclusionListSelector,
  (exclusionList) => exclusionList.exclusions,
);

export default exclusionListSlice.reducer;
