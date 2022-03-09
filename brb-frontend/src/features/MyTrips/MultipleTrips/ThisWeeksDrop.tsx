import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link, useHistory } from 'react-router-dom';
import {
  Card, List, Image, Header,
} from 'semantic-ui-react';
import { format } from 'date-fns';
import styled from 'styled-components';

import BrbEndPoints from '../../../Api/BrbEndPoints';
import { getThisWeeksDropDetails } from '../../../Api/dashboardApi';
import { getAirportNameByCode } from '../../../screens/_utilities/airportsUtilities';

import Colors from '../../../themes/Colors';

import { BRBButton } from '../../../components/BRBButton/BRBButton';
import { TripImageType, TripType } from '../../../interfaces/tripType';

import plane from '../../../assets/images/white-plane.png';
import Metrics from '../../../themes/Metrics';

import SimpleMessage from '../../../screens/_components/SimpleMessage';
import TripCard from '../../../screens/_components/TripCard';
import Spacer from '../../../components/Spacer';

export const ThisWeeksDrop = () => {
  const [thisWeeksDropArray, setThisWeeksDropArray] = useState<any[]>([]);
  const [dataReady, setDataReady] = useState<boolean>(false);
  const userProfile = useSelector((state: any) => state.dashboard.user);
  const countries = useSelector((state: any) => state.contentful.countries);
  const history = useHistory();

  async function fetchData(x: any) {
    const airports = userProfile.airports.outboundAirports
      .map((x: any) => x.airportCode)
      .filter((value: any, index: any, self: string | any[]) => self.indexOf(value) === index);
    const cities: TripImageType[] = [];
    x.forEach((country: any) => {
      country.cities.forEach((city: any) => {
        cities.push({
          image: city.smallImage,
          name: city.city,
        });
      });
    });

    getThisWeeksDropDetails({ url: `${BrbEndPoints.thisWeeksDrop}=${airports}` })
      .then((response) => {
        if (Array.isArray(response)) {
          const drops = [];
          const data = response;
          console.log(data);
          for (let i = 0; i < data.length; i++) {
            const tripTypeImage = (cities && cities?.filter((x) => x.name === data[i].city.cityName).map((x) => x.image));
            const numberOfTravellers = data[i].pax;
            const airportCode = data[i].outboundFlight.departureAirportCode;
            const airportName = getAirportNameByCode(airportCode);
            const { roomType } = data[i].dropAccomodation;
            const drop = {
              id: data[i].id,
              title: data[i].title,
              startDate: new Date(data[i].travelStartDate),
              endDate: new Date(data[i].travelEndDate),
              image: tripTypeImage,
              tripType: data[i].city.cityName,
              ribbonText: data[i].hotels.hotelName,
              numberOfTravellers,
              details: [
                `${numberOfTravellers} Traveller${numberOfTravellers === 1 ? '' : 's'}`,
                `From ${airportName} (${airportCode})`,
                'Your Flights & Hotel included',
                roomType,
                'ATOL  protected',
              ],
              status: 'Dropped',
            };
            drops.push(drop);
          }
          setThisWeeksDropArray(drops);
        } else {
          setThisWeeksDropArray([]);
        }
        setDataReady(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchData(countries);
  }, []);

  const thisWeeksTrip = (data: any) => {
    const id = data;
    history.push('/trip', { id });
  };

  const trips = useMemo(
    () => thisWeeksDropArray.map((x) => (
      <TripCard
        key={x.id}
        trip={{
          id: x.id,
          startDate: x.startDate,
          endDate: x.endDate,
          image: x.image,
          tripType: x.tripType,
          tripTypeName: x.title,
          numberOfTravellers: x.numberOfTravellers,
          details: x.details,
          status: x.status,
          // lockDate: new Date(),
          // revealDate: new Date(),
          // departDate: new Date(),
          soldOut: true,
        }}
      />
    )),
    [thisWeeksDropArray],
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

        {trips.map((trip, index) => (
          <SwiperSlide key={`slide_${index}`}>{trip}</SwiperSlide>
        ))}

        {/* Create-a-trip card on the end of the list */}
        <SwiperSlide><TripCard /></SwiperSlide>

      </Swiper>
    );
  }

  return (
    <SimpleMessage>
      No drops are currently available for your preferred airports. Check back
      soon, or update the selected airports on
      {' '}
      <Link to="/travel-profile#complete-profile">your travel profile</Link>
      .
    </SimpleMessage>
  );
};
