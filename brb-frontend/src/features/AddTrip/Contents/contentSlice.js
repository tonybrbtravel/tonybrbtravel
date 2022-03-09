import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const defaultTrip = {
  tripConfiguration: {
    id: null,
    travelDates: {},
    roomTypes: {},
    addedTravellers: [],
    travelPreferences: { tripTypes: [] },
    airports: {
      outboundAirports: [],
    },
    top10Destinations: {
      destinations: [],
    },
    excludedDestinations: {
      destinations: [],
    },
    addTravelRoomTypes: {},
    additionalTravellers: [],
    phoneNumber: '',
    noOfCities: null,
    departurePreference: null,
    lateReturn: true,
    topUp: {},
    activities: [],
    isTripInitial: true,
    tripType: 0, // Triptype for creating trip
  },
  tripForm: { loading: false },
  tripTopupForm: { loading: false },
  tripCreateError: { error: null },
  tripCost: {},
  tripLockInfo: {},
  tripLockFromMyTrips: false,
};
export const contentSlice = createSlice({
  name: 'content',
  initialState: defaultTrip,

  reducers: {
    createTripDateSave: (state, action) => {
      state.tripConfiguration.travelDates = action.payload;
      state.tripConfiguration.isTripInitial = false;
    },
    createAdditionalTravellerSave: (state, action) => {
      state.tripConfiguration.addedTravellers = [
        ...state.tripConfiguration.addedTravellers,
        ...action.payload,
      ];
      state.tripConfiguration.isTripInitial = false;
    },
    createTravellerSave: (state, action) => {
      state.tripConfiguration.addedTravellers = action.payload;
      state.tripConfiguration.isTripInitial = false;
      state.tripConfiguration.roomTypes = {};
    },

    createRoomSave: (state, action) => {
      state.tripConfiguration.roomTypes = action.payload;
      state.tripConfiguration.isTripInitial = false;
    },
    createTripTypes: (state, action) => {
      state.tripConfiguration.travelPreferences = action.payload;
    },
    createAirports: (state, action) => {
      state.tripConfiguration.airports = action.payload;
      state.tripConfiguration.isTripInitial = false;
    },
    createDestinations: (state, action) => {
      state.tripConfiguration.top10Destinations = action.payload;
      state.tripConfiguration.isTripInitial = false;
    },
    createExcludedDestinations: (state, action) => {
      state.tripConfiguration.excludedDestinations = action.payload;
      state.tripConfiguration.isTripInitial = false;
    },
    createNewRoomSave: (state, action) => {
      state.tripConfiguration.roomTypes = action.payload;
      state.tripConfiguration.isTripInitial = false;
    },
    createActivitySave: (state, action) => {
      state.tripConfiguration.activities = action.payload;
      state.tripConfiguration.isTripInitial = false;
    },
    createTripFormUpdate: (state, action) => {
      state.tripForm.loading = true;
    },
    createTripTopupFormUpdate: () => {
      // state.tripTopupForm.loading = true;
    },
    createPhoneNumber: (state, action) => {
      state.tripConfiguration.phoneNumber = action.payload;
      state.tripConfiguration.isTripInitial = false;
    },

    CreateUserProfile: (state, action) => {
      state.tripConfiguration.airports = action.payload.airports;
      // state.tripConfiguration.travellers = action.payload.travellers;
      state.tripConfiguration.travellers = [];
      state.tripConfiguration.addedTravellers = [];
      state.tripConfiguration.travelDates = [];
      state.tripConfiguration.top10Destinations = action.payload.top10Destinations;
      state.tripConfiguration.excludedDestinations = action.payload.excludedDestinations;
      state.tripConfiguration.isTripInitial = false;
      state.tripConfiguration.id = null;
      // state.tripConfiguration.noOfCities = action.payload.noOfCities;
      // state.tripConfiguration.departurePreference = action.payload.departurePreference;
      state.tripConfiguration.lateReturn = false;
    },
    updateTripForm: (state, action) => {
      state.tripConfiguration.travelDates = action.payload.travelDates;
      state.tripConfiguration.roomTypes = action.payload.roomTypes;
      state.tripConfiguration.additionalTravellers = action.payload.additionalTravellers.map((x) => {
        x.id = undefined;
        return x;
      });
      state.tripForm.loading = false;
      state.tripConfiguration.isTripInitial = true;
      state.tripCreateError.error = action.payload.error;
      state.tripConfiguration.id = null;
    },
    ResetTrip: (state, action) => {
      state.tripConfiguration = defaultTrip.tripConfiguration;
      state.tripLockInfo = {};
      state.tripLockFromMyTrips = false;
    },
    EditTripForm: (state, action) => {
      state.tripConfiguration = action.payload;
    },
    updateTripInitial: (state, action) => {
      state.tripConfiguration.isTripInitial = true;
    },
    tripCreateErrorUpdate: (state, action) => {
      state.tripCreateError.error = action.payload.error;
    },
    tripPriceUpdate: (state, action) => {
      state.tripCost = action.payload;
    },
    lockTripStateUpdate: (state, action) => {
      state.tripLockInfo = action.payload;
      state.tripLockFromMyTrips = true;
    },
    resetLockTripStateUpdate: (state, action) => {
      state.tripLockInfo = {};
      state.tripLockFromMyTrips = false;
    },
  },
});

export const {
  createTripDateSave,
  createAdditionalTravellerSave,
  createTravellerSave,
  ResetTrip,
  createRoomSave,
  createNewRoomSave,
  createTripFormUpdate,
  lockTripStateUpdate,
  createTripTopupFormUpdate,
  resetLockTripStateUpdate,
  createActivitySave,
  createDestinations,
  createAirports,
  EditTripForm,
  createPhoneNumber,
  CreateUserProfile,
  createTripTypes,
  updateTripInitial,
  createUserProfileUpdate,
  updateTripForm,
  createExcludedDestinations,
  tripCreateErrorUpdate,
  tripPriceUpdate,
} = contentSlice.actions;

/* create selectors */
const tripContentsSelector = (state) => state.content;
export const selectTrips = () => createSelector(tripContentsSelector, (content) => content.tripConfiguration);
export const tripAddForm = () => createSelector(tripContentsSelector, (content) => content.tripForm);
export const selectTripCreateError = () => createSelector(tripContentsSelector, (content) => content.tripCreateError);

export const selectTripCost = () => createSelector(tripContentsSelector, (content) => content.tripCost);

export const selectIsLockFromMyTrips = () => createSelector(tripContentsSelector, (content) => content.tripLockFromMyTrips);
export const selectIsLockTripInfoFromMyTrips = () => createSelector(tripContentsSelector, (content) => content.tripLockInfo);

export default contentSlice.reducer;
