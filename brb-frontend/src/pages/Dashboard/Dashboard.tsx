import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import useRewardsPointsQuery from '../../Hooks/useRewardsPointsQuery';
import useSubscriptionQuery from '../../Hooks/useSubscriptionQuery';
import { subscriptionStatus } from '../../interfaces/myAccountType';

import Colors from '../../themes/Colors';

import ScrollTarget from '../../components/ScrollTarget';
import { WelcomeBlock } from '../../features/UserDashboard/Welcome/Welcome';
import { TravelProfileDashboardPanel } from '../../features/UserDashboard/TravelProfileDashboardPanel/TravelProfileDashboardPanel';
import MyTravelSavings from '../../features/UserDashboard/MyTravelSavings/MyTravelSavings';
import MyBRBRewards from '../../features/UserDashboard/MyBRBRewards/MyBRBRewards';
import { ThisWeeksDrop } from '../../features/MyTrips/ThisWeeksDrop';
import Banner from '../../features/AddTrip/Banner/Banner';
import { Footer } from '../../components/Footer/Footer';
import BRBCommunity from '../../components/BRBCommunity/BRBCommunity';
import { CityGuide } from '../../components/CityGuide/CityGuide';
import SurpriseTripPanel from '../../screens/_panels/SurpriseTripPanel';
import SubscriptionCalculatorPanel from '../../screens/_panels/SubscriptionCalculatorPanel';

import './Dashboard.less';
import '../../features/MyTrips/MyTrips.less';

export interface IDashboardProps {
  earnedPoints?: number;
  profileCompleted?: number;
}

export const UserDashboard = () => {
  const user = useSelector((state: any) => state.dashboard.user);
  const history = useHistory();

  const { data: subscriptionDetails } = useSubscriptionQuery();
  const { data: rewardPoints } = useRewardsPointsQuery();

  const isSubscribed = subscriptionDetails?.status?.toUpperCase() === subscriptionStatus.Subscribed;

  const onCompleteProfileClick = () => {
    history.push('/travel-profile#complete-profile');
  };

  const onCreateTripClick = () => {
    history.push('/add-trip#create');
  };

  return (
    <div className="dashboard-container">
      <WelcomeBlock
        onCompleteProfileClick={onCompleteProfileClick}
        preferredName={user.preferredName}
        earnedPoints={rewardPoints}
      />
      <TravelProfileDashboardPanel />
      <MyTravelSavings />
      <ScrollTarget id="rewards" />
      <MyBRBRewards />
      <Banner showHeader={false} />
      <ThisWeeksDrop />
      <SurpriseTripPanel
        backgroundColor={Colors.brbOffwhite}
        foregroundColor={Colors.brbBlue}
        onCreateTripClick={onCreateTripClick}
      />
      <BRBCommunity />
      <CityGuide />

      {
        isSubscribed ? (
          null
        ) : (
          <>
            <ScrollTarget id="subscribe" />
            <SubscriptionCalculatorPanel />
          </>
        )
      }

      <Footer />
    </div>
  );
};
