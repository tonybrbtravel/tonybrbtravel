/**
 *
 * Nav
 *
 */

import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import useSubscriptionQuery from '../../Hooks/useSubscriptionQuery';

import Metrics from '../../themes/Metrics';

import MobileMenu from './MobileMenu';
import { TravelProfileDropdownButton } from '../../features/TravelProfile/TravelProfileDropdownButton';
import { TravelProfileMenu } from '../../features/TravelProfile/TravelProfileMenu';

import logo from '../../images/logo.svg';

import './nav.less';

// TODO: Can we leverage user details to make this decision instead of an array
//       of inclusions? (We can't just use user signed-in status because some of
//       the onboarding screens need to hide the nav - even though the user is
//       already "signed in" at that point.)
const showMainNavPagePaths = [
  '/',
  '/dashboard',
  '/travel-profile',
  '/my-trips',
  '/add-trip',
  '/my-account',
  '/subscribe',
  '/trip',
];

export const Nav = ({
  startNavTransparent,
}: {
  startNavTransparent: boolean;
}) => {
  const location = useLocation();

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setScrolled] = useState(false);

  const handleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleScroll = () => {
    const scrollTop = window.pageYOffset !== undefined
      ? window.pageYOffset
      : (
        document.documentElement
        || document.body.parentNode
        || document.body
      ).scrollTop;
    setScrolled(scrollTop > parseInt(Metrics.smallSpacer, 10));
  };

  const handleMenuClick = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const { data: subscriptionDetails } = useSubscriptionQuery();

  // Don't show the nav on certain identified pages
  if (showMainNavPagePaths.indexOf(location.pathname) === -1) {
    return null;
  }

  return (
    <div
      className={clsx('header-wrapper', {
        'start-nav-transparent': startNavTransparent,
        'sticky-navbar': isScrolled,
      })}
    >
      <div
        className={clsx('header-content', {
          solid: !startNavTransparent || isScrolled || isMenuOpen,
        })}
      >
        <div className="div-block">
          <Link to="/#" className="header-logo-link">
            <img src={logo} alt="Be Right Back Logo" />
          </Link>
        </div>
        <div className="div-block top-nav">
          <TravelProfileMenu subscriptionDetails={subscriptionDetails} />
          <TravelProfileDropdownButton subscriptionDetails={subscriptionDetails} />
          <div className="hamburger-wrapper" onClick={handleMenu} onKeyDown={handleMenu}>
            <div className={clsx('hamburger-menu', { open: isMenuOpen })} />
          </div>
        </div>
      </div>
      <MobileMenu isActive={isMenuOpen} handleClick={handleMenuClick} subscriptionDetails={subscriptionDetails} />
    </div>
  );
};

export default Nav;
