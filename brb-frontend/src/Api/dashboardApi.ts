import { ApiParams, getBrbApi, getBrbFileApi } from './api';

export const saveUserSelfie = async (
  params: ApiParams,
): Promise<any> => getBrbFileApi<any, void>(params, 'POST', params.data);

// Why are these separate identical functions with separate irrelevant names?
export const getMyTravelSavings = async (
  params: ApiParams,
): Promise<any> => getBrbApi<any, void>(params, 'GET');

export const getThisWeeksDropDetails = async (
  params: ApiParams,
): Promise<any> => getBrbApi<any, void>(params, 'GET');
