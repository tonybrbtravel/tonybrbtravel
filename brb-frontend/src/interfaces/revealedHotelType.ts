export interface RevealedHotelType {
    hotelId: number;
    bookingReference: number;
    roomType: string;
    breakfastIncluded: boolean;
    userId: number;
}

export interface RevealedHotelDetails {
    address: string;
    checkinDetails: string;
    description: string;
    destinationId: number;
    hotelDirection: string;
    hotelName: string;
    hotelImage: string;
    hotelPosition: number;
    latitude: number;
    longitude: number;
    mapUrl: string;
    phone: number;
    starRating: number;
    status: string;
    tripAdvisorId: string;
    city:{
        cityId: number;
        cityName: string;
        country: string;
        description: string;
        status: string;
        contentfullId: string;
    };
}
