import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

export const subscriptionCalculatorSlice = createSlice({
  name: 'subscription',

  initialState: {
    coupons: [],
    prices: null,
    subscriptionForm: {}, // used to store subscription selection for create session
    couponForm: {}, // used to store selected coupon
    subscriptionDetails: {}, // the actual subscription object
    fetchingPrices: false,
    fetchingCoupons: false,
    creatingStripeSession: false,
    creatingSubscription: false,
    reauthenticating: false,
    fetchingTripBalanceDetails: {},
    creatingTripPaymentSession: false,
    tripPaymentForm: {},
    subscribeRewards: null,
  },

  reducers: {
    getCoupons: (state, action) => {
      state.fetchingCoupons = action.payload;
    },
    getPrices: (state, action) => {
      state.fetchingPrices = action.payload;
    },
    pricesFormUpdate: (state, action) => {
      state.prices = action.payload;
    },
    couponFormUpdate: (state, action) => {
      state.coupons = action.payload;
    },
    subscriptionFormUpdate: (state, action) => {
      state.subscriptionForm = action.payload;
    },
    chosenCouponUpdate: (state, action) => {
      state.couponForm = action.payload;
    },
    createStripeSession: (state, action) => {
      state.creatingStripeSession = action.payload;
    },
    createTripPaymentSession: (state, action) => {
      state.creatingTripPaymentSession = action.payload;
    },
    tripPaymentFormUpdate: (state, action) => {
      state.tripPaymentForm = action.payload;
    },
    createSubscription: (state, action) => {
      state.creatingSubscription = action.payload;
    },
    createSubscriptionSuccess: (state, action) => {
      state.subscriptionDetails = action.payload;
    },
    reauthenticate: (state, action) => {
      state.reauthenticating = action.payload;
    },
    getTripBalanceInfo: (state, action) => {
      state.fetchingTripBalanceDetails = action.payload;
    },
    updateSubscriptionRewards: (state, action) => {
      state.subscribeRewards = action.payload;
    },
  },
});

export const {
  getPrices, pricesFormUpdate, getCoupons, subscriptionFormUpdate, tripPaymentFormUpdate, createStripeSession, chosenCouponUpdate, createTripPaymentSession, couponForm, createSubscription, createSubscriptionSuccess, reauthenticate, getTripBalanceInfo, updateSubscriptionRewards,
} = subscriptionCalculatorSlice.actions;

/* create selectors */
const subscriptionSelector = (state) => state.subscription;
export const selectCoupons = () => createSelector(subscriptionSelector, (subscription) => subscription.coupons);
export const selectPrices = () => createSelector(subscriptionSelector, (subscription) => subscription.prices);
export const selectSubscriptionForm = () => createSelector(subscriptionSelector, (subscription) => subscription.subscriptionForm);
export const selectCouponForm = () => createSelector(subscriptionSelector, (subscription) => subscription.couponForm);
export const selectSubscription = () => createSelector(subscriptionSelector, (subscription) => subscription.subscriptionDetails);
export const selectTripPaymentForm = () => createSelector(subscriptionSelector, (subscription) => subscription.tripPaymentForm);

export default subscriptionCalculatorSlice.reducer;
