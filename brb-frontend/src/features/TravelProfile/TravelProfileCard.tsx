import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card, Grid, Header, Image, Label, Progress,
} from 'semantic-ui-react';
import clsx from 'clsx';

import {
  Activity,
  Destination,
  OutboundAirport,
  Preference,
  TripType,
  User,
} from '../../interfaces/user';

import { Traveller } from '../../interfaces/Traveller';
import BRBPinkText from '../../components/BRBPinkText';
import { ProfileActivity } from '../AddTrip/Activities/Components/ProfileActivity/ProfileActivity';
import { ProfileNewTraveller } from '../AddTrip/CreateNewTraveller/ProfileNewTraveller/ProfileNewTraveller';
import { ProfileAdditionalTraveller } from '../AddTrip/AdditionalTraveller/ProfileAdditionalTraveller/ProfileAdditionalTraveller';
import { PreferencesWrapper } from '../travel-preferences/components/PreferencesWrapper/PreferencesWrapper';
import { SelectRoom } from '../AddTrip/SelectRoom/SelectRoom';
import { ResetTrip } from '../AddTrip/Contents/contentSlice';

import { calculateProfileCompletionPercentage } from '../../utils/calculators';

import plane from '../../assets/images/plane.svg';
import destinationSVG from '../../assets/images/destination.svg';
import destinationsSVG from '../../assets/images/destinations.svg';
import excludedSVG from '../../assets/images/excluded.svg';
import airportsSVG from '../../assets/images/airport.svg';
import groupSVG from '../../assets/images/Group.svg';
import passortSVG from '../../assets/images/passport.svg';
import hotelSVG from '../../assets/images/hotel.svg';
import activitySVG from '../../assets/images/activity.svg';
import arrowActive from '../../assets/images/arrow-right-active.svg';
import arrow from '../../assets/images/arrow-right.svg';

import './TravelProfileCard.less';
import { trackProfileCompletion } from '../../screens/_utilities/tracking';

export interface Props {
  openTravellerModal?: boolean;
  tripTypes: TripType[];
  top10Destinations: Destination[];
  airports: OutboundAirport[];
  excludedDestinations?: Destination[];
  hotelPreferences?: Preference[];
  preferredActivities?: Activity[];
  travellers: Traveller[];
  isProfileCompleted: boolean;
  userProfile: User;
}

