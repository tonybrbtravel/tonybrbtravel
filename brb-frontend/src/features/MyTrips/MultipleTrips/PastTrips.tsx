import React, { useState, useEffect, useMemo } from 'react';
import {
  Card, Grid, Icon, List, Image, Header, Modal,
} from 'semantic-ui-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { NavigationOptions } from 'swiper/types/components/navigation.d';
import { Auth } from 'aws-amplify';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { BRBButton } from '../../../components/BRBButton/BRBButton';
import BannerTripBox from '../../AddTrip/Banner/BannerTripBox/BannerTripBox';
import CreateTripPanel from '../../../components/CreateTripPanel';

import plane from '../../../assets/images/white-plane.png';
import Krakow from '../../../assets/images/Krakow.png';
import Romance from '../../../assets/images/my-trip-background.jpg';
import culture from '../../../assets/images/my-trip-background-culture.jpg';
import Spacer from '../../../components/Spacer';
import TripCard from '../../../screens/_components/TripCard';
import parseTripDetails, { Trip } from '../../../screens/_utilities/parseTripDetails';

const options: Intl.DateTimeFormatOptions = {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  weekday: 'long',
};

export const MultipleTrips = () => {
  const [pastDates, setPastDates] = useState<any[]>([]);
  const [dataReady, setDataReady] = useState<boolean>(false);

  const apiUrl = `${process.env.REACT_APP_TRIP_URL}/trip/`;

  useEffect(() => {
    async function fetchData() {
      const session = await Auth.currentSession();
      const Token = session.getIdToken();
      const token = Token.getJwtToken();
      axios({
        url: apiUrl,
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          const pastTrips: Trip[] = parseTripDetails(response.data, false, true);
          setPastDates(pastTrips);
          setDataReady(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
  }, []);

  const trips = useMemo(
    () => pastDates.map((x, index) => (
      <TripCard key={x.id} trip={x} />
    )),
    [pastDates],
  );

  if (!dataReady) {
    return <Spacer height="100vh" />; // TODO: Loading placeholder
  }

  if (trips.length) {
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

        {trips.map((s, i) => (
          <SwiperSlide key={`slide_${i}`}>{s}</SwiperSlide>
        ))}

        {/* Create-a-trip card on the end of the list */}
        <SwiperSlide><TripCard /></SwiperSlide>

      </Swiper>

    );
  }

  return <CreateTripPanel title="No trips yet..." text="Start experiencing hassle-free travel by creating a new trip. Our team of travel experts will use your profile information to send you to places on your bucket list, as well as up-and-coming destinations we’ve tried, tested and reckon you’d like. Earn points and unlock rewards in the process." />;
};
