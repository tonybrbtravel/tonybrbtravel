// import TripIncludes from "./TripIncludes/TripIncludes"
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Header, Image } from 'semantic-ui-react';
import { useLocation, useHistory } from 'react-router-dom';

import BrbEndPoints from '../../../Api/BrbEndPoints';
import useApiQuery from '../../../Hooks/ApiQuery';
import { getTrip } from '../../../Api/Trip';
import { getBRBHotelsInfo } from '../../../Api/HotelApi';
import useSubscriptionQuery from '../../../Hooks/useSubscriptionQuery';
import { getTripTopUpInfo } from '../../../Api/myTrips';

import { Traveller } from '../../../interfaces/Traveller';
import { IHotelSliderDetails } from '../../../interfaces/hotelType';
import { subscriptionStatus } from '../../../interfaces/myAccountType';

import ContentSlider from './ContentSlider/ContentSlider';
import { BRBButton } from '../../../components/BRBButton/BRBButton';
import { DeleteTrip } from '../DeleteTrip/DeleteTrip';
import { TripCard } from '../TripCard/TripCard';
import {
  createTripFormUpdate,
  CreateUserProfile,
  ResetTrip,
  EditTripForm,
  tripPriceUpdate,
  resetLockTripStateUpdate,
} from './contentSlice';
import { showNotification } from '../../../components/BRBNotification/ShowNotification';
import { Spinner } from '../../../components/BRBSpinner/BRBSpinner';
import { Topup } from './Topup/Topup';

import checkboxImg from '../../../images/icons/checkbox.svg';
import atol from '../../../images/atol-protected-logo-white.svg';

import './Content.less';
import SurpriseTripPanel from '../../../screens/_panels/SurpriseTripPanel';
import ScrollTarget from '../../../components/ScrollTarget';
import { trackTripCreationIntent } from '../../../screens/_utilities/tracking';

const stopPropagation = (e: MouseEvent) => {
  e.stopPropagation();
  e.nativeEvent.stopImmediatePropagation();
};

