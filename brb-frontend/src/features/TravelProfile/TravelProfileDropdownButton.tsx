import { useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { Button, Dropdown, Icon, Image } from 'semantic-ui-react';
import BRBPinkText from '../../components/BRBPinkText';
import './TravelProfileDropdownButton.less';
import BrbEndPoints from '../../Api/BrbEndPoints';
import { getUserProfileImageDetails } from '../../Api/myAccountApi';
import useApiQuery from '../../Hooks/ApiQuery';
import { SignOut } from '../../Api/api';
import { IUsersubscription, subscriptionStatus } from '../../interfaces/myAccountType';
import useRewardsPointsQuery from '../../Hooks/useRewardsPointsQuery';

export interface Props {
  subscriptionDetails?: IUsersubscription;
}

export const TravelProfileDropdownButton = ({ subscriptionDetails }: Props) => {
  const user = useSelector((state: any) => state.dashboard.user);

  const { pathname, hash } = useLocation();

  const { data: userProfileImgDetails } = useApiQuery(
    ['profileImage', user.email],
    { url: BrbEndPoints.getUserProfileImage },
    getUserProfileImageDetails,
  );

  const { data: rewardPoints } = useRewardsPointsQuery();

  const history = useHistory();

  const avatarTrigger = (
    <span className="menu-trigger">
      <Icon name="user outline" />
      {user.preferredName || 'My account'}
    </span>
  );

  const trigger = (
    <span className="menu-trigger">
      <Image src={userProfileImgDetails} avatar />
      {user.preferredName || 'My account'}
    </span>
  );

  const onLogOut = () => {
    SignOut().then(() => {
      history.push('/signin');
    });
  };

  const onRewardPoints = () => {
    history.push('/my-account#rewards');
  };

  const showSubscribeLink: boolean = (
    subscriptionDetails?.status?.toUpperCase() !== subscriptionStatus.Subscribed
    && subscriptionDetails?.status?.toUpperCase() !== subscriptionStatus.Paused
  );

  return (
    <div className="myAccountButtons">

      <Button className="points-button" size="medium" style={{ color: '#1A1A2E' }} onClick={onRewardPoints}>
        <BRBPinkText>
          {rewardPoints ?? 0}
        </BRBPinkText>
        {' '}
        pts
      </Button>

      <div className="account-dropdown">
        <Dropdown
          trigger={userProfileImgDetails ? trigger : avatarTrigger}
          className="my-account-dropdown"
        >
          <Dropdown.Menu className="dropdown-menu">
            <Dropdown.Item
              active={pathname === '/dashboard'}
              key="dashboard"
              text="Dashboard"
              icon="home"
              onClick={() => history.push('/dashboard')}
            />
            <Dropdown.Item
              active={pathname === '/travel-profile'}
              key="profile"
              text="Travel Profile"
              icon="user"
              onClick={() => history.push('/travel-profile')}
            />
            <Dropdown.Item
              active={pathname === '/my-trips'}
              key="mytrips"
              text="My Trips"
              icon="plane"
              onClick={() => history.push('/my-trips')}
            />
            <Dropdown.Item
              active={pathname === '/add-trip' && hash === 'create'}
              key="createtrip"
              text="Create Trip"
              icon="suitcase"
              onClick={() => history.push('/add-trip#create')}
            />
            <Dropdown.Item
              key="myrewards"
              text="My Rewards"
              icon="gift"
              onClick={() => history.push('/my-account#rewards', { brbRewards: true })}
            />
            <Dropdown.Item
              active={pathname === '/my-account'}
              key="myaccount"
              text="My Account"
              icon="lock"
              onClick={() => history.push('/my-account')}
            />
            {
              showSubscribeLink ? (
                <Dropdown.Item
                  active={pathname === '/dashboard' && hash === 'subscribe'}
                  key="subscribe"
                  text="Subscribe"
                  icon="credit card"
                  onClick={() => history.push('/dashboard#subscribe')}
                />
              ) : (
                null
              )
            }
            <Dropdown.Item
              key="logout"
              text="Log Out"
              icon="sign-out"
              onClick={onLogOut}
            />
          </Dropdown.Menu>
        </Dropdown>
      </div>

    </div>
  );
};
