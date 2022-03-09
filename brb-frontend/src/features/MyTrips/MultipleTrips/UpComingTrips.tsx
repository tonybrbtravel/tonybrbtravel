import React, { useState, useEffect } from 'react';
import { Header, Modal } from 'semantic-ui-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { NavigationOptions } from 'swiper/types/components/navigation.d';
import { useHistory } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';

import {
  getMyTripDetails,
  lockTripDetails,
} from '../../../Api/myTrips';
import BrbEndPoints from '../../../Api/BrbEndPoints';
import { getTrip } from '../../../Api/Trip';
import { Topup } from '../../AddTrip/Contents/Topup/Topup';
import useSubscriptionQuery from '../../../Hooks/useSubscriptionQuery';
import { subscriptionStatus } from '../../../interfaces/myAccountType';

import parseTripDetails, { Trip } from '../../../screens/_utilities/parseTripDetails';

import CreateTripPanel from '../../../components/CreateTripPanel';
import { BRBButton } from '../../../components/BRBButton/BRBButton';

import TripCard from '../../../screens/_components/TripCard';

import Spacer from '../../../components/Spacer';

export const UpComingTrips = () => {
  const [dataReady, setDataReady] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const user = useSelector((state: any) => state.dashboard.user);
  const [upcomingTrips, setUpcomingTrips] = useState<Trip[]>([]);

  async function fetchData() {
    getMyTripDetails({ url: BrbEndPoints.myTrips })
      .then((response) => {
        queryClient.invalidateQueries(['mytrips', user.id]);
        const upcomingTripArray = parseTripDetails(response, true, false);

        setUpcomingTrips(upcomingTripArray);
        setDataReady(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Load data on first render
  useEffect(() => {
    fetchData();
  }, []);

  // Passable function to trigger a reload
  const refreshFunction = () => fetchData();

  if (!dataReady) {
    return <Spacer height="100vh" />; // TODO: Loading placeholder
  }

  if (upcomingTrips.length) {
    return (
      <Swiper
        keyboard={{ enabled: false, onlyInViewport: false }}
        mousewheel={{ invert: true }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        allowTouchMove
        pagination={{ clickable: true }}
        watchOverflow
        className="my-trip-rewards"
      >

        {
          upcomingTrips.map((trip) => (
            <SwiperSlide key={trip.id}><TripCard trip={trip} refreshFunction={refreshFunction} /></SwiperSlide>
          ))
        }

        {/* Create-a-trip card on the end of the list */}
        <SwiperSlide><TripCard /></SwiperSlide>

      </Swiper>
    );
  }
  return <CreateTripPanel title="No upcoming trips..." text="Start experiencing hassle-free travel by creating a new trip. Our team of travel experts will use your profile information to send you to places on your bucket list, as well as up-and-coming destinations we’ve tried, tested and reckon you’d like. Earn points and unlock rewards in the process." />;
};
