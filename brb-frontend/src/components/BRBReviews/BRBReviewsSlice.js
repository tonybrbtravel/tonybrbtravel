import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

export const BRBReviewsSlice = createSlice({

  name: 'bestReviews',
  initialState: {
    brbBestReviews: [],
  },
  reducers: {
    brbBestReviewsUpdate: (state, action) => {
      console.log('state', state);
      state.brbBestReviews = action.payload;
    },

    getBestReviewsInfo: () => {},
  },
});

export const { brbBestReviewsUpdate, getBestReviewsInfo } = BRBReviewsSlice.actions;

/** Create Selector */

const brbBestReviewsSelector = (state) => state.brbBestReviews;

export const selectBestReviews = () => createSelector(brbBestReviewsSelector, (bestReviews) => bestReviews);

export default BRBReviewsSlice.reducer;
