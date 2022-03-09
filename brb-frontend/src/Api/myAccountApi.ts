import { Auth } from 'aws-amplify';
import { ApiParams, getBrbApi, getBrbFileApi, getBrbApiBeforeAuth } from './api';
import { myAccountPoints } from '../mockData/myAccountPoints';

// Change Password
export const changePassword = async (oldPassword: string, newPassword: string) => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    await Auth.changePassword(user, oldPassword, newPassword);
    return true;
  } catch (error) {
    // console.log("change password error", error);
    return false;
  }
};

// Change User Email
export const changeUserEmail = async (newEmail: string) => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    await Auth.updateUserAttributes(user, { email: newEmail });
  } catch (error) {
    console.log('change email error', error);
  }
};

// Save My Account Details
export const saveUserProfileInfo = async (
  params: ApiParams,
): Promise<any> => getBrbApi<any, void>(params, 'PUT', params.data);

// Get User Reward Points Info

export const getUserRewardPoints = async (
  // params: ApiParams,
): Promise<any> => myAccountPoints;
// await getBrbApi<any, void>(params, 'GET', params.data);

// Get Subscription details
export const fetchUserSubscriptionDetails = async (
  params: ApiParams,
): Promise<any> => {
  const response = await getBrbApi<any, void>(params, 'GET');
  return response;
};

export const updateUserProfileImage = async (
  params: ApiParams,
): Promise<any> => {
  const response = await getBrbFileApi<any, void>(params, 'POST', params.data);

  return response;
};

export const getUserProfileImageDetails = async (
  params: ApiParams,
): Promise<any> => {
  const response = await getBrbApi<any, void>(params, 'GET');

  return response;
};

// Save Email Preferences
export const saveUserEmailPreferences = async (
  params: ApiParams,
): Promise<any> => {
  const response = await getBrbApi<any, void>(params, 'PUT', params.data);
  return response;
};

export const validateUserEmailExistsorNot = async (
  params: ApiParams,
): Promise<any> => getBrbApiBeforeAuth<any, void>(params, 'GET');

export const fetchRewardsPointsInfo = async (
  params: ApiParams,
): Promise<any> => {
  const data = await getBrbApi<any, void>(params, 'GET');
  return data;
};

export const fetchRewardsHistory = async (
  params: ApiParams,
): Promise<any> => {
  const data = await getBrbApi<any, void>(params, 'GET');
  return data;
};
