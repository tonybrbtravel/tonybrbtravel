import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

export const BRBBestHotelsSlice = createSlice({

  name: 'brbBestHotels',
  initialState: {
    brbBestHotels: [],
  },
  reducers: {
    brbBestHotelsUpdate: (state, action) => {
      state.brbBestHotels = action.payload;
    },

    getBestHotelsInfo: () => {

    },
  },
});

export const { brbBestHotelsUpdate, getBestHotelsInfo } = BRBBestHotelsSlice.actions;

/** Create Selector */

const brbBestHotelsSelector = (state) => state.brbBesthotels;

export const selectBestHotels = () => createSelector(brbBestHotelsSelector, (bestHotels) => bestHotels);

export default BRBBestHotelsSlice.reducer;
