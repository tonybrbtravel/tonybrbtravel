import { ApiParams, getBrbApi } from './api';

export const deleteTrip = async (
  params: ApiParams,
): Promise<any> => {
  const response = await getBrbApi<any, void>(params, 'DELETE');
  const data = response;
  return data;
};

export const getTrip = async (
  params: ApiParams,
): Promise<any> => {
  const response = await getBrbApi<any, void>(params, 'GET');
  const data = response;
  return data;
};

export const getRevealTripDetails = async (
  params: ApiParams,
): Promise<any> => {
  const response = await getBrbApi<any, void>(params, 'GET');
  return response;
};

export const getRevealHotelDetails = async (
  params: ApiParams,
): Promise<any> => {
  const response = await getBrbApi<any, void>(params, 'GET');
  return response;
};
