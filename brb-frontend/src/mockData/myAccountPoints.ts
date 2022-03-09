export enum rewardTypes {
    uploadSelfie='Upload Selfie',
    createATrip = 'create Trip',
    signUp = 'Sign Up',
    subscribe = 'Subscribe',
    completeProfile = 'Complete Profile',
    monthlyPayment = 'Monthly Payment',
    lockTrip ='Lock Trip',
    claimedReward = 'Claimed Reward',
}

export interface IMyAccountPoints {
    id:number;
    type:rewardTypes;
    points:number;
    icon:string;
    date:string;
    totalPoints:string;
    navLink:string;
    status?:boolean;
    name?:string;
}

export const myAccountPoints = <IMyAccountPoints[]>[
  /** {
    type: rewardTypes.uploadSelfie,
    points: 0,
    icon: 'like',
    date: '',
    totalPoints: '',
    navLink: '/dashboard',
    name: 'reveal_selfie',
  }, */
  /* {
    type: rewardTypes.createATrip,
    points: 0,
    icon: 'plane',
    date: '',
    totalPoints: '',
    navLink: '/add-trip',
    name: 'trip',
  }, */
  {
    id: 0,
    type: rewardTypes.signUp,
    points: 0,
    icon: 'credit card',
    date: '',
    totalPoints: '',
    navLink: '#',
    name: 'signup',
  },
  {
    id: 0,
    type: rewardTypes.completeProfile,
    points: 0,
    icon: 'user',
    date: '',
    totalPoints: '',
    navLink: '/travel-profile',
    name: 'complete_profile',
  },
  {
    id: 0,
    type: rewardTypes.subscribe,
    points: 0,
    icon: 'credit card',
    date: '',
    totalPoints: '',
    navLink: '/dashboard#subscribe',
    name: 'subscribe',

  },
  /* {
    id: 0,
    type: rewardTypes.monthlyPayment,
    points: 0,
    icon: 'like',
    date: '',
    totalPoints: '',
    navLink: '#',
    name: 'monthly_payment',
  }, */
  // {
  //     "type":rewardTypes.lockTrip,
  //     "points":100,
  //     "icon":"like",
  //     "date":"",
  //     "totalPoints":""
  // },
  // {
  //     "type":rewardTypes.claimedReward,
  //     "points":100,
  //     "icon":"like",
  //     "date":"",
  //     "totalPoints":""
  // }
];

export const myAccountPointsNewUser = [
  {
    type: rewardTypes.uploadSelfie,
    points: 100,
    icon: 'like',
    date: '',
    totalPoints: '',
    navLink: '/dashboard',
  },
  {
    type: rewardTypes.createATrip,
    points: 100,
    icon: 'plane',
    date: '',
    totalPoints: '',
    navLink: '/add-trip',
  },
  {
    type: rewardTypes.subscribe,
    points: 100,
    icon: 'credit card',
    date: '',
    totalPoints: '',
    navLink: '/subscribe',
  },
  {
    type: rewardTypes.completeProfile,
    points: 100,
    icon: 'user',
    date: '',
    totalPoints: '',
    navLink: '/travel-profile',
  },
];