export const Content = () => {
  const location = useLocation<any>();
  const history = useHistory<any>();
  const isEdit = !!location.state?.id;
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.dashboard.user ?? {});
  const tripConfiguration = useSelector(
    (state: any) => state.content.tripConfiguration ?? {},
  );
  // alert(JSON.stringify(tripConfiguration));
  const { data: subscriptionDetails } = useSubscriptionQuery();

  const subscriptionInfo = !!((subscriptionDetails?.status?.toUpperCase() === subscriptionStatus.NotSubscribed || subscriptionDetails?.status?.toUpperCase() === subscriptionStatus.Subscribed));

  useEffect(() => {
    console.log('isEdit', isEdit, 'location', location);
    if (isEdit) {
      getTrip({ url: `${BrbEndPoints.GetTrip}/${location.state.id}` }).then(
        (user) => {
          const timeDifference = Math.abs(
            new Date(user.startDate).getTime()
            - new Date(user.endDate).getTime(),
          );
          const nights: number = Math.ceil(timeDifference / (1000 * 3600 * 24));
          const trip = {
            id: user.id,
            addedTravellers: user.additionalTravellers,
            isTripInitial: false,
            top10Destinations: user.destinations,
            excludedDestinations: user.exclusions,
            airports: user.airports,
            travelPreferences: user.tripTypes,
            roomTypes: { roomNotes: user.notes, roomType: user.roomType },
            travelDates: {
              noOfCities: user.numberOfCities,
              lateReturn: user.lateReturn,
              numberOfNights: nights,
              selectedDates: {
                startDate: new Date(user.startDate),
                endDate: new Date(user.endDate),
              },
              departurePreference: user.departurePreference,
            },
          };
          dispatch(EditTripForm(trip));
        },
      );
    } else {
      console.log('tripConfiguration.isTripInitial', tripConfiguration.isTripInitial);
      dispatch(CreateUserProfile(user));
    }
  }, [
    dispatch,
    isEdit,
    location?.state?.id,
    tripConfiguration.isTripInitial,
    user,
  ]);

  const { data: hotelInfo } = useApiQuery<IHotelSliderDetails[]>(
    BrbEndPoints.getBRBTop3Hotels,
    { url: BrbEndPoints.getBRBTop3Hotels },
    getBRBHotelsInfo,
  );

  const customizeTripRef = useRef<null | HTMLDivElement>(null);
  const [openTraveller, setOpenTraveller] = useState<boolean>(false);
  const [deleteTrip, setDeleteTrip] = useState<boolean>(false);
  const [termsAndConditions, setTermsAndConditions] = useState<boolean>(false);
  const [loaderSaveTrip, setLoaderSaveTrip] = useState<boolean>(false);

  const toggleTermsAndConditions = () => {
    setTermsAndConditions(!termsAndConditions);
  };

  const createTripClick = () => {
    customizeTripRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleChange = () => {
    setDeleteTrip(true);
  };

  const { tripTypes } = tripConfiguration.travelPreferences ?? {
    tripTypes: [],
  };

  const { outboundAirports } = tripConfiguration.airports ?? {
    outboundAirports: [],
  };
  const top10Destinations = tripConfiguration.top10Destinations ?? {
    destinations: [],
  };

  const excludedDestinations = tripConfiguration.excludedDestinations ?? {
    destinations: [],
  };
  const roomTypes = tripConfiguration.roomTypes ?? {};
  const travellers = tripConfiguration.addedTravellers?.filter((x: any) => x) ?? [];

  const tripPriceDetails = useSelector((state: any) => state.content.tripCost);
  const [tripTopupAmt, setTripTopupAmt] = useState<number>(
    tripPriceDetails?.tripTopupAmt ?? 0,
  );
  const [showTopupPopup, setShowTopupPopup] = useState<boolean>(false);

  const tripPriceValidate = (isEditTrip: boolean) => {
    const tripDates = tripConfiguration.travelDates.selectedDates;

    const tripStartDate = new Date(tripDates.startDate).toISOString().slice(0, 10);
    const tripEndDate = new Date(tripDates.endDate).toISOString().slice(0, 10);

    const travellersInfo = tripConfiguration.addedTravellers ?? [];

    let addTravellers = [];
    if (travellers.length) {
      addTravellers = travellers.map((x: any) => ({
        title: x.title,
        firstName: x.firstName,
        lastName: x.lastName,
        nationality: x.nationality,
        brbUser: x.brbUser,
        dob: new Date(x.dob).toISOString().slice(0, 10),
      }));
    }

    const tripInfoDetails: any = {
      startDate: tripStartDate,
      endDate: tripEndDate,
      additionalTravellers: addTravellers,
      editTrip: isEditTrip,
      id: tripConfiguration.id,
    };

    console.log('tripPriceDetails', tripInfoDetails);

    return getTripTopUpInfo({
      url: BrbEndPoints.tripTopUp,
      data: tripInfoDetails,
    });
  };

  const isAllowedToCreateTrip = (res: any) => {
    const topPopupPrice = res.pricing && res.pricing.topUp;
    const additionalTravellerPrice = res.pricing && res.pricing.additionalTravellerPrice;
    const balObj = {
      tripPrice: res.pricing && res.pricing.tripPrice,
      additionalTravellerPrice:
        res.pricing && res.pricing.additionalTravellerPrice,
      topUp: topPopupPrice,
    };
    dispatch(tripPriceUpdate(balObj));

    if (topPopupPrice > 0 || additionalTravellerPrice > 0) {
      return false;

      // return true;
    }

    return true;
  };

  const onCreateTrip = async () => {
    if (!termsAndConditions && !isEdit) {
      showNotification.warning({
        title: 'Create Trip',
        content: 'Please accept the booking conditions by checking the box.',
      });
      return false;
    }
    setLoaderSaveTrip(true);
    dispatch(resetLockTripStateUpdate({}));

    if (
      travellers.length
      && travellers.length
      && outboundAirports.length
      && tripTypes.length === 1
      // excludedDestinations.destinations.length &&
      && top10Destinations.destinations.length
      && roomTypes.roomType
      && tripConfiguration.travelDates?.numberOfNights
    ) {
      // User has provided all input, so let's track theit intent to create a trip
      trackTripCreationIntent({
        travellers: travellers.length,
        nights: tripConfiguration.travelDates.numberOfNights,
        tripType: tripConfiguration.travelPreferences.tripTypes[0].name,
        value: tripPriceDetails.tripPrice / 100, // Convert to pounds
        topUp: !!tripPriceDetails.topUp,
      });
      const tripResponse = await tripPriceValidate(isEdit);

      const isAllowedTrip = isAllowedToCreateTrip(tripResponse);

      // console.log("isall", isAllowedTrip);

      if (!isAllowedTrip) {
        setShowTopupPopup(true);
        setLoaderSaveTrip(false);
        return false;
      }
      // return false;
      // alert(tripConfiguration.id);
      dispatch(createTripFormUpdate(true));
      // history.replace(location.pathname, {});
      setLoaderSaveTrip(false);
    } else {
      setLoaderSaveTrip(false);
      showNotification.warning({
        title: 'Create Trip',
        content: 'Please select all options.',
      });
      return false;
    }
    return true;
  };

  return (
    <div>
      <ScrollTarget ref={customizeTripRef} id="create" />

      <div className="create-trip-content" ref={customizeTripRef}>
        {tripTypes && (
          <TripCard
            openTravellerModal={openTraveller}
            top10Destinations={top10Destinations.destinations}
            excludedDestinations={excludedDestinations.destinations}
            tripTypes={tripTypes}
            airports={outboundAirports}
            travellers={travellers}
            roomType={roomTypes.roomType}
            travelDates={tripConfiguration?.travelDates ?? {}}
            phoneNumber={tripConfiguration?.phoneNumber ?? ''}
          />
        )}

        <div className="trip-includes">
          <div className="ui container">

            <Divider />

            <h3>Your Trip Includes</h3>
            <div className="trip-includes-info ">
              <div className="trip-data-info">
                <Image src={checkboxImg} className="chkbox_img" />
                <p>Return Flights</p>
              </div>
              <div className="trip-data-info">
                <Image src={checkboxImg} className="chkbox_img" />
                3 - 5*
                Accomodation
              </div>
              <div className="trip-data-info">
                <Image src={checkboxImg} className="chkbox_img" />
                Dream Destination
              </div>
            </div>
            <div className="atol-section">
              <Image src={atol} />
              ATOL Protected
            </div>

            <Divider />

            {!isEdit && (
              <div className="terms-check-box">
                <div className="ui checkbox">

                  <input
                    name="booking-conditions"
                    type="checkbox"
                    readOnly
                    checked={termsAndConditions}
                  />

                  <label
                    onClick={toggleTermsAndConditions}
                    htmlFor="booking-conditions"
                  >
                    <span>By creating a trip, I agree to the</span>
                    {' '}
                    <a
                      onClick={stopPropagation}
                      href="/terms-and-conditions"
                      target="_blank"
                      style={{ display: 'inline-block' }}
                    >
                      <strong>Booking Conditions</strong>
                    </a>
                  </label>

                </div>
              </div>
            )}

            <div className="createtrip-button">
              <BRBButton onClick={onCreateTrip}>
                {isEdit ? (
                  <> Update Trip</>
                ) : (
                  <>
                    Create A Trip Now
                    {' '}
                    <small>+ Earn Points</small>
                    {' '}
                  </>
                )}
                {loaderSaveTrip ? <Spinner /> : ''}
              </BRBButton>

              {isEdit && (
                <>
                  <a className="deletetrip-button" onClick={handleChange}>
                    Delete Trip
                  </a>
                  {deleteTrip && (
                    <DeleteTrip
                      id={location.state.id}
                      isOpened={deleteTrip}
                      onClosePopup={() => setDeleteTrip(false)}
                    />
                  )}
                </>
              )}

            </div>
          </div>
        </div>
      </div>

      <ContentSlider />

      <SurpriseTripPanel onCreateTripClick={createTripClick} />

      {showTopupPopup ? (
        <Topup
          isOpenPopup={showTopupPopup}
          topupAmt={tripPriceDetails}
          onClosePopup={() => setShowTopupPopup(false)}
          userSubscriptionStatus={subscriptionInfo}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Content;
