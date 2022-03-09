import { createSlice } from '@reduxjs/toolkit';

export const loader = createSlice({
  name: 'loader',
  initialState: {
    loading: false,
  },

  reducers: {
    showLoader: (state, action) => {
      state.loading = true;
    },
    hideLoader: (state, action) => {
      state.loading = true;
    },
  },
});

export const { hideLoader, showLoader } = loader.actions;

export default loader.reducer;
