import { ApiParams, getBrbApi } from './api';

export const getMyTripDetails = async (
  params: ApiParams,
): Promise<any> => {
  const response = await getBrbApi<any, void>(params, 'GET');
  // const data = response.data;
  const data = response.length > 0 ? response : [];
  return data;
};

export const lockTripDetails = async (
  params: ApiParams,
): Promise<any> => {
  const response = await getBrbApi<any, void>(params, 'PUT', params.data);
  const data = response;
  // const data =  response.length > 0 ? response:[]
  return data;
};

export const getTripBalance = async (
  params: ApiParams,
): Promise<any> => {
  const response = await getBrbApi<any, void>(params, 'GET');

  console.log('ress', response);

  return response;
};

export const getTripTopUpInfo = async (
  params: ApiParams,
): Promise<any> => {
  const response = await getBrbApi<any, void>(params, 'POST', params.data);

  return response;
};
