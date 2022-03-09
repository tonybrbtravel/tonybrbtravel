export interface IHotelType {

    hotelId: number;
    hotelName: string;
    starRating: number;
    description: string;
    hotelImage: IHotelImage[];
    city: ICity;
}

export interface ICity {
    city_name:string;

}

export interface IHotelImage {
    id: number;
    imageUrl: string;
    hotelId: number;
}

export interface IHotelSliderDetails {

    hotelName:string;
    hotelId:number;
    hotelCity:string;
    starRating:number;
    hotelImage:string;
    hotelDescription:string;

}
