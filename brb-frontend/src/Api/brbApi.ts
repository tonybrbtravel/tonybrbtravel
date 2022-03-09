import { ApiParams, getBrbApi } from './api';

export const getUserProfileById = async (
  params: ApiParams,
): Promise<any> => getBrbApi<any, void>(params, 'GET');

export const updateUserProfileById = async (
  params: ApiParams,
): Promise<any> => getBrbApi<any, void>(params, 'PUT');

export const getRewards = async (
  params: ApiParams,
): Promise<any> => getBrbApi<any, void>(params, 'GET');

export const getEmailPreference = async (
  params: ApiParams,
): Promise<any> => getBrbApi<any, void>(params, 'GET');

export const getCountriesInfo = async (
  params: ApiParams,
): Promise<any> => getBrbApi<any, void>(params, 'GET');
