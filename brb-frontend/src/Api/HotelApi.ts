import { ApiParams, getBrbApi } from './api';
import { IHotelType, IHotelImage } from '../interfaces/hotelType';

export const getBRBHotelsInfo = async (params: ApiParams): Promise<any> => {
  const response = await getBrbApi<any, void>(params, 'GET');
  const data = response.map((x: IHotelType) => x.hotelImage.map((d: IHotelImage) => ({
    hotelName: x.hotelName,
    hotelId: x.hotelId,
    hotelCity: x.city.city_name,
    starRating: x.starRating,
    hotelImage: d.imageUrl,
    hotelDescription: x.description,
  })));

  return data ? data.flat() : data;
};

export const getBRBTop3HotelsInfo = async (params: ApiParams): Promise<any> => {
  const response = await getBrbApi<any, void>(params, 'GET');

  const data = response.map((x: IHotelType) => ({
    hotelName: x.hotelName,
    hotelId: x.hotelId,
    hotelCity: x.city.city_name,
    starRating: x.starRating,
    hotelImage: x.hotelImage.length ? x.hotelImage[0].imageUrl : 'card1.png',
    hotelDescription: x.description,
  }));

  return data ? data.slice(0, 3) : [];
};
