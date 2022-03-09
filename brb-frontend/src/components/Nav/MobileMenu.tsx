import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';
import React from 'react';
import clsx from 'clsx';
import Metrics from '../../themes/Metrics';
import Spacer from '../Spacer';
import { IUsersubscription, subscriptionStatus } from '../../interfaces/myAccountType';
import { Manifest } from './marketingSiteManifest';
import './MobileMenu.less';
import {
  Home, BriefCase, CreditCard, Logout, MyAccount, Rewards, MyTrips, TravelProfile,
} from './Icons/icons';
import { SignOut } from '../../Api/api';
import Colors from '../../themes/Colors';

export interface Props {
  subscriptionDetails?: IUsersubscription;
}

const MobileMenu = ({
  isActive,
  handleClick,
  subscriptionDetails,
}: {
  isActive: boolean;
  handleClick: () => void;
  subscriptionDetails: any;
}) => {
  const history = useHistory();
  const isSubscribed: boolean = !!(subscriptionDetails
    && (subscriptionDetails?.status?.toUpperCase() === subscriptionStatus.NotSubscribed || subscriptionDetails?.status?.toUpperCase() === subscriptionStatus.Subscribed));

  const onLogOut = () => {
    SignOut().then((res) => {
      history.push('/signin');
    });
  };

  return (
    <div className={clsx('mobile-menu', { 'active-menu': isActive })} onClick={handleClick}>
      <Link to="/dashboard">
        <Home color={Colors.brbPink} />
        {' '}
        Dashboard
      </Link>
      <Link to="/travel-profile">
        <TravelProfile color={Colors.brbPink} />
        {' '}
        Travel Profile
      </Link>
      <Link to="/my-trips">
        <MyTrips color={Colors.brbPink} />
        {' '}
        My Trips
      </Link>
      <Link to="/add-trip#create">
        <BriefCase color={Colors.brbPink} />
        {' '}
        Create Trip
      </Link>
      <Link to="/my-account#rewards">
        <Rewards color={Colors.brbPink} />
        {' '}
        My Rewards
      </Link>
      <Link to="/my-account">
        <MyAccount color={Colors.brbPink} />
        {' '}
        My Account
      </Link>
      {isSubscribed ? (
        <></>
      ) : (
        <Link to="/dashboard#subscribe">
          <CreditCard color={Colors.brbPink} />
          {' '}
          Subscribe
        </Link>
      )}
      <Link to="" onClick={onLogOut}>
        <Logout color={Colors.brbPink} />
        {' '}
        Logout
      </Link>

    </div>
  );
};

export default MobileMenu;
