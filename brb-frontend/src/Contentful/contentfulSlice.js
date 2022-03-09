import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

export const contentfulSlice = createSlice({
  name: 'contentful',
  initialState: {
    client: null,
    countries: [],
    fetching: false,
    reviews: [],
    fetchReviews: false,
    cities: [],
    fetchCities: false,
    cityGuides: [],
    fetchCityGuides: false,
  },

  reducers: {
    contentfulClientUpdate: (state, action) => {
      state.client = action.payload;
    },
    contentfulFetchCountries: (state, action) => {
      state.fetching = action.payload;
    },
    contentfulCountries: (state, action) => {
      state.countries = action.payload;
    },
    contentfulReviews: () => {
    },
    contentfulFetchReviews: (state, action) => {
      state.reviews = action.payload;
      state.fetchReviews = true;
    },
    contentfulCities: () => {
    },
    contentfulFetchCities: (state, action) => {
      state.cities = action.payload;
      state.fetchCities = true;
    },
    contentfulCityGuides: () => {
    },
    contentfulFetchCityGuides: (state, action) => {
      state.cityGuides = action.payload;
      state.fetchCityGuides = true;
    },
    contentfulCityBlogs: () => {
    },
    contentfulFetchCityBlogs: (state, action) => {
      state.cityBlogs = action.payload;
      state.fetchCityBlogs = true;
    },
  },
});

export const {
  contentfulClientUpdate,
  contentfulFetchCountries,
  contentfulCountries,
  contentfulReviews,
  contentfulFetchReviews,
  contentfulCityGuides,
  contentfulFetchCityGuides,
  contentfulCityBlogs,
  contentfulFetchCityBlogs,
  contentfulCities,
  contentfulFetchCities,
} = contentfulSlice.actions;

/* create selectors */
const contentfulSelector = (state) => state.contentful;
export const selectClient = () => createSelector(contentfulSelector, (contentful) => contentful.client);
export const selectCountries = () => createSelector(contentfulSelector, (contentful) => contentful.countries);

export default contentfulSlice.reducer;
