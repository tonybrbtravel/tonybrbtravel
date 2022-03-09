// Wrapper to push into a global data object, for collection by e.g. Google Tag Manager
// or Google Analytics
// GA and GTM use "dataLayer", so that's the default global variable name here.

// Push raw data to the array for collection
export const push = (data: any, dataArrayName: string = 'dataLayer') => {
  (<any>window)[dataArrayName] = (<any>window)[dataArrayName] || [];
  const dataArray = (<any>window)[dataArrayName];
  dataArray.push(data);
};

// Push a custom event
// (Tag Manager should be configured to pick up 'customEvent' events
// and log them directly through into GA)
export const pushEvent: (
  eventData: {
    event?: string,
    category?: string,
    action?: string,
    label?: string,
    value?: number,
  },
  dataArrayName?: string,
) => void = ({
  event,
  category: eventCategory,
  action: eventAction,
  label: eventLabel,
  value: eventValue,
  ...extra
}, dataArrayName) => {
  push({
    event: event || 'customEvent',
    eventCategory,
    eventAction,
    eventLabel,
    eventValue,
    ...extra,
  }, dataArrayName);
};

// Utility for basic normalization of strings
export const slugify = (original: string = 'undefined') => (
  original
    .toLowerCase()
    .replace(/[^a-z0-9- ]/g, '')
    .replace(/[ -]+/g, '-')
    .replace(/^-*|-*$/g, '')
);

//
// Helpers for some specific tracking events
//

// Reused types
type SubscriptionSettings = { travellers: number, nights: number, value: number };
type TripSettings = SubscriptionSettings & { topUp: boolean, tripType: string, value: number };

// Creation of an account
export const trackAccountCreation = (authenticationMethod: string, dataArrayName?: string) => {
  const eventData = {
    category: 'account',
    action: 'creation',
    label: `authentication-${slugify(authenticationMethod)}`,
  };
  pushEvent(eventData, dataArrayName);
};

// Completion of onboarding steps
export const trackOnboardingStep = (stepIndex: number, dataArrayName?: string) => {
  const eventData = {
    category: 'account',
    action: `onboarding-step-${stepIndex}`,
  };
  pushEvent(eventData, dataArrayName);
};

// Subscription intent
export const trackSubscriptionIntent = ({ travellers, nights, value }: SubscriptionSettings, dataArrayName?: string) => {
  const eventData = {
    category: 'account',
    action: 'subscription-intent',
    label: `${travellers}-travellers_${nights}-nights`,
    value,
  };
  pushEvent(eventData, dataArrayName);
};

// Subscription completion
// TODO: send eCommerce data?
export const trackSubscriptionCompletion = ({ travellers, nights, value }: SubscriptionSettings, dataArrayName?: string) => {
  const eventData = {
    category: 'account',
    action: 'subscription',
    label: `${travellers}-travellers_${nights}-nights`,
    value,
  };
  pushEvent(eventData, dataArrayName);
};

// Profile completion
export const trackProfileCompletion = (dataArrayName?: string) => {
  const eventData = {
    category: 'account',
    action: 'profile-completion',
  };
  pushEvent(eventData, dataArrayName);
};

// Trip creation start
export const trackTripCreationStart = (dataArrayName?: string) => {
  const eventData = {
    category: 'trip',
    action: 'creation-start',
  };
  pushEvent(eventData, dataArrayName);
};

// Trip creation intent
export const trackTripCreationIntent = ({
  travellers, nights, value, topUp, tripType,
}: TripSettings, dataArrayName?: string) => {
  const eventData = {
    category: 'trip',
    action: 'creation-intent',
    label: `${slugify(tripType)}_${travellers}-travellers_${nights}-nights_${topUp ? 'with' : 'no'}-top-up`,
    value,
  };
  pushEvent(eventData, dataArrayName);
};

// Trip creation
export const trackTripCreation = ({
  travellers, nights, value, topUp, tripType,
}: TripSettings, dataArrayName?: string) => {
  const eventData = {
    category: 'trip',
    action: 'creation',
    label: `${slugify(tripType)}_${travellers}-travellers_${nights}-nights_${topUp ? 'with' : 'no'}-top-up`,
    value,
  };
  pushEvent(eventData, dataArrayName);
};

// Selfie upload
export const trackSelfieUpload = (dataArrayName?: string) => {
  const eventData = {
    category: 'social',
    action: 'selfie-upload',
  };
  pushEvent(eventData, dataArrayName);
};

export default {
  push,
  pushEvent,
  trackAccountCreation,
  trackOnboardingStep,
  trackSubscriptionIntent,
  trackSubscriptionCompletion,
  trackProfileCompletion,
  trackTripCreationStart,
  trackTripCreationIntent,
  trackTripCreation,
  trackSelfieUpload,
};
