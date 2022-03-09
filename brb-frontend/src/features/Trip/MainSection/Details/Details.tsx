import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectCoverflow, Pagination } from 'swiper/core';
import {
  Grid,
  Image,
  Rating,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { RevealedHotelDetails } from '../../../../interfaces/revealedHotelType';
import { RevealedFlightType } from '../../../../interfaces/revealedFlightType';

import Spacer from '../../../../components/Spacer';

import './Details.less';

SwiperCore.use([EffectCoverflow, Pagination]);

const dateFormat: Intl.DateTimeFormatOptions = {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  weekday: 'long',
};

export interface Props {
  revealedTrips: RevealedFlightType;
  revealedHotelDetails: RevealedHotelDetails[];
}

export const Details: React.VFC<Props> = ({
  revealedTrips,
  revealedHotelDetails,
}) => {
  const [hotel] = revealedHotelDetails;

  if (!hotel) {
    return null;
  }

  return (
    <div className="location-info">

      <div className="hotel-info">
        <h2 className="ui header">
          {hotel.hotelName}
        </h2>
        <p>
          {hotel.city.cityName}
          {', '}
          {hotel.city.country}
        </p>
      </div>

      <Rating
        key={hotel.starRating}
        defaultRating={hotel.starRating}
        maxRating={5}
        disabled
      />

      <Spacer />

      {revealedTrips.outboundDate.toLocaleDateString('en-GB', dateFormat)}
      {' '}
      &rarr;
      {' '}
      {revealedTrips.returnDate.toLocaleDateString('en-GB', dateFormat)}

      {/* <Image fluid src={hotel.hotelImage} /> */}

      <Spacer />

      <div className="location-info">

        <p className="info">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="30" viewBox="0 0 24 30" fill="none">
            <path d="M11.6366 0C5.22018 0 0 5.22019 0 11.6366C0 15.6204 1.89508 19.9037 5.63268 24.3676C8.38446 27.6541 11.0965 29.7661 11.2107 29.8545C11.336 29.9515 11.4864 30 11.6366 30C11.7869 30 11.9371 29.9515 12.0626 29.8545C12.1767 29.7661 14.8889 27.6541 17.6405 24.3676C21.3781 19.9037 23.2732 15.6203 23.2732 11.6366C23.2732 5.22019 18.053 0 11.6366 0ZM16.0003 11.6366C16.0003 14.0465 14.0466 16.0002 11.6366 16.0002C9.2267 16.0002 7.27303 14.0465 7.27303 11.6366C7.27303 9.2267 9.2267 7.27294 11.6366 7.27294C14.0466 7.27294 16.0003 9.2267 16.0003 11.6366Z" fill="#E94560" />
          </svg>
          <strong>Location:</strong>
          {' '}
          {hotel.address}
          {' '}
          <small>
            <a href={hotel.mapUrl} target="_blank" rel="noreferrer" title="View this location on a map">
              (map)
            </a>
          </small>
        </p>

        <p className="info">
          <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.5 0H2.5C1.125 0 0 1.125 0 2.5V25L5 20H22.5C23.875 20 25 18.875 25 17.5V2.5C25 1.125 23.875 0 22.5 0ZM14.4625 11.9625L12.5 16.25L10.5375 11.9625L6.25 10L10.5375 8.0375L12.5 3.75L14.4625 8.0375L18.75 10L14.4625 11.9625Z" fill="#E94560" />
          </svg>
          <strong>Reviews &amp; Information:</strong>
          {' '}
          View on
          {' '}
          <Link to={{ pathname: `https://www.tripadvisor.com/${hotel.tripAdvisorId}` }} target="_blank">Trip Advisor</Link>
        </p>

        <p className="info">
          <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4H6V16H4V4ZM7 4H8V16H7V4ZM9 4H12V16H9V4ZM13 4H14V16H13V4ZM16 4H18V16H16V4ZM19 4H20V16H19V4ZM2 2V6H0V2C0 1.46957 0.210714 0.960859 0.585786 0.585786C0.960859 0.210714 1.46957 0 2 0H6V2H2ZM22 0C22.5304 0 23.0391 0.210714 23.4142 0.585786C23.7893 0.960859 24 1.46957 24 2V6H22V2H18V0H22ZM2 14V18H6V20H2C1.46957 20 0.960859 19.7893 0.585786 19.4142C0.210714 19.0391 0 18.5304 0 18V14H2ZM22 18V14H24V18C24 18.5304 23.7893 19.0391 23.4142 19.4142C23.0391 19.7893 22.5304 20 22 20H18V18H22Z" fill="#E94560" />
          </svg>

          <strong>Reference number:</strong>
          {' '}
          {revealedTrips.hotelBookingReference}
        </p>
      </div>
    </div>
  );
};
