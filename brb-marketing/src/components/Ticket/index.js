/**
 *
 * Ticket
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import CountDown from '../../components/CountDown';

import {
  Container,
  Wrapper,
  TripInfo,
  Details,
  RedStar,
  Stars,
  P,
} from './styles';

class Ticket extends React.PureComponent {
  render() {
    const { tripRevealed, trip } = this.props;
    const startDate = trip.startDate.format('DD MMM');
    const endDate = trip.startDate.add(2, 'days').format('DD MMM');
    const revealDate = trip.startDate.subtract(1, 'month');

    if (tripRevealed) {
      return (
        <Container>
          <Wrapper tripRevealed>
            {trip.photos.map((photo) => <img key={photo} src={photo} alt="" />)}
            <TripInfo>
              <P>
                {trip.city} {trip.emoji}
              </P>
              <h2>
                {trip.hotel} <RedStar>{trip.stars}</RedStar>
                <Stars>{trip.gstars}</Stars>
              </h2>
              <Details>
                <li>
                  <strong>Departing:</strong> {startDate}
                </li>
                <li>
                  <strong>Returning:</strong> {endDate}
                </li>
                <li>
                  <strong>Trip Type:</strong> {trip.type}
                </li>
              </Details>
            </TripInfo>
          </Wrapper>
        </Container>
      );
    }

    return (
      <Container>
        <Wrapper>
          {trip.photos.map((photo) => <img key={photo} src={photo} alt="" />)}
          <TripInfo>
            <P>Trip reveal in:</P>
            <CountDown date={revealDate} small />
            <Details>
              <li>
                <strong>Departing:</strong> {startDate}
              </li>
              <li>
                <strong>Returning:</strong> {endDate}
              </li>
              <li>
                <strong>Trip Type:</strong> {trip.type}
              </li>
            </Details>
          </TripInfo>
        </Wrapper>
      </Container>
    );
  }
}

Ticket.propTypes = {
  tripRevealed: PropTypes.bool,
  trip: PropTypes.any,
};

export default Ticket;
