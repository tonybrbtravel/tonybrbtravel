import { FC, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Header, Modal } from 'semantic-ui-react';
import { useQueryClient } from 'react-query';

import Colors, { rgba } from '../../../themes/Colors';
import Metrics from '../../../themes/Metrics';
import Decorations from '../../../themes/Decorations';
import Timings from '../../../themes/Timings';

import BrbEndPoints from '../../../Api/BrbEndPoints';
import { lockTripDetails } from '../../../Api/myTrips';

import { BRBButton } from '../../../components/BRBButton/BRBButton';
import Spacer from '../../../components/Spacer';
import Countdown from '../Countdown';

import planeIcon from '../../../assets/images/white-plane.png';
import { Spinner } from '../../../components/BRBSpinner/BRBSpinner';

const options: Intl.DateTimeFormatOptions = {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  weekday: 'short',
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${Colors.brbOffwhite};
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div<{
  backgroundImage?: string;
}>`
  background-size: cover;
  background-image: url(${({ backgroundImage }) => backgroundImage});
  background-position: center center;

  position: relative;
  height: 12rem;

  color: ${Colors.brbOffwhite};

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-image: radial-gradient(${rgba(Colors.brbBlue, 0.5)}, ${rgba(Colors.brbPink, 0.25)});
    background-color: rgba(0, 0, 0, .5);
    backdrop-filter: contrast(2);
  }
`;

const HeaderContent = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: .5rem;

  p {
    text-shadow: ${Decorations.shadow.detail};
    margin: 0;
  }

  p.countdown-label {
    margin-top: 1rem;
    margin-bottom: .25rem;
  }

  p.trip-type {
    font-size: 2em;
    font-weight: 700;
    line-height: 1;
    margin: 0;
    text-align: center;
  }

  p.traveller-details {
    font-size: 1.2em;
    font-weight: 700;
  }
`;

const Flights = styled.div`
  color: ${Colors.brbOffwhite};
  background-color: ${Colors.brbPink};
  font-size: .8em;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: .5rem;
  gap: 1rem;
  line-height: 1;

  img {
    transform: scale(0.75);
  }
`;

const Details = styled.div`
  color: ${Colors.brbBlue};
  background-color: ${Colors.brbOffwhite};
  padding: 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  h4 {
    font-size: 1.4rem;
    font-weight: 700;
    margin: 0;
  }

  ul {
    padding: 0;
    list-style-type: none;
  }

  li {
    margin: 0 0 1em;
    padding-left: 2em;
    line-height: 1.2;

    &:before {
      content: "\f00c";
      font-family: Icons;
      display: block;
      position: absolute;
      left: 20px;
    }
  }

  .actions {
    text-align: center;
    margin-top: auto;
  }

  button {
    border: 1px solid ${Colors.brbPink} !important;
  }

  .ui.button.brb-button.invert {
    // Gross, overrides for semantic UI shite
    border: 1px solid ${Colors.brbPink} !important;
    color: ${Colors.brbPink} !important;
    background-color: ${Colors.brbOffwhite} !important;
    margin-top: .25em;
  }
`;

const EmptyTripWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 1rem;
`;

const EmptyTripContent = styled.div`
  position: absolute;
  width: calc(100% - 2rem);
  height: calc(100% - 2rem);
  top: 1rem;
  left: 1rem;
  color: ${Colors.brbPink};
  background-color: ${rgba(Colors.brbPink, 0.2)};
  border: 2px dashed ${Colors.brbPink};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    color ${Timings.transition.default} ease-in-out,
    box-shadow ${Timings.transition.default} ease-in-out;

  .giant {
    font-size: 10rem;
    margin: 0;
    line-height: .75;
  }

  &:hover {
    color: ${Colors.brbOffwhite};
    box-shadow: ${Decorations.glow.brbPink};
  }
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${Colors.brbOffwhite};
  font-size: 2rem;
  font-weight: 700;
  text-shadow: ${Decorations.shadow.detail};
  background-color: ${rgba(Colors.brbBlue, 0.5)};

  p {
    transform: rotate(-5deg);
    border: 5px solid currentColor;
    padding: .5em;
    box-shadow: ${Decorations.shadow.detail};
    background-color: ${rgba(Colors.brbBlue, 0.25)};
    backdrop-filter: blur(5px);
  }
`;

export type Trip = {
  id: number,
  startDate: Date,
  endDate: Date,
  image?: string,
  tripType: string,
  tripTypeName: string,
  numberOfTravellers: number,
  details: string[],
  status: string,
  lockDate?: Date,
  revealDate?: Date,
  departDate?: Date,
  soldOut?: boolean,
}

export interface Props {
  trip?: Trip;
  refreshFunction?: () => void;
  hideActions?: boolean;
}

const TripCard: FC<Props> = ({
  trip,
  hideActions = false,
  refreshFunction = () => { },
}) => {
  const history = useHistory();

  if (trip) {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalIsProcessing, setModalIsProcessing] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const editTrip = () => {
      history.push('/add-trip', { id: trip.id });
    };

    const viewTrip = () => {
      history.push('/trip', { id: trip.id });
    };

    const lockTrip = () => {
      setModalOpen(true);
    };

    const lockTripAPICall = async () => {
      lockTripDetails({ url: `${BrbEndPoints.lockTrip}`, data: { id: trip.id } })
        .then((response: any) => {
          refreshFunction();
          return response;
        })
        .catch((error: any) => {
          console.log(error);
        });
    };

    const onLockTrip = async () => {
      setModalIsProcessing(true);
      await queryClient.invalidateQueries(['mytrips']);
      await lockTripAPICall();
      setModalOpen(false);
      setModalIsProcessing(false);
    };

    const primaryActionMap: {
      [key: string]: {
        action: (id: number) => void,
        label: string,
        disabled?: boolean,
      }
    } = {
      Created: {
        action: lockTrip,
        label: 'Lock trip',
      },
      Revealed: {
        action: viewTrip,
        label: 'View trip',
      },
      Dropped: {
        action: viewTrip,
        label: 'View details',
      },
    };

    const secondaryActionMap: {
      [key: string]: {
        action: (id: number) => void,
        label: string,
        disabled?: boolean,
      }
    } = {
      Created: {
        action: editTrip,
        label: 'Edit trip',
      },
      Locked: {
        action: () => null,
        label: 'Locked',
        disabled: true,
      },
    };

    // Collect the relevant countdown to show (if any)
    const countdowns: {
      [key: string]: {
        label: string,
        date?: Date,
      }
    } = {
      Created: {
        label: 'Auto-locked in',
        date: trip.lockDate,
      },
      Locked: {
        label: 'Revealed in',
        date: trip.revealDate,
      },
      Revealed: {
        label: 'Departing in',
        date: trip.departDate,
      },
    };

    const countdown = countdowns[trip.status];
    const primaryButton = primaryActionMap[trip.status];
    const secondaryButton = secondaryActionMap[trip.status];

    return (
      <>

        <Wrapper>
          <HeaderWrapper backgroundImage={trip.image}>
            <HeaderContent>
              <p className="trip-type">
                {trip.tripTypeName || 'Holiday'}
              </p>
              <p className="traveller-details">
                {trip.numberOfTravellers}
                {' '}
                Traveller
                {trip.numberOfTravellers === 1 ? '' : 's'}
              </p>
              {countdown && countdown.date && (
                <>
                  <p className="countdown-label">
                    {countdown.label}
                    :
                  </p>
                  <Countdown expiryTimestamp={countdown.date.valueOf()} />
                </>
              )}
            </HeaderContent>
          </HeaderWrapper>

          <Flights>
            <span>{trip.startDate.toLocaleDateString('en', options)}</span>
            <img src={planeIcon} alt="" />
            <span>{trip.endDate.toLocaleDateString('en', options)}</span>
          </Flights>

          <Details>

            <h4>Trip details</h4>

            <ul>
              {trip.details.map((detail) => <li key={detail}>{detail}</li>)}
            </ul>

            {!hideActions && !trip.soldOut && (primaryButton || secondaryButton) && (
              <div className="actions">
                <Spacer height={Metrics.tinySpacer} />
                {primaryButton && (
                  <BRBButton
                    size="massive"
                    onClick={() => primaryButton.action(trip.id)}
                    disabled={primaryButton.disabled}
                  >
                    {primaryButton.label}
                  </BRBButton>
                )}
                {secondaryButton && (
                  <BRBButton
                    className="invert"
                    size="massive"
                    onClick={() => secondaryButton.action(trip.id)}
                    disabled={secondaryButton.disabled}
                    secondary
                  >
                    {secondaryButton.label}
                  </BRBButton>
                )}
              </div>
            )}

          </Details>

          {
            trip.soldOut && (
              <Overlay>
                <p>Sold out</p>
              </Overlay>
            )
          }

        </Wrapper>

        {/* Locking confirmation modal */}
        <Modal
          open={modalOpen}
          size="tiny"
          closeOnEscape
          closeOnRootNodeClick
        >
          <Header
            icon="browser"
            content="Ready For Us To Get Your Travel Sorted?"
          />
          <Modal.Content>
            <p>
              By locking this trip, you are ready for us to book your trip. You
              will no longer be able to update your travel preferences or cancel your trip. The good
              news is that by locking early, you will earn additional rewards points and our
              team will secure even better locations and hotels for you.
            </p>
          </Modal.Content>
          <Modal.Actions>
            {modalIsProcessing && <Spinner />}
            <BRBButton size="massive" onClick={() => onLockTrip()}>
              Yes
            </BRBButton>
            <BRBButton size="massive" className="Locked" onClick={() => setModalOpen(false)}>
              No
            </BRBButton>
          </Modal.Actions>
        </Modal>
      </>
    );
  }

  // No trip data, so we return a blank create-a-trip card
  return (
    <EmptyTripWrapper>
      <EmptyTripContent onClick={() => { history.push('/add-trip#create'); }}>
        <p className="giant">+</p>
        <p>Start planning a new trip</p>
      </EmptyTripContent>
    </EmptyTripWrapper>
  );
};

export default TripCard;
