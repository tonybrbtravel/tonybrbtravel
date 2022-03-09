import { TripType } from '../interfaces/tripType';
import { ApiParams, getBrbApi } from './api';

export const getTravelTypes = async (
  params: ApiParams,
): Promise<any> => {
  const response = await getBrbApi<any, void>(params, 'GET');
  const data = response.map((x: TripType) => ({
    ...x,
    label: x.name ?? '',
  }));
  return data;
};

export const getUserProfile = async (
  params: ApiParams,
): Promise<any> => {
  const response = await getBrbApi<any, void>(params, 'GET');
  response.tripTypes = response.travelPreferences?.tripTypes.map((x: TripType) => ({
    ...x,
    label: x.name ?? '',
  }));
  response.outboundAirports = response.airports?.outboundAirports;
  response.destinations = response.top10Destinations?.destinations;
  return response;
};

export const saveTravelTypes = async (
  params: ApiParams,
): Promise<any> => getBrbApi<any, void>(params, 'PUT', params.data);

export const getAirportsMasterData = async (
  params: ApiParams,
): Promise<any> => getBrbApi<any, void>(params, 'GET');

export const saveAirports = async (
  params: ApiParams,
): Promise<any> => getBrbApi<any, void>(params, 'PUT', params.data);

export const saveExcludedDestinations = async (
  params: ApiParams,
): Promise<any> => getBrbApi<any, void>(params, 'PUT', params.data);

export const saveHotelPreferences = async (
  params: ApiParams,
): Promise<any> => getBrbApi<any, void>(params, 'PUT', params.data);

export const savePreferredActivities = async (
  params: ApiParams,
): Promise<any> => getBrbApi<any, void>(params, 'PUT', params.data);

export const saveAddTraveller = async (
  params: ApiParams,
): Promise<any> => getBrbApi<any, void>(params, 'PUT', params.data);

export const deleteTraveller = async (
  params: ApiParams,
): Promise<any> => getBrbApi<any, void>(params, 'DELETE');
