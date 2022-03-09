import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container, Grid } from 'semantic-ui-react';

import { TripType, User } from '../../interfaces/user';

import { TravelProfileCard } from './TravelProfileCard';
import { TravelProfileIntroCard } from './TravelProfileIntroCard';
import { Footer } from '../../components/Footer/Footer';
import { BRBButton } from '../../components/BRBButton/BRBButton';
import ScrollTarget from '../../components/ScrollTarget';

import backgroundImage from '../../images/profile-background.jpg';

import './TravelProfile.less';
import BRBBanner from '../../components/BRBBanner/BRBBanner';

export const TravelProfile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const mainSectionRef = useRef<HTMLDivElement>(null);
  const userProfile: User = useSelector((state: any) => state.dashboard.user);
  const tripTypes: TripType[] = userProfile.travelPreferences?.tripTypes ?? [];
  const { outboundAirports } = userProfile.airports ?? {
    outboundAirports: [],
  };
  const { destinations } = userProfile.top10Destinations ?? {
    destinations: [],
  };
  const excludedDestinations = userProfile.excludedDestinations ?? {
    destinations: [],
  };
  const { activities } = userProfile.preferredActivities ?? {
    activities: [],
  };
  const { preferences } = userProfile.hotelPreferences ?? {
    preferences: [],
  };
  const travellers = userProfile.travellers ?? [];
  const hotelPreferences = preferences;
  return (
    <div className="travel-profile">

      <BRBBanner backgroundImage={backgroundImage} fixed>
        <TravelProfileIntroCard nextSectionRef={mainSectionRef} />
      </BRBBanner>

      <ScrollTarget ref={mainSectionRef} id="complete-profile" />

      <div className="main-section">
        <Grid>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={16} computer={16}>
              <TravelProfileCard
                isProfileCompleted
                // isProfileCompleted={!!userProfile.profileStatus}
                top10Destinations={destinations}
                excludedDestinations={excludedDestinations.destinations}
                tripTypes={tripTypes}
                preferredActivities={activities}
                hotelPreferences={hotelPreferences}
                airports={outboundAirports}
                travellers={travellers}
                userProfile={userProfile}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column
              textAlign="center"
              mobile={16}
              tablet={16}
              computer={16}
            >
              <BRBButton
                primary
                onClick={() => {
                  history.push('/dashboard');
                }}
              >
                My Dashboard
              </BRBButton>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      <Footer />
    </div>
  );
};
