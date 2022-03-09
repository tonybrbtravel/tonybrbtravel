import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Grid } from 'semantic-ui-react';
import { MyAccountSubscription } from './MyAccountSubscription';
import { MyAccountAccountDetails } from './MyAccountAccountDetails';
import { MyAccountEmailPreferences } from './MyAccountEmailPreferences';
import MyTravelSavings from '../../features/UserDashboard/MyTravelSavings/MyTravelSavings';
import MyBRBRewards from '../../features/UserDashboard/MyBRBRewards/MyBRBRewards';
import { TravelProfileHeader } from '../../features/TravelProfile/TravelProfileHeader';
import { TravelProfileMenu } from '../../features/TravelProfile/TravelProfileMenu';
import { TravelProfileDropdownButton } from '../../features/TravelProfile/TravelProfileDropdownButton';
import { Footer } from '../../components/Footer/Footer';
import BRBBanner from '../../components/BRBBanner/BRBBanner';

import useRewardsPointsQuery from '../../Hooks/useRewardsPointsQuery';

import backGround from '../../images/anthony-my-account-background.jpg';

import './MyAccount.less';
import ScrollTarget from '../../components/ScrollTarget';

export const MyAccountComponent = () => {
  const user = useSelector((state: any) => state.dashboard.user);
  const { data: rewardPoints } = useRewardsPointsQuery();

  const [userImage, setUserImage] = useState<string>('');

  const handleUserImage = (userProfileImage: string) => {
    setUserImage(userProfileImage);
  };

  useEffect(() => {
    setUserImage(userImage);
  }, [userImage]);

  return (
    <div className="my-account-container">
      <BRBBanner backgroundImage={backGround}>
        <MyAccountSubscription />
      </BRBBanner>

      <MyTravelSavings />

      <ScrollTarget id="rewards" />
      <MyBRBRewards pageName="myAccount" />

      {/* <MyAccountMyPoints/> */}
      <div className="account-details">
        <Container>
          <MyAccountAccountDetails onSetUserImage={handleUserImage} />
        </Container>
      </div>

      <div className="email-preferences">
        <Container>
          <MyAccountEmailPreferences />
        </Container>
      </div>

      <Footer />

    </div>
  );
};