export const TravelProfileCard: React.VFC<Props> = ({
  openTravellerModal,
  tripTypes,
  top10Destinations,
  airports,
  excludedDestinations,
  hotelPreferences,
  preferredActivities,
  travellers,
  userProfile,
  isProfileCompleted,
}) => {
  // If the user first fully completes their profile while this component
  // is rendered, we track it
  const [originalIsProfileCompletedValue] = useState<boolean>(isProfileCompleted);
  useEffect(() => {
    if (originalIsProfileCompletedValue !== isProfileCompleted) {
      trackProfileCompletion();
    }
  },
  [isProfileCompleted]);

  const tripConfiguration = useSelector(
    (state: any) => state.content.tripConfiguration ?? {},
  );

  const displayItems = (items: string[], text: string) => {
    if (items && items.length) {
      const displayedItems = items.slice(0, 3);
      const hasMoreItems = items.length > 3;
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

  const dispatch = useDispatch();
  const [modalState, setModalState] = useState<boolean>(false);
  const [modalAdditionalTravellerState, setModalAdditionalTravellerState] = useState<boolean>(false);
  const [modalHotelRoomState, setModalHotelRoomState] = useState<boolean>(false);
  const [modalTravelDetails, setModalTravelDetails] = useState<boolean>(false);
  const [createTravellerText, setCreateTravellerText] = useState<string>(
    'Your Travel Details',
  );
  const [locationName, setLocationName] = useState<string>('');
  const [isAdditional, setIsAdditional] = useState<boolean>(false);
  const [modalPrefActivities, setModalPrefActivities] = useState<boolean>(false);

  const profileCompletionPercentage = calculateProfileCompletionPercentage(userProfile);

  const onSaveNewTraveller = () => {
    setModalTravelDetails(false);
    setCreateTravellerText('Your travel details');
  };

  useEffect(() => {
    if (openTravellerModal) setModalAdditionalTravellerState(true);
  }, [openTravellerModal]);

  const getBrbUser = useCallback(() => {
    const user = createTravellerText.toLowerCase() === 'your travel details'
      ? travellers.filter((x) => x.brbUser)[0]
      : undefined;
    return user;
  }, [createTravellerText, travellers]);

  const filteredContacts = useMemo(() => getBrbUser(), [getBrbUser]);

  const handleChange = (type: string) => {
    if (!tripConfiguration.isTripInitial) dispatch(ResetTrip({}));
    switch (type) {
      case 'Additional travellers (optional)':
        setModalAdditionalTravellerState(true);
        break;
      case 'Create New Traveller':
        setModalTravelDetails(true);
        setLocationName('traveldetails');
        break;
      case 'Hotel preferences':
        setModalHotelRoomState(true);
        break;
      case 'Your travel details':
        setModalTravelDetails(true);
        setLocationName('traveldetails');
        break;
      case 'Preferred activities':
        setModalPrefActivities(true);
        break;
      case 'Preferred airports':
        setModalState(true);
        setLocationName('airports');
        break;
      case 'Preferred trip types':
        setModalState(true);
        setLocationName('types');
        break;
      case 'Top 10 destinations':
        setModalState(true);
        setLocationName('destinations');
        break;
      case 'Excluded destinations (optional)':
        setModalState(true);
        setLocationName('excludedDestinations');
        break;
      default:
        break;
    }
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
      <div className="ui container">
        <Grid columns={2} className="complete-profile">
          <Grid.Row>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <Header as="h2">
                <>
                  {
                    userProfile.profileStatus
                      ? 'Update'
                      : 'Complete'
                  }
                  {' '}
                  <BRBPinkText>Your Profile</BRBPinkText>
                </>
              </Header>
              <p className="sub-header">
                Click on the relevant section to update your traveller profile
                and tell us how you’d like to travel with BRB.
              </p>
            </Grid.Column>
            <Grid.Column
              only="tablet computer"
              tablet={8}
              computer={8}
              className="TravelProfileProgressBar"
            >
              <div className="profile-completion">
                <div>
                  <Grid columns={1}>
                    <Grid.Column computer={14} textAlign="left">
                      Profile Completion
                    </Grid.Column>
                  </Grid>
                  <Grid columns={2}>
                    <Grid.Column computer={14} textAlign="left">
                      <Progress
                        percent={profileCompletionPercentage}
                        size="small"
                        color="red"
                      />
                    </Grid.Column>
                    <Grid.Column computer={2}>
                      <Image src={plane} size="massive" />
                    </Grid.Column>
                  </Grid>
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Card.Group centered className="complete-profile-group">

          {card(
            'Preferred trip types',
            destinationSVG,
            Boolean(tripTypes.length),
            tripTypes.length ? tripTypes.map((x: any) => x.name) : [],
            'Select preferred trip types',
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
            'Top 10 destinations',
            destinationsSVG,
            Boolean(top10Destinations.length),
            top10Destinations.length
              ? top10Destinations.map((x: any) => x.destinationName)
              : [],
            'Select top 10 destinations',
          )}

          {card(
            'Excluded destinations (optional)',
            excludedSVG,
            true, // Boolean(excludedDestinations?.length),
            excludedDestinations?.length
              ? excludedDestinations?.map((x: any) => x.destinationName) ?? []
              : [],
            'Select destinations',
          )}

          {card(
            'Hotel preferences',
            hotelSVG,
            Boolean(hotelPreferences?.length),
            hotelPreferences?.length
              ? hotelPreferences?.map((x: any) => x.name) ?? []
              : [],
            'Select hotel preferences',
          )}

          {card(
            'Preferred activities',
            activitySVG,
            Boolean(preferredActivities?.length),
            preferredActivities?.length
              ? preferredActivities?.map((x: any) => x.name) ?? []
              : [],
            'Select activities',
          )}

          {card(
            'Your travel details',
            passortSVG,
            Boolean(travellers.filter((x) => x.brbUser).length),
            travellers.filter((x) => x.brbUser).length
              ? travellers
                .filter((x) => x.brbUser)
                .map((x: any) => `${x.firstName} ${x.lastName}`)
              : [],
            'Add details',
          )}

          {card(
            'Additional travellers (optional)',
            groupSVG,
            true, // Boolean(travellers.filter((x) => !x.brbUser).length),
            travellers.filter((x) => !x.brbUser).length
              ? travellers
                .filter((x) => !x.brbUser)
                .map((x: any) => `${x.firstName} ${x.lastName}`)
              : [],
            'Add travellers',
          )}
        </Card.Group>

        {modalState && (
          <PreferencesWrapper
            open={modalState}
            locationName={locationName}
            onClosePopup={() => setModalState(false)}
          />
        )}

        {modalAdditionalTravellerState && (
          <ProfileAdditionalTraveller
            isOpened={modalAdditionalTravellerState}
            onChange={() => { }}
            onClosePopup={() => {
              setCreateTravellerText('Your travel details');
              setModalAdditionalTravellerState(false);
              setModalTravelDetails(false);
            }}
            onOpenAddNewTraveller={() => {
              setCreateTravellerText('Create New Traveller');
              setModalTravelDetails(true);
              setIsAdditional(true);
            }}
          />
        )}

        {modalTravelDetails && (
          <ProfileNewTraveller
            isOpened={modalTravelDetails}
            headerText={createTravellerText}
            traveller={filteredContacts}
            onChange={() => {
              setCreateTravellerText('Your travel details');
              setModalTravelDetails(false);
              setIsAdditional(false);
            }}
            onSaveNewTraveller={onSaveNewTraveller}
            isAdditional={isAdditional}
          // onClosePopup={() => setModalTravelDetails(false)}
          />
        )}

        {modalPrefActivities && (
          <ProfileActivity
            isOpened={modalPrefActivities}
            onClosePopup={() => setModalPrefActivities(false)}
          />
        )}

        {modalHotelRoomState && (
          <SelectRoom
            isOpened={modalHotelRoomState}
            onClosePopup={() => setModalHotelRoomState(false)}
          />
        )}

      </div>
    </>
  );
};
