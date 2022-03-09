import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Card, Form, Grid, Header, Image, Label,
} from 'semantic-ui-react';
import clsx from 'clsx';
import PhoneInput from 'react-phone-input-2';

import {
  TripType,
  Destination,
  OutboundAirport,
  TravelDates,
} from '../../../interfaces/user';
import { createPhoneNumber } from '../Contents/contentSlice';

import BRBPinkText from '../../../components/BRBPinkText';
import { TripAdditionalTraveller } from '../AdditionalTraveller/TripAdditionalTraveller/TripAdditionalTraveller';
import SelectTravelDate from '../SelectTravelDate/SelectTravelDate';
import { SelectRoom } from '../SelectRoom/SelectRoom';
import { ModalBRBRewards } from '../BRBRewards/BRBRewards';
import SelectRoomType from '../SelectRoom/SelectRoomType';
import { Traveller } from '../../../interfaces/Traveller';
import { TripWrapper } from '../../travel-preferences/components/TripWrapper/TripWrapper';
import { ProfileNewTraveller } from '../CreateNewTraveller/ProfileNewTraveller/ProfileNewTraveller';
import { showNotification } from '../../../components/BRBNotification/ShowNotification';
import ScrollTarget from '../../../components/ScrollTarget';

import destinationSVG from '../../../assets/images/destination.svg';
import destinationsSVG from '../../../assets/images/destinations.svg';
import excludedSVG from '../../../assets/images/excluded.svg';
import airportsSVG from '../../../assets/images/airport.svg';
import groupSVG from '../../../assets/images/Group.svg';
import arrowActive from '../../../assets/images/arrow-right-active.svg';
import arrow from '../../../assets/images/arrow-right.svg';
import travelDatesLogo from '../../../assets/images/traveldates.svg';
import hostelRoomLogo from '../../../assets/images/hotelroom.svg';

import './TripCard.less';
import SimpleMessage from '../../../screens/_components/SimpleMessage';

export interface Props {
  openTravellerModal?: boolean;
  tripTypes: TripType[];
  top10Destinations: Destination[];
  airports: OutboundAirport[];
  excludedDestinations?: Destination[];
  travellers: Traveller[];
  roomType?: string;
  phoneNumber?: string;
  travelDates: TravelDates;
}

