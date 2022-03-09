import { Icon } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';
import { IUsersubscription, subscriptionStatus } from '../../interfaces/myAccountType';

export interface Props {
  subscriptionDetails?: IUsersubscription;
}

export const TravelProfileMenu = ({ subscriptionDetails }: Props) => {
  const location = useLocation();
  return (
    <div className="header-links">
      <Link to="/dashboard">
        <Icon name="home" />
        Dashboard
      </Link>
      <Link to="/add-trip">
        <Icon name="briefcase" />
        Create Trip
      </Link>
      <Link to="/my-account#rewards">
        <Icon name="gift" />
        My Rewards
      </Link>
      {
        subscriptionDetails?.status?.toUpperCase() === subscriptionStatus.Subscribed
          ? null
          : (
            <Link to="/dashboard#subscribe">
              <Icon name="archive" />
              Subscribe
            </Link>
          )
      }
    </div>
  );
};
