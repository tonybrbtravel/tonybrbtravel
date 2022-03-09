export interface IUserAccountType {
  id: number;
  preferredName: string;
  email?: string;
  mobilePhone?: string;
  phone?:string;
  deliveryDetails?: string;
  password?: string;
  country?:string;
  city?:string;
  newPassword?:string;
  confirmPassword?:string;
  travellers?:number;
  totalNights?:string;
  totalCost?:number;
  rewardPoints?:number;
  profileStatus?:boolean;
  countryCode?:string;
  emailPreferences?:Array<any> | null;
  adress?:string;
  address?:string;
  address2?:string;
  postCode?:string
}

export interface IUserReviews {
  name:string;
  text:string;
  title:string;
  rating:number;
}

export enum subscriptionStatus {
  // Has an account, but is not yet subscribed or has cancelled
  NotSubscribed='NOT_SUBSCRIBED',

  // Paying monthly, no issues
  Subscribed='SUBSCRIBED',

  // Manually paused by BRB
  Paused='PAUSED',
}

export interface IUsersubscription {
  id?:number;
  nights?:number;
  status?:subscriptionStatus;
  stripeCustomerId?:string;
  travellers?:number;
  amount:number;
}