export const TripCard: React.VFC<Props> = ({
  openTravellerModal,
  tripTypes,
  top10Destinations,
  airports,
  excludedDestinations,
  travellers,
  roomType,
  phoneNumber = '',
  travelDates,
}) => {
  const dispatch = useDispatch();

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const selStartTravelDate = travelDates?.selectedDates?.startDate
    ? new Date(travelDates.selectedDates.startDate).toLocaleDateString(
      undefined,
      options,
    )
    : '';

  const selEndTravelDate = travelDates?.selectedDates?.endDate
    ? new Date(travelDates.selectedDates.endDate).toLocaleDateString(
      undefined,
      options,
    )
    : '';

  const displayItems = (items: string[], text: string) => {
    if (items && items.length) {
      const displayedItems = items.slice(0, 3);
      let hasMoreItems = false;
      if (items.length > 3) {
        hasMoreItems = true;
      }
      return (
        <div>
          {displayedItems
            && displayedItems.length
            && displayedItems.map((x: string, index: number) => (
              <Label
                key={index}
                onClick={() => {
                  handleChange(text);
                }}
              >
                {x}
              </Label>
            ))}
          {hasMoreItems && (
            <Label
              className="count-label"
              onClick={() => {
                handleChange(text);
              }}
            >
              +
              {' '}
              {items.length - 3}
            </Label>
          )}
        </div>
      );
    }
    return null;
  };

  const tripConfiguration = useSelector(
    (state: any) => state.content.tripConfiguration ?? {},
  );

  const userProfile = useSelector((state: any) => state.dashboard.user);
  const [modalState, setModalState] = useState<boolean>(false);
  const [modalAdditionalTravellerState, setModalAdditionalTravellerState] = useState<boolean>(false);
  const [modalHotelRoomState, setModalHotelRoomState] = useState<boolean>(false);
  const [modalTravelDetails, setModalTravelDetails] = useState<boolean>(false);
  const [isAdditional, setIsAdditional] = useState<boolean>(false);
  const [createTravellerText, setCreateTravellerText] = useState<string>(
    'Create New Traveller',
  );
  const [modalTravelDates, setModalTravelDates] = useState<boolean>(false);
  const [locationName, setLocationName] = useState<string>('');
  const [modalTravelRewards, setModalTravelRewards] = useState<boolean>(false);
  const [modalSelectRoomType, setSelectModalRoomType] = useState<boolean>(false);

  const onSaveNewTraveller = () => {
    setModalTravelDetails(false);
    if (locationName === 'traveldetails') {
      setModalAdditionalTravellerState(false);
    } else {
      setModalAdditionalTravellerState(true);
    }
  };

  useEffect(() => {
    if (openTravellerModal) { setModalAdditionalTravellerState(true); }
  }, [openTravellerModal]);

  const [contactNumber, setPhoneNumber] = useState(phoneNumber);

  const PhoneNumber = () => (
    <Form.Field>
      <div className="ui fluid input">
        <PhoneInput
          country="gb"
          isValid={(value, country: any) => {
            const validNumberCount = (country.format.match(/\./g) || [])
              .length;
            const isValid = value.length === validNumberCount;
            if (isValid) {
              dispatch(createPhoneNumber(value));
            }
            return isValid;
          }}
          disableSearchIcon
          inputProps={{
            name: 'phone',
            required: true,
            autoFormat: true,
            autoFocus: true,
          }}
          value={contactNumber}
          onChange={(contactNumber) => setPhoneNumber(contactNumber)}
          inputClass="ui fluid input"
          placeholder="Phone Number"
        />
      </div>
    </Form.Field>
  );

  const handleChange = (type: string) => {
    switch (type) {
      case 'Travellers':
        if (!userProfile.travellers?.length) {
          showNotification.warning({
            title: 'Warning',
            content: (
              <>
                Please
                {' '}
                <Link to="/travel-profile#complete-profile">complete Your Travel Details</Link>
                {' '}
                before creating a trip
              </>
            ),
          });
          return false;
        }
        setModalAdditionalTravellerState(true);
        break;
      case 'Room Type':
        if (!tripConfiguration?.addedTravellers?.length) {
          showNotification.warning({
            title: 'Warning',
            content: 'Please select travellers first',
          });
          return false;
        }
        setSelectModalRoomType(true);
        break;
      case 'Preferred airports':
        setModalState(true);
        setLocationName('airports');
        break;
      case 'Trip type':
        setModalState(true);
        setLocationName('types');
        break;
      case 'Top 10 destinations':
        setModalState(true);
        setLocationName('destinations');
        break;
      case 'Your Exclusions':
        setModalState(true);
        setLocationName('excludedDestinations');
        break;
      case 'Travel Dates':
        if (!tripConfiguration?.addedTravellers?.length) {
          showNotification.warning({
            title: 'Warning',
            content: 'Please select travellers first',
          });
          return false;
        }
        setModalTravelDates(true);
        break;
      case 'Rewards (Optional)':
        setModalTravelRewards(true);
        break;
      default:
        break;
    }
    return true;
  };

  const card = (
    text: string,
    lefticon: string,
    isCompletedStep: boolean,
    items: string[],
    link: React.ReactNode | string = '',
    rightIcon: boolean = true,
    className?: string,
  ) => (
    <Card
      className={clsx(className, {
        incomplete: !isCompletedStep,
      })}
      onClick={() => {
        handleChange(text);
      }}
    >
      <Card.Content>
        <div className="custom-header">
          <Image floated="left" size="mini" src={lefticon} />
          <span>{text}</span>
          {rightIcon ? (
            <Image
              floated="right"
              size="mini"
              src={isCompletedStep ? arrowActive : arrow}
            />
          ) : (
            <></>
          )}
        </div>
        <div className="selected-list-item">
          {isCompletedStep && items.length ? (
            displayItems(items, text)
          ) : (
            <p className="target-link">{link}</p>
          )}
        </div>
      </Card.Content>
    </Card>
  );

  return (
    <>
      <ScrollTarget id="customise" />
      <div className="ui container">
        <Grid columns={2} className="complete-profile">
          <Grid.Row>
            <Grid.Column mobile={16} tablet={16} computer={16}>
              <Header as="h2">
                <>
                  Customise
                  {' '}
                  <BRBPinkText>Your Trip</BRBPinkText>
                  . We’ll Get It Sorted!
                </>
              </Header>
              <p className="sub-header">
                Tell us when and how you’d like to travel. Our team will use
                this information to book a trip that’s as individual as you are.
              </p>

              {
                !userProfile.travellers?.length
                && (
                  <SimpleMessage>
                    &rarr; You’ll need to
                    {' '}
                    <Link to="/travel-profile#complete-profile">complete your travel profile</Link>
                    {' '}
                    before creating a trip.
                  </SimpleMessage>
                )
              }

            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Card.Group centered className="complete-profile-group">

          {card(
            'Travellers',
            groupSVG,
            Boolean(travellers.length),
            travellers.length
              ? travellers.map((x: any) => `${x.firstName} ${x.lastName}`)
              : [],
            'Add travellers',
          )}

          {card(
            'Travel Dates',
            travelDatesLogo,
            !!selStartTravelDate,
            [selStartTravelDate, selEndTravelDate],
            'Select travel Dates',
          )}

          {card(
            'Preferred airports',
            airportsSVG,
            Boolean(airports.length),
            airports.length
              ? airports.map((x: OutboundAirport) => x.airportCode)
              : [],
            'Select preferred airports',
          )}

          {card(
            'Trip type',
            destinationSVG,
            Boolean(tripTypes.length),
            tripTypes.length ? tripTypes.map((x: any) => x.name) : [],
            'Select trip type',
          )}

          {card(
            'Top 10 destinations',
            destinationsSVG,
            Boolean(top10Destinations.length),
            top10Destinations.length
              ? top10Destinations.map((x: any) => x.destinationName)
              : [],
            'Select top 10 destinations',
          )}

          {card(
            'Your Exclusions',
            excludedSVG,
            true,
            excludedDestinations?.length
              ? excludedDestinations?.map((x: any) => x.destinationName) ?? []
              : [],
            'Select destinations to exclude',
          )}

          {card(
            'Room Type',
            hostelRoomLogo,
            Boolean(roomType),
            roomType ? [roomType ?? ''] : [],
            'Select room type',
          )}

        </Card.Group>

        {modalState && (
          <TripWrapper
            open={modalState}
            locationName={locationName}
            onClosePopup={() => setModalState(false)}
          />
        )}

        {modalAdditionalTravellerState && (
          <TripAdditionalTraveller
            isOpened={modalAdditionalTravellerState}
            onChange={() => {
              setModalAdditionalTravellerState(false);
            }}
            onClosePopup={() => {
              setModalAdditionalTravellerState(false);
            }}
            onOpenAddNewTraveller={() => {
              setModalTravelDetails(true);
              setIsAdditional(true);
            }}
          />
        )}

        {modalTravelDates && (
          <SelectTravelDate
            isOpened={modalTravelDates}
            onClosePopup={() => setModalTravelDates(false)}
            travellersCount={travellers ? travellers.length : 0}
          />
        )}

        {modalHotelRoomState && (
          <SelectRoom
            isOpened={modalHotelRoomState}
            onClosePopup={() => setModalHotelRoomState(false)}
          />
        )}

        {modalTravelDetails && (
          <ProfileNewTraveller
            isOpened={modalTravelDetails}
            headerText={createTravellerText}
            onChange={() => {
              setModalTravelDetails(false);
            }}
            onSaveNewTraveller={onSaveNewTraveller}
            isAdditional={isAdditional}
          />
        )}

        {modalTravelRewards && (
          <ModalBRBRewards
            isOpened={modalTravelRewards}
            onClosePopup={() => setModalTravelRewards(false)}
          />
        )}

        {modalSelectRoomType && (
          <SelectRoomType
            isOpened={modalSelectRoomType}
            onClosePopup={() => setSelectModalRoomType(false)}
            onChange={() => { }}
          />
        )}

      </div>
    </>
  );
};
