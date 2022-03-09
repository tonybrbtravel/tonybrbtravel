import React, { useState, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { Container, Grid } from 'semantic-ui-react';
import { Details } from './Details/Details';
import { Flights } from './Flights/Flights';
import './MainSection.less';
import { YourHotel } from './YourHotel/YourHotel';
import { RevealedFlightType } from '../../../interfaces/revealedFlightType';
import { RevealedHotelDetails } from '../../../interfaces/revealedHotelType';
import { getRevealHotelDetails } from '../../../Api/Trip';
import BrbEndPoints from '../../../Api/BrbEndPoints';
import { TripCityGuide } from '../TripCityGuide/TripCityGuide';
import { TripMap } from '../TripMap/TripMap';
import hotel from '../../../images/Hotel_With_Pool.png';
import { Spinner } from '../../../components/BRBSpinner/BRBSpinner';

export interface Props {
  revealedTrips: RevealedFlightType;
  isFinalLeg: boolean;
}

export const MainSection: React.VFC<Props> = ({
  revealedTrips,
  isFinalLeg,
}) => {
  const queryClient = useQueryClient();
  const user = useSelector((state: any) => state.dashboard.user);
  const [revealedHotelDetails, setRevealedHotelDetails] = useState<RevealedHotelDetails[]>([]);
  const [dataReady, setDataReady] = useState<boolean>(false);

  async function fetchHotelData(id: number) {
    if (id) {
      setDataReady(false);
      getRevealHotelDetails({ url: `${BrbEndPoints.revealedHotel}/${id}` })
        .then((response) => {
          queryClient.invalidateQueries(['mytrips', user.id]);
          const revealedHotelArr: RevealedHotelDetails[] = [];
          const hotelObj: RevealedHotelDetails = {
            address: response.address,
            checkinDetails: response.checkinDetails,
            description: response.description,
            destinationId: response.destinationId,
            hotelDirection: response.hotelDirection,
            hotelImage: response?.hotelImage[0]?.imageUrl ? response?.hotelImage[0]?.imageUrl : hotel,
            hotelName: response.hotelName,
            hotelPosition: response.hotelPosition,
            latitude: response.latitude,
            longitude: response.longitude,
            mapUrl: response.mapUrl,
            phone: response.phone,
            starRating: response.starRating,
            status: response.status,
            tripAdvisorId: response.tripAdvisorId,
            city: {
              cityId: response.city.cityId,
              cityName: response.city.cityName,
              contentfullId: response.city.contentfullId,
              country: response.city.country,
              description: response.city.description,
              status: response.city.status,
            },
          };
          revealedHotelArr.push(hotelObj);
          setRevealedHotelDetails(revealedHotelArr);
          setDataReady(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  useEffect(() => {
    fetchHotelData(revealedTrips?.hotelId);
  }, [revealedTrips]);

  return (
    <Container>
      {!dataReady && <Spinner />}

      <div className="trip-main-section">

        <Grid>

          <Grid.Row only="computer tablet">
            <Grid.Column width={10}>
              <Details
                revealedTrips={revealedTrips}
                revealedHotelDetails={revealedHotelDetails}
              />
              <YourHotel
                revealedTrips={revealedTrips}
                revealedHotelDetails={revealedHotelDetails}
              />
            </Grid.Column>
            <Grid.Column width={6}>
              <Flights revealedTrips={revealedTrips} isFinalLeg={isFinalLeg} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row only="mobile">
            <Grid.Column width={16}>
              <Details
                revealedTrips={revealedTrips}
                revealedHotelDetails={revealedHotelDetails}
              />
              <Flights revealedTrips={revealedTrips} isFinalLeg={isFinalLeg} />
              <YourHotel
                revealedTrips={revealedTrips}
                revealedHotelDetails={revealedHotelDetails}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={16}>
              <TripCityGuide
                revealedHotelDetails={revealedHotelDetails}
                revealedTrips={revealedTrips}
              />
              {/* <TripMap revealedHotelDetails={revealedHotelDetails} /> */}
            </Grid.Column>
          </Grid.Row>

        </Grid>

      </div>

    </Container>
  );
};
