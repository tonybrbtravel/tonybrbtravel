import React from 'react';
import { format } from 'date-fns';
import {
  Container,
  Grid,
  Image,
  Card,
} from 'semantic-ui-react';
import styled from 'styled-components';

import { RevealedFlightType } from '../../../../interfaces/revealedFlightType';

import { BRBButton } from '../../../../components/BRBButton/BRBButton';
import Takeoff from '../../../../assets/images/takeoff-flight.svg';
import Landing from '../../../../assets/images/landing-flight.svg';

import plane from '../../../../assets/images/white-plane.png';

import './Flights.less';
import Breakpoints from '../../../../themes/Breakpoints';
import Colors from '../../../../themes/Colors';

// TODO: Work out a more robust way of storing and retrieving these links,
// ideally with them coming directly from the backend, or at least contentful
// instead of being hardcoded here!
const checkInLinks: {
  [key: string]: string
} = {
  ba: 'https://www.britishairways.com/travel/olcilandingpageauthreq/public/en_gb',
  'british airways': 'https://www.britishairways.com/travel/olcilandingpageauthreq/public/en_gb',
  'brussels airlines': 'https://checkin.brusselsairlines.com/',
  easyjet: 'https://www.easyjet.com/en/help/booking-and-check-in/check-in',
  jet2: 'https://www.jet2.com/en/login',
  klm: 'https://www.klm.nl/en/check-in',
  ryanair: 'https://www.ryanair.com/gb/en/check-in',
};

const Airports = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: .8rem;

  span {
    display: flex;
    font-size: 2em;

    img {
      margin-right: .25em;
    }
  }

  .down-arrow {
    margin-left: .5rem;
  }

  .right-arrow {
    display: none;
  }

  @media (min-width: ${Breakpoints.small}) {
    flex-direction: row;

    .down-arrow {
      display: none;
    }

    .right-arrow {
      display: block;
    }
  }

  @media (min-width: ${Breakpoints.medium}) {
    flex-direction: column;

    .down-arrow {
      display: block;
    }

    .right-arrow {
      display: none;
    }
  }

  @media (min-width: ${Breakpoints.large}) {
    flex-direction: row;

    .down-arrow {
      display: none;
    }

    .right-arrow {
      display: block;
    }
  }
`;

const DetailsWrapper = styled.div`
  border: 1px solid ${Colors.brbLightGrey};
  padding: .5rem;

  h5 {
    font-size: 1.2rem;
    background-color: ${Colors.brbLightGrey};
    margin: calc(-.5rem - 1px);
    margin-bottom: 1rem;
    padding: .5rem;
  }
`;

const dateOptions: Intl.DateTimeFormatOptions = {
  weekday: 'short',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

interface FlightProps {
  departureAirport: string;
  departureAirportCode: string;
  arrivalAirport: string;
  arrivalAirportCode: string;
  departureDate: Date;
  departureTime: string; // Whyyyyyyyyy
  carrier: string;
  reference: string;
  email: String;
  checkInLink?: string | null;
}
interface DetailsProps {
  title: string;
  flight: FlightProps;
}

const Details: React.VFC<DetailsProps> = ({
  title,
  flight,
}) => {
  const {
    departureAirport,
    departureAirportCode,
    arrivalAirport,
    arrivalAirportCode,
    departureDate,
    departureTime,
    carrier,
    reference,
    email,
    checkInLink,
  } = flight;

  return (
    <DetailsWrapper>
      <h5>
        {title}
      </h5>

      <Airports>
        <div>
          <span>
            <Image src={Takeoff} />
            {departureAirportCode}
          </span>
          {departureAirport}
        </div>
        <span className="right-arrow">&rarr;</span>
        <span className="down-arrow">&darr;</span>
        <div>
          <span>
            <Image src={Landing} />
            {arrivalAirportCode}
          </span>
          {arrivalAirport}
        </div>
      </Airports>

      <p>
        {departureDate.toLocaleDateString('en-GB', dateOptions)}
        {' '}
        {departureTime}
      </p>

      <p>
        <strong>Carrier:</strong>
        {' '}
        {carrier}
      </p>

      <p>
        <strong>Reference:</strong>
        {' '}
        {reference}
      </p>

      <p>
        <strong>Booking email:</strong>
        {' '}
        {email}
      </p>

      {
        checkInLink && (
          <a href={checkInLink} target="_blank" rel="noreferrer">
            &raquo; Check-In
          </a>
        )
      }

    </DetailsWrapper>
  );
};

export interface Props {
  revealedTrips: RevealedFlightType;
  isFinalLeg: boolean;
}

export const Flights: React.VFC<Props> = ({
  revealedTrips,
  isFinalLeg,
}) => {
  const trip = revealedTrips;

  console.log(trip);

  const flight1: FlightProps = {
    departureAirport: trip.depTakeoffLocation,
    departureAirportCode: trip.depTakeoffAirportCode,
    arrivalAirport: trip.depLandingLocation,
    arrivalAirportCode: trip.depLandingAirportCode,
    departureDate: trip.outboundDate,
    departureTime: trip.outboundTime,
    carrier: trip.depCarrier,
    reference: trip.depBookingReference,
    email: trip.depBookingEmail,
    checkInLink: trip.status === 'RevealedDetails' ? checkInLinks[trip.depCarrier.toLowerCase()] : null,
  };

  const flight2: FlightProps = {
    departureAirport: trip.arrTakeoffLocation,
    departureAirportCode: trip.arrTakeoffAirportCode,
    arrivalAirport: trip.arrLandingLocation,
    arrivalAirportCode: trip.arrLandingAirportCode,
    departureDate: trip.returnDate,
    departureTime: trip.returnTime,
    carrier: trip.arrCarrier,
    reference: trip.arrBookingReference,
    email: trip.arrBookingEmail,
    checkInLink: trip.status === 'RevealedDetails' ? checkInLinks[trip.arrCarrier.toLowerCase()] : null,
  };

  return (
    <div className="mytrip-card">
      <div className="my-trip-wrapper">
        <div className="my-trip-container">
          <div className="ui container">

            <Card className="mytrip-card">

              <Card.Content>
                <h4>
                  Your
                  {' '}
                  <span>Flights</span>
                </h4>
              </Card.Content>

              <Card.Content className="flight-details">

                <Details title="Departure" flight={flight1} />

                <Details title={isFinalLeg ? 'Return flight' : 'Next leg'} flight={flight2} />

              </Card.Content>

            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
