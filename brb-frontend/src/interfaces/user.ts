import { Traveller } from './Traveller';

export interface Entity {
    id: string | number;
    name: string;
}
export interface TripType extends Entity {
}

export interface TravelPreferences {
    tripTypes: TripType[];
}

export interface Destination {
    id: string | number;
    airportCode?: any;
    destinationName: string;
}

export interface Top10Destinations {
    destinations: Destination[];
}

export interface OutboundAirport {
    id: string;
    airportCode: string;
    airportName: string;
}

export interface Airports {
    outboundAirports: OutboundAirport[];
}

export interface Activity extends Entity {
}

export interface Preference extends Entity {
}

export interface PreferredActivities {
    activities: Activity[];
}
export interface HotelPreferences {
    preferences: Preference[];
}

export interface User {
    id: number;
    email: string;
    status: number;
    preferredName: string;
    mobilePhone?: any;
    profileStatus: number;
    dateJoined: Date;
    travelPreferences: TravelPreferences;
    top10Destinations: Top10Destinations;
    airports: Airports;
    excludedDestinations?: Top10Destinations;
    hotelPreferences?: HotelPreferences;
    preferredActivities: PreferredActivities;
    travelDetails?: any;
    profileImageFileName?: string;
    stripeCustomer?: any;
    travellers: Traveller[];
    phone?: any;
    adress?: any;
    points: number;
    emailPreferences?: any;
}
export interface SelectionRange {
    startDate: Date;
    endDate: Date;
    key: string;
}

export interface TravelDates {
    numberOfNights: number;
    lateReturn: boolean;
    departureTime: string;
    noOfCities: number;
    selectedDates: SelectionRange;
    departurePreference?: string;
}
