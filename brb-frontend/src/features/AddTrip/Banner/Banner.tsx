import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { NavigationOptions } from 'swiper/types/components/navigation.d';
import { useQueryClient } from 'react-query';
import { Grid, Icon } from 'semantic-ui-react';
import { Swiper, SwiperSlide } from 'swiper/react';

import BRBBanner from '../../../components/BRBBanner/BRBBanner';
import BannerTripBoxUser from './BannerTripBox/BannerTripBoxUser';
import BannerTripBox from './BannerTripBox/BannerTripBox';
import { BRBButton } from '../../../components/BRBButton/BRBButton';
import { getMyTripDetails } from '../../../Api/myTrips';
import useApiQuery from '../../../Hooks/ApiQuery';
import BrbEndPoints from '../../../Api/BrbEndPoints';
import ScrollTarget from '../../../components/ScrollTarget';

import myTripsBackgroundImage from '../../../images/banner-img.png';
import addTripBackgroundImage from '../../../images/onestep.jpg';

import './Banner.less';
import Spacer from '../../../components/Spacer';
import Metrics from '../../../themes/Metrics';

export interface Props {
  showHeader?: boolean;
}

export const Banner = ({ showHeader = true }: Props) => {
  const history = useHistory();
  const user = useSelector((state: any) => state.dashboard.user);
  const endOfBanner = React.useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const queryClient = useQueryClient();
  const now = new Date();

  const onViewMyTrips = () => {
    history.push('/my-trips');
    window.scroll({
      top: endOfBanner.current?.offsetTop,
      left: 0,
      behavior: 'smooth',
    });
  };

  const onCreateTrip = () => {
    if (pathname !== '/add-trip') {
      history.push('/add-trip#create');
    } else {
      window.scroll({
        top: endOfBanner.current?.offsetTop,
        left: 0,
        behavior: 'smooth',
      });
    }

    queryClient.invalidateQueries(['mytrips', user.id]);
  };

  const backgroundImage = pathname === '/add-trip' ? addTripBackgroundImage : myTripsBackgroundImage;

  const { data: myTrips } = useApiQuery<any[]>(
    ['mytrips', user.id],
    { url: BrbEndPoints.myTrips },
    getMyTripDetails,
  );

  const nextTripDetails: { label: string; date: Date }[] = [];
  let hasCurrentTrip: boolean = false;
  let lastTravelDate: number = user.dateJoined;

  if (myTrips?.length) {
    // Check for any currently active trips based on dates (ignoring times)
    const currentTrips = myTrips
      .filter((trip) => new Date(trip.startDate) < now && new Date(trip.endDate) > now);
    hasCurrentTrip = !!currentTrips.length;

    // Update the last travel date if we have any trips completely in the past
    const pastTrips = myTrips
      .filter((trip) => new Date(trip.endDate) < now)
      .sort((a, b) => a.endDate.localeCompare(b.endDate));
    const [mostRecentTrip] = pastTrips;
    if (mostRecentTrip) {
      lastTravelDate = mostRecentTrip.endDate;
    }

    // Get the next upcoming trip, if there is one
    // Filter out any trips that are in the past, ensure we've got an array
    // sorted by `startDate`, and take the first element if present.
    const futureTrips = myTrips
      .filter((trip) => new Date(trip.startDate) > now)
      .sort((a, b) => a.startDate.localeCompare(b.startDate));
    const [nextTrip] = futureTrips;

    if (nextTrip) {
      const { tripStatus } = nextTrip;
      const tripDate = new Date(nextTrip.startDate);
      const revealDate = new Date(new Date(tripDate).setDate(tripDate.getDate() - 14));
      const lockDate = new Date(new Date(tripDate).setDate(tripDate.getDate() - 42));

      // Trips progress from Created -> Locked -> Revealed, so we want to make
      // sure we only show relevant countdowns for each state. (As well as
      // skipping any countdowns to dates in the past.)
      if (lockDate > now && tripStatus === 'Created') {
        nextTripDetails.push({
          label: 'Locked in',
          date: lockDate,
        });
      }

      if (revealDate > now && (tripStatus === 'Created' || tripStatus === 'Locked')) {
        nextTripDetails.push({
          label: 'Revealed in',
          date: revealDate,
        });
      }

      if (tripDate > now) {
        nextTripDetails.push({
          label: 'Departing in',
          date: tripDate,
        });
      }
    }
  }

  const countdownHeading = nextTripDetails.length ? 'Your Next Trip' : <>You Haven’t Travelled&nbsp;For...</>;

  return (
    <>
      <BRBBanner backgroundImage={backgroundImage}>
        <div className="banner-container-swiper">

          <h2>{hasCurrentTrip ? 'You’re off! We hope you enjoy your trip!' : countdownHeading}</h2>

          {
            !hasCurrentTrip && !!nextTripDetails.length && (
              <>
                <Swiper
                  keyboard={{ enabled: false, onlyInViewport: false }}
                  mousewheel={{ invert: true }}
                  spaceBetween={50}
                  pagination={{
                    clickable: true,
                    renderBullet(index, className) {
                      return (
                        `<span class="${(myTrips && myTrips.length > 0) ? className : ''
                        }">${(myTrips && myTrips.length > 0) ? nextTripDetails[index].label : ''
                        }</span>`
                      );
                    },
                  }}
                  allowTouchMove
                  grabCursor
                >

                  {nextTripDetails.map((s) => (
                    <SwiperSlide key={s.label}>
                      <BannerTripBox
                        expiryTimestamp={s.date.valueOf()}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </>
            )
          }

          {
            !nextTripDetails.length && (
              <BannerTripBoxUser
                registeredTimeStamp={lastTravelDate}
              />
            )
          }

          {myTrips && myTrips.length > 0 ? (
            <BRBButton
              className="btn btn-primary"
              type="button"
              onClick={onViewMyTrips}
            >
              View all trips
            </BRBButton>
          ) : (
            <BRBButton
              className="btn btn-primary"
              type="button"
              onClick={onCreateTrip}
            >
              Create a trip now
              <small>+Earn Points</small>
            </BRBButton>
          )}

        </div>
      </BRBBanner>

      <ScrollTarget ref={endOfBanner} id="endOfBanner" />
    </>
  );
};

export default Banner;
