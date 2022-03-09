import React, { useState, useEffect } from 'react';

import { RevealedHotelDetails } from '../../../../interfaces/revealedHotelType';
import { RevealedFlightType } from '../../../../interfaces/revealedFlightType';

import './YourHotel.less';

export interface Props {
  revealedHotelDetails: RevealedHotelDetails[];
  revealedTrips: RevealedFlightType;
}

const Star: React.VFC = () => <span>★</span>;

export const YourHotel: React.VFC<Props> = ({
  revealedHotelDetails,
  revealedTrips,
}) => {
  const [numberOfNights, setNumberOfNights] = useState<number>(0);
  const [checkinDetails, setCheckinDetails] = useState<string[]>();

  const [hotel] = revealedHotelDetails;
  const trip = revealedTrips;

  useEffect(() => {
    if (hotel && trip) {
      const startDate = trip && trip.outboundDate;
      const endDate = trip && trip.returnDate;

      const nights = Math.ceil(Math.abs(
        startDate?.getTime() - endDate?.getTime(),
      ) / (1000 * 3600 * 24));
      setNumberOfNights(nights);

      setCheckinDetails(hotel.checkinDetails.split('*') || []);
    }
  }, [trip, hotel]);

  if (!hotel) {
    return null;
  }

  return (
    <div>
      <div className="getting-hotel">
        <h4>
          Getting to your
          {' '}
          <span>hotel</span>
        </h4>
        <p>{hotel.hotelDirection}</p>
        <div className="checking-in">
          <h4>
            Checking
            {' '}
            <span>In</span>
          </h4>
          <ul className="checking-in-ul">
            {checkinDetails && checkinDetails.map((name) => (
              <li key={name}>
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                  <path d="M6.225 11.45L9.075 14.1355L14.775 8.125M10.5 20C9.25244 20 8.0171 19.7543 6.86451 19.2769C5.71191 18.7994 4.66464 18.0997 3.78249 17.2175C2.90033 16.3354 2.20056 15.2881 1.72314 14.1355C1.24572 12.9829 1 11.7476 1 10.5C1 9.25244 1.24572 8.0171 1.72314 6.86451C2.20056 5.71191 2.90033 4.66464 3.78249 3.78249C4.66464 2.90033 5.71191 2.20056 6.86451 1.72314C8.0171 1.24572 9.25244 1 10.5 1C13.0196 1 15.4359 2.00089 17.2175 3.78249C18.9991 5.56408 20 7.98044 20 10.5C20 13.0196 18.9991 15.4359 17.2175 17.2175C15.4359 18.9991 13.0196 20 10.5 20Z" stroke="#E94560" strokeWidth="2" strokeLinecap="round" />
                </svg>
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <h4>
          What’s
          {' '}
          <span>Included</span>
        </h4>
        <ul className="disc-ul">
          <li>
            <b>Flights:</b>
            {' '}
            Return flights with
            {' '}
            {trip.arrCarrier}
          </li>
          <li>
            <b>Bags:</b>
            {' '}
            {trip.bags}
          </li>
          <li>
            <b>Departure Airport:</b>
            {' '}
            {trip.depTakeoffLocation}
          </li>
          <li>
            <b>Arrival Airport:</b>
            {' '}
            {trip.depLandingLocation}
          </li>
          <li>
            <b>Hotel:</b>
            {' '}
            {hotel.hotelName}
            {' '}
            (
            {
              // eslint-disable-next-line react/no-array-index-key
              [...Array(hotel.starRating)].map((_, starIndex) => <Star key={starIndex} />)
            }
            )
          </li>
          <li>
            <b>Number of Nights:</b>
            {' '}
            {numberOfNights}
          </li>
          <li>
            <b>Room:</b>
            {' '}
            {trip.roomType}
          </li>
          {
            trip.breakfastIncluded ? (
              <li>
                <b>Breakfast included:</b>
                {' '}
                Yes
              </li>
            ) : null
          }
        </ul>
        <h4 className="not-included">
          <span>Not</span>
          {' '}
          Included:
        </h4>
        <ul className="disc-ul">
          <li>Airport Transfers</li>
          {
            !trip.breakfastIncluded ? (
              <li>Breakfast</li>
            ) : null
          }
          <li>Additional luggage</li>
        </ul>
      </div>
    </div>
  );
};
