import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { Container, Tab } from 'semantic-ui-react';

import { RevealedFlightType } from '../../interfaces/revealedFlightType';

import { getRevealTripDetails } from '../../Api/Trip';
import BrbEndPoints from '../../Api/BrbEndPoints';

import Spacer from '../../components/Spacer';
import Metrics from '../../themes/Metrics';

import { MainSection } from './MainSection/MainSection';
import { Footer } from '../../components/Footer/Footer';
import { Spinner } from '../../components/BRBSpinner/BRBSpinner';

import outbound from '../../assets/images/outbound-flight.png';

import './Trip.less';
import SimpleMessage from '../../screens/_components/SimpleMessage';
import Colors from '../../themes/Colors';

export const Trip = () => {
  const location = useLocation<any>();
  const history = useHistory();
  const [ready, setReady] = useState<boolean>(false);
  const [tripLoadError, setTripLoadError] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const user = useSelector((state: any) => state.dashboard.user);
  const [revealedTrips, setRevealedTrips] = useState<RevealedFlightType[]>([]);

  async function fetchData() {
    getRevealTripDetails({ url: `${BrbEndPoints.revealedTrip}/${location.state.id}` })
      .then((response) => {
        queryClient.invalidateQueries(['mytrips', user.id]);
        const revealedTripsDetails: RevealedFlightType[] = [];
        const data = response.bookingInfoResponse?.destinations;

        if (!data) {
          // Bounce to dashboard
          history.push('/dashboard');
        }

        for (let i = 0; i < data.length; i++) {
          const flightObj: RevealedFlightType = {
            // Oh cool, we're flattening data here for no apparent reason
            // (Gets recombined into flight-detail objects for display)
            startDate: new Date(response.tripDetails.startDate),
            endDate: new Date(response.tripDetails.endDate),
            image: outbound,
            tripType: response.tripDetails.tripType,
            depTakeoffAirportCode: data[i].flightOutBoundDetails.departureAirportCode,
            depLandingAirportCode: data[i].flightOutBoundDetails.arrivalAirportCode,
            depTakeoffLocation: data[i].flightOutBoundDetails.departureAirportName,
            depLandingLocation: data[i].flightOutBoundDetails.arrivalAirportName,
            arrTakeoffAirportCode: data[i].flightInBoundDetails.departureAirportCode,
            arrLandingAirportCode: data[i].flightInBoundDetails.arrivalAirportCode,
            arrTakeoffLocation: data[i].flightInBoundDetails.departureAirportName,
            arrLandingLocation: data[i].flightInBoundDetails.arrivalAirportName,
            outboundDate: new Date(data[i].flightOutBoundDetails.departureDate),
            outboundTime: `at ${data[i].flightOutBoundDetails.departureTime}`,
            returnDate: new Date(data[i].flightInBoundDetails.departureDate),
            returnTime: `at ${data[i].flightInBoundDetails.departureTime}`,
            depCarrier: data[i].flightOutBoundDetails.carrierName,
            arrCarrier: data[i].flightInBoundDetails.carrierName,
            depBookingReference: data[i].flightOutBoundDetails.bookingReference,
            arrBookingReference: data[i].flightInBoundDetails.bookingReference,
            depBookingEmail: data[i].flightOutBoundDetails.bookingEmail,
            arrBookingEmail: data[i].flightInBoundDetails.bookingEmail,
            status: 'RevealedDetails',
            lateReturn: response.tripDetails.lateReturn,
            hotelId: data[i].hotelInfo[0].hotelId,
            hotelBookingReference: data[i].hotelInfo[0].bookingReference,
            roomType: data[i].hotelInfo[0].roomType,
            breakfastIncluded: data[i].hotelInfo[0].breakfastIncluded,
            userId: data[i].hotelInfo[0].user_id,
            bags: data[i].flightOutBoundDetails.baggageAllowance,
            atolUrl: response.tripDetails.atolUrl,
          };
          revealedTripsDetails.push(flightObj);
        }

        // Ready to display
        setRevealedTrips(revealedTripsDetails);
        setReady(true);
      })
      .catch((error) => {
        console.log(error);
        setTripLoadError(true);
        setReady(true);
      });
  }

  useEffect(() => {
    if (location.state?.id) {
      fetchData();
    } else {
      // Bounce to dashboard
      history.push('/dashboard');
    }
  }, []);

  if (!ready) {
    return <Spinner />;
  }

  if (tripLoadError) {
    return (
      <>
        <Spacer height={Metrics.navHeight} backgroundColor={Colors.brbBlue} />
        <Container>
          <SimpleMessage>
            <h1>Hmmm.</h1>
            <p>
              We aren’t able to retrieve these trip details right now.
            </p>
            <p>
              Go to
              {' '}
              <Link to="/dashboard">your dashboard</Link>
              {' '}
              or
              {' '}
              <Link to="/my-trips">your trips page</Link>
              {' '}
              and try again in a few minutes.
            </p>
          </SimpleMessage>
        </Container>
      </>
    );
  }

  return (
    <div className="Trip">

      <Spacer height={Metrics.navHeight} backgroundColor={Colors.brbBlue} />

      {revealedTrips?.length > 1 ? (
        <Tab
          menu={{ secondary: true }}
          panes={revealedTrips.map((d, index) => ({
            menuItem: `Destination ${index + 1}`,
            render: () => (
              <Tab.Pane>
                <MainSection
                  revealedTrips={d}
                  isFinalLeg={index === revealedTrips.length - 1}
                />
              </Tab.Pane>
            ),
          }))}
        />
      ) : (
        <div className="main-section-wrapper">
          <MainSection
            revealedTrips={revealedTrips[0]}
            isFinalLeg
          />
        </div>
      )}

      <Footer />

    </div>
  );
};
